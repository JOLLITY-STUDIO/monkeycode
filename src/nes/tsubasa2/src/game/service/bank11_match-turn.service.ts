/**
 * Bank 11 Service — Match Turn Logic (PT1) (比赛回合逻辑)
 *
 * 数据经 `data/bank11-data.ts` 访问 (原始 ROM 字节直读, Bank #0x0B = 11)。
 * PRG offset: 0x016010-0x01800F
 *
 * 逻辑直接翻译自 _tmp_bzk_out/bank_11.asm (CDL C 标记)。
 *
 * 原始入口 (跳转表 $8003):
 *   [0] $8083  滚动/场地块渲染入口
 *   [1] $84A1  调色板组选择 (带 A 参数)
 *   [2] $814C  脚本处理入口 (ram_0524 → $87F6 脚本指针表)
 *
 * 隐藏入口:
 *   $800C  滚动控制循环 (JSR $810C → $812B → 双层 $85C2 精灵组)
 *
 * code 段 (8):
 *   $8003-$81A7 (421 B)
 *   $81BC-$81C3 (8 B)
 *   $81CF-$81D2 (4 B)
 *   $8250-$8273 (36 B)
 *   $827C-$827C (1 B)
 *   $82F7-$83FC (262 B)
 *   $840A-$8463 (90 B)
 *   $8471-$86ED (637 B)
 *
 * 本地函数 (被 JSR 调用, 13):
 *   $810C×2 $812B×1 $81A7×1 $81BC×1 $82FE×2 $845C×1 $847F×2 $84A1×2 $84CF×2 $84F4×2 $8525×7 $85C2×3 $86D3×2
 *
 * 固定区辅助 (bank30, H5 语义化):
 *   $C509→JMP $CB99  表跳转间接 (语义化为直接查表)
 *   $C50C→$CD7C  A(ID) → (ram_0034) = $0300+ID*12 名字区指针
 *   $C512→JMP $CAF7  处理完成返回
 *   $C515→$CB0F  渲染同步等待 (H5 空)
 *   $C536→$CDC9  A 线性索引 → X/Y 场地坐标
 *   $C539→$CDE2  (X,Y) 像素 → A 精灵位置
 *
 * 数据表 (本 bank):
 *   $81AA 表A (9 项指针)  $81C6 表B (3 项指针)  $81D5/$827F (各 120B 位移表)
 *   $86EE T_UNIT_TILE (tile*2)  $8B42 attr 表 (34B)
 *   $8B64 block 表 ($8B64+(tile>>3)*$100+(tile&7)*$20)
 *   $9BE4+CA*$100 图案属性表
 *
 * 跨 bank 数据 (fn_85C2 MMC3 R7 切换, H5 直读):
 *   $A000 窗口 pattern: bank 12/13 (物理) — 由 fn_85C2 直接 import 读取
 */

import { DataStore } from '../data/DataStore';
import {
  readB11,
  readB11U16,
  readB11ScriptPtr,
  readB11TableA,
  readB11TableB,
  readB11TUnitTile,
  readB11Disp81D5,
  readB11Disp827F,
  readB11Attr,
  readB11Block,
  readB11PatternAttr,
} from '../data/bank11-data';
import PRG_BANK_12 from '../data/prg-bank-12';
import PRG_BANK_13 from '../data/prg-bank-13';

// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════

// 零页
const KEY_0020 = 'ram_0020'; // 调色板组低字节 ($84A1 AND #$FC)
const KEY_0022 = 'ram_0022'; // MMC3 R7 页基址 ($85C2 ORA #$07)
const KEY_0023 = 'ram_0023'; // MMC3 R7 页选择 ($85C2 STA $8000)
const KEY_0025 = 'ram_0025'; // MMC3 R7 页号 ($12/$13, STA $8001)
const KEY_003A = 'ram_003A'; // 坐标/临时 lo
const KEY_003B = 'ram_003B'; // 坐标/临时 hi
const KEY_0034 = 'ram_0034'; // 名字区指针 lo ($C50C 结果)
const KEY_0035 = 'ram_0035'; // 名字区指针 hi
const KEY_004B = 'ram_004B'; // 精灵属性 ($84A1 STY)
const KEY_0052 = 'ram_0052'; // 脚本指针 lo
const KEY_0053 = 'ram_0053'; // 脚本指针 hi
const KEY_0054 = 'ram_0054'; // 数据指针 lo
const KEY_0055 = 'ram_0055'; // 数据指针 hi
const KEY_0056 = 'ram_0056'; // pattern 指针 lo
const KEY_0057 = 'ram_0057'; // pattern 指针 hi
const KEY_0058 = 'ram_0058'; // block 指针 lo
const KEY_0059 = 'ram_0059'; // block 指针 hi
const KEY_005A = 'ram_005A'; // 滚动坐标索引
const KEY_005B = 'ram_005B'; // 场景位置指针 lo
const KEY_005C = 'ram_005C'; // 场景位置指针 hi

// RAM (游戏逻辑)
const KEY_0441 = 'ram_0441'; // 场景 ID ($824D)
const KEY_046B = 'ram_046B'; // 精灵组标志
const KEY_0516 = 'ram_0516'; // 完成标志位 (OR #$10)
const KEY_0524 = 'ram_0524'; // 脚本索引 ($FF 跳过)
const KEY_0525 = 'ram_0525'; // 脚本数据/子索引
const KEY_0526 = 'ram_0526'; // T_UNIT_TILE 结果 lo (|$80)
const KEY_0527 = 'ram_0527'; // T_UNIT_TILE 结果 hi
const KEY_052A = 'ram_052A'; // 方向标志 (BIT: bit6=水平/垂直切换)
const KEY_05CA = 'ram_05CA'; // 调色板组 (0-3)
const KEY_05C7 = 'ram_05C7'; // OAM 槽偏移 (×3)
const KEY_05C8 = 'ram_05C8'; // 精灵组游标
const KEY_05C9 = 'ram_05C9'; // 组计数 (初始 $20)
const KEY_05CB = 'ram_05CB'; // 调色板组选择标志
const KEY_05CC = 'ram_05CC'; // tile 值
const KEY_05CD = 'ram_05CD'; // 精灵参数
const KEY_05CE = 'ram_05CE'; // 精灵参数
const KEY_05D0 = 'ram_05D0'; // 控制
const KEY_05D1 = 'ram_05D1'; // 控制 ($80/$82/$C0/$C2)
const KEY_05D4 = 'ram_05D4'; // 滚动 X
const KEY_05D5 = 'ram_05D5'; // 滚动 Y
const KEY_05D7 = 'ram_05D7'; // 滚动方向标志 (BIT bit7)
const KEY_05D8 = 'ram_05D8'; // 上次滚动值
const KEY_05DB = 'ram_05DB'; // 增量
const KEY_05DC = 'ram_05DC'; // 增量
const KEY_05DD = 'ram_05DD'; // 增量
const KEY_05DE = 'ram_05DE'; // 位移 lo
const KEY_05DF = 'ram_05DF'; // 位移 hi
const KEY_05E0 = 'ram_05E0'; // 增量
const KEY_05E1 = 'ram_05E1'; // 精灵属性
const KEY_05E2 = 'ram_05E2'; // 精灵属性
const KEY_05FB = 'ram_05FB'; // 方向标志 (0/非0)
const KEY_061C = 'ram_061C'; // 位移 lo ($8502)
const KEY_061D = 'ram_061D'; // 位移 hi
const KEY_0635 = 'ram_0635'; // 场地坐标
const KEY_0637 = 'ram_0637'; // 场地坐标
const KEY_0638 = 'ram_0638'; // 场地坐标

// 注: $04A5 OAM 影子缓冲 / ram_0515 忙标志 由 OamManager 统一管理。

// ═══════════════════════════════════════════════════════════════
// Bank11Service
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// Bank11Service
// ═══════════════════════════════════════════════════════════════

export class Bank11Service {
  constructor(private _store: DataStore) {}

  // ── 数据访问 (原始字节, 经 bank11-data 层) ──

  /** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF / $A000-$BFFF) */
  readByte(addr: number): number {
    return readB11(addr);
  }

  /** 读取本 bank 内 16bit 小端数值 */
  readU16(addr: number): number {
    return readB11U16(addr);
  }

  get store(): DataStore { return this._store; }

  // ──────────────────────────────────────────────
  // $8003: 入口跳转表 (3 路)
  // ──────────────────────────────────────────────

  /**
   * 跳转表分发 (bank_11.asm $8003)
   *   [0]→$8083  [1]→$84A1  [2]→$814C
   *   [1] 为带 A 参数的 entry_84A1 版本 (调色板组选择)。
   */
  dispatch(index: number, a?: number): void {
    switch (index) {
      case 0: this.entry_8083(); break;
      case 1: this.entry_84A1(a ?? 0); break;
      case 2: this.entry_814C(); break;
      default: break;
    }
  }

  // ──────────────────────────────────────────────
  // $800C: 隐藏入口 — 滚动控制循环
  // ──────────────────────────────────────────────

  /**
   * $800C — 滚动控制循环 (JMP $800C 目标)。
   * 滚动位置 (ram_05D4/05D5) 变化时: block 指针 → 4 组精灵 (每次 2 组 × 2)。
   */
  entry_800C(): void {
    const s = this._store;
    const oam = s.oam;

    // $800C-$800E: JSR $C515
    this._fixedC515();

    // $8011-$801E: A = ram_05D4 (BIT ram_05D7 负则 EOR#FF +$11) AND #$E0
    let a = s.read(KEY_05D4);
    if (s.read(KEY_05D7) & 0x80) {
      a = (~a + 0x11) & 0xff; // EOR #$FF CLC ADC #$11
    }
    a &= 0xe0;
    // $8020-$8025: == ram_05D8 → JMP $800C 无限重试 (H5 改有限循环防栈溢出)
    let retry = 0;
    while (a === s.read(KEY_05D8) && retry++ < 8) {
      this._fixedC515();
    }
    if (retry >= 8) return;
    s.write(KEY_05D8, a);

    // $802B: JSR $810C — 负坐标取反 → ram_003A/003B
    this.fn_810C();
    // $802E-$8032: A = ram_003B AND #$FE; JSR $812B → ram_0058/0059 (block 指针)
    this.fn_812B(s.read(KEY_003B) & 0xfe);

    // $8035-$8048: ram_005A = ((E0|A0)+ram_05D4 AND #$E0) >> 2 | $40
    const isNeg = (s.read(KEY_05D7) & 0x80) !== 0;
    const dirA = isNeg ? 0xa0 : 0xe0;
    let v5A = ((dirA + s.read(KEY_05D4)) & 0xe0) >> 2;
    v5A = (v5A | 0x40) & 0xff;
    s.write(KEY_005A, v5A);

    // $804A-$804C: 外层计数 = 4
    for (let oi = 0; oi < 4; oi++) {
      // $804D-$8055: JSR $C515; 等待 OAM 空闲
      this._fixedC515();
      this._awaitOamIdle();
      // $8057-$8059: OAM 忙
      oam.beginBuild();

      // $805C-$805E: X=0; 内层计数 = 2
      let x = 0;
      for (let ii = 0; ii < 2; ii++) {
        const yIdx = s.read(KEY_005A) & 0x3f;
        const ptr = this._getPtr(KEY_0058, KEY_0059);
        const blockByte = this.readByte(ptr + yIdx); // LDA (ram_0058),Y
        const yFull = s.read(KEY_005A);              // LDY ram_005A
        x = this.fn_85C2(blockByte, yFull, x);
        // $806D: INC ram_005A
        s.write(KEY_005A, (s.read(KEY_005A) + 1) & 0xff);
      }
      // $8075-$8077: OAM 完成
      oam.endBuild();
    }
    // $8080: JMP $800C (循环)
  }

  // ──────────────────────────────────────────────
  // $8083: 入口 — 滚动/场地块渲染
  // ──────────────────────────────────────────────

  /**
   * $8083 — 入口: 滚动位置变化 → 计算场景块指针 → 写 4 组精灵。
   * 与 $800C 滚动控制循环逻辑同构 (偏移不同)。
   */
  entry_8083(): void {
    const s = this._store;
    const oam = s.oam;

    // $8083-$8085: JSR $C515 (渲染同步等待, H5 空)
    this._fixedC515();

    // $8088-$8097: A = ram_05D4 (BIT ram_05D7 负则取补) AND #$E0; == ram_05D8 → 循环重试
    let a = s.read(KEY_05D4);
    if (s.read(KEY_05D7) & 0x80) {
      a = (~a + 1) & 0xff; // EOR #$FF CLC ADC #$01
    }
    a &= 0xe0;
    // $8097-$809C: == ram_05D8 → JMP $8083 无限重试 (H5 改有限循环防栈溢出)
    let retry = 0;
    while (a === s.read(KEY_05D8) && retry++ < 8) {
      this._fixedC515();
    }
    if (retry >= 8) return;
    s.write(KEY_05D8, a);

    // $80A2: JSR $810C — 负坐标取反 → ram_003A/003B
    this.fn_810C();

    // $80A5-$80CC: 16bit 位移 → ram_005A
    //   X16 = (E0|00)+ram_05D4;  Y16 = $FF+ram_05D5+carry (LDY #$FF 恒, 见 $80A7)
    //   ram_005A = (X16>>5) | ((Y16&1) ? $40 : 0)  — $40 位非恒置 (Y16 bit0 = ~ram_05D5 bit0)
    const isNeg = (s.read(KEY_05D7) & 0x80) !== 0;
    const dirA = isNeg ? 0x00 : 0xe0;
    const dirY = 0xff; // $80A7: LDY #$FF 无条件; BIT 分支只改 A
    const x16 = (dirA + s.read(KEY_05D4)) & 0xff;
    const carry = (dirA + s.read(KEY_05D4)) > 0xff ? 1 : 0;
    const y16 = (dirY + s.read(KEY_05D5) + carry) & 0xff;
    const v5A = ((x16 >> 5) & 0x07) | ((y16 & 1) ? 0x40 : 0x00);
    s.write(KEY_005A, v5A);

    // $80CE-$80D0: 外层计数 = 2
    for (let oi = 0; oi < 2; oi++) {
      // $80D1-$80D9: JSR $C515; 等待 OAM 空闲
      this._fixedC515();
      this._awaitOamIdle();
      // $80DB-$80DD: OAM 忙
      oam.beginBuild();

      // $80E0-$80E2: X=0; 内层计数 = 2
      let x = 0;
      for (let ii = 0; ii < 2; ii++) {
        const yIdx = s.read(KEY_005A) & 0x3f;
        const ptr = this._getPtr(KEY_0058, KEY_0059);
        const blockByte = this.readByte(ptr + yIdx); // LDA (ram_0058),Y
        const yFull = s.read(KEY_005A);              // LDY ram_005A
        x = this.fn_85C2(blockByte, yFull, x);
        // $80F1-$80F6: ram_005A += 8
        s.write(KEY_005A, (s.read(KEY_005A) + 8) & 0xff);
      }
      // $80FE-$8100: OAM 完成
      oam.endBuild();
    }
    // $8109: JMP $8083 (循环)
  }

  // ──────────────────────────────────────────────
  // $810C: 内部函数 — 负坐标取反
  // ──────────────────────────────────────────────

  /**
   * $810C — 将 (ram_05D4, ram_05D5) 视为 16bit 有符号, 取绝对值后
   * 加 $E0/$01 偏移 → ram_003A/003B (滚动块位置)。
   */
  private fn_810C(): void {
    const s = this._store;
    let x = s.read(KEY_05D4);
    let y = s.read(KEY_05D5);
    // $8112: BPL $8120 — N 标志来自 $810F LDY ram_05D5 (非 ram_05D7)
    if (y & 0x80) {
      x = (~x) & 0xff;
      y = (~y) & 0xff;
      x = (x + 1) & 0xff; // INX (Z=0 则跳过 INY)
      if (x === 0) y = (y + 1) & 0xff; // BNE $8120 / .byte $C8
    }
    // $8120-$8129: ram_003A = X+$E0; ram_003B = Y+$01 (进位)
    s.write(KEY_003A, (x + 0xe0) & 0xff);
    const carry = x + 0xe0 > 0xff ? 1 : 0;
    s.write(KEY_003B, (y + 1 + carry) & 0xff);
  }

  // ──────────────────────────────────────────────
  // $812B: 内部函数 — block 指针计算
  // ──────────────────────────────────────────────

  /**
   * $812B — 入口 `A8 TAY` 接收 A 参数 (调用方 $802E: LDA ram_003B; AND #$FE);
   * A=(ram_005B),Y → JSR $86D3 (调色板组);
   * 3×LSR/ROR → block 表偏移; 基址 $8B64 → ram_0058/0059。
   * 返回 A 为 3×LSR 后的剩余值 (供 block 读取)。
   */
  private fn_812B(y: number): number {
    const s = this._store;
    // $812C: LDA (ram_005B),Y
    const ptr = this._getPtr(KEY_005B, KEY_005C);
    const tile = this.readByte(ptr + y);
    // $812E: JSR $86D3
    this.fn_86D3(tile);
    // $8131-$8149: 3×LSR/ROR → 12bit 偏移; + $8B64 → ram_0058/0059
    let a = tile;
    let lo = 0;
    for (let k = 0; k < 3; k++) {
      const carry = a & 1;
      a >>= 1;
      lo = ((lo >> 1) | (carry << 7)) & 0xff;
    }
    const base = (a + 0x8b) & 0xff;
    s.write(KEY_0058, (lo + 0x64) & 0xff);
    const carry2 = lo + 0x64 > 0xff ? 1 : 0;
    s.write(KEY_0059, (base + carry2) & 0xff);
    return a;
  }

  // ──────────────────────────────────────────────
  // $814C: 入口 — 脚本处理
  // ──────────────────────────────────────────────

  /**
   * $814C — 脚本处理入口。
   * (ram_0052) = $87F6; 按 ram_0524 ASL 查脚本指针表;
   * 顺序读脚本字节: ≥$F0 → 控制码 (JSR $81BC, ram_05D0=$02, 结束);
   * <$F0 → 数据 (ram_0525=字节, 指针+字节, JSR $81A7 道具 handler)。
   * 结束: ram_0516 |= $10; $C512 完成。
   */
  entry_814C(): void {
    const s = this._store;

    // $814C-$8152: (ram_0052) = $87F6
    this._setPtr(KEY_0052, KEY_0053, 0x87f6);

    // $8154-$8159: ram_0524 == $FF → 直接结束 ($819C)
    if (s.read(KEY_0524) === 0xff) {
      this._finishScript();
      return;
    }

    // $815B-$8169: ASL 查表 → 脚本指针
    const scriptPtr = readB11ScriptPtr(s.read(KEY_0524));
    this._setPtr(KEY_0052, KEY_0053, scriptPtr);

    // $816B-$816D: ram_05D1 = 0
    s.write(KEY_05D1, 0);

    // $8170-$8199: 脚本循环
    let guard = 0;
    for (;;) {
      if (guard++ > 4096) break; // 防呆
      const b = this.readByte(this._getPtr(KEY_0052, KEY_0053) + 0);
      if (b >= 0xf0) {
        // $8176-$8185: ≥$F0 → 控制码 handler; ram_05D0=2; ram_0525=2; 结束
        this.entry_81BC(b);
        s.write(KEY_05D0, 0x02);
        s.write(KEY_0525, 0x02);
        break;
      }
      // $8188-$8199: 数据: ram_0525=字节; 指针 += 字节; 下一字节 → JSR $81A7
      s.write(KEY_0525, b);
      const cur = this._getPtr(KEY_0052, KEY_0053);
      this._setPtr(KEY_0052, KEY_0053, (cur + b) & 0xffff);
      const item = this.readByte(this._getPtr(KEY_0052, KEY_0053) + 1);
      this.fn_81A7(item);
      break;
    }

    // $819C-$81A4: ram_0516 |= $10; JMP $C512
    this._finishScript();
  }

  /** $819C: ram_0516 |= $10; $C512 完成 */
  private _finishScript(): void {
    this._store.write(KEY_0516, this._store.read(KEY_0516) | 0x10);
    this._fixedC512();
  }

  // ──────────────────────────────────────────────
  // $81A7: 内部函数 — 道具 handler 分派
  // ──────────────────────────────────────────────

  /**
   * $81A7 — 按 A 索引表A (9 项) 分派道具 handler。
   * 语义化 $C509 表跳转: 直接 switch 分派。
   */
  private fn_81A7(a: number): void {
    // JSR $C509 (→$CB99 表跳转): 目标 = readB11TableA(A)
    // 由 readB11TableA 语义化, 直接分派
    const idx = a & 0x0f;
    const dst = readB11TableA(idx);
    this._dispatchTableA(dst);
  }

  /** 表A 目标分派 (地址 → 本地方法) */
  private _dispatchTableA(dst: number): void {
    switch (dst & 0xffff) {
      case 0x8327: this.entry_8327(); break;
      case 0x83e7: this.entry_83E7(); break;
      case 0x83ff: this.entry_83FF(); break;
      case 0x8358: this.entry_8358(); break;
      case 0x8377: this.entry_8377(); break;
      case 0x8364: this.entry_8364(); break;
      case 0x83d2: this.entry_83D2(); break;
      case 0x83ee: this.entry_83EE(); break;
      default: break;
    }
  }

  // ──────────────────────────────────────────────
  // $81BC: 入口 — 脚本控制码 handler
  // ──────────────────────────────────────────────

  /**
   * $81BC — 控制码 (≥$F0): X=0; ram_0525=0; A &= $0F → 表B (3 项) 分派。
   */
  entry_81BC(a: number): void {
    const s = this._store;
    // $81BC-$81BE: X=0; ram_0525=0
    s.write(KEY_0525, 0);
    // $81C1-$81C3: A &= $0F; JSR $C509 → 表B
    const idx = a & 0x0f;
    const dst = readB11TableB(idx);
    switch (dst & 0xffff) {
      case 0x81cc: this.entry_81CC(); break;
      case 0x8276: this.entry_8276(); break;
      case 0x824d: this.entry_824D(); break;
      default: break;
    }
  }

  // ──────────────────────────────────────────────
  // $81CC/$81CF/$8279/$827C: 位移表 → 主写入
  // ──────────────────────────────────────────────

  /**
   * $81CC (表B[0] 目标) — JSR $82F7 后取 $81D5 位移表 → 主写入。
   */
  entry_81CC(): void {
    const x = this.entry_82F7(); // JSR $82F7 → X
    const a = readB11Disp81D5(x); // LDA $81D5,X
    this.entry_832B(a); // JMP $832B
  }

  /**
   * $81CF — JSR $82F7 (前置, X 由调用方计算) 后取 $81D5 位移表 → 主写入。
   */
  entry_81CF(): void {
    const s = this._store;
    let a = readB11Disp81D5(s.read(KEY_003A));
    this.entry_832B(a); // JMP $832B
  }

  /**
   * $824D (表B[2] 目标) — 场景坐标 → 位移表 → 主写入。
   * $824D: LDA ram_0441 → JSR $C50C (名字区指针) → 线性索引 → $C536 场地坐标
   * → SBC (ram_0034),Y → $82FE 位移 → JMP $8279。
   */
  entry_824D(): void {
    const s = this._store;
    // $824D-$8250: A = ram_0441; JSR $C50C → (ram_0034) = 名字区指针
    const namePtr = this._queryNamePtr0034(s.read(KEY_0441));
    this._setPtr(KEY_0034, KEY_0035, namePtr);
    // $8253-$8256: A = ram_0638; JSR $C536 → X = 场地坐标
    const c = this._fixedC536(s.read(KEY_0638));
    // $8259-$825D: TXA; LDY #$06; SEC; SBC (ram_0034),Y
    let a = (c.x - this._readRamByte(namePtr + 6)) & 0xff;
    // $825F-$8267: LDY ram_05FB; BEQ 跳过; 否则取补
    const y = s.read(KEY_05FB);
    if (y !== 0) {
      a = (~a + 1) & 0xff;
    }
    // $8269-$826F: TAX; BPL → 跳过 Y 调整; 否则 Y ^= $0B
    let yy = y;
    if (a & 0x80) {
      yy = y ^ 0x0b;
    }
    // $8270: JSR $82FE → X 位移
    const x = this.fn_82FE(yy);
    // $8273: JMP $8279
    const a2 = readB11Disp827F(x); // LDA $827F,X
    this.entry_832B(a2); // JMP $832B
  }

  /**
   * $8276 (表B[1] 目标) — 隐藏字节 `20 F7 82` = JSR $82F7 → $8279。
   */
  entry_8276(): void {
    const x = this.entry_82F7(); // JSR $82F7 → X
    const a = readB11Disp827F(x); // $8279: LDA $827F,X
    this.entry_832B(a); // JMP $832B
  }

  /**
   * $8250 — 位移计算入口 (JSR $C50C → $C536 → SBC (ram_0034),Y)。
   */
  entry_8250(): void {
    const s = this._store;
    const namePtr = this._queryNamePtr0034(s.read(KEY_0441));
    this._setPtr(KEY_0034, KEY_0035, namePtr);
    const c = this._fixedC536(s.read(KEY_0638));
    let a = (c.x - this._readRamByte(namePtr + 6)) & 0xff;
    const y = s.read(KEY_05FB);
    if (y !== 0) {
      a = (~a + 1) & 0xff;
    }
    let yy = y;
    if (a & 0x80) {
      yy = y ^ 0x0b;
    }
    const x = this.fn_82FE(yy);
    s.write(KEY_003A, x); // 供 entry_827C 读取
  }

  /**
   * $827C — JMP $832B (A = $827F,X)。
   */
  entry_827C(): void {
    const x = this._store.read(KEY_003A);
    const a = readB11Disp827F(x);
    this.entry_832B(a); // JMP $832B
  }

  // ──────────────────────────────────────────────
  // $82F7: 入口 — 位移 (Y 方向标志)
  // ──────────────────────────────────────────────

  /**
   * $82F7 — LDY ram_05FB; JSR $82FE; RTS。返回 X。
   */
  entry_82F7(): number {
    const y = this._store.read(KEY_05FB);
    return this.fn_82FE(y);
  }

  // ──────────────────────────────────────────────
  // $82FE: 内部函数 — 位移计算
  // ──────────────────────────────────────────────

  /**
   * $82FE — X = ((ram_0637-$50)&$F0 位移) + ((ram_0635-$30)&$F0 位移);
   * Y≠0 时 X += $3C。返回 X。
   */
  private fn_82FE(y: number): number {
    const s = this._store;
    // $82FE-$830D: A = (ram_0637-$50)&$F0; LSR; ram_003A; 2×LSR; +ram_003A
    let v = (s.read(KEY_0637) - 0x50) & 0xff;
    v &= 0xf0;
    const v1 = v >> 1;
    const v3 = v >> 3;
    let x = (v1 + v3) & 0xff;
    // $830F-$831B: A = (ram_0635-$30)&$F0; 4×LSR; +x
    let w = (s.read(KEY_0635) - 0x30) & 0xff;
    w &= 0xf0;
    x = (x + (w >> 4)) & 0xff;
    // $831E-$8325: TYA; BEQ → 跳过; 否则 X += $3C
    if (y !== 0) {
      x = (x + 0x3c) & 0xff;
    }
    return x;
  }

  // ──────────────────────────────────────────────
  // $8327/$832B: 主写入入口
  // ──────────────────────────────────────────────

  /**
   * $8327 (表A[0]) — LDY #$02; LDA (ram_0052),Y → 主写入。
   */
  entry_8327(): void {
    const a = this._readScriptByte(2);
    this.entry_832B(a); // 落到 $832B
  }

  /**
   * $832B — 主写入: ram_05CC=A; JSR $8525(ram_05CC, ram_05CD);
   * ram_05CB=1; ram_05CE 计算; ram_05CD 计算; ram_05DB/DC/DD=0。
   */
  entry_832B(a: number): void {
    const s = this._store;
    s.write(KEY_05CC, a & 0xff); // $832B: STA ram_05CC
    const cd = s.read(KEY_05CD); // $832E: LDY ram_05CD
    this.fn_8525(a, cd);         // $8331: JSR $8525
    s.write(KEY_05CB, 1);        // $8334-$8336
    let ce = 0;
    if (cd !== 0) {
      ce = ((cd & 0x20) | 0x80) & 0xff; // $833E-$8340
    }
    s.write(KEY_05CE, ce);       // $8342
    s.write(KEY_05CD, ((ce | 0x80) ^ 0x20) & 0xff); // $8345-$8349
    s.write(KEY_05DB, 0);        // $834C-$8354
    s.write(KEY_05DC, 0);
    s.write(KEY_05DD, 0);
  }

  // ──────────────────────────────────────────────
  // $8358/$8364/$8377/$83D2/$83E7/$83EE/$83FF: 道具 handler
  // ──────────────────────────────────────────────

  /** $8358 — JSR $84D9; ram_05D1=$80; A=(ram_0052)[4] → 主写入。 */
  entry_8358(): void {
    const s = this._store;
    this.fn_84D9();          // $8358
    s.write(KEY_05D1, 0x80); // $835B-$835D
    const a = this._readScriptByte(4); // $8360-$8362: LDY #$04 → $8329
    this.entry_832B(a); // JMP $8329 (落到 $832B)
  }

  /** $8364 — JSR $84D9; ram_05D1=$80; Y=4|5 (BIT ram_052A bit6) → 主写入。 */
  entry_8364(): void {
    const s = this._store;
    this.fn_84D9();          // $8364
    s.write(KEY_05D1, 0x80); // $8367-$8369
    const y = (s.read(KEY_052A) & 0x40) ? 5 : 4; // $836C-$8373: LDY #4; BVC; INY
    const a = this._readScriptByte(y);
    this.entry_832B(a); // $8374: JMP $8329
  }

  /** $8377 — JSR $84CF; A=(ram_0052)[4]→ram_05E2; ram_05E1=0; → $8386。 */
  entry_8377(): void {
    const s = this._store;
    this.fn_84CF();                    // $8377
    s.write(KEY_05E2, this._readScriptByte(4)); // $837A-$837E
    s.write(KEY_05E1, 0);              // $8381-$8383
    this._at8386(); // JMP $8386
  }

  /**
   * $8386 公共块 — ram_046B=1; 3 次 $8525 (A0/$05/$06) + $84A1(A0);
   * ram_05CB=0; ram_05CD=$60; 增量清; ram_05D1=$82; → $8493。
   */
  private _at8386(): void {
    const s = this._store;
    s.write(KEY_046B, 1);                    // $8386-$8388
    this.fn_8525(s.read(KEY_05CC), 0xa0);    // $838B-$8390: LDY #$A0; A=ram_05CC
    this.entry_84A1(0xa0);                   // $8393-$8395: A=$A0
    this._fixedC515();                       // $8398-$839A
    this.fn_8525(this._readScriptByte(5), 0x00); // $839D-$83A6: Y=0
    this.fn_8525(this._readScriptByte(6), 0x80); // $83A9-$83AF: Y=$80
    s.write(KEY_05CB, 0);                    // $83B2-$83B4
    s.write(KEY_05CD, 0x60);                 // $83B7-$83B9
    s.write(KEY_05DB, 0);                    // $83BC-$83C7
    s.write(KEY_05DC, 0);
    s.write(KEY_05DD, 0);
    s.write(KEY_05E0, 0);
    s.write(KEY_05D1, 0x82);                 // $83CA-$83CC
    this.entry_8493();                       // $83CF: JMP $8493
  }

  /** $83D2 — JSR $84D9; A=(ram_0052)[4]→ram_05E2; ram_05E1=0; JSR $847F; → $8386。 */
  entry_83D2(): void {
    const s = this._store;
    this.fn_84D9();                          // $83D2
    s.write(KEY_05E2, this._readScriptByte(4)); // $83D5-$83D9
    s.write(KEY_05E1, 0);                    // $83DC-$83DE
    this.fn_847F();                          // $83E1
    this._at8386();                          // $83E4: JMP $8386
  }

  /** $83E7 (表A[1]/[7]) — ram_05D1=$C0 → $840A。 */
  entry_83E7(): void {
    this._store.write(KEY_05D1, 0xc0); // $83E7-$83E9
    this.entry_840A(); // $83EC: BNE $840A
  }

  /** $83EE (表A[8]) — ram_05D1=$C2; JSR $84CF/$845C/$847F; → $840D。 */
  entry_83EE(): void {
    const s = this._store;
    s.write(KEY_05D1, 0xc2); // $83EE-$83F0
    this.fn_84CF();          // $83F3
    this.fn_845C();          // $83F6
    this.fn_847F();          // $83F9
    this._at840D();          // $83FC: JMP $840D
  }

  /** $83FF (表A[2], 隐藏 10B) — ram_05D1=$C2; JSR $84CF/$845C → 落到 $840A。 */
  entry_83FF(): void {
    const s = this._store;
    s.write(KEY_05D1, 0xc2); // $83FF-$8403
    this.fn_84CF();          // $8404-$8406
    this.fn_845C();          // $8407-$8409
    this.entry_840A();       // 落到 $840A (JSR $84CF)
  }

  // ──────────────────────────────────────────────
  // $840A: 入口 — 批量精灵写入
  // ──────────────────────────────────────────────

  /**
   * $840A — JSR $84CF → $840D 公共块。
   */
  entry_840A(): void {
    this.fn_84CF(); // $840A
    this._at840D(); // $840D
  }

  /** $840D 公共块 — ram_046B=1; 3 次 $8525; 增量设置; BIT ram_05DF → $8493。 */
  private _at840D(): void {
    const s = this._store;
    s.write(KEY_046B, 1);                    // $840D-$840F
    this.fn_8525(s.read(KEY_05CC), 0x00);    // $8412-$8417: LDY #$00
    this.entry_84A1(0x00);                   // $841A-$841C: A=0
    this.fn_8525(this._readScriptByte(5), 0x80); // $841F-$8425: Y=$80
    this.fn_8525(this._readScriptByte(6), 0xa0); // $8428-$842E: Y=$A0
    s.write(KEY_05CB, 0);                    // $8431-$8433
    s.write(KEY_05CE, 0x40);                 // $8436-$8438
    s.write(KEY_05CD, 0);                    // $843B-$843D
    s.write(KEY_05DB, 0);                    // $8440-$844C
    s.write(KEY_05DC, 0xe0);
    s.write(KEY_05DD, 0xff);
    const e0 = (s.read(KEY_05DF) & 0x80) ? 0x20 : 0x00; // $844F-$8454: BIT; BPL
    s.write(KEY_05E0, e0);                   // $8456
    this.entry_8493();                       // $8459: JMP $8493
  }

  /** $8493 — (ram_005B) = (ram_0052) + 5 (16bit 进位)。 */
  entry_8493(): void {
    const s = this._store;
    const p = this._getPtr(KEY_0052, KEY_0053);
    this._setPtr(KEY_005B, KEY_005C, (p + 5) & 0xffff); // $8493-$849E
  }

  // ──────────────────────────────────────────────
  // $845C (隐藏字节): 内部函数
  // ──────────────────────────────────────────────

  /**
   * $845C — 隐藏字节 `A0 04 B1 52 2C DF 05 30 0C 38 E9 01 A2 74 4A 90 0B A2 E4 D0 07`
   * = LDY #$04; LDA (ram_0052),Y; BIT ram_05DF; BMI $8471;
   *   SEC; SBC #$01; LDX #$74; LSR; BCC $8478; LDX #$E4 → $8478
   * $8478: STX ram_05E1; STA ram_05E2。
   */
  private fn_845C(): void {
    const s = this._store;
    const a0 = this._readScriptByte(4); // $845E: LDA (ram_0052),Y (Y=4)
    let a = a0;
    let x: number;
    if (s.read(KEY_05DF) & 0x80) {
      // $8463: BMI $8471 — 直接进 $8471 (LDX #$1C; LSR; 选 X)
      x = 0x1c;
      const carry = a & 1; // $8473: LSR
      a = (a >> 1) & 0xff;
      if (carry) x = 0x8c; // $8474-$8476: BCC $8478 / LDX #$8C
    } else {
      // $8465-$8467: SEC; SBC #$01
      a = (a - 1) & 0xff;
      x = 0x74;           // $8468: LDX #$74
      const carry = a & 1; // $846A: LSR
      a = (a >> 1) & 0xff;
      if (carry) x = 0xe4; // $846B-$846D: BCC $8478 / LDX #$E4
    }
    // $8478: STX ram_05E1; STA ram_05E2
    s.write(KEY_05E1, x);
    s.write(KEY_05E2, a);
  }

  // ──────────────────────────────────────────────
  // $8471: 入口 — 属性选择
  // ──────────────────────────────────────────────

  /**
   * $8471 — LDX #$1C; LSR; BCC $8478 / LDX #$8C;
   * $8478: STX ram_05E1; STA ram_05E2。
   */
  entry_8471(a: number): void {
    const s = this._store;
    let x = 0x1c;
    const carry = a & 1; // $8473: LSR
    const a2 = (a >> 1) & 0xff;
    if (carry) x = 0x8c; // $8474-$8476
    s.write(KEY_05E1, x); // $8478
    s.write(KEY_05E2, a2);
  }

  // ──────────────────────────────────────────────
  // $847F: 内部函数 — 脚本指针换页
  // ──────────────────────────────────────────────

  /**
   * $847F — Y = (ram_052A bit6) ? 7 : 5;
   * (ram_0052) = 脚本[Y..Y+1] (16bit 新指针)。
   */
  private fn_847F(): void {
    const s = this._store;
    const y = (s.read(KEY_052A) & 0x40) ? 7 : 5; // $847F-$8487
    const p = this._getPtr(KEY_0052, KEY_0053);
    const np = readB11U16(p + y); // $8488-$848C: LDA (ram_0052),Y / INY
    this._setPtr(KEY_0052, KEY_0053, np); // $848E-$8490
  }

  // ──────────────────────────────────────────────
  // $84A1: 入口 — 调色板组选择 (带 A 参数)
  // ──────────────────────────────────────────────

  /**
   * $84A1 — 按 A 选调色板组: X=$02/$01/$00; Y=$74/$E4 (按 A&$3F ≥ $20);
   * ram_0020 = (ram_0020 & $FC) | X (低位 2bit); ram_004B=Y;
   * ram_046B = ram_05CB。
   */
  entry_84A1(a: number): void {
    const s = this._store;
    let x = 2;                    // $84A1: LDX #$02
    if (a < 0x80) {               // $84A3-$84A5
      x -= 1;
      if (a < 0x40) x -= 1;       // $84A7-$84AC
    }
    let y = 0x74;                 // $84AD: LDY #$74
    const a2 = a & 0x3f;
    if (a2 < 0x20) {
      y = 0xe4;                   // $84B5
      x ^= 0x02;                  // $84B7-$84BA: TXA; EOR #$02
    }
    // $84BB-$84C4: ram_0020 = (ram_0020 & $FC) | X
    s.write(KEY_0020, (s.read(KEY_0020) & 0xfc) | (x & 0x03));
    s.write(KEY_004B, y);         // $84C6: STY ram_004B
    s.write(KEY_046B, s.read(KEY_05CB)); // $84C8-$84CB
  }

  // ──────────────────────────────────────────────
  // $84CF/$84D9/$84F4: 内部函数 — 脚本位移读取
  // ──────────────────────────────────────────────

  /**
   * $84CF — JSR $84F4; ram_05DE=X; ram_05DF=Y。
   */
  private fn_84CF(): void {
    const r = this.fn_84F4();
    this._store.write(KEY_05DE, r.x);
    this._store.write(KEY_05DF, r.y);
  }

  /**
   * $84D9 — JSR $84F4; ram_052A bit6 置时 16bit 取负; ram_05DE/DF。
   */
  private fn_84D9(): void {
    const s = this._store;
    let r = this.fn_84F4();
    if (s.read(KEY_052A) & 0x40) {
      let x = (~r.x) & 0xff;
      let y = (~r.y) & 0xff;
      x = (x + 1) & 0xff; // EOR #$FF INX
      if (x === 0) y = (y + 1) & 0xff; // BNE $84ED; INY
      r = { x, y };
    }
    s.write(KEY_05DE, r.x); // $84ED
    s.write(KEY_05DF, r.y);
  }

  /**
   * $84F4 — X=脚本[2]; Y=脚本[3];
   * Y==$80 时: 16bit (ram_061D<<8|ram_061C) << (X==1?3:4) + $C0 → X/Y。
   */
  private fn_84F4(): { x: number; y: number } {
    const s = this._store;
    const p = this._getPtr(KEY_0052, KEY_0053);
    const x0 = this.readByte(p + 2); // $84F6: LDA (ram_0052),Y (Y=2)
    const y0 = this.readByte(p + 3); // $84FA: LDA (ram_0052),Y (Y=3)
    if (y0 !== 0x80) return { x: x0, y: y0 };
    // $8502: ram_003A = ram_061D; A = ram_061C; 左移
    let hi = s.read(KEY_061D);
    let lo = s.read(KEY_061C);
    const n = x0 === 1 ? 3 : 4; // $8513-$8517: CPX #$01; BEQ → 3 次, 否则 4 次
    for (let k = 0; k < n; k++) {
      const c = (lo & 0x80) ? 1 : 0;
      lo = (lo << 1) & 0xff;
      hi = ((hi << 1) | c) & 0xff;
    }
    const v = ((hi << 8) | lo) + 0xc0; // $851C-$8523: ADC #$C0
    return { x: v & 0xff, y: (v >> 8) & 0xff };
  }

  // ──────────────────────────────────────────────
  // $8525: 内部函数 — 精灵组写入 (4 组)
  // ──────────────────────────────────────────────

  /**
   * $8525 — 按 tile 写入 4 组精灵。
   *   Y → ram_05C8; T_UNIT_TILE 查表 → ram_0526/0527;
   *   $86D3 调色板组; block 指针 → ram_0054/0055; ram_05C9=$20;
   *   外层循环 (等待 OAM): 内层 X=3..0 → block 字节 → $85C2。
   * 返回: 无 (X 存 ram_05C7)。
   */
  private fn_8525(tile: number, y0: number): void {
    const s = this._store;
    const oam = s.oam;
    // $8525-$8528: STY ram_05C8
    s.write(KEY_05C8, y0 & 0xff);
    // $8529-$8543: (ram_0054) = $86EE + tile*2; 读 2B → ram_0526/0527
    const tv = readB11TUnitTile(tile & 0xff);
    s.write(KEY_0526, (tv & 0xff) | 0x80); // ORA #$80
    s.write(KEY_0527, (tv >> 8) & 0xff);
    // $8546-$8547: PLA; JSR $86D3 → ram_05CA
    this.fn_86D3(tile & 0xff);
    // $854A-$8562: 3×LSR/ROR → block 偏移; + $8B64 → (ram_0054)
    let a = tile & 0xff;
    let lo = 0;
    for (let k = 0; k < 3; k++) {
      const c = a & 1;
      a >>= 1;
      lo = ((lo >> 1) | (c << 7)) & 0xff;
    }
    const base = (a + 0x8b) & 0xff;
    const loV = (lo + 0x64) & 0xff;
    const carry = lo + 0x64 > 0xff ? 1 : 0;
    this._setPtr(KEY_0054, KEY_0055, ((base + carry) << 8) | loV);
    // $8564-$8566: ram_05C9 = $20
    s.write(KEY_05C9, 0x20);
    const ca = s.read(KEY_05CA);

    // $856D 外层循环
    let outerGuard = 0;
    for (;;) {
      if (outerGuard++ > 100) break;
      // $856D-$8575: JSR $C515; 等待 OAM 空闲
      this._fixedC515();
      this._awaitOamIdle();
      // $8577-$8579: OAM 忙
      oam.beginBuild();
      // $857C-$857E: ram_05C7 = 0
      s.write(KEY_05C7, 0);
      // $8581: X = 3 (内层)
      let x = 3;
      for (;;) {
        // $8583-$8589: ram_05CA 恢复; X 入栈
        s.write(KEY_05CA, ca);
        // $858B-$8592: Y = $20 - ram_05C9; LDA (ram_0054),Y
        const yIdx = (0x20 - s.read(KEY_05C9)) & 0xff;
        const blockPtr = this._getPtr(KEY_0054, KEY_0055);
        const blockByte = this.readByte(blockPtr + yIdx);
        // $8594-$859A: LDX ram_05C7; LDY ram_05C8; JSR $85C2 → X
        const xNew = this.fn_85C2(blockByte, s.read(KEY_05C8), s.read(KEY_05C7));
        // $859D: STX ram_05C7
        s.write(KEY_05C7, xNew);
        // $85A0: INC ram_05C8
        s.write(KEY_05C8, (s.read(KEY_05C8) + 1) & 0xff);
        // $85A4: DEC ram_05C9
        s.write(KEY_05C9, (s.read(KEY_05C9) - 1) & 0xff);
        if (s.read(KEY_05C9) === 0) {
          // $85B6: 完成 — PLA; ram_0515=$80; JSR $C515; RTS
          oam.endBuild();
          this._fixedC515();
          return;
        }
        x -= 1; // $85A9-$85AA: SEC; SBC #$01
        if (x !== 0) continue; // $85AC: BNE $8583
        // $85AE-$85B3: ram_0515=$80; JMP $856D (外层)
        oam.endBuild();
        break;
      }
    }
  }

  // ──────────────────────────────────────────────
  // $85C2: 内部函数 — 单精灵组 OAM 写入
  // ──────────────────────────────────────────────

  /**
   * $85C2 — 写一组精灵 (4 槽 × 7B) 到 OAM 影子缓冲。
   *   A → ram_0056; Y 位分解 → tile/attr/nameTable;
   *   $9BE4+ram_05CA*$100 图案属性; MMC3 R7 → bank 12/13 pattern 直读;
   *   X ≥ $38 时错位复制 5B。
   * 返回: 更新后的 X。
   */
  private fn_85C2(a: number, y: number, x: number): number {
    const s = this._store;
    const oam = s.oam;
    // $85C2: STA ram_0056
    s.write(KEY_0056, a & 0xff);

    // $85C4-$85C9: ram_04A6,X = (Y&7)<<2
    const attrLo = ((y & 0x07) << 2) & 0xff;
    oam.writeByte(x + 1, attrLo);
    // $85CC-$85CE: ram_04A7,X = 0
    oam.writeByte(x + 2, 0);
    // $85D1-$85E1: (Y&$38)<<3 3×ASL + 2×ROL → tile 高位
    let t = (y & 0x38) << 3 & 0xff;
    let tileHi = 0;
    // ROL ram_04A7,X (×2)
    for (let k = 0; k < 2; k++) {
      const c = (t & 0x80) ? 1 : 0;
      t = (t << 1) & 0xff;
      tileHi = ((tileHi << 1) | c) & 0xff;
    }
    // ORA ram_04A6,X → ram_04A6,X
    const attrFull = (t | attrLo) & 0xff;
    oam.writeByte(x + 1, attrFull);
    // $85E4-$85F0: ram_04A7,X = (Y&$C0)>>4 | $20 | tileHi
    const nt = (((y & 0xc0) >> 4) | 0x20 | tileHi) & 0xff;
    oam.writeByte(x + 2, nt);
    // $85F3-$85F9: 复制到 3 个偏移 (+9/+16/+23)
    oam.writeByte(x + 9, nt);
    oam.writeByte(x + 16, nt);
    oam.writeByte(x + 23, nt);
    // $85FC-$860C: +8/+15/+22 = attrFull + $20/$40/$60
    oam.writeByte(x + 8, (attrFull + 0x20) & 0xff);
    oam.writeByte(x + 15, (attrFull + 0x40) & 0xff);
    oam.writeByte(x + 22, (attrFull + 0x60) & 0xff);
    // $860F-$8614: ram_04C2,X = (Y&$3F)|$C0
    oam.writeByte(x + 29, ((y & 0x3f) | 0xc0) & 0xff);
    // $8617-$8620: ram_04C3,X = (Y&$C0)>>4 | $23
    oam.writeByte(x + 30, (((y & 0xc0) >> 4) | 0x23) & 0xff);
    // $8623-$862E: ram_04A5/AC/B3/BA,X = 4
    oam.writeByte(x, 4);
    oam.writeByte(x + 7, 4);
    oam.writeByte(x + 14, 4);
    oam.writeByte(x + 21, 4);
    // $8631-$8633: ram_04C1,X = 1
    oam.writeByte(x + 28, 1);

    // $8636-$8648: (ram_0056) = $9BE4 + ram_05CA*$100; ram_04C4,X = [Y]
    const ca = s.read(KEY_05CA);
    const pat = readB11PatternAttr(ca, y);
    oam.writeByte(x + 31, pat);

    // $864D-$8666: 16bit 右移 (ram_003A=ca, A=y) 4 次 → pattern 指针
    let hi = ca & 0xff;
    let mid = y & 0xff;
    let lo = 0;
    for (let k = 0; k < 4; k++) {
      let cHi = 0;
      if (k < 2) {
        cHi = hi & 1; // LSR ram_003A
        hi >>= 1;
      }
      const cMid = mid & 1;
      mid = (mid >> 1) | (cHi << 7); // ROR/LSR A
      lo = ((lo >> 1) | (cMid << 7)) & 0xff; // ROR ram_0056
    }
    // $8667-$866C: ram_0057 = (mid & $1F) | $A0
    const ptrHi = ((mid & 0x1f) | 0xa0) & 0xff;
    // $866F-$8679: bank = (mid & $20) ? $13 : $12
    const bank = (mid & 0x20) ? 0x13 : 0x12;
    // $867A-$8687: MMC3 R7 (H5: 记录到 ram_0023/0025)
    s.write(KEY_0023, (s.read(KEY_0022) | 0x07) & 0xff);
    s.write(KEY_0025, bank);
    // $868A-$86A6: 4×4 读 pattern → ram_04A8,X 起 (X+3..X+18)
    const patternBase = ((ptrHi & 0x1f) << 8 | lo) & 0x1fff; // $A000 窗口 → 0-0x1FFF
    const src = bank === 0x12 ? PRG_BANK_12 : PRG_BANK_13;
    let xi = x + 3; // 起偏移 ram_04A8,X
    for (let o = 0; o < 4; o++) {
      for (let i = 0; i < 4; i++) {
        oam.writeByte(xi, src[(patternBase + o * 4 + i) & 0x1fff] ?? 0xff);
        xi = (xi + 1) & 0xff;
      }
      xi = (xi + 3) & 0xff; // INX INX INX
    }

    // $86A8-$86AC: PLA TAX; ram_04C5,X = 0
    oam.writeByte(x + 32, 0);
    // $86AF-$86B4: Y(恢复)&$3F; CMP #$38; BCS $86BC
    const yRec = y & 0x3f;
    if (yRec < 0x38) {
      // $86B6-$86BB: TXA; CLC; ADC #$20; TAX
      return (x + 0x20) & 0xff;
    }
    // $86BC-$86D2: X≥$38 — TXA→Y; X+=$12; 复制 5B ram_04C1→ram_04B3
    let yy = x;
    const xx = (x + 0x12) & 0xff;
    for (let k = 0; k < 5; k++) {
      oam.writeByte(yy + 14, oam.readByte(yy + 28)); // ram_04B3,Y = ram_04C1,Y
      yy = (yy + 1) & 0xff;
    }
    return xx;
  }

  // ──────────────────────────────────────────────
  // $86D3: 内部函数 — 调色板组提取
  // ──────────────────────────────────────────────

  /**
   * $86D3 — X = A&3; Y = A>>2; v = $8B42[Y];
   * 循环 X 次: v >>= 2; ram_05CA = v & 3。
   */
  private fn_86D3(a: number): void {
    const s = this._store;
    let x = a & 3;                       // $86D4-$86D6: AND #$03; TAX
    let v = readB11Attr((a >> 2) & 0xff); // $86D9-$86DC: LSR LSR; LDA $8B42,Y
    while (x > 0) {                      // $86DF-$86E4: DEX; BMI; LSR LSR; JMP
      v = (v >> 2) & 0xff;
      x -= 1;
    }
    s.write(KEY_05CA, v & 3);            // $86E7-$86E9
  }

  /** 读取 (ram_0052)+off 处的脚本字节 */
  private _readScriptByte(off: number): number {
    return this.readByte(this._getPtr(KEY_0052, KEY_0053) + off);
  }

  /**
   * 等待 OAM 空闲 (对应汇编 `LDA ram_0515 / BNE 自身` 忙等待)。
   * H5 同步执行: 超时后强制置空闲, 防无限循环。
   */
  private _awaitOamIdle(): void {
    const oam = this._store.oam;
    let guard = 0;
    while (oam.isBusy() && guard++ < 100000) {
      // 忙等待 (H5 渲染由外层驱动, 此处直接空转有限次)
    }
    if (guard >= 100000) oam.setIdle();
  }

  // ──────────────────────────────────────────────
  // 固定区辅助 (bank30, H5 语义化)
  // ──────────────────────────────────────────────

  /**
   * $C509→JMP $CB99 (bank30): 表跳转间接。
   * 语义化: 各调用处直接查表分派, 本方法不使用。
   */

  /**
   * $C50C→$CD7C (bank30): A(ID) → (ram_0034) = $0300+ID*12 名字区指针。
   */
  private _queryNamePtr0034(id: number): number {
    return 0x0300 + (id & 0xff) * 12;
  }

  /** 对应固定区 $C512 (处理完成返回)。H5: 无 NMI 返回语义。 */
  private _fixedC512(): void {
    // 完成语义已内联在各入口末尾
  }

  /** 对应固定区 $C515 (渲染同步等待)。H5: 同步由渲染层驱动。 */
  private _fixedC515(): void {
    // H5 空
  }

  /**
   * $C536→$CDC9 (bank30): A 线性索引 → 场地坐标。
   *   X = (A/12)*8 + $34, Y = (A%12)*8 + $54
   */
  private _fixedC536(a: number): { x: number; y: number } {
    let q = 0;
    let r = a & 0xff;
    while (r >= 0x0c) {
      r -= 0x0c;
      q++;
    }
    return {
      x: ((q << 3) + 0x34) & 0xff,
      y: ((r << 3) + 0x54) & 0xff,
    };
  }

  /**
   * $C539→$CDE2 (bank30): (X,Y) 像素 → 精灵位置索引 (行号 + 12*列号)。
   *   越界返回 $FF。
   */
  private _fixedC539(x: number, y: number): number {
    if (x < 0x30) return 0xff;
    const ax = (x - 0x30) & 0xff;
    if (ax >= 0xa0) return 0xff;
    let col = ax >> 3;
    if (y < 0x50) return 0xff;
    const ay = (y - 0x50) & 0xff;
    if (ay >= 0x60) return 0xff;
    let r = ay >> 3;
    while (col > 0) {
      r = (r + 12) & 0xff;
      if (r === 0) return 0xff;
      col--;
    }
    return r;
  }

  // ──────────────────────────────────────────────
  // 工具
  // ──────────────────────────────────────────────

  private _readRamByte(addr: number): number {
    const key = `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    return this._store.read(key);
  }

  private _writeRamByte(addr: number, v: number): void {
    const key = `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    this._store.write(key, v);
  }

  private _read16(loKey: string, hiKey: string): number {
    return (this._store.read(hiKey) << 8) | this._store.read(loKey);
  }

  private _setPtr(loKey: string, hiKey: string, ptr: number): void {
    this._store.write(loKey, ptr & 0xff);
    this._store.write(hiKey, (ptr >> 8) & 0xff);
  }

  private _getPtr(loKey: string, hiKey: string): number {
    return (this._store.read(hiKey) << 8) | this._store.read(loKey);
  }
}