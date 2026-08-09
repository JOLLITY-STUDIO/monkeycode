/**
 * Bank 02 Service — 场景控制器 / RESET 入口
 *
 * CPU 映射: $A000-$BFFF (MMC3 R7 select)
 * PRG offset: 0x004010-0x00600F
 *
 * 原始 $A200: JMP $A21B (3 字节跳板)
 * 原始 $A21B: RESET 后首个业务入口 — 初始化完毕后 JMP $9EED 进入 Bank00 主循环。
 *
 * H5 版本: Bank 02 是普通 Service 对象，持有 Bank00 引用，
 * 直接调用 bank00 方法完成初始化，不需要 MMC3/R6/R7/地址映射。
 */

import { DataStore } from '../data/DataStore';
import { Bank00Service } from './bank00.service';

// ── 常量 ──

/** ram_001B 标志位 */
const BIT_NMI_ENABLE = 0x80; // bit7

// ═══════════════════════════════════════════════════════════════
// Bank 02 Service
// ═══════════════════════════════════════════════════════════════

export class Bank02Service {
  constructor(
    private _store: DataStore,
    private _bank00: Bank00Service,
  ) {}

  // ── 公开接口 ──

  get store(): DataStore { return this._store; }
  get bank00(): Bank00Service { return this._bank00; }

  // ──────────────────────────────────────────────
  // $A200 → $A21B: RESET 入口
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $A200: JMP $A21B
   * 再进入 $A21B: RESET 后首个业务入口。
   *
   * 原始代码 (Bank 02 asm L298-L511, 214 bytes):
   * ```
   * A21B: LDX #$FF; TXS              // 重置栈
   *       PHA                        // 保存入口参数 A
   *       LDA #$00; STA $A000        // H5: 无操作(不是模拟器)
   *       ORA $001B,#$40; STA $001B  // 设 bit6 标志
   *       // 清零 $FF19+$E8 区域
   *       LDA #$00; LDY #$E8; STA $FF19,Y; INY; BNE LOOP
   *       // 清零 $FFE0+$5A 区域
   *       LDA #$00; LDY #$5A; STA $FFE0,Y; INY; BNE LOOP
   *       // 设参数: A=$98; X=$02; Y=$68 → $EC=$68
   *       LDA #$98; LDX #$02; LDY #$68; STY $EC; LDY #$04
   *       JSR $AA06                  // Bank 02 内部函数
   *       // 填充 $0F 到 $054A+$E0~$FF 区域
   *       LDA #$0F; LDY #$E0; STA $054A,Y; INY; BNE LOOP
   *       JSR $9A43                  // Bank00 主循环初始化
   *       STA $4A,$4B=0              // 清零 PPU Buffer 指针
   *       JSR $98A0                  // Bank00 NT 清零
   *       JSR $9B7F                  // Bank00 未知初始化
   *       STA $8F,$91=2              // 状态变量=2
   *       PLA                        // 恢复入口参数
   *       BEQ $8281                  // A=0 → 快速路径(仅设ZP指针)
   *       // A≠0: 完整初始化路径
   *       LDX #$01; LDA #$FF→$01; LDA #$7F→$02
   *       LDY #$28; LDA #$00; JSR $9F69
   *       JMP $A292                  // → 继续调色板/场景初始化
   * ```
   *
   * RESET 时 Bank30 $C400 传入 A=0，走快速路径 → JMP $9EED 进主循环。
   * 场景初始化($8297 调色板、$8AF7 场景)在主循环中由 Bank00 $801F 单独触发。
   *
   * @param a 入口参数 (RESET: A=0)
   */
  resetEntry(a: number = 0): void {
    // 对应 $821B-$826B: 通用初始化(无论A=0与否都执行)
    this._doCommonInit(a);
  }

  // ──────────────────────────────────────────────
  // 通用初始化: $821B-$826B (A 分支前的部分)
  // ──────────────────────────────────────────────

  private _doCommonInit(a: number): void {
    const s = this._store;

    // 对应 8224: ORA $001B,#$40 → 设置标志
    let ram1b = s.read('ram_1B');
    ram1b |= 0x40;
    s.write('ram_1B', ram1b);

    // 对应 822A-8233: 清零 $FF19+$E8 区域 (24 bytes)
    // H5: 语义化为 key "temp_A0_xx"
    for (let y = 0xE8; y <= 0xFF; y++) {
      s.write(`temp_A0_${y.toString(16)}`, 0);
    }

    // 对应 8234-823D: 清零 $FFE0+$5A 区域 (166 bytes)
    // H5: 语义化为 key "temp_E0_xx"
    for (let y = 0x5A; y <= 0xF9; y++) {
      s.write(`temp_E0_${y.toString(16)}`, 0);
    }

    // 对应 823E-8247: 设参数 A=$98, X=2, Y=$68 → $EC=$68 → LDY #4
    s.write('ram_00EC', 0x68);

    // 对应 8248: JSR $AA06 — Bank 02 内部函数(调色板/CHR init)
    this._internalAA06();

    // 对应 824B-8254: 填充 $0F 到 $054A+$E0~$FF 区域
    for (let y = 0xE0; y <= 0xFF; y++) {
      s.write(`ram_${(0x054A + y).toString(16)}`, 0x0F);
    }

    // 对应 8255: JSR $9A43 — Bank00 主循环初始化 part1
    this._bank00.mainLoopInit1();

    // 对应 825A: STA $4A,$4B=0 — 清零 PPU Buffer 指针
    s.write('ram_004A', 0);
    s.write('ram_004B', 0);

    // 对应 825E: JSR $98A0 — Bank00 NT 清零
    this._bank00.ntClear();

    // 对应 8261: JSR $9B7F — Bank00 未知初始化
    this._bank00.initHelper();

    // 对应 8264-8265: LDA #$02; STA $8F; STA $91 — 状态变量=2
    s.write('ram_008F', 0x02);
    s.write('ram_0091', 0x02);

    // 对应 826A: PLA — 恢复入口 A
    // 对应 826B: BEQ $8281 — 分支
    if (a === 0) {
      this._onAEqualToZero();
    } else {
      this._onANotZero();
    }
  }

  // ──────────────────────────────────────────────
  // A=0 快速路径: $8281-$82AC
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8281-$82AC (A=0 分支):
   * 设置 ZP 指针 → 开 NMI → JMP $9EED 进入主循环。
   *
   * 不执行调色板/场景初始化。这些在主循环内按需触发。
   */
  private _onAEqualToZero(): void {
    const s = this._store;

    // 对应 $8281-$828A: X=$01 → A=$1E → STA $0001 → A=$80 → STA $0002
    s.write('ram_0001', 0x1E);
    s.write('ram_0002', 0x80);

    // 对应 $828B-$8290: Y=$28; A=$00 → JSR $9F69
    this._bank00.dataWriteHelper(0x00);
    s.write('ram_000Y', 0x28); // Y parameter

    // 对应 $8292-$82A1: X=$15 → A=$EC → STA $0015 → A=$82 → STA $0016 → Y=$F0 → JSR $9F69
    s.write('ram_0015', 0xEC);
    s.write('ram_0016', 0x82);
    this._bank00.dataWriteHelper(0x00);
    s.write('ram_000Y', 0xF0); // Y parameter

    // 对应 $82A3-$82A9: ORA $0020,#$80 → STA $0020 → STA $2000 (开 NMI)
    let ppuctrl = s.read('ppuctrl');
    ppuctrl |= BIT_NMI_ENABLE;
    s.write('ppuctrl', ppuctrl);
    // $2000 write → H5: 设 PPUCTRL 镜像
    s.write('ppuctrl_hw', ppuctrl);

    // 对应 $82AC: JMP $9EED → 进入主循环
    this._bank00.mainLoop();
  }

  // ──────────────────────────────────────────────
  // A≠0 完整路径: $826D-$827E → $A292 → ... → $83D5
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $826D-$827E (A≠0 分支) → $A292 → 调色板/场景初始化 → $83D5 JMP $9EED。
   *
   * 完整场景初始化路径，包含:
   *   - $9F69 数据写入
   *   - $8297 调色板初始化
   *   - $8AF7 场景描述加载
   *   - $890C VRAM 地址设置
   *   - $88FB PPU 寄存器设置
   *   - $9A35 主循环初始化
   */
  private _onANotZero(): void {
    const s = this._store;

    // 对应 $826D-$827B: LDX #$01 → $FF/$7F → $0001/$0002 → Y=$28 → JSR $9F69
    s.write('ram_0001', 0xFF);
    s.write('ram_0002', 0x7F);
    this._bank00.dataWriteHelper(0x00);
    s.write('ram_000Y', 0x28);

    // 对应 $827E: JMP $A292 — 跳转到 $A292 继续
    // $A292 部分代码调用:
    //   JSR $8297 (Bank00 调色板, A=sceneIndex)
    //   JSR $8AF7 (Bank00 场景加载, A=sceneId)
    //   JSR $890C (Bank00 VRAM设置, A=0x30)
    //   JSR $88FB (Bank00 PPU 设置)
    //   JSR $9A35 (Bank00 主循环初始化)
    //   JMP $9EED (Bank00 主循环)
    this._doFullSceneInit();
  }

  /**
   * 完整场景初始化 ($A292 → $83D5):
   *   调色板 → 场景加载 → VRAM → PPU → 主循环
   */
  private _doFullSceneInit(): void {
    const bk00 = this._bank00;

    // $8297: 调色板初始化 (根据当前状态选 palIdx)
    // A=0x0D for Tecmo Theater → 从 ROM 场景数据获取实际值
    bk00.paletteInit(0x0D);

    // $8AF7: 场景描述加载 (A=scene_id)
    // scene=0x17 (Tecmo Theater) → 切 Bank07 → 读场景指针表
    bk00.sceneLoad(0x17);

    // $890C: VRAM 地址/滚动设置 (A=0x30)
    bk00.vramAddrSetup(0x30);

    // $88FB: PPU 寄存器设置
    bk00.ppuRegSetup();

    // $9A35: 主循环初始化
    bk00.mainLoopInit2();

    // $83D5: JMP $9EED → 进入主循环
    bk00.mainLoop();
  }

  // ──────────────────────────────────────────────
  // $AA06: Bank 02 内部函数 (调色板/CHR 初始化)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $AA06: 调色板/CHR 初始化入口。
   * 被 $821B (RESET) 和 $8A06 (跳转入口) 调用。
   * Bank 02 asm L1623-L1638 (16 bytes)。
   * 具体功能待从汇编完全翻译。
   */
  private _internalAA06(): void {
    // 参数: A=$98, X=2, Y=4, EC=$68
    // 具体功能待翻译
    // 根据 Bank 02 analysis: AA06 是调色板/CHR 相关的跳转入口
  }

  // ──────────────────────────────────────────────
  // $A203/$A206/$A209/$A20C/$A20F/$A212/$A215/$A218: Bank02 入口点
  // ──────────────────────────────────────────────

  /**
   * Bank 02 的多个入口点，对应 $A200+ 的 JMP 跳板。
   * Bank 00 $84C1 通过这些入口分发到不同的 Bank02 子程序。
   */

  /** 入场 A: $A203 → 对应原始 JMP $XXX */
  entryA(): void {
    // 场景入场 A — 待翻译
  }

  /** 入场 B: $A206 */
  entryB(): void {
    // 待翻译
  }

  /** 入场 C: $A209 */
  entryC(): void {
    // 待翻译
  }

  /** 入场 D: $A20C ($820C → $A20C 跳板) */
  entryD(): void {
    // 对应 Bank 02 分析: 场景入口D
  }

  /** 入场 E: $A20F ($820F → $A20F 跳板) */
  entryE(): void {
    // 待翻译
  }

  /** 入场 F: $A212 ($8212 → $A212 跳板) */
  entryF(): void {
    // 待翻译
  }

  /** 入场 G: $A215 ($8215 → $A215 跳板) */
  entryG(): void {
    // 待翻译
  }

  /** 入场 H: $A218 */
  entryH(): void {
    // 待翻译
  }
}
