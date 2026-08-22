/**
 * HardwareInitService — 硬件初始化 (RESET 后第一件事)
 * @bank 30 ($C000-$DFFF 固定窗口)
 *
 * 职责: RESET 向量链 ($FFF0→$C503→$C64E 主初始化)、场景重置辅助 $CEFE、
 * bank 窗口配置 + 场景引导 $C400、精灵区清理 $CF1F、名称表清理 $CB35/$CB5C、
 * OAM 全离屏填充 $CB8B。
 *
 * 翻译版不写 MMC3/PPU/APU 寄存器 (帧合成器按 DataStore 消费), 直接初始化
 * RAM 默认值并驱动 BootRouter 进入 BOOT 场景。
 *
 * 命名规范: 旧名 Bank30Service → 新名 HardwareInitService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from './GameSystemService';
import type { BootRouter } from './BootRouter';
import type { SkillService } from '../skill/SkillService';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class HardwareInitService {
  protected _store: DataStore;
  protected _system: GameSystemService;
  protected _scene: BootRouter;
  protected _skill: SkillService;

  constructor(
    store: DataStore,
    system: GameSystemService,
    scene: BootRouter,
    skill: SkillService,
  ) {
    this._store = store;
    this._system = system;
    this._scene = scene;
    this._skill = skill;
  }

  // ── 零页读/写辅助 ──
  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }

  // ════════════════════════════════════════════════
  // $C64E RESET 主初始化链
  // 对应原始 $FFF0: LDA #$00; STA $8000 (选 bank0 进 $8000 窗口) → JMP $C503
  // $C503: JMP $C64E
  // ════════════════════════════════════════════════
  init(): void {
    // $C64E: LDA #$08; STA $2000 — PPU CTRL (NMI 关, 8×8 精灵) → ram_0020
    this.wr(0x0020, 0x08);
    // $C653-$C657: SEI / CLD / LDX #$FF / TXS — 无 CPU 指令, 省略
    // $C658-$C660: 等待 2 个 vblank — 帧驱动, 省略
    // $C662-$C664: LDA #$C0; STA $A001 (MMC3 PRG-RAM 写保护) — 省略并注释
    this._store.mem.fill(0, 0, 0x0800);
    this._store.zp.fill(0);
    // $C67A-$C682: 再次设 PPU 寄存器
    this.wr(0x0020, 0x08);
    this.wr(0x0021, 0x06);
    // $C685-$C68C: APU 初始化 (STA $4010 / STA $4017) — 由音频引擎接管, 省略
    // $C68F-$C69E: PPU 地址复位 ($2006 ×16) — 帧合成器管理, 省略
    // $C6A0: LDA #$00; STA $0022 — bank 基址
    this.wr(0x0022, 0x00);
    // $C6A5: JSR $CB35 — 清双名称表 + PPU 寄存器
    this.clearNameTables();
    // $C6A8: JSR $CB8B — OAM 全离屏填充
    this.fillOamOffscreen();
    // $C6AB-$C6B5: bank 状态清零 (STA $0469 ×2 / STA $E000)
    this.wr(0x0469, 0x00);
    this.wr(0x0469, 0x00);
    // $C6B8: CLI — 省略
    // $C6B9-$C6BB: LDA #$00 (场景 0 = BOOT); JMP $CEFE → 场景重置辅助
    // 先执行 preMainLoopInit (asm $821D: 含 JSR $AA06 场景/调色板装载 + JSR $98A0 ntClear + JSR $9B7F oamClear)
    // 否则场景数据不装载, 画面空白
    this._scene.preMainLoopInit();
    this.resetScene(0);
  }

  // ════════════════════════════════════════════════
  // $CEFE 场景重置辅助 (软复位到指定场景)
  // 对应: PHA; 清 $0469/$E000; JSR $CB8B; JSR $CB35; 清 PPU CTRL NMI;
  //       PLA (场景 id); JMP $C400
  // ════════════════════════════════════════════════
  resetScene(sceneId: number): void {
    this.wr(0x0469, 0x00);
    this.wr(0x0469, 0x00);
    this.fillOamOffscreen(); // JSR $CB8B
    this.clearNameTables();  // JSR $CB35
    // $CF12: LDA $0020; AND #$7F; STA $2000; STA $0020
    this.wr(0x0020, this.rd(0x0020) & 0x7f);
    this.bootScene(sceneId & 0xff); // JMP $C400
  }

  // ════════════════════════════════════════════════
  // $C400 bank 窗口配置 + 场景引导
  // 对应: PPU 寄存器; LDX #$00; JSR $C4B2 (bank0→$8000 窗口);
  //       LDX #$02; JSR $C4B9 (bank2→$A000 窗口); TYA; JMP $A200
  // ════════════════════════════════════════════════
  bootScene(sceneId: number): void {
    // $C401-$C40C: PPU CTRL/MASK
    this.wr(0x0020, 0x08);
    this.wr(0x0021, 0x1e);
    // $C40F-$C411: bank 基址
    this.wr(0x0022, 0x00);
    // $C413-$C415: LDX #$00; JSR $C4B2 → ram_0024=bank0 ($8000 窗口, MMC3 省略)
    this.wr(0x0024, 0x00);
    // $C418-$C41A: LDX #$02; JSR $C4B9 → ram_0025=bank2 ($A000 窗口, MMC3 省略)
    this.wr(0x0025, 0x02);
    // $C41D-$C41E: TYA (场景 id); JMP $A200 → bank0 场景引导
    // 翻译版: bank0 = GameSystemService, 场景引导 = BootRouter.resetEntry
    this._scene.resetEntry(sceneId);
  }

  // ════════════════════════════════════════════════
  // $CB35 清双名称表 + PPU 寄存器
  // ════════════════════════════════════════════════
  clearNameTables(): void {
    // $CB35: LDA $0020; AND #$7F; STA $0020; STA $2000
    this.wr(0x0020, this.rd(0x0020) & 0x7f);
    // $CB3E: LDA #$06; STA $2001 — 帧合成器侧, 省略
    // $CB43/$CB48: LDA #$20 / #$24; JSR $CB5C — 清 NT0/NT1
    this.clearOneNameTable(0x2000);
    this.clearOneNameTable(0x2400);
    // $CB4D-$CB58: ppuMask=0x1E; LDA $0020; ORA #$80 → NMI 开
    this.wr(0x0020, this.rd(0x0020) | 0x80);
  }

  /** $CB5C: 清一个名称表 (0x300+0x40 字节) + 回卷 0,0 */
  protected clearOneNameTable(addr: number): void {
    const nt = (addr < 0x2400 ? 0 : 1) as 0 | 1;
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        this._store.writeNT(nt, x, y, {
          tile: 0, palette: 0, bank: 0,
          flipH: false, flipV: false, behindBg: false,
        });
      }
    }
    // $CB82-$CB87: STA $2005 ×2 → 回卷 0,0
    this._store.scrollX = 0;
    this._store.scrollY = 0;
  }

  // ════════════════════════════════════════════════
  // $CB8B OAM 全离屏填充
  // 对应: LDY #$00; LDA #$F8; 循环 STA $0200,Y (INY×4) → $0200-$02FF = $F8
  // ════════════════════════════════════════════════
  fillOamOffscreen(): void {
    this._store.oamShadow.clearAll(0xf8); // $0468 影子 OAM 表
    this._store.oamShadow.clearHw(0xf8);  // $0200 硬件 OAM
  }

  // ════════════════════════════════════════════════
  // $CF1F 精灵区清理
  // 对应: 指针 $003A/$003B=$0468; 清 $0468-$05FF (2 页) + $0600-$0696;
  //       零页 $003A-$00DE 清零
  // ════════════════════════════════════════════════
  clearSpriteRam(): void {
    for (let i = 0x0468; i <= 0x0696; i++) this.wr(i, 0x00);
    for (let x = 0xa5; x > 0; x--) this.wr(0x003a + x, 0x00);
  }

  // ════════════════════════════════════════════════════════════
  // bank30 $C500-$C54E 派发表 (通用工具函数, 被所有 bank 调用)
  // 原 asm bank30 $C500 起 JMP 派发表:
  //   $C509→$CB99 / $C50C→$CD7C / $C515→$CB0F / $C524→$CBC2
  //   $C530→$CC02 / $C533→$CCD2 / $C54E→$CBB0
  // ════════════════════════════════════════════════════════════

  /**
   * $C515 → $CB0F: 协程让出核心。
   * asm: LDA #$00; STA $007F; 保存 X/Y; LDX $0000 (协程槽);
   *   存 bank24/25/标志/栈指针 到协程槽; JMP $CAA5 (调度器)。
   * H5 版: 不做真正协程切换, 用帧计数模拟 (标记等待, 下一帧推进)。
   * @param a 让出参数 (1=等1帧, 2=等2帧, $60=等96帧等)
   */
  coroutineYield(a: number = 1): void {
    void a;
    // H5 版 no-op: 协程让出由 GameSystemService.update() 帧推进控制
    // 实际 asm 保存协程上下文到 $0000+ 槽, 切换到下一协程
  }

  /**
   * $C509 → $CB99: 通用查表/标志检查。
   * asm $CB99: TAY; 查表; 返回。
   * H5 版 stub。
   */
  subC509(a: number): number {
    return a;  // stub: 原样返回
  }

  /**
   * $C50C → $CD7C: 比赛阶段→RAM玩家数据指针查表。
   * asm $CD77: LDA $05FB; EOR #$0B; ASL; TAY; LDA $CD89,Y; STA $0034; LDA $CD8A,Y; STA $0035。
   * $CD89 表 32 项 16 位指针, 全在 $0300-$042C (RAM 玩家数据区)。
   * 已查证: 索引 = (比赛阶段 ^ $0B) << 1。
   */
  subC50C(): void {
    const phase = this.rd(0x05FB);
    const idx = ((phase ^ 0x0B) << 1) & 0xFF;
    // $CD89 表 (bank30 内, 32 项 16 位指针)
    const table = RAM_PTR_TABLE_CD89;
    const ptr = table[idx] ?? 0;
    this.wr(0x0034, ptr & 0xFF);
    this.wr(0x0035, (ptr >> 8) & 0xFF);
  }

  /**
   * $C524 → $CBC2: 坐标变换。
   * asm $CBC2: 读 ram_00E6/00E7, 算 NT 地址偏移。
   * H5 版 stub (由渲染管线覆盖)。
   */
  subC524(a: number): number {
    return a;  // stub
  }

  /**
   * $C530 → $CC02: NT 填充 (按 X/Y 参数填 NT 区)。
   * asm $CC02: 读参数, 设 PPU 地址, 循环写 $2007。
   * H5 版: 委托 GameSystemService.ppuFill (bank00 渲染原语)。
   */
  subC530(x: number, a: number): void {
    // X = NT 区索引, A = 填充值
    this._system.ppuFill(a, 0x2000 + x * 0x0400, 32, 30);
  }

  /**
   * $C533 → $CCD2: NT 刷新 (PPU buffer → PPU VRAM)。
   * asm $CCD2: 读 $05E8 buffer, 写 $2006/$2007。
   * H5 版: no-op (帧合成器直接从 DataStore 读 NT)。
   */
  subC533(): void {
    // H5 版: NT 刷新由 writeStoreToPpu (组合根) 每帧做, 此处 no-op
  }

  /**
   * $C54E → $CBB0: 读数据+设精灵。
   * asm $CBB0: 读参数, 设精灵属性。
   * H5 版 stub。
   */
  subC54E(a: number): void {
    void a;  // stub
  }
}

/** $CD89 指针表 (bank30, 32 项 16 位 RAM 玩家数据指针) */
const RAM_PTR_TABLE_CD89: readonly number[] = [
  0x0300, 0x030C, 0x0318, 0x0324, 0x0330, 0x033C, 0x0348, 0x0354,
  0x0360, 0x036C, 0x0378, 0x0384, 0x0390, 0x039C, 0x03A8, 0x03B4,
  0x03C0, 0x03CC, 0x03D8, 0x03E4, 0x03F0, 0x03FC, 0x0408, 0x040C,
  0x0410, 0x0414, 0x0418, 0x041C, 0x0420, 0x0424, 0x0428, 0x042C,
];

export default HardwareInitService;
