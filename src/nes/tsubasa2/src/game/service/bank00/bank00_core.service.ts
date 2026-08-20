/**
 * Bank 00 Service — 核心系统服务层 (业务逻辑)
 *
 * 原始 PRG 数据已直接 import (rom-data/prg-bank-00.ts)，无 MMC3 bank 切换。
 * Bank 00 是所有 bank 共享调用的系统服务层，H5 中就是一个普通 Service 对象，
 * 其他 bank 直接调用其方法。
 *
 * 渲染/展示部分已剥离到 View (view/bank00/Bank00RenderView):
 *   NT 渲染 / 调色板 / OAM 精灵 / PPU Buffer / 帧同步
 * Service 保留业务逻辑 (状态机/场景调度/帧循环) 并委托渲染方法。
 *
 * 翻译来源 (bank_00 汇编关键函数):
 *   $9EED — 主循环入口
 *   $8AF7 — 场景描述读取 (业务部分: SCENE_ID/组号)
 *   $9A43 — 主循环初始化 part1
 *   $9A35 — 主循环初始化 part2 (业务部分)
 *   $9F69 — 数据写入辅助
 *   $9BA0 — 等待 VBlank (调度)
 *   $84C1 — Bank 02 入口分发
 *   $801F — 场景初始化链入口
 *   $8091 — 主输入循环
 * 渲染函数委托: $98A0/$9B11/$8297/$9085/$9AB8/$9ADA/$890C/$88FB/$9B7F/$9B91/$9B28/$9B5E → Bank00RenderView
 */

import { DataStore, RAM_KEYS } from '../../data/prg/DataStore';
import { getSceneBgGrp } from '../../data/prg/bank07-data';
import { SceneRoot } from '../../data/prg/scene/index';
import PRG_BANK_06 from '../../data/prg/prg-bank-06';
import { Bank00RenderView } from '../../view/bank00/Bank00RenderView';
import { getScriptBank } from './script-opcodes';
import { getScriptData } from './script-data-loader';

/* eslint-disable @typescript-eslint/no-unused-vars */

/** 真实 RAM 键 (4 位大写补零, 与全库 ram_XXXX 约定一致) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

/** 帧状态标志 — 真实 RAM 地址键 (与 bank26/31 的 ram_001E 一致) */
const FRAME_FLAG   = 'ram_001E';   // ram_001E: bit4=vblank done, bit5=?
const SCENE_ID     = 'ram_0026';   // ram_0026: 场景 ID (与 bank01/02/24/29 一致)
const RAM_1B       = 'ram_001B';   // ram_001B: 场景状态标志 (与 bank02 一致)



// ═══════════════════════════════════════════════════════════════
// Bank 00 Service
// ═══════════════════════════════════════════════════════════════

export class Bank00Service {
  /** 当前帧计数 */
  private _frameCount = 0;

  /** 主循环是否运行中 */
  private _running = false;

  /** 渲染展示层 (View) — NT/调色板/OAM/PPU Buffer */
  private _render!: Bank00RenderView;

  constructor(private _store: DataStore) {
    this._render = new Bank00RenderView(_store);
  }

  // ── 公共接口 ──

  get store(): DataStore { return this._store; }

  get frameCount(): number { return this._frameCount; }

  /** 渲染展示层 (View) — 供外部直接访问渲染方法 */
  get renderView(): Bank00RenderView { return this._render; }

  // ──────────────────────────────────────────────
  // $98A0: Nametable 全屏清零
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $98A0: NT 全屏清零 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.ntClear()。
   */
  ntClear(): void {
    this._render.ntClear();
  }

  // ──────────────────────────────────────────────
  // $9B11: Nametable + 属性表清零
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B11: 清零 Nametable 和 attribute table。
   * 实现在 view/bank00/Bank00RenderView.ntAttrClear()。
   */
  ntAttrClear(): void {
    this._render.ntAttrClear();
  }

  // ──────────────────────────────────────────────
  // $8297 & $9085: 文本 buffer 构建 (非调色板!)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8297: 文本 buffer 参数设置 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.paletteInit()。
   *
   * @param palIdx 文本 buffer 索引 (Reset 时 A=0x0D)
   */
  paletteInit(palIdx: number): void {
    this._render.paletteInit(palIdx);
  }

  /**
   * 对应原始 $9085: 文本 buffer 构建入口 (渲染部分, no-op)。
   * 实现在 view/bank00/Bank00RenderView.paletteWriteBuf()。
   */
  paletteWriteBuf(_data: number[]): void {
    this._render.paletteWriteBuf(_data);
  }

  /**
   * 对应原始 $9A31: 主循环初始化参数。
   * 汇编: STA ram_0048 (BG 组号) → STX ram_0049 (SPR 组号) → 落到 $9A35 (调色板加载链)。
   * H5: 记录组号到数据中心后执行 mainLoopInit2()。
   *
   * @param bgGrp  BG 调色板组号 (A)
   * @param sprGrp SPR 调色板组号 (X)
   */
  mainInitParam(bgGrp: number, sprGrp: number): void {
    this._store.write('ram_0048', bgGrp & 0xFF);
    this._store.write('ram_0049', sprGrp & 0xFF);
    this.mainLoopInit2();
  }

  /**
   * 对应原始 $9AB8 (BG) + $9ADA (SPR): 调色板组加载 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.paletteLoad()。
   *
   * @param bgGrp  BG 调色板组号 (ram_0048, 场景 header h[2]&0x3F)
   * @param sprGrp SPR 调色板组号 (ram_0049, setup 0x80+ 操作码或默认 0)
   */
  paletteLoad(bgGrp: number, sprGrp: number): void {
    this._render.paletteLoad(bgGrp, sprGrp);
  }

  // ──────────────────────────────────────────────
  // $8AF7: 场景描述读取
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8AF7: A=sceneId → $ED → 切 Bank07 → 读 Bank02 场景指针表 → 解析场景数据。
   * H5: 根据 sceneId 加载对应场景配置 (业务部分)。
   * 渲染部分 (NT 写入) 委托 view.loadSceneNT()。
   *
   * 场景 header[2]&0x3F = BG 调色板组号 → ram_0048 (供 mainLoopInit2 → paletteLoad)。
   *
   * @param sceneId 场景编号 (Reset: 0x17 = Tecmo Theater)
   */
  sceneLoad(sceneId: number): void {
    this._store.write(SCENE_ID, sceneId & 0xFF);
    // $8AF7: 切 Bank07 → 场景指针表 → header h[2]&0x3F → ram_0048
    const bgGrp = getSceneBgGrp(sceneId & 0xFF);
    this._store.write('ram_0048', bgGrp & 0xFF);
    // SPR 组号由场景 setup 指令设置, 默认 0
    this._store.write('ram_0049', 0);

    // 渲染部分: 把场景的 NT tile + 属性表写入 DataStore。
    // ⚠️ 注意: 若场景初始化链中后续有 ntClear (如 $A4C0 链 $A538 JSR $98A0),
    // 背景会被清掉, 需在 ntClear 之后调用 renderSceneNT() 重新写入 (见 $A4C0 链)。
    this._render.loadSceneNT(sceneId);
  }

  /** 仅渲染部分: 重新写入场景 NT tile + 属性表 (供 ntClear 之后恢复背景用)。 */
  renderSceneNT(sceneId: number): void {
    this._render.loadSceneNT(sceneId);
  }

  // ──────────────────────────────────────────────
  // $890C: VRAM 地址/滚动设置 (渲染部分)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $890C: A=索引(0x30) → 从数据表读滚动偏移 → 设置 PPU $2006/$2005。
   * 实现在 view/bank00/Bank00RenderView.vramAddrSetup()。
   *
   * @param idx VRAM 索引参数 (Reset: 0x30)
   */
  vramAddrSetup(idx: number): void {
    this._render.vramAddrSetup(idx);
  }

  // ──────────────────────────────────────────────
  // $88FB: PPU 寄存器设置 (渲染部分)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $88FB: PPUCTRL/PPUMASK/PPUSCROLL 设置。
   * 实现在 view/bank00/Bank00RenderView.ppuRegSetup()。
   */
  ppuRegSetup(): void {
    this._render.ppuRegSetup();
  }

  // ──────────────────────────────────────────────
  // $9A43 & $9A35: 主循环初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9A43: 主循环初始化 part1。
   * 汇编: LDA #$0F → STA ram_004A → STA ram_004B → JMP $9A71。
   * 渐显初始值写入委托 view.setFadeCounters()。
   */
  mainLoopInit1(): void {
    this._render.setFadeCounters(0x0F, 0x0F);
  }

  /**
   * 对应原始 $9A35: 主循环初始化 part2。
   * 汇编链: JSR $9B07 → JSR $9AB8 (BG 调色板) → JSR $9ADA (SPR 调色板)
   *         → LDX $E9 → JSR $C4B9 → $9A43 (ram_004A=ram_004B=0x0F) → JMP $9A71。
   * H5: 渲染部分 (调色板加载 + 渐显初始值) 委托 view, 其余为业务状态清零。
   */
  mainLoopInit2(): void {
    // $9AB8/$9ADA: 从场景调色板表加载 BG/SPR 组 (渲染)
    const bgGrp = this._store.read('ram_0048') ?? 0;
    const sprGrp = this._store.read('ram_0049') ?? 0;
    this._render.paletteLoad(bgGrp, sprGrp);
    // $9A43: ram_004A/ram_004B = 0x0F (渲染渐显初始值)
    this._render.setFadeCounters(0x0F, 0x0F);
    this._store.write('ram_004C', 0x8A);
    this._store.write('ram_005B', 0);
    this._store.write('ram_0005', 0);
    this._store.write('ram_0006', 0);
    this._store.write('ram_0009', 0);
    this._store.write('ram_000A', 0);
    this._store.write('ram_0011', 0);
    this._store.write('ram_0012', 0);
    this._store.write('ram_000D', 0);
    this._store.write('ram_000E', 0);
  }

  // ──────────────────────────────────────────────
  // $9B7F: PPU 初始化 / 未知初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B7F: 清空全部精灵 (OAM 复位)。
   * asm ($9B7F-$9B9F):
   *   $9B7F: LDX #$00
   *   $9B81: LDA #$F8
   *   $9B83: STA $0468,X  → 影子 OAM $0468-$04FF 填 $F8 (屏幕外)
   *   $9B87: BNE $9B83
   *   $9B89: LDA #$F8
   *   $9B8B: STA $0200,X  → 直接 OAM $0200-$02FF 填 $F8
   *   $9B8F: BNE $9B8B
   *   $9B91: LDA #$00
   *   $9B93/$9B96/$9B99/$9B9C: STA $0568/$0588/$05A8/$05C8 (4 组精灵计数清零)
   * 渲染部分 (影子 OAM/直接 OAM/组计数) 实现在 view.spriteClear()。
   */
  initHelper(): void {
    this._render.spriteClear();
  }

  /** 别名: $9B7F PPU 初始化 — 与 initHelper() 相同 */
  ppuInit(): void {
    this.initHelper();
  }

  // ──────────────────────────────────────────────
  // $99F0: 未知初始化 (被 entryB $82AF 调用)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $99F0: 调色板渐隐 (fade-out to black)。
   * 被 entryB $82AF 等调用, 在切场景前把画面渐隐到黑。
   * asm ($99F0-$9A0C):
   *   $99F0: LDA $004A; $99F2: ORA $004B
   *   $99F4: BEQ $9A0C (RTS)  → 双计数器都 0 则退出
   *   $99F6: TAX (X= 4A|4B, 恒非零); $99F7: BEQ 不跳
   *   $99F9: DEC $004A
   *   $99FB: LDA $004B; $99FD: BEQ $9A01 (跳过) → 非零则 $99FF DEC $004B
   *   $9A01: JSR $9A71 (渐隐渲染)
   *   $9A04: LDA #$01; JSR $9FA8 (bank 切换, H5 no-op)
   *   $9A09: JMP $99F0 (循环)
   *   $9A0C: RTS
   * H5: 递减 ram_004A/004B, 渐隐渲染由帧合成器依据调色板计数器消费 paletteTable,
   * 每步以 waitVBlank() 标记帧边界。
   */
  unknownInit(): void {
    const s = this._store;
    let a = s.read('ram_004A');
    let b = s.read('ram_004B');
    while ((a | b) !== 0) {
      a = (a - 1) & 0xFF;      // $99F9 DEC $004A (X 恒非零故必执行)
      if (b !== 0) {           // $99FD BEQ 跳过
        b = (b - 1) & 0xFF;    // $99FF DEC $004B
      }
      s.write('ram_004A', a);
      s.write('ram_004B', b);
      // $9A01 JSR $9A71 (渐隐渲染) + $9A04 bank 切换 no-op → 帧边界
      this.waitVBlank();
    }
  }

  // ──────────────────────────────────────────────
  // $9F69: 数据写入辅助
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9F69: 数据写入辅助 (调度器栈帧构建)。
   * asm:
   *   $9F69: STA $0002,X      → ram_000X+2 = A
   *   $9F6B: DEY; $9F6C: DEY  → Y -= 2
   *   $9F6D: LDA $0000,X      → 取 ram_000X+0
   *   $9F6F: STA $0101,Y      → 写入栈区 $0101+Y
   *   $9F72: LDA $0001,X      → 取 ram_000X+1
   *   $9F74: STA $0102,Y      → 写入栈区 $0102+Y
   *   $9F77: STY $0001,X      → ram_000X+1 = Y
   *   $9F79: LDA #$FF
   *   $9F7B: STA $0000,X      → ram_000X+0 = 0xFF
   *   $9F7D: RTS
   * 用于在零页 ($0000,X) 构造一个"调度器返回帧"并保存到栈区 $0100 段。
   *
   * @param a 待写入 ram_000X+2 的值
   * @param y 初始 Y (调用前由调用方设置, 如 sceneParamSet 用 0xA0)
   * @param x 零页基址索引 (zp[X], 调用方设置, 如 sceneParamSet 用 0x0D)
   */
  dataWriteHelper(a: number, y: number, x: number): void {
    const s = this._store;
    const zp = (off: number) => `ram_00${(off & 0xFF).toString(16).padStart(2, '0').toUpperCase()}`;
    // $9F69: STA $0002,X
    s.write(zp(x + 2), a & 0xFF);
    // $9F6B/$9F6C: DEY; DEY
    const yy = (y - 2) & 0xFF;
    // $9F6D: LDA $0000,X ; $9F6F: STA $0101,Y
    const v0 = s.read(zp(x));
    // $9F72: LDA $0001,X ; $9F74: STA $0102,Y
    const v1 = s.read(zp(x + 1));
    const abs = (off: number) => `ram_${(off & 0xFFFF).toString(16).padStart(4, '0').toUpperCase()}`;
    s.write(abs(0x0101 + yy), v0);
    s.write(abs(0x0102 + yy), v1);
    // $9F77: STY $0001,X
    s.write(zp(x + 1), yy);
    // $9F79: LDA #$FF ; $9F7B: STA $0000,X
    s.write(zp(x), 0xFF);
  }

  // ──────────────────────────────────────────────
  // Bank 02 共享调用 ($8895/$8920/$8976/$9A0D/$98EA/
  //                  $9F89/$9F96/$9B91/$9FA8)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8895: 设置场景参数 + 数据指针。
   * 汇编:
   *   STA ram_0057; LDX #$0D; LDA #$A8; STA ram_0000,X
   *   LDA #$88; STA ram_0001,X; LDY #$A0; LDA #$00
   *   JSR $9F69 (dataWriteHelper(0x00, 0xA0)); RTS
   *
   * @param a 场景参数 (写入 ram_0057)
   */
  sceneParamSet(a: number): void {
    const s = this._store;
    s.write('ram_0057', a & 0xFF);
    s.write('ram_000D', 0xA8);
    s.write('ram_000E', 0x88);
    // asm $8895: LDX #$0D; ... LDY #$A0; LDA #$00; JSR $9F69
    this.dataWriteHelper(0x00, 0xA0, 0x0D);
  }

  /**
   * 对应原始 $8920: 场景数据加载 (读取 19 字节到 ram_0079/007B..)。
   * asm ($8920-$895C):
   *   $8920: LDX #$13
   *   $8922: JSR $9DEE        → 16-bit 乘法 ram_00EC/00ED = A * 0x13
   *   $8925-$8930: ram_00EC/00ED += $BF00  (CPU 地址, bank06)
   *   $8932-$8938: 切 bank06 (LDX #$06 → JSR $C4B9, H5 no-op)
   *   $893B: LDA $0078; $893D: BNE (等待 ram_0078==0)
   *   $893F-$8948: ram_0079 = data[0]; ram_007A = 0
   *   $894B-$8955: 循环 18 次 (X=$12): ram_007B+Y = data[Y], Y=1..18
   *   $8957-$895C: 恢复原 bank (H5 no-op); RTS
   * 数据源: bank06 CPU $BF00 + A*0x13 = bank06 偏移 $1F00 + A*0x13 (ROM 已内嵌)。
   * 19 字节结果: ram_0079, ram_007A(=0), ram_007B..ram_008C。
   *
   * @param param 数据组编号 (A)
   */
  tableLoad(param: number): void {
    const s = this._store;
    // 计算 bank06 数据偏移 (CPU $BF00 = bank06 偏移 $1F00)
    const off = (0x1F00 + (param & 0xFF) * 0x13) & 0x1FFF;
    // $8941: ram_0079 = data[0]
    s.write('ram_0079', PRG_BANK_06[off] ?? 0);
    // $8948: ram_007A = 0
    s.write('ram_007A', 0);
    // $894B-$8955: ram_007B+Y = data[Y], Y=1..18 (X=0x12 次)
    for (let y = 1; y <= 0x12; y++) {
      const zpOff = 0x7B + y;
      const key = `ram_00${zpOff.toString(16).padStart(2, '0').toUpperCase()}`;
      s.write(key, PRG_BANK_06[off + y] ?? 0);
    }
  }

  /**
   * 对应原始 $8976: 数据源切换。
   * 汇编: 4D/4E → EA/EB; E6=2; E7=X; E8=Y; 4D=$E5; 4E=0;
   *   JSR $9085 (文本 buffer); 恢复 4D/4E。
   *
   * @param x 参数 → ram_00E7
   * @param y 参数 → ram_00E8
   */
  dataSourceSwitch(x: number, y: number): void {
    const s = this._store;
    s.write('ram_00EA', s.read('ram_004D'));
    s.write('ram_00EB', s.read('ram_004E'));
    s.write('ram_00E6', 2);
    s.write('ram_00E7', x & 0xFF);
    s.write('ram_00E8', y & 0xFF);
    s.write('ram_004D', 0xE5);
    s.write('ram_004E', 0x00);
    this.paletteWriteBuf([]);
    s.write('ram_004D', s.read('ram_00EA'));
    s.write('ram_004E', s.read('ram_00EB'));
  }

  /**
   * 对应原始 $9A0D: 帧计数器等待 (调色板渐显推进)。
   * 汇编: ram_004A != 0 时 DEC + JSR $9A71 + JSR $9FA8(1) + 循环。
   * 渐显推进委托 view.fadeWait()。
   */
  waitCounter(): void {
    this._render.fadeWait();
  }

  // ──────────────────────────────────────────────
  // $82A9 / $82B5 / $899A: 主菜单/脚本转移等待与状态复位 (业务)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $82A9: 等待脚本/文本转移完成。
   * 汇编 ($82A9-$82B4):
   *   $82A9: LDA #$01; JSR $9FA8            (切 bank 1, H5 no-op)
   *   $82AE: LDA $004D; ORA $004E
   *   $82B2: BNE $82A9                       (ram_004D|004E != 0 时循环等待)
   *   $82B4: RTS
   * 用于菜单逻辑等待文本 buffer 指针 (ram_004D/004E) 被 NMI 消费完毕。
   * H5: 单步等待, 由帧循环驱动; ram_004D/004E 清零即转移完成。
   */
  waitScriptTransfer(): void {
    const s = this._store;
    // $82AE: ram_004D | ram_004E != 0 → 继续等待
    while ((s.read('ram_004D') | s.read('ram_004E')) !== 0) {
      // $82B2 BNE 循环 — 帧边界
      this.waitVBlank();
    }
  }

  /**
   * 对应原始 $82B5: 等待文本转移完成并复位一组显示状态变量。
   * 汇编 ($82B5-$82EC):
   *   $82B5: LDA #$01; JSR $9FA8            (切 bank 1, H5 no-op)
   *   $82BA: LDA $004D; ORA $004E
   *   $82BE: BEQ $82C6                       (4D|4E==0 直接跳复位)
   *   $82C0: LDA $001E; AND #$20
   *   $82C4: BEQ $82B5                       (等待 ram_001E bit5)
   *   $82C6: 清 ram_0005/0006/0009/000A/0011/0012/000D/000E/004C
   *   $82DA: ram_0700 = 1
   *   $82DF: JSR $9BA0                       (waitVBlank)
   *   $82E2: 清 ram_0044/0045/007A/007B
   *   $82EC: RTS
   */
  waitTransferThenReset(): void {
    const s = this._store;
    // $82BA-$82C4: 等 ram_004D/004E 转移完成
    this.waitScriptTransfer();
    // $82C6-$82D8: 复位一组状态变量
    s.write('ram_0005', 0);
    s.write('ram_0006', 0);
    s.write('ram_0009', 0);
    s.write('ram_000A', 0);
    s.write('ram_0011', 0);
    s.write('ram_0012', 0);
    s.write('ram_000D', 0);
    s.write('ram_000E', 0);
    s.write('ram_004C', 0);
    // $82DA: ram_0700 = 1 (精灵组标志)
    s.write('ram_0700', 1);
    // $82DF: waitVBlank
    this.waitVBlank();
    // $82E2-$82EA: 复位滚动/位置变量
    s.write('ram_0044', 0);
    s.write('ram_0045', 0);
    s.write('ram_007A', 0);
    s.write('ram_007B', 0);
  }

  /**
   * 对应原始 $899A: 设置 ram_0099 转移控制标志。
   * 汇编 ($899A-$89A2):
   *   $899A: LDA $0099; AND #$80; ORA #$40; STA $0099
   * 保留 bit7 (EOR 用之), 置 bit6 (当前文本块正在转移)。
   */
  setTransferFlag99(): void {
    const s = this._store;
    const v = s.read('ram_0099');
    s.write('ram_0099', (v & 0x80) | 0x40);
  }

  // ──────────────────────────────────────────────
  // $8464: 脚本加载器 (含 $8494 dataWriteHelper(0, 0x50, 0x05) 调用点)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8464: 按脚本 ID 加载脚本 (启动脚本分派器)。
   *
   * asm 流程 ($8464-$84C3):
   *   $8464-$8471: 查脚本 ID 映射表 ($8AEE 阈值 / $8AED 目标 bank)
   *                 → 得到目标 bank 与 ID 相对基址的差值 (A)
   *   $8474-$847D: A<<1 + 进位 → 脚本入口指针 = $A000 + A*2
   *   $847F: ram_0056 = 目标 bank
   *   $8481-$8483: ram_00ED = ram_0025 (当前 bank)
   *   $8488-$8492: 读脚本入口表 16 位指针 → ram_004D/004E = 脚本起始地址
   *   $8494-$84A2: 构建调度器返回帧 → dataWriteHelper(0x00, 0x50, 0x05)
   *                 (zp[5]={0xC5,0x84} 已先写入, 见下)
   *   $84A5-$84A9: 清 ram_000D/000E
   *   $84AB: 清 ram_0652
   *   $84B0-$84BE: ppuFill98EA 填充 $23E0-$23FF 属性区为 $55
   *   $84C1-$84C3: 恢复原 bank (H5 no-op)
   *
   * 脚本 ID → bank 映射 (与 script-opcodes.getScriptBank 一致):
   *   <0x10 → bank 3 | <0x20 → bank 4 | <0x60 → bank 5 | else → bank 6
   *
   * H5: 脚本内容已由 scripts-bank-03..06.ts 自动生成并通过 getScriptData 读取,
   *     此方法忠实还原 $8464 的调度器栈帧构建与状态复位副作用。
   *
   * @param id 脚本 ID (A)
   */
  scriptLoader(id: number): void {
    const s = this._store;

    // $8477/$847D: 脚本入口表指针 = $A000 + A*2 (bank 由 getScriptBank 决定)
    const bank = getScriptBank(id & 0xFF);
    // $847F: ram_0056 = 目标 bank
    s.write('ram_0056', bank & 0xFF);
    // $8481-$8483: ram_00ED = ram_0025 (H5: 记录原 bank 无意义, no-op 语义保留)
    s.write('ram_00ED', s.read('ram_0025'));

    // $8488-$8492: 读脚本入口指针 → ram_004D/004E
    // (H5: 由 getScriptData 解析出的首块地址代替原始 ROM 指针表)
    const script = getScriptData(id & 0xFF);
    const startAddr = script?.entryAddr ?? '$A000';
    const entry = parseInt(startAddr.replace('$', ''), 16) || 0xA000;
    s.write('ram_004D', entry & 0xFF);
    s.write('ram_004E', (entry >> 8) & 0xFF);

    // $8494-$8496: LDX #$05; LDA #$C5; STA $0000,X  → zp[5] 低 = $C5
    // $849A-$849C: LDA #$84; STA $0001,X           → zp[6] 高 = $84
    s.write('ram_0005', 0xC5);
    s.write('ram_0006', 0x84);
    // $849E-$84A2: LDY #$50; LDA #$00; JSR $9F69  → dataWriteHelper(0x00, 0x50, 0x05)
    this.dataWriteHelper(0x00, 0x50, 0x05);

    // $84A5-$84A9: 清 ram_000D/000E
    s.write('ram_000D', 0);
    s.write('ram_000E', 0);
    // $84AB: 清 ram_0652
    s.write('ram_0652', 0);

    // $84B0-$84BE: ram_00E6=$E0, ram_00E7=$23, Y=1, X=$20, A=$55
    //              → ppuFill98EA 填充 $23E0-$23FF 属性区为 $55
    s.write('ram_00E6', 0xE0);
    s.write('ram_00E7', 0x23);
    this.ppuFill98EA(1, 0x20, 0x55);

    // $84C1-$84C3: LDX $00ED; JMP $C4B9 — 恢复原 bank (H5 no-op)
  }

  /**
   * 对应原始 $98EA: PPU 块填充 (把 A 填充到 ram_00E6/00E7 指向的 VRAM 区域)。
   * asm ($98EA-$992B, 渐隐计数非零分支):
   *   $98EC: LDA $004A; ORA $004B; BEQ $992C (直接写 $2006/$2007 分支)
   *   $98F2: STY $00E8 (行数); STX $00E9 (每行字节数)
   *   $98F6 循环: JSR $9B28 (PPU buffer 分配) → LDA $00EB; STA $05E8,X × 每行字节数
   *             → JSR $9B5E (buffer 结束) → 地址 += $20 → DEC $00E8 → BNE
   *   $992C (渐隐计数为 0): 直接写 $2006/$2007 每行 X 字节 + $20 行步进。
   * H5: 目标 VRAM 地址 = (ram_00E7<<8)|ram_00E6, 行数=Y, 每行字节数=X, 值=A。
   * 渲染部分 (映射到 nt0/nt1 网格) 委托 view.ppuFillRegion()。
   * 调用示例 ($84BE): ram_00E6=$E0, ram_00E7=$23, Y=1, X=$20, A=$55
   *                  → 填充 NT0 属性区 $23E0-$23FF。
   *
   * @param y 行数
   * @param x 每行字节数
   * @param a 填充值
   */
  ppuFill98EA(y: number, x: number, a: number): void {
    const s = this._store;
    const vramAddr = ((s.read('ram_00E7') << 8) | s.read('ram_00E6')) & 0xFFFF;
    this._render.ppuFillRegion(vramAddr, y & 0xFF, x & 0xFF, a & 0xFF);
  }

  /**
   * 对应原始 $9F89: OAM 终止判定。
   * 汇编: ram_0001,X != 0 且 ram_0000,X == 0 → ram_0000,X = 1。
   *
   * @param x zp 索引
   */
  oamTerm89(x: number): void {
    const s = this._store;
    if (s.read(ramKey(0x0000 + x)) !== 0) {
      if (s.read(ramKey(0x0001 + x)) === 0) {
        s.write(ramKey(0x0000 + x), 1);
      }
    }
  }

  /**
   * 对应原始 $9F96: OAM 终止处理。
   * 汇编: ram_0000,X == 0xFF → JSR $9FA8(1); 然后 ram_0000,X = 0。
   *
   * @param x zp 索引
   */
  oamTerm96(x: number): void {
    const s = this._store;
    // $9F96: ram_0000,X == 0xFF 时原 JSR $9FA8(1) (bank 切换, H5 no-op) 已省略
    s.write(ramKey(0x0000 + x), 0);
  }

  /**
   * 对应原始 $9B91: OAM 区域标志清零 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.oamFlagClear()。
   */
  oamFlagClear(): void {
    this._render.oamFlagClear();
  }

  // ──────────────────────────────────────────────
  // $9BA0: 等待 VBlank
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9BA0: 等待 NMI 标志 → 设 $E6=$00, $E7=$00 → RTS。
   * 渲染部分 (帧同步标记) 实现在 view/bank00/Bank00RenderView.waitVBlank()。
   */
  waitVBlank(): void {
    this._render.waitVBlank();
  }

  // ──────────────────────────────────────────────
  // $9EED: 主循环入口
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9EED: LDX #$02 → JSR $C4B9 → JMP $A203。
   * 永不退出的帧循环入口。Bank 02 $A21B 最后 JMP 此处。
   * H5: 启动帧循环 → 标记首帧 VBlank 已就绪。
   */
  mainLoop(): void {
    this._running = true;
    // 首帧即允许 update() 进入 $801F 场景初始化
    this.setVBlankFlag();
  }

  /** 主循环是否运行中 */
  get isRunning(): boolean { return this._running; }

  // ──────────────────────────────────────────────
  // 每帧更新 (Bank 00 帧循环核心)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 Bank 00 帧循环: $8017 → $801F → ... 状态机。
   * 每帧调用。
   *
   * $801F 入口逻辑:
   *   1. 等待 VBlank (bit4)
   *   2. 若 ram_1B bit0 == 0，执行完整场景初始化 (调色板/场景/VRAM/PPU)
   *   3. 置 ram_1B bit0 = 1，后续帧跳过
   *
   * @param buttons 当前帧按键 bitmask
   * @returns 场景是否变更
   */
  update(buttons: number): boolean {
    if (!this._running) return false;

    this._frameCount++;

    const frameFlag = this._store.read(FRAME_FLAG);

    // 等待 VBlank 标志
    if ((frameFlag & 0x10) === 0) {
      return false;
    }

    // ── $801F: 场景初始化链入口 ──
    this.sceneInitEntry();

    // 场景流转由 BootService 场景路由器接管 (BOOT/TITLE/MEETING/MATCH)
    return false;
  }

  // ──────────────────────────────────────────────
  // PPU Buffer 操作
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B28: PPU Buffer 空间分配 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.ppuBufAlloc()。
   *
   * @param size 需要分配的字节数
   * @returns 可写入的缓冲区偏移
   */
  ppuBufAlloc(size: number): number {
    return this._render.ppuBufAlloc(size);
  }

  /**
   * 对应原始 $9B5E: PPU Buffer 结束标记 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.ppuBufEnd()。
   */
  ppuBufEnd(): void {
    this._render.ppuBufEnd();
  }

  /**
   * 写单个字节到 PPU Buffer (渲染部分)。
   */
  ppuBufWrite(offset: number, value: number): void {
    this._render.ppuBufWrite(offset, value);
  }

  // ──────────────────────────────────────────────
  // $84C1: Bank 02 跳转表分发
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $84C1: Bank 02 跳转表分发。
   * 查表跳转到 Bank 02 的不同入口 ($A003/$A006/$A009/$A00C/$A00F/$A012/$A015/$A018)。
   * H5: 记录入口索引，由调用方直接调用 Bank02Service 对应方法。
   */
  bank02Dispatch(index: number): void {
    // H5 逻辑记录键 (对应 MMC3 $84C1 bank 切换后的入口索引, 无真实 RAM 地址)
    this._store.write('bank02_entry', index);
  }

  // ──────────────────────────────────────────────
  // $801F: 场景初始化链入口
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $801F: 等待 VBlank → 清 PPU Buffer → 检查 ram_1B bit0 → 场景初始化。
   *
   * 这是 Bank00 主循环每帧都会进入的入口。首帧 ram_1B bit0 == 0，会触发完整初始化：
   *   - NT + Attribute 清零 ($9B11)
   *   - 调色板初始化 ($8297, A=0x0D)
   *   - 场景描述加载 ($8AF7, A=0x17 = Tecmo Theater)
   *   - VRAM 地址/滚动设置 ($890C, A=0x30)
   *   - PPU 寄存器设置 ($88FB)
   * 然后置 ram_1B bit0 = 1，后续帧跳过。
   */
  sceneInitEntry(): void {
    this.waitVBlank();

    // 清零 PPU Buffer (渲染部分)
    this._render.ppuBufClear();

    // $801F 核心分支: ram_1B bit0 == 0 时执行完整场景初始化
    const ram1b = this._store.read(RAM_1B);
    if ((ram1b & 0x01) === 0) {
      this._doFullSceneInit();
      this._store.write(RAM_1B, ram1b | 0x01);
    }
  }

  /**
   * 完整场景初始化 ($801F → 新场景):
   *   NT+Attr 清零 → 文本 buffer → 场景加载 → VRAM → PPU 寄存器
   */
  private _doFullSceneInit(): void {
    // JSR $9B11: NT + Attribute 清零
    this.ntAttrClear();

    // JSR $8297: 文本 buffer 参数设置 (A=0x0D, 非调色板)
    this.paletteInit(0x0D);

    // STA $7B = 0: 滚动/显示状态变量清零
    this._store.write('ram_007B', 0);

    // JSR $8AF7: 场景描述加载 (A=0x17, Tecmo Theater)
    this.sceneLoad(0x17);

    // JSR $890C: VRAM 地址/滚动设置 (A=0x30)
    this.vramAddrSetup(0x30);

    // JSR $88FB: PPU 寄存器设置
    this.ppuRegSetup();

    // H5: 用 sceneLoad 设置的 ram_0048/0049 加载调色板到 DataStore (原 $9A35 链)
    this.mainLoopInit2();
  }

  // ──────────────────────────────────────────────
  // 辅助: 设置帧状态标志 (供 Bank02 NMI 设置)
  // ──────────────────────────────────────────────

  setVBlankFlag(): void {
    let flag = this._store.read(FRAME_FLAG);
    flag |= 0x10; // bit4 = VBlank 完成
    this._store.write(FRAME_FLAG, flag);
  }

  // ──────────────────────────────────────────────
  // 辅助: 读取场景数据
  // ──────────────────────────────────────────────

  getSceneId(): number {
    return this._store.read(SCENE_ID);
  }
}
