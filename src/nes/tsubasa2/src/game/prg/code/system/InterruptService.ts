/**
 * InterruptService — NMI/IRQ 帧服务
 * @bank 31 ($E000-$FFFF 固定窗口, 含 Reset/NMI/IRQ 向量) + bank30 NMI 处理 $C500
 *
 * 真实向量: NMI=$C500 (→$C76E), RESET=$FFF0 (→$C503→bank30 $C64E), IRQ=$C506 (→$C821)。
 * 翻译版无 CPU 中断: 帧循环直接调 nmi() 完成 NMI 语义的每帧更新。
 *
 * 命名规范: 旧名 Bank31Service/InterruptService → 新名 InterruptService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from './GameSystemService';
import type { BootRouter } from './BootRouter';

/** bank 配置表 (结构化数据, 原 MMC3 窗口映射) */
export interface BankConfig {
  bank: number;
  window: 'A000' | 'C000' | 'E000';
}

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class InterruptService {
  protected _store: DataStore;
  protected _system: GameSystemService | null = null;
  /** bank02 NMI 渲染执行器 (BootRouter.nmiRender, $8000-$8137) — 组合根注入 */
  protected _router: BootRouter | null = null;

  /** 上一帧输入掩码 (用于计算按下沿 ram_001E) */
  protected _prevInput = 0;

  constructor(store: DataStore, system?: GameSystemService) {
    this._store = store;
    this._system = system ?? null;
  }

  /** 挂接主循环服务 (组合根注入) */
  attachSystem(system: GameSystemService): void {
    this._system = system;
  }

  /** 挂接 bank02 NMI 渲染执行器 (组合根注入) */
  attachRouter(router: BootRouter): void {
    this._router = router;
  }

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }

  // ════════════════════════════════════════════════
  // RESET 向量 ($FFF0) → bank0 进 $8000 窗口 → JMP $C503 → bank30 init
  // ════════════════════════════════════════════════
  reset(): void {
    // $FFF0: LDA #$00; STA $8000 — 选 bank0 进 $8000 窗口 (MMC3 省略)
    // $FFF5: JMP $C503 — bank30 主初始化 ($C64E)
    // 翻译版: 委托 HardwareInitService.init (组合根注入)。
  }

  // ════════════════════════════════════════════════
  // NMI ($C500→$C76E) — 每帧 NMI 语义
  // 对应 $C76E-$C820: 保存寄存器 → OAM DMA → VRAM 缓冲回放 → 调色板/回卷同步
  //                  → 输入读取 ($C982) → 帧完成标志 → 主逻辑帧推进
  // ════════════════════════════════════════════════
  nmi(frame: number): void {
    // $C77A-$C781: LDA $0020; AND #$7F; STA $2000; STA $0020 (NMI 期间关 NMI)
    this.wr(0x0020, this.rd(0x0020) & 0x7f);
    // $C78B-$C790: OAM DMA (STA $2003 / STA $4014) — 影子 OAM → 硬件 OAM
    this._store.oamShadow.copyToHw();
    // $C796: LDA $046B; STA $A000 (MMC3) — 省略并注释
    // $C799: JSR $C8FB — $0498 VRAM 缓冲回放 (写 NT/属性)
    this._commitVramBuffer();
    // $C79F-$C7AC: 调色板地址 ($3F00) — 帧合成器消费 DataStore.paletteTable, 省略
    // $C7B7-$C7C2: 回卷: X = $004A + $0538; Y = $004B
    this._store.scrollX = (this.rd(0x004a) + this.rd(0x0538)) & 0xff;
    this._store.scrollY = this.rd(0x004b) & 0xff;
    // $C7CA: JSR $C9E9 — MMC3 精灵 bank 配置, 省略并注释
    // $C7E4: JSR $C9C5 — 数值换算辅助, 翻译版由 PlayerQueryService 提供, 省略
    // $C7E7: JSR $C982 — 读取控制器 → ram_001C / 按下沿 ram_001E
    this._readInput();
    // $C7EA-$C7EE: LDA $001B; ORA #$80; STA $001B — 帧完成标志
    this.wr(0x001b, this.rd(0x001b) | 0x80);
    // $C808-$C81F: 恢复寄存器 + RTI — 省略
    // ── bank02 NMI 渲染主程 ($8000-$815F) — 写 PPU 配置/NT buffer/调色板/滚动 ──
    // tsnes trace 实测: 开场每帧走 bank2 $8000 NMI 渲染 (Mesen 前缀 $01 = 块2/3)
    // 写 $2000/$2001/$2006/$2007 + OAM DMA + 调色板刷新 + 滚动寄存器。
    // 翻译版: BootRouter.nmiRender() 回放 $05E8 PPU buffer —
    //   NT 区 ($2000-$2FFF) 直写 DataStore writeNT, 调色板区 ($3F00) 直写 paletteTable
    //   (组合根 attachRouter 注入, 此前 _router 恒 null 导致本调用 no-op)。
    this._router?.nmiRender();
    // ── 主游戏逻辑每帧推进 (原 $C982 之后由调度器协程驱动) ──
    // bank00 协程调度器 ($9EED/$9F0F) 每帧按 ram_00ED 分发场景帧处理
    // bank02 $8484 分发器: LDA ram_00ED; ASL; TAX; 查 NMI_CALLBACK_TABLE → 跳转
    this._router?.update(frame);
    this._system?.update(frame);
  }

  // ════════════════════════════════════════════════
  // $C8FB — $0498 VRAM 缓冲回放
  // 格式: [count][addrHi][addrLo][data×count] ... count==0 结束
  // 翻译版: OamManager 的 VRAM 写缓冲 (beginVramBuild/writeVramByte/endVramBuild)
  //         由 commitVramToNT() 提交到 NT 网格。
  // ════════════════════════════════════════════════
  protected _commitVramBuffer(): void {
    if (this._store.oam.busy === 0x80) {
      this._store.oam.commitVramToNT();
    }
  }

  // ════════════════════════════════════════════════
  // $C982 — 控制器读取
  // 对应: strobe $4016; 逐位读 8 bit → ram_001C (当前按下);
  //       边沿 (上次无本次有) → ram_001E (按下沿)
  // 翻译版: 帧驱动把输入掩码写入 DataStore KV 'input_mask' (bit0=A,1=B,2=SEL,3=START,4=UP,5=DOWN,6=LEFT,7=RIGHT)
  // ════════════════════════════════════════════════
  protected _readInput(): void {
    const mask = (this._store.get<number>('input_mask') ?? 0) & 0xff;
    this.wr(0x001c, mask);
    this.wr(0x001e, mask & ~this._prevInput & 0xff);
    this._prevInput = mask;
  }
}

export default InterruptService;
