/**
 * Bank 02 Service — 场景控制器 / RESET 入口
 *
 * 原始 PRG 数据已直接 import (rom-data/prg-bank-02.ts)，无 MMC3 bank 切换。
 * Bank 02 是普通 Service 对象，持有 Bank00 引用，直接调用 bank00 方法完成初始化。
 *
 * 原始 $A200: JMP $A21B (3 字节跳板)
 * 原始 $A21B: RESET 后首个业务入口 — 初始化完毕后 JMP $9EED 进入 Bank00 主循环。
 */

import { DataStore } from '../data/prg/DataStore';
import { Bank00Service } from './bank00/bank00_core.service';
import type { Bank30Service } from './bank30_init.service';
import {
  SCROLL_DX,
  SCROLL_DY,
  PW_OAM_FIX,
  FIELD_TILES,
  FIELD_KIND,
  SCENE_SCRIPT,
  SPRITE_UPLOAD,
  SPRITE_UPLOAD2,
} from '../data/bank02-tables';

// ── 常量 ──

/** 真实 RAM 键 (4 位大写补零, 与全库 ram_XXXX 约定一致, 防断链) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

/** ram_001B 标志位 */
const BIT_NMI_ENABLE = 0x80; // bit7

/** $A773-$A776 — handler[16] 子程序 $A767 的拷贝源 (→ ram_03E8-$03EB) */
const SPRITE_TAIL_A677: readonly number[] = [0x79, 0xFF, 0x03, 0xC2];

/** $A777-$A77A — handler[16] $A6F9 循环的拷贝源 (→ ram_0460-$0463) */
const SPRITE_TAIL_A67B: readonly number[] = [0x46, 0xF6, 0x02, 0x52];

/**
 * $AADF 滚动 delta 表 (Bank02 ROM offset $4AEF, 0x40 字节)。
 * 交错存储: 偶数下标 = X delta ($AADF,Y), 奇数下标 = Y delta ($AAE0,Y)。
 * 由 $8308/$8312 (LDA $AADF,Y / LDA $AAE0,Y) 以 Y 步进 2 读取。
 */
const SCROLL_DELTA: readonly number[] = [
  0x10, 0x00, 0x10, 0x00, 0x40, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x04, 0x00, 0x0E, 0x00, 0x1C, 0x00,
  0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0xF0, 0xFF, 0xE0, 0xFF, 0x80, 0xFF,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x04, 0x00, 0x0E, 0x00, 0x1C, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
];

// ═══════════════════════════════════════════════════════════════
// Bank 02 Service
// ═══════════════════════════════════════════════════════════════

export class Bank02Service {
  constructor(
    private _store: DataStore,
    private _bank00: Bank00Service,
    private _bank30?: Bank30Service,
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
    let ram1b = s.read('ram_001B');
    ram1b |= 0x40;
    s.write('ram_001B', ram1b);

    // 对应 822A-8233: STA $FF19,Y (Y=$E8-$FF) → 地址环绕到零页 $0001-$0018
    // (6502: $FF19+$E8=$10001→16bit 截断=$0001; $FF19+$FF=$10018→$0018)
    for (let y = 0xE8; y <= 0xFF; y++) {
      s.write(ramKey((0xFF19 + y) & 0xFFFF), 0);
    }

    // 对应 8234-823D: STA $FFE0,Y (Y=$5A-$FF) → 地址环绕到零页 $003A-$00DF
    for (let y = 0x5A; y <= 0xFF; y++) {
      s.write(ramKey((0xFFE0 + y) & 0xFFFF), 0);
    }

    // 对应 823E-8247: 设参数 A=$98, X=2, Y=$68 → $EC=$68 → LDY #4
    s.write('ram_00EC', 0x68);
    s.write('ram_00ED', 0x04);

    // 对应 8248: JSR $AA06 — 清零 (ram_00EC) 指向的 $98×2=304 字节
    this._internalAA06();

    // 对应 824B-8254: STA $054A,Y (Y=$E0-$FF) → 填充 $0F 到 $062A-$0649
    for (let y = 0xE0; y <= 0xFF; y++) {
      s.write(ramKey(0x054A + y), 0x0F);
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
   * 对应原始 $8281-$828F (A=0 分支):
   *   LDX #$01; LDA #$1E → ram_0001; LDA #$80 → ram_0002;
   *   LDY #$28; LDA #$00; JSR $9F69 → dataWriteHelper(0x00, 0x28)
   * 然后落入 $8292 共享块。
   */
  private _onAEqualToZero(): void {
    const s = this._store;

    // 对应 $8281-$828A
    s.write('ram_0001', 0x1E);
    s.write('ram_0002', 0x80);

    // 对应 $828B-$828F: LDX #$01 基址, Y=$28; JSR $9F69
    this._bank00.dataWriteHelper(0x00, 0x28, 0x01);

    // 落入 $8292 共享块
    this._doShared8292();
  }

  // ──────────────────────────────────────────────
  // A≠0 完整路径: $826D-$827E → $A292 → ... → $83D5
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $826D-$827E (A≠0 分支):
   *   LDX #$01; LDA #$FF → ram_0001; LDA #$7F → ram_0002;
   *   LDY #$28; LDA #$00; JSR $9F69 → dataWriteHelper(0x00, 0x28)
   *   JMP $A292 → $8292 共享块。
   */
  private _onANotZero(): void {
    const s = this._store;

    // 对应 $826D-$827B
    s.write('ram_0001', 0xFF);
    s.write('ram_0002', 0x7F);
    this._bank00.dataWriteHelper(0x00, 0x28, 0x01);

    // 对应 $827E: JMP $A292
    this._doShared8292();
  }

  /**
   * 对应原始 $8292-$82AC (A=0/A≠0 两条路径的共享收尾):
   *   X=$15; A=$EC → ram_0015; A=$82 → ram_0016;
   *   Y=$F0; JSR $9F69 → dataWriteHelper(0x00, 0xF0);
   *   ram_0020 |= $80 → ppuctrl (开 NMI);
   *   JMP $9EED → 主循环。
   *
   * 场景初始化(调色板/场景)在主循环首帧由 Bank00 $801F 触发。
   */
  private _doShared8292(): void {
    const s = this._store;

    // 对应 $8292-$82A0: X 基址 = $15 (.byte $A2,$15 即 LDX #$15)
    s.write('ram_0015', 0xEC);
    s.write('ram_0016', 0x82);
    this._bank00.dataWriteHelper(0x00, 0xF0, 0x15);

    // 对应 $82A3-$82A9: ORA $0020,#$80 → STA $0020 → STA $2000 (开 NMI)
    const ppuctrl = (s.read('ram_0020') | BIT_NMI_ENABLE) & 0xFF;
    s.write('ram_0020', ppuctrl);
    s.write('ppuctrl', ppuctrl); // PPU $2000 控制器 (硬件寄存器镜像)

    // 对应 $82AC: JMP $9EED → 进入主循环
    this._bank00.mainLoop();
  }

  // ──────────────────────────────────────────────
  // $AA06: Bank 02 内部清零函数 (=$8A06)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $AA06 (=$8A06): 清零 (ram_00EC) 指向的 A 字节, 重复 X 次。
   * 汇编:
   *   STY ram_00ED; INX; LDY #$00; PHA
   *   循环: LDA #$00; STA (ram_00EC),Y; INC EC; BNE +2; INC ED
   *         PLA; SEC; SBC #$01; BNE 循环; DEX; BNE 循环; RTS
   *
   * 调用约定 (RESET/entryB): A=$98, X=2, EC=$68, Y=4 → ED=$04
   * → 清零 $0468 起 304 字节 ($98×2)。
   */
  private _internalAA06(): void {
    const s = this._store;
    const base = (s.read('ram_00ED') << 8) | s.read('ram_00EC');
    // 参数 A=$98 × X=2 = 304 字节
    const count = 0x98 * 2;
    for (let i = 0; i < count; i++) {
      s.write(ramKey(base + i), 0);
    }
  }

  // ──────────────────────────────────────────────
  // $A203/$A206/$A209/$A20C/$A20F/$A212/$A215: Bank02 入口点
  //
  // 这些是 Bank00 $84C1 调用分发到 Bank02 的入口，
  // 对应原始 Bank02 $8200+ JMP 跳板表。
  // CPU 地址: $A203(entryB), $A206(entryC), $A209(unused),
  //           $A20C(entryD), $A20F(entryE), $A212(entryF), $A215(entryG)
  //
  // 原始 asm line 285-294:
  //   $8200: JMP $A21B  (entryA — resetEntry)
  //   $8203: JMP $A2AF  (entryB — 密码/选择初始化)
  //   $8206: JMP $A2E8  (entryC — 场景滚动/密码逻辑)
  //   $820C: JMP $A855  (entryD — 场地生成)
  //   $820F: JMP $A86E  (entryE — 场地块填充)
  //   $8212: JMP $A484  (entryF — 跳转表分发器)
  //   $8215: JMP $A8CE  (entryG — OAM精灵数据复制)
  //   $8218: (unaccessed dead code,原为 JMP $A8FE)
  // ──────────────────────────────────────────────

  /**
   * 入场 B: $8203 → $A2AF (asm L368-392, ~25 bytes)
   * 密码/选择画面初始化。
   *
   * 流程:
   *   1. Bank00 初始化三连 ($99F0 + $98A0 + $9B7F)
   *   2. 关 NMI (AND #$7F on ram_0020 → $2000/$E000)
   *   3. 清零临时区 + 设参数
   *   4. JSR $AA06 (内部初始化)
   *   5. JMP $C557 → Bank30 场景控制器
   */
  entryB(): void {
    const s = this._store;
    // 82AF: JSR $99F0
    this._bank00.unknownInit();
    // 82B2: JSR $98A0 — NT 清零
    this._bank00.ntClear();
    // 82B5: JSR $9B7F — PPU 初始化
    this._bank00.ppuInit();

    // 82B8-82C3: 关 NMI
    let ppuctrl = s.read('ram_0020') & 0x7F;
    s.write('ram_0020', ppuctrl);
    s.write('ppuctrl', ppuctrl); // PPU $2000 控制器 (硬件寄存器镜像)

    // 82C4-82D6: 清零临时区域
    this._zeroTempAreas();

    // 82D8-82E2: 设 A=$98,X=2,Y=$68→$EC=$68,Y=4 → JSR $AA06
    s.write('ram_00EC', 0x68);
    s.write('ram_00ED', 0x04);
    this._internalAA06();

    // 82E5: JMP $C557 → Bank30 场景控制器
    this._jumpToBank30SceneCtrl();
  }

  /**
   * 入场 C: $8206 → $A2E8 (asm L393-511, ~119 bytes)
   * 场景选择 / 镜头滚动 / 密码逻辑。
   *
   * 读取 ram_0057 作为选择器，处理摄像机滚动动画。
   * 特殊值 ram_0057=$81 触发密码逻辑。
   *
   * @param sceneParam ram_0057 的值
   */
  entryC(sceneParam?: number): void {
    const s = this._store;
    const param = sceneParam ?? s.read('ram_0057');

    // 82EA: BMI $8338 — bit7 检查
    if (param & 0x80) {
      // $8338-$833A: CMP #$81 / BEQ $83A3
      if (param === 0x81) {
        this._entryC_passwordPath(); // $83A3 密码特殊路径
      } else {
        this._entryC_oamSlotPath();  // $833C 普通负值路径
      }
      return;
    }

    // 82EC: STA ram_00ED
    s.write('ram_00ED', param);

    // 82EE-82F6: STA $FFEC,Y (Y=$FA-$FF) → 地址环绕到零页 $00E6-$00EB
    for (let y = 0xFA; y <= 0xFF; y++) {
      s.write(ramKey((0xFFEC + y) & 0xFFFF), 0);
    }

    // 82F8: 原 JSR $9FA8(1) — H5 no-op 已省略
    // 82FD-8335: 摄像机滚动处理 (5 组 delta)
    // 原 $8335 JMP $A2F8 是帧驱动死循环, H5 单次执行完成镜头位移
    this._entryC_scrollLoop();
  }

  /**
   * 入场 D: $820C → $A855
   * 场地生成主流程 (sub_85DC, ~196 bytes)
   * 负责绘制足球场背景 tile。
   */
  entryD(): void {
    // $820C: JMP $A855 → sceneTile loader ($8855-$88B6)
    this._sceneTileLoader8855();
  }

  /**
   * 入场 E: $820F → $A86E
   * sceneTile loader 的区间分发入口 ($886E-$887A)。
   */
  entryE(): void {
    this._sceneTileLoader886E();
  }

  /**
   * 入场 F: $8212 → $A484 ($8484)
   * 跳转表分发器 (asm L684-691, 8 bytes)
   *
   * 原始代码:
   *   LDA ram_00ED; ASL; TAX
   *   LDA $A492,X; PHA  (push hi)
   *   LDA $A491,X; PHA  (push lo)
   *   RTS               (= JMP to target)
   *
   * 跳转表 (24 entries, D1=CDL标记已访问):
   *   [0] $A4C0, [1] $A559, [2] $A57B, [3] $A581(unused),
   *   [4] $A5A2, [5] $A5A8, [6] $A5B0,
   *   [7] $A5B8(unused), [8] $A5BF(unused), [9] $A5CD(unused),
   *   [10] $A5DB, [11] $A5E8, [12] $A602, [13] $A61C,
   *   [14] $A629, [15] $A650, [16] $A69C, [17] $A77A, [18] $A782,
   *   [19] $A78D(unused), [20] $A7BD, [21] $A7CE, [22] $A7D6,
   *   [23] $A7FA(unused)
   *
   * @param ed ram_00ED 跳转索引
   * @returns 处理器返回的状态码 (原始 LDA #$02/$03 的 A 值)
   */
  entryF(ed?: number): number {
    const index = ed ?? this._store.read('ram_00ED');
    switch (index) {
      case 0:  return this._jumpHandler_00_A4C0();
      case 1:  return this._jumpHandler_01_A559();
      case 2:  return this._jumpHandler_02_A57B();
      case 3:  return this._jumpHandler_03_A581();
      case 4:  return this._jumpHandler_04_A5A2();
      case 5:  return this._jumpHandler_05_A5A8();
      case 6:  return this._jumpHandler_06_A5B0();
      case 7:  return this._jumpHandler_07_A5B8();
      case 8:  return this._jumpHandler_08_A5BF();
      case 9:  return this._jumpHandler_09_A5CD();
      case 10: return this._jumpHandler_10_A5DB();
      case 11: return this._jumpHandler_11_A5E8();
      case 12: return this._jumpHandler_12_A602();
      case 13: return this._jumpHandler_13_A61C();
      case 14: return this._jumpHandler_14_A629();
      case 15: return this._jumpHandler_15_A650();
      case 16: return this._jumpHandler_16_A69C();
      case 17: return this._jumpHandler_17_A77A();
      case 18: return this._jumpHandler_18_A782();
      case 19: return this._jumpHandler_19_A78D();
      case 20: return this._jumpHandler_20_A7BD();
      case 21: return this._jumpHandler_21_A7CE();
      case 22: return this._jumpHandler_22_A7D6();
      default: return this._jumpHandler_23_A7FA(); // 23
    }
  }

  /**
   * 入场 G: $8215 → $A8CE
   * OAM 精灵数据复制到 $0200 (sub_882F 相关，~102 bytes)
   */
  entryG(): void {
    this._oamDataCopy();
  }

  /**
   * 入场 H: $8218 → $A8FE (未使用，死代码)
   */
  entryH(): void {
    // CDL 标记为 unaccessed，死代码
  }

  // ════════════════════════════════════════════
  // 内部: 共享工具
  // ════════════════════════════════════════════

  /** 清零临时变量区 ($FF19+$E8→$0001-$0018 和 $FFE0+$5A→$003A-$00DF) — 被 entryB 和 resetEntry 调用 */
  private _zeroTempAreas(): void {
    const s = this._store;
    for (let y = 0xE8; y <= 0xFF; y++) s.write(ramKey((0xFF19 + y) & 0xFFFF), 0);
    for (let y = 0x5A; y <= 0xFF; y++) s.write(ramKey((0xFFE0 + y) & 0xFFFF), 0);
  }

  /** Bank30 $C557: 场景控制器入口 ($82E5: JMP $C557) */
  private _jumpToBank30SceneCtrl(): void {
    if (this._bank30) {
      this._bank30.sceneCtrl557();
    }
    // TODO: Bank30 $C557 场景控制器 — 未注入 bank30 时保持占位
  }

  // ════════════════════════════════════════════
  // Entry C 辅助
  // ════════════════════════════════════════════

  /** 摄像机滚动循环 ($8303-$8333): 5组delta应用到ram_00E6/ram_007A */
  private _entryC_scrollLoop(): void {
    const s = this._store;
    let ec = s.read('ram_00EC');
    let y = s.read('ram_00ED');
    while (ec < 0x0F) {
      const xIdx = (y & 0x0F) >> 1;
      const dx = this._readTable_AADF(y);
      const dy = this._readTable_AAE0(y);
      // scroll X (零页 $00E6/$00E7)
      const keyE6 = ramKey(0xE6 + xIdx);
      s.write(keyE6, (s.read(keyE6) + dx) & 0xFF);
      // scroll Y 16-bit signed add (零页 $007A+ec)
      const key7a = ramKey(0x7A + ec);
      const key7b = ramKey(0x7B + ec);
      const lo = s.read(key7a) + dy;
      const signExt = dy < 0 ? 0xFF : 0x00;
      const carry = (lo > 0xFF || lo < 0) ? 1 : 0;
      s.write(key7a, lo & 0xFF);
      s.write(key7b, (s.read(key7b) + signExt + carry) & 0xFF);
      y += 2; ec += 3;
      s.write('ram_00EC', ec);
    }
  }

  /** $AADF 表: 滚动 X delta — 偶数下标 (Y 步进 2), 越界返回 0 */
  private _readTable_AADF(offset: number): number {
    if (offset < 0 || offset >= SCROLL_DELTA.length) return 0;
    return SCROLL_DELTA[offset];
  }

  /** $AAE0 表: 滚动 Y delta — $AADF 的奇数下标 (Y 步进 2), 越界返回 0 */
  private _readTable_AAE0(offset: number): number {
    const i = offset + 1;
    if (i < 0 || i >= SCROLL_DELTA.length) return 0;
    return SCROLL_DELTA[i];
  }

  /** $833C-$83A0: 普通负值路径 — OAM 精灵槽位初始化 (33 槽 × 4 属性) + 坐标修正循环 */
  private _entryC_oamSlotPath(): void {
    const s = this._store;
    // $833C-$8340: LDX #$67; LDA #$05; JSR $C4BD — MMC3 bank 选择
    //   ($8000=$05|ram_0022 → ram_0023; $8001=$67; H5: no-op)
    if (this._bank30) {
      this._bank30.bankSelect(0x05, 0x67);
    }
    // $8343-$8348: LDA #$00; STA ram_00ED; TAY; LDX #$78
    s.write('ram_00ED', 0);
    let y = 0;
    // $834A-$8370: 填充 ram_0468..046B (33 槽, X=$78..$FB 步进 4) — 经 oamShadow 接口
    for (let x = 0x78; x < 0xFC; x += 4) {
      // $834A-$8350: ram_0469,X = (ram_00EC & $01) | $F2
      // $8353-$8355: ram_046A,X = $03
      // $8358-$835F: ram_0468,X = Y; Y += 3
      // $8360-$8368: ram_046B,X = ram_00EC; ram_00EC += $0D
      const ec = s.read('ram_00EC');
      s.oamShadow.writeSlot(x, y & 0xFF, (ec & 0x01) | 0xF2, 0x03, ec);
      y = (y + 3) & 0xFF;
      s.write('ram_00EC', (ec + 0x0D) & 0xFF);
    }
    // $8372-$8375: 原 LDA #$01; JSR $9FA8 — 帧推进 (H5 no-op)
    // $8379-$839E: 坐标修正循环 (33 槽) — 依据 PW_OAM_FIX($AB1F) 表
    //   Y = X & $0C; limit=$AB1F,Y; xDelta=$AB21,Y; yDelta=$AB22,Y
    for (let x = 0x78; x < 0xFC; x += 4) {
      const yIdx = x & 0x0C;
      let a = s.oamShadow.readByte(x);
      // $837D-$8385: CMP $AB1F,Y; BCC $8387; LDA #$00 → a >= limit ? 0 : a
      if (a >= (PW_OAM_FIX[yIdx] ?? 0)) a = 0;
      // $8387-$838B: ADC $AB21,Y → a += xDelta
      a = (a + (PW_OAM_FIX[yIdx + 2] ?? 0)) & 0xFF;
      s.oamShadow.writeByte(x, a);
      // $838E-$8395: LDA ram_046B,X; ADC $AB22,Y → y += yDelta
      const b = (s.oamShadow.readByte(x + 3) + (PW_OAM_FIX[yIdx + 3] ?? 0)) & 0xFF;
      s.oamShadow.writeByte(x + 3, b);
    }
    // $83A0: JMP $A372 — 原帧驱动死循环, H5 单次执行
  }

  /** $83A3-$83D5: 密码逻辑 — ram_0057=$81 特殊处理 */
  private _entryC_passwordPath(): void {
    const s = this._store;
    // $83A3-$83A8: ram_0568 |= $10
    s.write('ram_0568', s.read('ram_0568') | 0x10);
    // $83AB-$83AD: 原 LDA #$04; JSR $9FA8 (H5 no-op)
    // $83B0-$83B2: ram_0044 = $08; ram_0046 = $08
    s.write('ram_0044', 0x08);
    s.write('ram_0046', 0x08);
    // $83B6-$83BC: ram_056D -= 4
    s.write('ram_056D', (s.read('ram_056D') - 4) & 0xFF);
    // $83BF-$83C1: 原 LDA #$04; JSR $9FA8 (H5 no-op)
    // $83C4-$83CA: ram_0044 = $00; ram_0046 = $F8
    s.write('ram_0044', 0x00);
    s.write('ram_0046', 0xF8);
    // $83CC-$83D2: ram_056D += 4
    s.write('ram_056D', (s.read('ram_056D') + 4) & 0xFF);
    // $83D5: JMP $A3AB — 后续场景逻辑 (TODO: $A3AB 待翻译)
  }

  // ════════════════════════════════════════════
  // Entry D/E — 场地生成
  // ════════════════════════════════════════════

  /**
   * $8855: sceneTile loader — 入场 D ($820C→$A855→$8855)
   *
   * ram_00E4 < ram_0026 时按 ram_0026 值分发:
   *   $00/$0C → $887C (X=$00), $06 → $8884 (X=$0C), $10 → $888C (X=$18),
   *   其余 → $A8A8 (仅尾段)。
   */
  private _sceneTileLoader8855(): void {
    const s = this._store;
    const v26 = s.read('ram_0026');
    // $8855-$8859: LDA ram_00E4; CMP ram_0026; BCS $88A8
    if (s.read('ram_00E4') >= v26) {
      this._sceneTileTail88A8();
      return;
    }
    if (v26 === 0x00 || v26 === 0x0C) {
      this._sceneTileCore(0x00, false);   // $887C: X=$00
    } else if (v26 === 0x06) {
      this._sceneTileCore(0x0C, false);   // $8884: X=$0C
    } else if (v26 === 0x10) {
      this._sceneTileCore(0x18, true);    // $888C: X=$18 + OAM 拷贝
    } else {
      this._sceneTileTail88A8();          // $886B: JMP $A8A8
    }
  }

  /**
   * $886E: sceneTile 区间分发 — 入场 E ($820F→$A86E→$886E)
   *
   *   ram_0026 < $06 → $887C (X=$00)
   *   $06 ≤ ram_0026 < $0C → $8884 (X=$0C)
   *   $0C ≤ ram_0026 < $10 → 落空 $887C (X=$00)
   *   ram_0026 ≥ $10 → $888C (X=$18 + OAM 拷贝)
   */
  private _sceneTileLoader886E(): void {
    const v26 = this._store.read('ram_0026');
    if (v26 < 0x06) {
      this._sceneTileCore(0x00, false);       // BCC $887C
    } else if (v26 < 0x0C) {
      this._sceneTileCore(0x0C, false);       // BCC $8884
    } else if (v26 >= 0x10) {
      this._sceneTileCore(0x18, true);        // BCS $888C
    } else {
      this._sceneTileCore(0x00, false);       // 落空 $887C
    }
  }

  /**
   * $887C-$88B6 共享核心:
   *   $A8B7: 11 项 FIELD_TILES → ram_0300 (stride $0C)
   *   $8893: (可选) 10 项 → ram_0408 (stride $04)
   *   $88A3: ram_002C = FIELD_TILES[X]
   *   $88A8/$88AF: ram_002A/002B 尾段
   */
  private _sceneTileCore(startX: number, copyOam: boolean): void {
    const s = this._store;
    let x = startX;
    // $A8B7: LDA #$0B; STA ram_00ED; LDY #$00; 循环 Y<0x84, stride $0C
    s.write('ram_00ED', 0x0B);
    for (let addr = 0x0300; addr < 0x0384; addr += 0x0C) {
      s.write(ramKey(addr), this._readFieldTiles(x++));
    }
    if (copyOam) {
      // $8893-$88A1: 循环 Y<0x28, stride $04 → ram_0408
      for (let addr = 0x0408; addr < 0x0430; addr += 0x04) {
        s.write(ramKey(addr), this._readFieldTiles(x++));
      }
    }
    // $88A3-$88A6: LDA $AA47,X → ram_002C
    s.write('ram_002C', this._readFieldTiles(x));
    this._sceneTileTail88A8();
  }

  /**
   * $88A8-$88B6 尾段 (X 不再使用):
   *   $88A8: LDX ram_0026; LDA $AA75,X → ram_002A
   *   $88AF: LDA ram_0026; ADC #$03 → ram_002B
   */
  private _sceneTileTail88A8(): void {
    const s = this._store;
    const v26 = s.read('ram_0026');
    s.write('ram_002A', this._readFieldKind(v26));
    s.write('ram_002B', (v26 + 3) & 0xFF);
  }

  /** $AA47 FIELD_TILES 表读取 (越界返回 0) */
  private _readFieldTiles(i: number): number {
    if (i < 0 || i >= FIELD_TILES.length) return 0;
    return FIELD_TILES[i];
  }

  /** $AA75 FIELD_KIND 表读取 (越界返回 0) */
  private _readFieldKind(i: number): number {
    if (i < 0 || i >= FIELD_KIND.length) return 0;
    return FIELD_KIND[i];
  }

  /**
   * sub_85DC: 场景初始化 (足球场入口) — 13 bytes
   * ```
   * $85DC: LDA #$00; JSR $8895  // sceneParamSet(0x00)
   * $85E1: LDA #$05; JSR $8920  // tableLoad(5)
   * $85E6: LDA #$02; RTS        // 返回 2
   * ```
   * 与 handler[10] ($A5DB) 逻辑相同 (共享子程序)。
   */
  private _fieldGenerationMain(): number {
    this._bank00.sceneParamSet(0x00);
    this._bank00.tableLoad(5);
    return 2;
  }

  /**
   * sub_877B: 场地块填充入口 — 7 bytes
   * ```
   * $877B: LDA #$80; JSR $8895  // sceneParamSet(0x80)
   * $8780: LDA #$02; RTS        // 返回 2
   * ```
   */
  private _fieldTileFill(): number {
    this._bank00.sceneParamSet(0x80);
    return 2;
  }

  // ════════════════════════════════════════════
  // Entry F — 跳转表处理器 (24 handlers)
  // 对应 $8484 dispatch table, CDL D1=accessed
  // 跳转表存目标 T, 分发 RTS 使 PC = T+1, 故代码从 T+1 开始。
  // ════════════════════════════════════════════

  /**[0]$A4C0 D1 — 场景动画初始化链 ($A4C1 起), 返回 2 */
  private _jumpHandler_00_A4C0(): number {
    const s = this._store;

    // $A4C1: JSR $9A0D — 帧计数器等待
    this._bank00.waitCounter();
    // $A4C4: 原 LDA #$10; JSR $9FA8 (H5 no-op)

    // $A4C9-$A4D6: LDY #$30 循环 48 次 { LDA #$01; JSR $890C; DEY; BNE }
    for (let y = 0x30; y > 0; y--) {
      this._bank00.vramAddrSetup(1);
    }

    // $A4D8-$A4DC: LDA #$00; STA ram_005B; STA ram_007B
    s.write('ram_005B', 0);
    s.write('ram_007B', 0);

    // $A4DE: LDA #$17; JSR $8AF7 — 场景描述加载
    this._bank00.sceneLoad(0x17);

    // $A4E3-$A4E5: LDA #$68 → ram_0044
    s.write('ram_0044', 0x68);

    // $A4E7: LDA #$03; JSR $8920
    this._bank00.tableLoad(3);

    // $A4EC-$A4F2: ram_0090 = ram_008E; ram_0091 = ram_008F
    s.write('ram_0090', s.read('ram_008E'));
    s.write('ram_0091', s.read('ram_008F'));

    // $A4F4: 原 LDA #$04; JSR $9FA8 (H5 no-op)
    // $A4F9: JSR $9A35 — 主循环初始化 part2
    this._bank00.mainLoopInit2();
    // $A4FC: JSR $88FB — PPU 寄存器设置
    this._bank00.ppuRegSetup();

    // $A4FF-$A513: 循环 { JSR $9FA8(1); INC ram_0079; DEC ram_007C×2;
    //   ram_0044 -= 2; CMP #$03; BCS } — ram_0044 ≥ 3 时继续
    for (;;) {
      s.write('ram_0079', (s.read('ram_0079') + 1) & 0xFF);
      s.write('ram_007C', (s.read('ram_007C') - 1) & 0xFF);
      s.write('ram_007C', (s.read('ram_007C') - 1) & 0xFF);
      const v44 = (s.read('ram_0044') - 2) & 0xFF;
      s.write('ram_0044', v44);
      if (v44 < 3) break; // BCS $A4FF 取反
    }

    // $A515: LDA #$00; JSR $8920
    this._bank00.tableLoad(0);

    // $A51A-$A51E: ram_001B |= 0x01
    s.write('ram_001B', s.read('ram_001B') | 0x01);

    // $A520-$A527: 原 LDA #$F0 / #$3C; JSR $9FA8 ×2 (H5 no-op)
    // $A52A-$A52E: ram_001B &= 0xFE
    s.write('ram_001B', s.read('ram_001B') & 0xFE);

    // $A530-$A536: LDA #$00 → ram_0090; LDA #$02 → ram_0091
    s.write('ram_0090', 0);
    s.write('ram_0091', 2);

    // $A538-$A53E: JSR $99F0; JSR $9B7F; JSR $98A0
    this._bank00.unknownInit();
    this._bank00.ppuInit();
    this._bank00.ntClear();
    // ⚠️ H5 顺序修正: ROM 中 $8AF7 (sceneLoad) 是业务初始化不写 NT,
    // NT 由渲染链写入。此处 ntClear 会清掉 sceneLoad(0x17) 的 loadSceneNT,
    // 故按 ROM 最终显示语义在清屏后重新写入 Cut 0x17 背景 (标题/密码共用背景)。
    this._bank00.renderSceneNT(0x17);

    // $A541-$A547: LDA #$C0 → ram_00E6; LDA #$23 → ram_00E7 (PPU 地址 $23C0)
    s.write('ram_00E6', 0xC0);
    s.write('ram_00E7', 0x23);

    // $A549-$A54F: LDY #$02; LDX #$20; LDA #$55; JSR $98EA — PPU 块填充
    this._bank00.ppuFill98EA(0x02, 0x20, 0x55);

    // $A552: LDA #$01; JSR $8920
    this._bank00.tableLoad(1);

    // $A557-$A559: LDA #$02; RTS
    return 2;
  }

  /**[1]$A559 D1 — $A55A: ram_00EC → 16-bit ram_0060/0061 (符号取负由 ram_0062 bit7 决定), 返回 3 */
  private _jumpHandler_01_A559(): number {
    const s = this._store;
    const ec = s.read('ram_00EC');
    // $A55A-$A566: LDA #$00; STA ram_0060; LDA ram_00EC; LSR; ROR ram_0060; LSR; ROR ram_0060; STA ram_0061
    // → ram_0061:ram_0060 = ram_00EC << 6 (16-bit)
    let lo = (((ec & 0x02) << 7) | ((ec & 0x01) << 6)) & 0xFF; // ram_0060
    let hi = (ec >> 2) & 0xFF;                                 // ram_0061
    // $A568-$A577: BIT ram_0062; BMI $8579 — bit7 清则 16-bit 取负
    if ((s.read('ram_0062') & 0x80) === 0) {
      const loOrig = lo;
      lo = (0 - lo) & 0xFF;
      hi = (0 - hi - (loOrig !== 0 ? 1 : 0)) & 0xFF;
    }
    s.write('ram_0060', lo);
    s.write('ram_0061', hi);
    // $A579-$A57B: LDA #$03; RTS
    return 3;
  }

  /**[2]$A57B D1 — $A57C: JSR $9B91 (OAM 区域标志清零), 返回 2 */
  private _jumpHandler_02_A57B(): number {
    this._bank00.oamFlagClear();
    return 2;
  }

  /**[3]$A581 -- (CDL unaccessed, 死代码) */
  private _jumpHandler_03_A581(): number { return 2; }

  /**[4]$A5A2 -- $A5A3: JSR $9B7F (PPU 初始化), 返回 2 */
  private _jumpHandler_04_A5A2(): number {
    this._bank00.ppuInit();
    return 2;
  }

  /**[5]$A5A8 D1 — $A5A9: LDX #$09; JSR $9F96 (OAM 终止处理), 返回 2 */
  private _jumpHandler_05_A5A8(): number {
    this._bank00.oamTerm96(9);
    return 2;
  }

  /**[6]$A5B0 D1 — $A5B1: LDX #$09; JSR $9F89 (OAM 终止判定), 返回 2 */
  private _jumpHandler_06_A5B0(): number {
    this._bank00.oamTerm89(9);
    return 2;
  }

  /**[7]$A5B8 -- (CDL unaccessed, 死代码) */
  private _jumpHandler_07_A5B8(): number { return 2; }

  /**[8]$A5BF -- (CDL unaccessed, 死代码) */
  private _jumpHandler_08_A5BF(): number { return 2; }

  /**[9]$A5CD -- (CDL unaccessed, 死代码) */
  private _jumpHandler_09_A5CD(): number { return 2; }

  /**[10]$A5DB D1 — $A5DC: JSR $8895(0); JSR $8920(5), 返回 2 */
  private _jumpHandler_10_A5DB(): number {
    this._bank00.sceneParamSet(0x00);
    this._bank00.tableLoad(5);
    return 2;
  }

  /**[11]$A5E8 D1 — $A5E9: ram_000D==0 → $8895($10)+$8920(6), 否则清 ram_000D/000E, 返回 2 */
  private _jumpHandler_11_A5E8(): number {
    const s = this._store;
    if (s.read('ram_000D') === 0) {
      this._bank00.sceneParamSet(0x10);
      this._bank00.tableLoad(6);
    } else {
      s.write('ram_000D', 0);
      s.write('ram_000E', 0);
    }
    return 2;
  }

  /**[12]$A602 D1 — $A603: ram_000D==0 → $8895($30)+$8920(8), 否则清 ram_000D/000E, 返回 2 */
  private _jumpHandler_12_A602(): number {
    const s = this._store;
    if (s.read('ram_000D') === 0) {
      this._bank00.sceneParamSet(0x30);
      this._bank00.tableLoad(8);
    } else {
      s.write('ram_000D', 0);
      s.write('ram_000E', 0);
    }
    return 2;
  }

  /**[13]$A61C D1 — $A61D: JSR $8895($20); JSR $8920(7), 返回 2 */
  private _jumpHandler_13_A61C(): number {
    this._bank00.sceneParamSet(0x20);
    this._bank00.tableLoad(7);
    return 2;
  }

  /**[14]$A629 D1 — $A62A: 数据源切换 + 主循环初始化 + 精灵属性清理, 返回 2 */
  private _jumpHandler_14_A629(): number {
    const s = this._store;
    // $A62A-$A62E: LDX #$BD; LDY #$23; JSR $8976 — 数据源切换
    this._bank00.dataSourceSwitch(0xBD, 0x23);
    // $A631: JSR $9A35 — 主循环初始化 part2
    this._bank00.mainLoopInit2();
    // $A634-$A636: 原 LDA #$01; JSR $9FA8 (H5 no-op)
    // $A639-$A63E: ram_058F &= $7F
    s.write('ram_058F', s.read('ram_058F') & 0x7F);
    // $A641-$A643: LDA #$82 → ram_004C
    s.write('ram_004C', 0x82);
    // $A645-$A64B: LDY #$28; LDX #$20; LDA #$C8; JSR $A82F
    this._subA82F(0xC8, 0x20, 0x28);
    // $A64E-$A650: LDA #$02; RTS
    return 2;
  }

  /**[15]$A650 D1 — $A651: $AA97 (SCENE_SCRIPT) 精灵上传循环, 返回 2 */
  private _jumpHandler_15_A650(): number {
    const s = this._store;
    // $A651: LDA #$00; STA ram_00ED — ED 从 0 开始
    let ed = 0;
    s.write('ram_00ED', 0);
    const table = SCENE_SCRIPT; // $AA97
    // $A655 循环: 每轮读 3 字节 (flags/count/value), 直到 flags bit7 置位
    while (ed + 2 < table.length) {
      const flags = table[ed] ?? 0;         // ram_00EA
      const eb0 = flags & 0x7F;             // ram_00EB (临时)
      // LDA ram_007B; AND #$01; ASL; ASL; ORA ram_00EB; TAX
      const x = (((s.read('ram_007B') & 0x01) << 2) | eb0) & 0xFF;
      const count = table[ed + 1] ?? 0;     // ram_00EB (分配大小)
      ed += 3;
      s.write('ram_00ED', ed & 0xFF);       // STY ram_00ED

      // $A676: LDY ram_00EB; JSR $9B28 — PPU buffer 空间分配
      const alloc = this._bank00.ppuBufAlloc(count);
      const eb = alloc & 0x7F;              // AND #$7F; STA ram_00EB

      // $A681-$A687: 清 ram_05E8+X 起 EB 字节 (PPU buffer 区)
      for (let i = 0; i < eb; i++) {
        s.write(ramKey(0x05E8 + x + i), 0);
      }
      // $A689: JSR $9B5E — PPU buffer 结束标记
      this._bank00.ppuBufEnd();

      s.write('ram_00EA', flags);
      s.write('ram_00EB', eb);

      // $A68C-$A68E: BIT ram_00EA; BMI $A69A — bit7 置位 → 退出返回 2
      if (flags & 0x80) {
        return 2;
      }
      // $A690 BVC $A655 (V 清 → 循环); V 置位路径原 LDA #$02; JSR $9FA8 → 也循环 (H5 no-op)
      if (flags & 0x40) {
        // no-op (原 bank 切换已省略)
      }
    }
    return 2;
  }

  /**[16]$A69C D1 — $A69D: 屏幕精灵数据初始化 (ram_04E5 分支), 返回 2 */
  private _jumpHandler_16_A69C(): number {
    const s = this._store;
    if (s.read('ram_04E5') !== 0xFF) {
      // ── $A69D: ram_04E5 != $FF 分支 ──
      this._subA767();
      // $A6A7-$A6BB: Y=$80; EA=0; X=$2F; ED=$FF; EC=$FE; EB=$07; JSR $A72C($F7)
      s.write('ram_00EA', 0x00);
      s.write('ram_00ED', 0xFF);
      s.write('ram_00EC', 0xFE);
      s.write('ram_00EB', 0x07);
      this._subA72C(0xF7, 0x2F, 0x80);
      // $A6C0-$A6CE: Y=$D8; X=$30; ED=$01; EC=$FF; JSR $A72C($FC)
      s.write('ram_00ED', 0x01);
      s.write('ram_00EC', 0xFF);
      this._subA72C(0xFC, 0x30, 0xD8);
      // $A6D1-$A6D3: LDA #$02; RTS
      return 2;
    }

    // ── $A6D4: ram_04E5 == $FF 分支 ──
    this._subA767();
    // $A6D7-$A6EB: Y=$80; X=$2F; EA=$02; ED=$FF; EC=$FE; EB=$07; JSR $A72C($F7)
    s.write('ram_00EA', 0x02);
    s.write('ram_00ED', 0xFF);
    s.write('ram_00EC', 0xFE);
    s.write('ram_00EB', 0x07);
    this._subA72C(0xF7, 0x2F, 0x80);
    // $A6F0-$A6F4: X=$08; LDA #$FE; JSR $A72C — Y 保持 $80
    this._subA72C(0xFE, 0x08, 0x80);
    // $A6F7-$A700: LDY #$FC 循环 4 次: ram_0460+i = $A67B+FC+i ($A777-$A77A)
    for (let i = 0; i < 4; i++) {
      s.oamShadow.writeTailByte(i, SPRITE_TAIL_A67B[i]);
    }
    // $A702-$A714: Y=$B8; X=$1C; ED=$02; EC=$FF; EB=$03; JSR $A72C($F6)
    s.write('ram_00ED', 0x02);
    s.write('ram_00EC', 0xFF);
    s.write('ram_00EB', 0x03);
    this._subA72C(0xF6, 0x1C, 0xB8);
    // $A717-$A727: Y=$D8..$F0 step 4: ram_046A,Y |= $02
    for (let yi = 0xD8; yi < 0xF0; yi += 4) {
      s.oamShadow.attrOr(yi + 2, 0x02);
    }
    // $A729-$A72B: LDA #$02; RTS
    return 2;
  }

  /**[17]$A77A D1 — $A77B: JSR $8895($80), 返回 2 */
  private _jumpHandler_17_A77A(): number {
    this._bank00.sceneParamSet(0x80);
    return 2;
  }

  /**[18]$A782 D1 — $A783: JSR $9FA8(2); JSR $88FB, 返回 2 */
  private _jumpHandler_18_A782(): number {
    // $A783: 原 JSR $9FA8(2) (H5 no-op)
    this._bank00.ppuRegSetup();
    return 2;
  }

  /**[19]$A78D -- (CDL unaccessed, 死代码) */
  private _jumpHandler_19_A78D(): number { return 2; }

  /**[20]$A7BD D1 — $A7BE: JSR $9FA8(1); Y=$28; X=$64; A=$B0; JSR $A82F, 返回 2 */
  private _jumpHandler_20_A7BD(): number {
    // $A7BE: 原 JSR $9FA8(1) (H5 no-op)
    this._subA82F(0xB0, 0x64, 0x28);
    return 2;
  }

  /**[21]$A7CE D1 — $A7CF: JSR $8895($81), 返回 2 */
  private _jumpHandler_21_A7CE(): number {
    this._bank00.sceneParamSet(0x81);
    return 2;
  }

  /**[22]$A7D6 D1 — $A7D7: OAM 精灵循环 (ram_0468 负值 → ram_046A |= $04), 返回 2 */
  private _jumpHandler_22_A7D6(): number {
    const s = this._store;
    // $A7D7: LDY #$80 外层循环 0x80 次
    for (let outer = 0; outer < 0x80; outer++) {
      // $A7D9: 原 LDA #$01; JSR $9FA8 (H5 no-op)
      // $A7DE-$A7F3: X=$20..$C4 step 4
      for (let x = 0x20; x !== 0xC4; x = (x + 4) & 0xFF) {
        // $A7E0: LDA ram_0468,X; BPL $A7ED — bit7 置位才处理
        if (s.oamShadow.readByte(x) & 0x80) {
          // $A7EC: ram_046A,X |= $04
          s.oamShadow.attrOr(x + 2, 0x04);
        }
      }
    }
    // $A7F8-$A7FA: LDA #$02; RTS
    return 2;
  }

  /**[23]$A7FA -- (CDL unaccessed, 死代码) */
  private _jumpHandler_23_A7FA(): number { return 2; }

  // ── Entry F 共用子程序 ──

  /**
   * 对应原始 $A82F (CPU 01:882F): 精灵 OAM 属性清理。
   * 汇编: A→ram_00EC(结束偏移), X→ram_00ED(起始偏移), Y=行数;
   *   Y 行循环 { LDX start; 循环 { ram_0468,X ≥ $82 时跳过;
   *   ram_046A,X &= $F3; X+=4; 直到 X==end } }
   *
   * @param a 结束偏移 (EC)
   * @param x 起始偏移 (ED)
   * @param y 行数 (Y)
   */
  private _subA82F(a: number, x: number, y: number): void {
    const s = this._store;
    const end = a & 0xFF;
    const start = x & 0xFF;
    for (let row = 0; row < y; row++) {
      let xi = start;
      for (;;) {
        // $A83A: LDA ram_0468,X; CMP #$82; BCS $A849 — ≥$82 跳过
        if (s.oamShadow.readByte(xi) < 0x82) {
          // $A841: ram_046A,X &= $F3
          s.oamShadow.attrAnd(xi + 2, 0xF3);
        }
        xi = (xi + 4) & 0xFF;
        if (xi === end) break; // $A84D: CPX ram_00EC; BNE
      }
    }
  }

  /** 对应原始 $A767 (CPU 01:8767): 拷贝 $A773-$A776 → ram_03E8-$03EB */
  private _subA767(): void {
    const s = this._store;
    // LDY #$FC; 循环: LDA $A677,Y; STA ram_03E8,Y; INY; BNE — 4 字节
    for (let i = 0; i < 4; i++) {
      s.write(ramKey(0x03E8 + i), SPRITE_TAIL_A677[i]);
    }
  }

  /**
   * 对应原始 $A72C (CPU 01:872C): 精灵位置写入。
   * 汇编: A→ram_00E9; X 次循环 {
   *   ram_04E4 += ram_00ED; ram_04E7 += ram_00EC;
   *   若 (ram_04E7 & ram_00EB) != 0 → 跳过存储;
   *   否则 ram_0468/69/6A/6B,Y = 04E4/E9/EA/04E7; Y += 4;
   *   JSR $9FA8(1); DEX; BNE }
   *
   * @param a A 参数 (→ ram_00E9)
   * @param x 循环次数 (X)
   * @param y 精灵缓冲偏移 (Y)
   */
  private _subA72C(a: number, x: number, y: number): void {
    const s = this._store;
    s.write('ram_00E9', a & 0xFF); // $A72C: STA ram_00E9
    for (let i = 0; i < x; i++) {
      // $A72E: ram_04E4 += ram_00ED
      const e4 = (s.oamShadow.readCoordX() + s.read('ram_00ED')) & 0xFF;
      // $A737: ram_04E7 += ram_00EC
      const e7 = (s.oamShadow.readCoordY() + s.read('ram_00EC')) & 0xFF;
      s.oamShadow.writeCoordX(e4);
      s.oamShadow.writeCoordY(e7);
      // $A740: AND ram_00EB; BNE $A75E — 非 0 跳过存储
      if ((e7 & s.read('ram_00EB')) === 0) {
        // $A74B: ram_0468/69/6A/6B,Y = 04E4/E9/EA/04E7
        s.oamShadow.writeSlot(y, e4, a & 0xFF, s.read('ram_00EA'), e7);
        y = (y + 4) & 0xFF; // INY×4
      }
      // $A75E: 原 LDA #$01; JSR $9FA8 (H5 no-op)
    }
  }

  // ════════════════════════════════════════════
  // Entry G — OAM 精灵复制
  // ════════════════════════════════════════════

  /**
   * sub_88CE: OAM 精灵数据复制 → $0200 OAM 缓冲 (64 精灵 × 4 字节)
   *
   * $A8CE 入口本体位于 $A000 窗口的另一 PRG bank (CDL 未追踪到该地址),
   * Bank02 内可达的实质逻辑是 sub_88CE — 将 ram_0468-$0567 精灵表
   * 拷贝到 ram_0200-$02FF OAM 缓冲, 属性 bit2-3 非 0 的精灵置 Y=$F8 (屏外)。
   * ```
   * $88CE: LDA #$01; JSR $9FA8          // 原 bank 切换 (H5 no-op)
   * $88D3: LDY #$00
   * $88D5: LDX ram_0468,Y                // X = tile
   *        LDA ram_046A,Y; AND #$0C      // 属性 bit2-3
   *        BEQ $88E1; LDX #$F8           // 非 0 → Y 坐标 $F8 (屏外隐藏)
   * $88E1: TXA; STA ram_0200,Y           // OAM.Y
   *        LDA ram_0469,Y; STA ram_0201,Y // OAM.tile
   *        LDA ram_046A,Y; STA ram_0202,Y // OAM.attr
   *        LDA ram_046B,Y; STA ram_0203,Y // OAM.X
   *        INY ×4; BNE $88D5             // 256 项循环
   * $88FD: RTS
   * ```
   */
  private _oamDataCopy(): void {
    // $88CE: 原 LDA #$01; JSR $9FA8 (H5 no-op)
    // $88CE-$88FD: 影子 OAM → $0200 硬件 OAM (attr bit2-3 非 0 → Y=$F8)
    this._store.oamShadow.copyToHw();
  }

  /**
   * sub_882F: 精灵属性清理 — 入参 A=结束X, X=起始X, Y=轮次
   * ```
   * $882F: STA ram_00EC (endX); STX ram_00ED (startX)
   * $8833: LDA #$01; JSR $9FA8
   * $8838: LDX ram_00ED
   * $883A: LDA ram_0468,X; CMP #$82; BCS $8849  // tile ≥ $82 跳过
   *        LDA ram_046A,X; AND #$F3; STA ram_046A,X
   * $8849: INX ×4; CPX ram_00EC; BNE $883A
   *        DEY; BNE $8833
   * $8854: RTS
   * ```
   */
  private _sub882F(endX: number, startX: number, passes: number): void {
    const s = this._store;
    for (let p = 0; p < passes; p++) {
      // $8833: 原 LDA #$01; JSR $9FA8 (H5 no-op)
      for (let x = startX; x !== endX; x = (x + 4) & 0xFF) {
        if (s.oamShadow.readByte(x) < 0x82) {
          s.oamShadow.attrAnd(x + 2, 0xF3);
        }
      }
    }
  }
}