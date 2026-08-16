/**
 * Bank 02 Service — 场景控制器 / RESET 入口
 *
 * 原始 PRG 数据已直接 import (rom-data/prg-bank-02.ts)，无 MMC3 bank 切换。
 * Bank 02 是普通 Service 对象，持有 Bank00 引用，直接调用 bank00 方法完成初始化。
 *
 * 原始 $A200: JMP $A21B (3 字节跳板)
 * 原始 $A21B: RESET 后首个业务入口 — 初始化完毕后 JMP $9EED 进入 Bank00 主循环。
 */

import { DataStore } from '../data/DataStore';
import { Bank00Service } from './bank00/bank00_core.service';

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
   *   文本 buffer → 场景加载 → VRAM → PPU → 主循环(真实调色板)
   */
  private _doFullSceneInit(): void {
    const bk00 = this._bank00;

    // $8297: 文本 buffer 参数设置 (A=0x0D, 非调色板)
    // 真实调色板由 $9A35/mainLoopInit2 → paletteLoad 从 bank06 表加载
    bk00.paletteInit(0x0D);

    // $8AF7: 场景描述加载 (A=scene_id) → 设置 ram_0048 = header[2]&0x3F (BG 组号)
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
    s.write('ppuctrl_hw', ppuctrl);

    // 82C4-82D6: 清零临时区域
    this._zeroTempAreas();

    // 82D8-82E2: 设 A=$98,X=2,Y=$68→$EC=$68,Y=4 → JSR $AA06
    s.write('ram_00EC', 0x68);
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
      if (param === 0x81) {
        // 833A: BEQ $83A3 — 密码特殊路径
        this._entryC_passwordPath();
      }
      return;
    }

    // 82EC: STA ram_00ED
    s.write('ram_00ED', param);

    // 82EE-82F6: 清零 $FFEC+$FA (6 bytes)
    for (let y = 0xFA; y <= 0xFF; y++) {
      s.write(`temp_EC_${y.toString(16)}`, 0);
    }

    // 82F8: JSR $9FA8 → 切 Bank 01 (H5: 数据已直接 import，无需切换)

    // 82FD-8335: 摄像机滚动处理 — 最多5组 delta
    s.write('ram_00EC', 0); // 组计数器
    this._entryC_scrollLoop();

    // 8335: JMP $A2F8 → 循环回 $9FA8
    // 在原始代码中这会重新切换 Bank01 并继续处理
    // H5: 直接再跑一次循环
    this._entryC_scrollLoop();
  }

  /**
   * 入场 D: $820C → $A855
   * 场地生成主流程 (sub_85DC, ~196 bytes)
   * 负责绘制足球场背景 tile。
   */
  entryD(): void {
    // 对应 sub_85DC — 场地生成主流程
    this._fieldGenerationMain();
  }

  /**
   * 入场 E: $820F → $A86E
   * 场地块填充 (场地生成辅助, sub_877B 附近)
   */
  entryE(): void {
    this._fieldTileFill();
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
   * 跳转表 (18 entries, D1=CDL标记已访问):
   *   [0] $A4C0, [1] $A559, [2] $A57B, [3] $A581(unused),
   *   [4] $A5A2(unused), [5] $A5A8, [6] $A5B0,
   *   [7] $A5B8(unused), [8] $A5BF(unused), [9] $A5CD(unused),
   *   [10] $A5DB, [11] $A5E8, [12] $A602, [13] $A61C,
   *   [14] $A629, [15] $A650, [16] $A69C, [17] $A77A, [18] $A782
   *
   * @param ed ram_00ED 跳转索引
   */
  entryF(ed?: number): void {
    const index = ed ?? this._store.read('ram_00ED');
    switch (index) {
      case 0:  this._jumpHandler_00_A4C0(); break;
      case 1:  this._jumpHandler_01_A559(); break;
      case 2:  this._jumpHandler_02_A57B(); break;
      case 3:  this._jumpHandler_03_A581(); break;
      case 4:  this._jumpHandler_04_A5A2(); break;
      case 5:  this._jumpHandler_05_A5A8(); break;
      case 6:  this._jumpHandler_06_A5B0(); break;
      case 7:  this._jumpHandler_07_A5B8(); break;
      case 8:  this._jumpHandler_08_A5BF(); break;
      case 9:  this._jumpHandler_09_A5CD(); break;
      case 10: this._jumpHandler_10_A5DB(); break;
      case 11: this._jumpHandler_11_A5E8(); break;
      case 12: this._jumpHandler_12_A602(); break;
      case 13: this._jumpHandler_13_A61C(); break;
      case 14: this._jumpHandler_14_A629(); break;
      case 15: this._jumpHandler_15_A650(); break;
      case 16: this._jumpHandler_16_A69C(); break;
      case 17: this._jumpHandler_17_A77A(); break;
      default: this._jumpHandler_18_A782(); break; // 18
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

  /** 清零临时变量区 ($FF19+$E8 和 $FFE0+$5A) — 被 entryB 和 resetEntry 调用 */
  private _zeroTempAreas(): void {
    const s = this._store;
    for (let y = 0xE8; y <= 0xFF; y++) s.write(`temp_A0_${y.toString(16)}`, 0);
    for (let y = 0x5A; y <= 0xF9; y++) s.write(`temp_E0_${y.toString(16)}`, 0);
  }

  /** Bank30 $C557: 场景控制器入口 (H5: 转发到 Bank30) */
  private _jumpToBank30SceneCtrl(): void {
    // TODO: Bank30 scene controller — 对应的 Bank30 $C557 实现
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
      // scroll X
      s.write(`ram_${(0xE6 + xIdx).toString(16)}`,
        (s.read(`ram_${(0xE6 + xIdx).toString(16)}`) + dx) & 0xFF);
      // scroll Y 16-bit signed add
      const key7a = `ram_${(0x7A + ec).toString(16)}`;
      const key7b = `ram_${(0x7B + ec).toString(16)}`;
      const lo = s.read(key7a) + dy;
      const signExt = dy < 0 ? 0xFF : 0x00;
      const carry = (lo > 0xFF || lo < 0) ? 1 : 0;
      s.write(key7a, lo & 0xFF);
      s.write(key7b, (s.read(key7b) + signExt + carry) & 0xFF);
      y += 2; ec += 3;
      s.write('ram_00EC', ec);
    }
  }

  /** $AADF 表: 滚动X delta (Bank02 PRG offset $4ADF, 具体数据待ROM提取) */
  private _readTable_AADF(_offset: number): number { return 0; }

  /** $AAE0 表: 滚动Y delta */
  private _readTable_AAE0(_offset: number): number { return 0; }

  /** 密码逻辑 ($8338+): ram_0057=$81特殊处理 */
  private _entryC_passwordPath(): void {
    // TODO: 翻译密码/特殊场景逻辑 asm L434-L511
  }

  // ════════════════════════════════════════════
  // Entry D/E — 场地生成
  // ════════════════════════════════════════════

  /** sub_85DC: 场地生成主流程 (~196 bytes) */
  private _fieldGenerationMain(): void {
    // TODO: 翻译 sub_85DC — 足球场tile布局
  }

  /** sub_877B + $A86E: 场地块填充 */
  private _fieldTileFill(): void {
    // TODO: 翻译 sub_877B
  }

  // ════════════════════════════════════════════
  // Entry F — 跳转表处理器 (18 handlers)
  // 对应 $8484 dispatch table, CDL D1=accessed
  // ════════════════════════════════════════════

  /**[0]$A4C0 D1*/ private _jumpHandler_00_A4C0(): void { /* TODO */ }
  /**[1]$A559 D1*/ private _jumpHandler_01_A559(): void { /* TODO */ }
  /**[2]$A57B D1*/ private _jumpHandler_02_A57B(): void { /* TODO */ }
  /**[3]$A581 --*/ private _jumpHandler_03_A581(): void { /* unaccessed */ }
  /**[4]$A5A2 --*/ private _jumpHandler_04_A5A2(): void { /* unaccessed */ }
  /**[5]$A5A8 D1*/ private _jumpHandler_05_A5A8(): void { /* TODO */ }
  /**[6]$A5B0 D1*/ private _jumpHandler_06_A5B0(): void { /* TODO */ }
  /**[7]$A5B8 --*/ private _jumpHandler_07_A5B8(): void { /* unaccessed */ }
  /**[8]$A5BF --*/ private _jumpHandler_08_A5BF(): void { /* unaccessed */ }
  /**[9]$A5CD --*/ private _jumpHandler_09_A5CD(): void { /* unaccessed */ }
  /**[10]$A5DB D1*/ private _jumpHandler_10_A5DB(): void { /* TODO */ }
  /**[11]$A5E8 D1*/ private _jumpHandler_11_A5E8(): void { /* TODO */ }
  /**[12]$A602 D1*/ private _jumpHandler_12_A602(): void { /* TODO */ }
  /**[13]$A61C D1*/ private _jumpHandler_13_A61C(): void { /* TODO */ }
  /**[14]$A629 D1*/ private _jumpHandler_14_A629(): void { /* TODO */ }
  /**[15]$A650 D1*/ private _jumpHandler_15_A650(): void { /* TODO */ }
  /**[16]$A69C D1*/ private _jumpHandler_16_A69C(): void { /* TODO */ }
  /**[17]$A77A D1*/ private _jumpHandler_17_A77A(): void { /* TODO */ }
  /**[18]$A782 D1*/ private _jumpHandler_18_A782(): void { /* TODO */ }

  // ════════════════════════════════════════════
  // Entry G — OAM 精灵复制
  // ════════════════════════════════════════════

  /** $A8CE + sub_882F: AA47读取与OAM缓冲写入 (~102 bytes) */
  private _oamDataCopy(): void {
    // TODO: 翻译 OAM 精灵数据复制
  }
}