/**
 * Bank 16 Service — Special Moves & Skills (骨架)
 *
 * 数据已直接 import `rom-data/prg-bank-16.ts` (Bank #0x10 = 16), 无 MMC3 切换。
 * PRG offset: 0x020010-0x02200F
 *
 * 本文件为 code 翻译骨架 (来源: _tmp_bzk_out/bank_16.asm, CDL C 标记)。
 *
 * 原始入口 (跳转表):
 *   [0] $8021
 *
 * code 段 (18):
 *   $8003-$80AC (170 B)
 *   $80D1-$8170 (160 B)
 *   $8207-$8290 (138 B)
 *   $829A-$82FB (98 B)
 *   $8330-$838E (95 B)
 *   $839B-$83AE (20 B)
 *   $83B7-$83BA (4 B)
 *   $83C5-$83D5 (17 B)
 *   $83E7-$8441 (91 B)
 *   $8451-$8579 (297 B)
 *   $8583-$8634 (178 B)
 *   $863E-$86A5 (104 B)
 *   $86B8-$86E0 (41 B)
 *   $87E2-$886A (137 B)
 *   $8879-$88F1 (121 B)
 *   $8910-$893A (43 B)
 *   $8944-$89AA (103 B)
 *   $89B3-$89B3 (1 B)
 *
 * 本地函数 (被 JSR 调用, 13):
 *   $80A9×1 $8138×3 $8150×2 $816E×1 $8207×22 $8211×8 $82FB×1 $835C×1 $8677×1 $886A×1 $8991×1 $899C×1 $89A7×1
 *
 * 本地 JMP 目标:
 *   $8021×1 $803F×1 $80CF×1 $80F6×2 $812F×2 $8142×1 $8211×2
 */

import { DataStore } from '../data/DataStore';
import {
  readB16,
  readB16U16,
  readB16CmdPtr,
  readB16PredPtr,
  readB16XCountPtr,
  readB16ScriptBytePtr,
  readB16ScriptCmdPtr,
  readB16TableH,
  readB16TableI,
  readB16Lookup8291,
  readB16Stats8308,
  readB16Lookup83AF,
  readB16Lookup83BB,
  readB16Lookup857A,
  readB16Lookup8622,
  readB16Lookup8635,
  readB16Lookup8645,
  readB16Pair86A6,
  readB16Lookup86C8,
  readB16Table86E3,
  readB16AnimAction,
  readB16AnimHigh,
} from '../data/bank16-data';

// ═══════════════════════════════════════════════════════════════
// RAM 语义键 (替代 NES 内存地址)
// ═══════════════════════════════════════════════════════════════

// 零页
const KEY_0021 = 'ram_0021'; // 按键/方向标志
const KEY_0028 = 'ram_0028';
const KEY_0029 = 'ram_0029';
const KEY_002A = 'ram_002A';
const KEY_002B = 'ram_002B'; // 比赛状态
const KEY_003A = 'ram_003A'; // 脚本游标
const KEY_003B = 'ram_003B'; // 临时
const KEY_0034 = 'ram_0034'; // 名字区指针 lo
const KEY_0035 = 'ram_0035'; // 名字区指针 hi
const KEY_005D = 'ram_005D'; // 脚本指针 lo
const KEY_005E = 'ram_005E'; // 脚本指针 hi
const KEY_00E2 = 'ram_00E2'; // 随机数/帧计数
const KEY_00E3 = 'ram_00E3';

// 零页槽位 (任务队列, $C509/$C51B/$C50F 语义化)
const KEY_SLOT0 = 'ram_0000';
const KEY_SLOT1 = 'ram_0001';
const KEY_SLOT2 = 'ram_0002';

// RAM (技能/必杀)
const KEY_0516 = 'ram_0516'; // 技能状态位
const KEY_0517 = 'ram_0517';
const KEY_0518 = 'ram_0518'; // 技能表索引
const KEY_051A = 'ram_051A'; // 脚本返回栈 lo
const KEY_051B = 'ram_051B'; // 脚本返回栈 hi
const KEY_0522 = 'ram_0522'; // 脚本返回栈指针
const KEY_0523 = 'ram_0523'; // 技能脚本参数
const KEY_0524 = 'ram_0524';
const KEY_0528 = 'ram_0528';
const KEY_0529 = 'ram_0529';
const KEY_052A = 'ram_052A'; // 方向/状态
const KEY_052B = 'ram_052B';
const KEY_052C = 'ram_052C';
const KEY_052D = 'ram_052D';
const KEY_0530 = 'ram_0530';
const KEY_0531 = 'ram_0531';
const KEY_0539 = 'ram_0539';
const KEY_05E3 = 'ram_05E3';
const KEY_05FB = 'ram_05FB'; // 方向标志 (0/非0)

// 球员/场景状态
const KEY_03FD = 'ram_03FD';
const KEY_03FE = 'ram_03FE';
const KEY_043B = 'ram_043B';
const KEY_043C = 'ram_043C';
const KEY_043D = 'ram_043D';
const KEY_043E = 'ram_043E';
const KEY_0441 = 'ram_0441'; // 玩家1 ID
const KEY_0442 = 'ram_0442'; // 玩家2 ID
const KEY_0443 = 'ram_0443';
const KEY_0444 = 'ram_0444'; // 体力
const KEY_0445 = 'ram_0445';
const KEY_0446 = 'ram_0446';
const KEY_0447 = 'ram_0447';
const KEY_0449 = 'ram_0449';
const KEY_044A = 'ram_044A';
const KEY_044E = 'ram_044E';
const KEY_0600 = 'ram_0600';
const KEY_0612 = 'ram_0612'; // 队伍/阶段
const KEY_0616 = 'ram_0616';
const KEY_061C = 'ram_061C';
const KEY_062C = 'ram_062C';
const KEY_0635 = 'ram_0635'; // 场地坐标 X
const KEY_0637 = 'ram_0637'; // 场地坐标 Y
const KEY_0638 = 'ram_0638'; // 场地线性索引

// ═══════════════════════════════════════════════════════════════
// Bank16Service
// ═══════════════════════════════════════════════════════════════

export class Bank16Service {
  constructor(private _store: DataStore) {}

  /** 解释器退出标志 (对应 $80CF PLA;PLA 丢弃返回地址后 RTS 直接回到外层) */
  private _exitFlag = false;

  // ── 数据访问 (原始字节, 经 bank16-data 层) ──

  /** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF) */
  readByte(addr: number): number {
    return readB16(addr);
  }

  /** 读取本 bank 内 16bit 小端数值 */
  readU16(addr: number): number {
    return readB16U16(addr);
  }

  get store(): DataStore { return this._store; }

  // ──────────────────────────────────────────────
  // 固定区辅助 (bank30, H5 语义化)
  // ──────────────────────────────────────────────

  /** $C50C→$CD7C (bank30): A(ID) → (ram_0034) = $0300+ID*12 名字区 */
  private _queryNamePtr0034(id: number): number {
    return 0x0300 + (id & 0xff) * 12;
  }

  /** $C536→$CDC9 (bank30): A 线性索引 → 场地坐标 {x,y} */
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

  /** $C548→$CE99 (bank30): 从 A+1 起搜索空位 (名字区0A==0) 且距 (ram_0635/0637) 半径内的球员 ID */
  private _fixedC548(a: number): number {
    const s = this._store;
    const x0 = s.read(KEY_0635);
    const y0 = s.read(KEY_0637);
    for (let radius = 0x08; radius < 0x100; radius += 0x08) {
      for (let i = 0; i < 0x0a; i++) {
        const id = ((a + 1 + i) & 0xff);
        if (id === s.read(KEY_0441) || id === s.read(KEY_0442)) continue;
        const ptr = this._queryNamePtr0034(id);
        if (this._readRamByte(ptr + 0x0a) !== 0) continue;
        // 距离检查 ($CED6)
        let dx = (this._readRamByte(ptr + 0x06) - x0) & 0xff;
        if (dx & 0x80) dx = ((~dx + 1) & 0xff);
        if (dx >= radius) continue;
        let dy = (this._readRamByte(ptr + 0x08) - y0) & 0xff;
        if (dy & 0x80) dy = ((~dy + 1) & 0xff);
        if (dy >= radius) continue;
        return id;
      }
    }
    return 0xff;
  }

  /** $C551→$CD77 (bank30): A = ram_05FB^$0B → 名字区指针 */
  private _fixedC551(): void {
    this._setPtr(KEY_0034, KEY_0035, this._queryNamePtr0034(this._store.read(KEY_05FB) ^ 0x0b));
  }

  /** $C50F→$CAE7 (bank30): 返回地址存储 — H5 无真实地址, no-op */
  private _fixedC50F(): void {
    // H5: 忽略 (仅原始 ROM 用于记录返回地址)
  }

  /** $C51B→$CB02 (bank30): 槽位计数器 — 若 ram_0001,X (hi)!=0 且 ram_0000,X (lo)==0 → lo=1 */
  private _fixedC51B(x: number): void {
    const hi = this._readRamByte(0x0001 + (x & 0xff));
    if (hi === 0) return;
    const lo = this._readRamByte(0x0000 + (x & 0xff));
    if (lo === 0) {
      this._writeRamByte(0x0000 + (x & 0xff), 1);
    }
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

  private _setPtr(loKey: string, hiKey: string, ptr: number): void {
    this._store.write(loKey, ptr & 0xff);
    this._store.write(hiKey, (ptr >> 8) & 0xff);
  }

  private _getPtr(loKey: string, hiKey: string): number {
    return (this._store.read(hiKey) << 8) | this._store.read(loKey);
  }

  /** 读取名字区 id 第 off 字节 (通过 ram_0034 指针) */
  private _nameByte(id: number, off: number): number {
    return this._readRamByte(this._queryNamePtr0034(id) + off);
  }

  // ──────────────────────────────────────────────
  // 脚本解释器核心 (bank_16.asm $8006-$80AC)
  // ──────────────────────────────────────────────

  /**
   * $8006-$8020 — 根据 ram_0518 选择脚本指针表:
   *   bit7=0 → 表 H ($89BF); bit7=1 → 表 I ($8ABF), 16bit 指针 → ram_005D/005E
   */
  private _loadScriptPtr(): void {
    const idx = this._store.read(KEY_0518);
    const ptr = idx & 0x80 ? readB16TableI(idx & 0x7f) : readB16TableH(idx & 0x7f);
    this._setPtr(KEY_005D, KEY_005E, ptr);
  }

  /** 读脚本当前字节并推进游标 (LDY ram_003A; INC ram_003A; LDA (ram_005D),Y) */
  private _nextScriptByte(): number {
    const cursor = this._store.read(KEY_003A);
    this._store.write(KEY_003A, (cursor + 1) & 0xff);
    return this.readByte(this._getPtr(KEY_005D, KEY_005E) + cursor);
  }

  /** $80F6 — 读脚本 (ptr+Y) 处 16bit 指针 → ram_005D/005E, ram_003A=0 */
  private _readPtrAt(ptr: number, y: number): void {
    this._setPtr(KEY_005D, KEY_005E, this.readU16(ptr + y));
    this._store.write(KEY_003A, 0);
  }

  /** $812F — 谓词结果 X → (X*2 + ram_003A + 1) 处 16bit 指针 → JMP $80F6 */
  private _jmp812F(x: number): void {
    const cursor = this._store.read(KEY_003A);
    const ptr = this._getPtr(KEY_005D, KEY_005E);
    this._readPtrAt(ptr, ((x << 1) + cursor + 1) & 0xff);
  }

  /** $80A9 — 命令分派 (SEC; SBC #$F0; JSR $C509 → 表 A $80AF) */
  private fn_80A9(a: number): void {
    const idx = (a - 0xf0) & 0xff;
    this._dispatchCmdTableA(idx);
  }

  /** 表 A ($80AF) 分派: 命令码 $F0-$FF (idx 0-15) */
  private _dispatchCmdTableA(idx: number): void {
    switch (readB16CmdPtr(idx)) {
      case 0x80cf: this._cmdExit(true); break;            // $F0
      case 0x80d4: this._cmdExit(false); break;           // $F1
      case 0x80f4: this._cmdSetScriptPtr(); break;        // $F2
      case 0x8105: this._cmdPredicate(); break;           // $F3
      case 0x87e0: this.entry_87E2(); break;              // $F4: ram_052A=$40
      case 0x87e6: this._store.write(KEY_052A, 0); break; // $F5
      case 0x87ec: this._store.write(KEY_052A, this._store.read(KEY_052A) ^ 0x40); break; // $F6
      case 0x87f5: this._cmdRead052B(); break;            // $F7
      case 0x87ff: this._cmdRead052C(); break;            // $F8
      case 0x8809: this._cmdRead0530(); break;            // $F9
      case 0x881a: this._cmdPush(); break;                // $FA
      case 0x8837: this._cmdPop(); break;                 // $FB
      case 0x8853: this._cmdRead052D(); break;            // $FC
      case 0x885d: this._cmdReadF(); break;               // $FD
      case 0x88e3: this._cmdRead0539(); break;            // $FE
      case 0x88ed: this._cmdReadG(); break;               // $FF
      default: break;
    }
  }

  // ── 命令处理器 (表 A 目标) ──

  /** $80CF/$80D4 — 退出/清理; PLA;PLA → 退出解释器 */
  private _cmdExit(clear052A: boolean): void {
    if (clear052A) this._store.write(KEY_052A, 0);
    if ((this._store.read(KEY_0516) & 0x08) === 0) {
      this._store.write(KEY_0516, this._store.read(KEY_0516) | 0x08);
      this._fixedC51B(0x05);
    }
    this._store.write(KEY_0522, 0);
    this._store.write(KEY_0021, this._store.read(KEY_0021) & 0x1e);
    this._exitFlag = true;
  }

  /** $80F4 — 读脚本 16bit 指针 → 新脚本指针, ram_003A=0 */
  private _cmdSetScriptPtr(): void {
    const cursor = this._store.read(KEY_003A);
    this._readPtrAt(this._getPtr(KEY_005D, KEY_005E), cursor);
  }

  /** $8105 — 谓词命令: 读字节(不推进) → fn_816E → 按原字节 bit7 分支 */
  private _cmdPredicate(): void {
    const ptr = this._getPtr(KEY_005D, KEY_005E);
    const cursor = this._store.read(KEY_003A);
    const byte = this.readByte(ptr + cursor);
    const x = this.fn_816E(byte);
    if ((byte & 0x80) === 0) {
      this._readPtrAt(ptr, ((x << 1) + cursor + 1) & 0xff); // $812F → $80F6
    } else {
      let p = (ptr + cursor + x + 1) & 0xffff; // $8110-$8117
      p = (p + this.readByte(p)) & 0xffff;     // $811D-$8128
      this._setPtr(KEY_005D, KEY_005E, p);
      this._store.write(KEY_003A, 0);
    }
  }

  /** $87F5 — 读 1 字节 → ram_052B */
  private _cmdRead052B(): void {
    this._store.write(KEY_052B, this._nextScriptByte());
  }

  /** $87FF — 读 1 字节 → ram_052C */
  private _cmdRead052C(): void {
    this._store.write(KEY_052C, this._nextScriptByte());
  }

  /** $8809 — 读 2 字节 → ram_0530/0531 */
  private _cmdRead0530(): void {
    this._store.write(KEY_0530, this._nextScriptByte());
    this._store.write(KEY_0531, this._nextScriptByte());
  }

  /** $881A — PUSH 返回地址 (ram_051A/051B 栈) → JMP $80F6 */
  private _cmdPush(): void {
    const sp = this._store.read(KEY_0522);
    const cursor = this._store.read(KEY_003A);
    const ptr = this._getPtr(KEY_005D, KEY_005E);
    const ret = (ptr + cursor + 2) & 0xffff;
    this._writeRamByte(0x051a + sp, ret & 0xff);
    this._writeRamByte(0x051b + sp, (ret >> 8) & 0xff);
    this._store.write(KEY_0522, (sp + 2) & 0xff);
    this._cmdSetScriptPtr();
  }

  /** $8837 — POP 返回地址; 栈下溢 → JMP $80CF 退出 */
  private _cmdPop(): void {
    const sp = this._store.read(KEY_0522);
    const nx = (sp - 2) & 0xff;
    this._store.write(KEY_0522, nx);
    if (nx & 0x80) {
      this._cmdExit(true); // $8841: JMP $80CF
      return;
    }
    const ret = this._readRamByte(0x051a + nx) | (this._readRamByte(0x051b + nx) << 8);
    this._setPtr(KEY_005D, KEY_005E, ret);
    this._store.write(KEY_003A, 0);
  }

  /** $8853 — 读 1 字节 → ram_052D */
  private _cmdRead052D(): void {
    this._store.write(KEY_052D, this._nextScriptByte());
  }

  /** $885D — 读 1 字节 → fn_886A (表 F) → X → ram_052A */
  private _cmdReadF(): void {
    this._store.write(KEY_052A, this.fn_886A(this._nextScriptByte()));
  }

  /** $88E3 — 读 1 字节 → ram_0539 */
  private _cmdRead0539(): void {
    this._store.write(KEY_0539, this._nextScriptByte());
  }

  /** $88ED — 读 1 字节(不推进) → 表 G ($88F4) 分派 */
  private _cmdReadG(): void {
    const ptr = this._getPtr(KEY_005D, KEY_005E);
    const cursor = this._store.read(KEY_003A);
    const b = this.readByte(ptr + cursor);
    switch (readB16ScriptCmdPtr(b)) {
      case 0x88fc: {
        // $88FC: 查 player1 名字区 (JSR $C50C 写 ram_0034; 读取结果未用) → 游标+1
        this._setPtr(KEY_0034, KEY_0035, this._queryNamePtr0034(this._store.read(KEY_0441)));
        this._store.write(KEY_003A, (cursor + 1) & 0xff);
        break;
      }
      case 0x890d: this.entry_8910(); break; // $890D (含 LDA ram_05FB)
      case 0x893d: this._jmp812F(0); break;  // LDX #$00; JMP $812F
      case 0x8942: this.entry_8944(); break; // LDX #$00 → entry_8944
      default: break;
    }
  }

  // ──────────────────────────────────────────────
  // $8003: 入口跳转表 (1 路)
  // ──────────────────────────────────────────────

  /**
   * 跳转表分发 (bank_16.asm $8003)
   *   [0]→$8021
   */
  dispatch(index: number): void {
    switch (index) {
      case 0: this.entry_8021(); break;
      default: break;
    }
  }

  // ──────────────────────────────────────────────
  // $8021: 入口
  // ──────────────────────────────────────────────

  /**
   * $8021 — 入口: 特殊动作/技能脚本解释器
   * 原始: bank_16.asm $8021-$80A8
   *   初始化 → 主循环: ≥$F0 为控制命令 (分派后继续); <$F0 为技能命令 (读 4 参数后返回)
   */
  entry_8021(): void {
    this._exitFlag = false;
    this._loadScriptPtr();                        // $8006 (外部 JSR $8006 语义并入)
    this._store.write(KEY_052A, this._store.read(KEY_0517)); // $8021-$8026
    this._store.write(KEY_0516, this._store.read(KEY_0516) & 0xfb); // $8027-$802E AND #$FB
    this._store.write(KEY_052B, 0);               // $802F-$803E
    this._store.write(KEY_052D, 0);
    this._store.write(KEY_052C, 0);
    this._store.write(KEY_0530, 0);
    this._store.write(KEY_003A, 0);
    // $803F 主循环
    for (;;) {
      const b = this._nextScriptByte();
      if (b >= 0xf0) {
        this.fn_80A9(b);                          // $8049 JSR $80A9
        if (this._exitFlag) return;               // 退出命令 ($F0/$F1/POP 下溢)
        continue;                                 // $804C JMP $803F
      }
      this._store.write(KEY_0523, b);             // $804F
      this._store.write(KEY_0516, (this._store.read(KEY_0516) | 0x40) & 0xef); // $8052-$8059
      let p2 = this._nextScriptByte();            // $805C-$8069 (参数2)
      if (p2 >= 0xf0) p2 = this.fn_8991(p2);
      this._store.write(KEY_0524, p2);
      let p3 = this._nextScriptByte();            // $806C-$8079 (参数3)
      if (p3 >= 0xf0) p3 = this.fn_899C(p3);
      this._store.write(KEY_0528, p3);
      let p4 = this._nextScriptByte();            // $807C-$8089 (参数4)
      if (p4 >= 0xf0) p4 = this.fn_89A7(p4);
      this._store.write(KEY_0529, p4);
      // $808C: ram_005D += ram_003A (16bit)
      const cur = this._getPtr(KEY_005D, KEY_005E) + this._store.read(KEY_003A);
      this._setPtr(KEY_005D, KEY_005E, cur & 0xffff);
      // $8097-$80A5: 返回地址槽 ($0016/$0017) + $C50F (H5 no-op)
      this._writeRamByte(0x0001 + 0x15, 0xf0);
      this._writeRamByte(0x0002 + 0x15, 0x0b);
      this._fixedC50F();
      return;                                     // $80A8 RTS
    }
  }

  // ──────────────────────────────────────────────
  // $80D1: 入口
  // ──────────────────────────────────────────────

  /**
   * $80CF — 退出/清理 (表 A idx0; 含 ram_052A=0)
   * 原始: bank_16.asm $80CF (服务文件名保留 $80D1 段起点命名)
   */
  entry_80D1(): void {
    this._cmdExit(true);
  }

  // ──────────────────────────────────────────────
  // $8138: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $8138 — 随机化/阈值缩放 (AND #$FC; 若非0: m=(A&$FC)>>1; A=(ram_00E2 % m)+m; X 恒 0)
   * 原始: bank_16.asm $8138-$814F
   * @returns 处理后 A 值 (调用方再 CMP #$80 判段)
   */
  private fn_8138(a: number): number {
    const a2 = a & 0xfc;
    if (a2 === 0) return 0; // AND #$FC; BEQ $814D → A=0
    const m = a2 >> 1;
    const r = this._store.read(KEY_00E2) % m;
    return (r + m) & 0xff;
  }

  // ──────────────────────────────────────────────
  // $8150: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $8150 — 名字区 HP (16bit @ +1) 扣减 $40 (钳 0); X 恒 1
   * 原始: bank_16.asm $8150-$816D
   * @param id 球员 ID (查名字区 $0300+id*12)
   */
  private fn_8150(id: number): void {
    const ptr = this._queryNamePtr0034(id);
    let v = this._readRamByte(ptr + 1) | (this._readRamByte(ptr + 2) << 8);
    v = v >= 0x40 ? v - 0x40 : 0;
    this._writeRamByte(ptr + 1, v & 0xff);
    this._writeRamByte(ptr + 2, (v >> 8) & 0xff);
  }

  // ──────────────────────────────────────────────
  // $816E: 谓词分派 (表 B $8173, 74 项)
  // ──────────────────────────────────────────────

  /**
   * $816E — 谓词分派 (AND #$7F; JSR $C509 → 表 B $8173)
   * @param a 谓词字节
   * @returns X (分支索引: 0=真/假分支1, 1=分支2, ...)
   */
  private fn_816E(a: number): number {
    switch (readB16PredPtr(a & 0x7f)) {
      case 0x821c: return this.pred_821C();
      case 0x822c: return this.pred_822C();
      case 0x8251: return this._store.read(KEY_043D);                                  // LDX ram_043D
      case 0x8255: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x8259: { const v = this._store.read(KEY_044E); return v === 0 ? 0 : (v - 1) & 0xff; } // LDX 044E; BEQ; DEX
      case 0x8260: return this._store.read(KEY_0616);                                  // LDX ram_0616
      case 0x8264: { const v = this._store.read(KEY_0442); return (v === 0 || v === 0x0b) ? 1 : 0; }
      case 0x8271: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x8275: { let x = 2; const v = this._store.read(KEY_0442);
        if (v !== 0 && v !== 0x0b) { x = 1; if (this._store.read(KEY_043D) !== 3) x = 0; } return x; }
      case 0x828a: return readB16Lookup8291(this._store.read(KEY_043B));               // LDX $8291,Y (Y=043B)
      case 0x8297: return this._store.read(KEY_043D);                                  // LDX ram_043D
      case 0x829b: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x829f: { let x = 0; const v = this._store.read(KEY_043C) & 0x7f;
        if (this._store.read(KEY_043B) === 0) { if (v >= 3) x = 1; } else { if (v !== 0) x = 1; } return x; }
      case 0x82ba: return this.pred_82BA();
      case 0x8366: return this._store.read(KEY_043B);                                  // LDX ram_043B
      case 0x836a: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x836e: { let x = 0; if (this._store.read(KEY_043B) !== 1) { x = this.fn_8677() + 1; } return x; }
      case 0x837c: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x8380: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x8384: return this.pred_8384();
      case 0x83a4: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x83a8: return readB16Lookup83AF(this._store.read(KEY_043D));               // LDX $83AF,Y (Y=043D)
      case 0x83b4: return readB16Lookup83BB(this._store.read(KEY_043B));               // LDX $83BB,Y (Y=043B)
      case 0x83c2: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x83c6: { const v = this.fn_8207(this._store.read(KEY_0441)); return (v === 0x1c || v === 0x48) ? 0 : 1; }
      case 0x83d6: return this._store.read(KEY_043E) & 0x7f;                           // LDA 043E; AND #$7F
      case 0x83dd: return this._store.read(KEY_043E) & 0x7f;                           // LDA 043E; AND #$7F
      case 0x83e4: return this._store.read(KEY_043E) & 0x7f;                           // LDA 043E; AND #$7F; TAX
      case 0x83eb: { const v = this._store.read(KEY_043C) & 0x7f; this.fn_8211(v); return v; }
      case 0x83f5: { this.fn_8211(1); return this._store.read(KEY_043C) & 0x7f; }
      case 0x8401: { const v = this._store.read(KEY_043C) & 0x7f; this.fn_8211(v); return v; }
      case 0x840a: return this._store.read(KEY_043B);                                  // LDX ram_043B
      case 0x840e: return this.pred_840E();
      case 0x842b: return this._store.read(KEY_061C) >= 0x60 ? 1 : 0;                  // CMP #$60
      case 0x8436: return this._store.read(KEY_05FB) === 0 ? 0 : 1;                    // LDX 05FB; BEQ; LDX #$01
      case 0x843e: return this._store.read(KEY_002A);                                  // LDX ram_002A
      case 0x8442: { const v = this.fn_8207(this._store.read(KEY_0441)); return v === 0x60 ? 1 : 0; }
      case 0x844e: { const x = this._store.read(KEY_0447); if (x === 0) this._store.write(KEY_0447, 1); return x; }
      case 0x8457: return this.pred_8457();
      case 0x847e: return this.pred_847E();
      case 0x8498: return this.pred_8498();
      case 0x84b2: return this.pred_84B2();
      case 0x84c7: return this.pred_84C7();
      case 0x84e7: return this._store.read(KEY_0600) === 0 ? 0 : 1;                    // LDX 0600; BEQ; LDX #$01
      case 0x84ef: return (this._store.read(KEY_043C) & 0x7f) === 0x13 ? 1 : 0;        // CMP #$13
      case 0x84fc: return this.pred_84FC();
      case 0x850b: return this.pred_850B();
      case 0x8527: return this.pred_8527();
      case 0x853a: { const v = this.fn_8207(this._store.read(KEY_0441)); return v === 0x15 ? 0 : 1; }
      case 0x8546: { const v = this.fn_8207(this._store.read(KEY_0441)); return (v === 0x1b || v === 0x4a) ? 0 : 1; }
      case 0x8556: return this.pred_8556();
      case 0x856c: return this._store.read(KEY_044E);                                  // LDX ram_044E
      case 0x8570: return readB16Lookup857A(this._store.read(KEY_043D));               // LDX $857A,Y (Y=043D)
      case 0x8580: return this._store.read(KEY_043E) & 0x7f;                           // LDA 043E; AND #$7F
      case 0x8587: { const x = this._store.read(KEY_043E) & 0x7f; return x === 0 ? 0 : 1; }
      case 0x8592: { const v = this.fn_8207(this._store.read(KEY_0441)); return (v === 0x1a || v === 0x41) ? 0 : 1; }
      case 0x85a2: { const v = this.fn_8207(this._store.read(KEY_0441)); return (v === 0x1d || v === 0x4b) ? 0 : 1; }
      case 0x85b2: { const v = this.fn_8207(this._store.read(KEY_0441)); return v === 0x3e ? 0 : 1; }
      case 0x85be: { const v = this.fn_8207(this._store.read(KEY_0441)); return v === 0x2b ? 0 : 1; }
      case 0x85ca: { const v = this.fn_8207(this._store.read(KEY_0441)); return (v === 0x20 || v === 0x45) ? 0 : 1; }
      case 0x85da: { const v = this.fn_8207(this._store.read(KEY_0441)); return v === 0x11 ? 0 : 1; }
      case 0x85e6: return this.pred_85E6();
      case 0x85fe: return this._store.read(KEY_0612);                                  // LDX ram_0612
      case 0x8602: return this.pred_8602();
      case 0x8610: return this.pred_8610();
      case 0x8627: return this._store.read(KEY_00E2) & 0x01;                           // LDA 00E2; AND #$01
      case 0x862e: return readB16Lookup8635(this._store.read(KEY_043D));               // LDX $8635,Y (Y=043D)
      case 0x863b: return readB16Lookup8645(this._store.read(KEY_043D) & 0x0f);        // AND #$0F → $8645,Y
      case 0x864a: return this.pred_864A();
      case 0x8677: return this.fn_8677();                                              // 体力判定扣减
      case 0x868a: return this.pred_868A();
      case 0x86b6: return this.pred_86B6();
      case 0x86cc: return this.pred_86CC();
      default: return 0x40;
    }
  }

  // ── 表 B 谓词目标辅助 (谓词公共子例程) ──

  /** $8207 — JSR $C50C(id); LDA (ram_0034),Y0; LDX #$00 — 返回名字区 byte0 */
  private fn_8207(id: number): number {
    return this._readRamByte(this._queryNamePtr0034(id));
  }

  /** $8211 — BEQ $821B; LDA ram_0516; ORA #$04; STA ram_0516 — 若 A≠0 置 0516 bit2 */
  private fn_8211(a: number): void {
    if (a !== 0) {
      this._store.write(KEY_0516, this._store.read(KEY_0516) | 0x04);
    }
  }

  /** $82FB — JSR $C509 → 表 D ($82FE) 分派 (X 计数 0-4) */
  private fn_82FB(a: number): void {
    switch (readB16XCountPtr(a)) {
      case 0x8336: break;                                   // $8336: RTS
      case 0x8337:                                          // $8337: 0612=2; INC 0616
        this._store.write(KEY_0612, 2);
        this._store.write(KEY_0616, (this._store.read(KEY_0616) + 1) & 0xff);
        break;
      case 0x832d:                                          // $832D: fn_8350; 0612=2
        this.fn_8350();
        this._store.write(KEY_0612, 2);
        break;
      case 0x8340:                                          // $8340: fn_8350; fn_835C; 043C=2
        this.fn_8350();
        this.fn_835C();
        this._store.write(KEY_043C, 2);
        break;
      case 0x834c: this.fn_8350(); break;                   // $834C: fn_8350
      default: break;
    }
  }

  /** $8350 — ram_0442 = $C548(ram_05FB^$0B) */
  private fn_8350(): void {
    this._store.write(KEY_0442, this._fixedC548(this._store.read(KEY_05FB) ^ 0x0b));
  }

  /** $835C — ram_0441 = $C548(ram_05FB) */
  private fn_835C(): void {
    this._store.write(KEY_0441, this._fixedC548(this._store.read(KEY_05FB)));
  }

  /** $8677 — 体力判定: fn_8138(0444)≥$80 → fn_8150(0442); 返回 X (0/1) */
  private fn_8677(): number {
    if (this.fn_8138(this._store.read(KEY_0444)) >= 0x80) {
      this.fn_8150(this._store.read(KEY_0442));
      return 1;
    }
    return 0;
  }

  // ── 表 B 谓词目标 (复杂实现) ──

  /** $821C — player2 名字区 byte0==0 → X=1 */
  private pred_821C(): number {
    return this._nameByte(this._store.read(KEY_0442), 0) === 0 ? 1 : 0;
  }

  /** $822C — 体力判定: fn_8138(0612≥2?0445:0444)≥$80 → fn_8150(0612≥2?0441:0442); X=1 */
  private pred_822C(): number {
    const useA = this._store.read(KEY_0612) >= 2;
    const a = this.fn_8138(useA ? this._store.read(KEY_0445) : this._store.read(KEY_0444));
    if (a >= 0x80) {
      this.fn_8150(useA ? this._store.read(KEY_0441) : this._store.read(KEY_0442));
      return 1;
    }
    return 0;
  }

  /** $82BA — 射门力量表查询: 062C 阈值推进 0443, 按 ram_00E3 查 $8308 统计 → fn_82FB */
  private pred_82BA(): number {
    let a43 = this._store.read(KEY_0443);
    if (a43 !== 6) {
      let a = this._store.read(KEY_062C);
      if (a & 0x80) a = (~a + 1) & 0xff;
      if (a >= 0x40) a = (~a) & 0x3f;
      if (a >= 0x20) {
        a43 = (a43 + 1) & 0xff;
        this._store.write(KEY_0443, a43);
      }
    }
    let y = (a43 * 5) & 0xff;
    let x = 0;
    const rnd = this._store.read(KEY_00E3);
    while (rnd < readB16Stats8308(y)) {
      x = (x + 1) & 0xff;
      y = (y + 1) & 0xff;
    }
    this.fn_82FB(x);
    return x;
  }

  /** $8384 — JSR $838B (0612==1/2 → 0442=$C548(05FB^$0B)); 返回 0612 */
  private pred_8384(): number {
    const t = this._store.read(KEY_0612);
    if (t === 1 || t === 2) {
      this._store.write(KEY_0442, this._fixedC548(this._store.read(KEY_05FB) ^ 0x0b));
    }
    return t;
  }

  /** $840E — fn_8207(05FB^$0B) 类型判定: $74→2, $22/$39/$4C→1, 否则 0 */
  private pred_840E(): number {
    const v = this.fn_8207(this._store.read(KEY_05FB) ^ 0x0b);
    if (v === 0x74) return 2;
    if (v === 0x22 || v === 0x39 || v === 0x4c) return 1;
    return 0;
  }

  /** $8457 — 002B==$22 且 0028>0029 → 03FD=$80/03FE=$CA, 05FB==0→X=1 */
  private pred_8457(): number {
    let x = 0;
    if (this._store.read(KEY_002B) === 0x22) {
      const hi = this._store.read(KEY_0028);
      const lo = this._store.read(KEY_0029);
      let y = 0;
      if (hi >= lo && hi !== lo) {
        y = 0x80;
        this._store.write(KEY_03FE, 0xca);
        if (this._store.read(KEY_05FB) === 0) x = 1;
      }
      this._store.write(KEY_03FD, y);
    }
    return x;
  }

  /** $847E — player2 动作表非空 → player1 动作表 + 0516 bit2; X=$86F4[byte0(0441)] */
  private pred_847E(): number {
    const a2 = this.fn_8207(this._store.read(KEY_0442));
    if (readB16AnimAction(a2) === 0) return 0;
    const a1 = this.fn_8207(this._store.read(KEY_0441));
    const x1 = readB16AnimAction(a1);
    this.fn_8211(a1);
    return x1;
  }

  /** $8498 — 反向: player1 动作表非空 → player2 动作表 + 0516 bit2 */
  private pred_8498(): number {
    const a1 = this.fn_8207(this._store.read(KEY_0441));
    if (readB16AnimAction(a1) === 0) return 0;
    const a2 = this.fn_8207(this._store.read(KEY_0442));
    const x2 = readB16AnimAction(a2);
    this.fn_8211(a2);
    return x2;
  }

  /** $84B2 — 043E bit7 → player2 动作表 + 0516 bit2; X=0 或动作值 */
  private pred_84B2(): number {
    let x = 0;
    if (this._store.read(KEY_043E) & 0x80) {
      const a = this.fn_8207(this._store.read(KEY_0442));
      x = readB16AnimAction(a);
      this.fn_8211(a);
    }
    return x;
  }

  /** $84C7 — (05FB==0?0441:0442) 名字区 HP(16bit) < $64 → X=1 */
  private pred_84C7(): number {
    const id = this._store.read(KEY_05FB) === 0 ? this._store.read(KEY_0441) : this._store.read(KEY_0442);
    const ptr = this._queryNamePtr0034(id);
    const hp = this._readRamByte(ptr + 1) | (this._readRamByte(ptr + 2) << 8);
    return hp < 0x64 ? 1 : 0;
  }

  /** $84FC — $C551(05FB^$0B) 名字区 +7 ≥ $18 → X=1 */
  private pred_84FC(): number {
    const v = this._nameByte(this._store.read(KEY_05FB) ^ 0x0b, 7);
    return v >= 0x18 ? 1 : 0;
  }

  /** $850B — 043E bit7: 0442 名字区 byte0 ∈ {0F→1, 21/40→2} */
  private pred_850B(): number {
    if ((this._store.read(KEY_043E) & 0x80) === 0) return 0;
    const v = this.fn_8207(this._store.read(KEY_0442));
    if (v === 0x0f) return 1;
    if (v === 0x21 || v === 0x40) return 2;
    return 0;
  }

  /** $8527 — 0441 名字区 byte0: $60→2, $01→1, 否则 0 */
  private pred_8527(): number {
    const v = this.fn_8207(this._store.read(KEY_0441));
    if (v === 0x60) return 2;
    if (v === 0x01) return 1;
    return 0;
  }

  /** $8556 — 043E&$7F≠0: 0442 名字区 byte0 → $876A 表 X + 0516 bit2 */
  private pred_8556(): number {
    if ((this._store.read(KEY_043E) & 0x7f) === 0) return 0;
    const a = this.fn_8207(this._store.read(KEY_0442));
    const x = readB16AnimHigh(a);
    this.fn_8211(a);
    return x;
  }

  /** $85E6 — X = (043D-7) + 3×(043B-7) (8bit 网格索引; ASL 进位并入) */
  private pred_85E6(): number {
    let b = (this._store.read(KEY_043B) - 0x07) & 0xff;
    b = ((b << 1) + b + (b >> 7)) & 0xff; // ASL → carry = bit7, ADC 并入
    return ((this._store.read(KEY_043D) - 0x07) + b) & 0xff;
  }

  /** $8602 — 0441 名字区 byte0 → $86F4 动作表 X + 0516 bit2 */
  private pred_8602(): number {
    const a = this.fn_8207(this._store.read(KEY_0441));
    const x = readB16AnimAction(a);
    this.fn_8211(a);
    return x;
  }

  /** $8610 — (05FB^$0B) 名字区 byte0 匹配 $8623[1..4]=[02 0F 21 22] → X 1-4, 否则 0 */
  private pred_8610(): number {
    const v = this.fn_8207(this._store.read(KEY_05FB) ^ 0x0b);
    for (let x = 4; x >= 1; x--) {
      if (v === readB16Lookup8622(x)) return x;
    }
    return 0;
  }

  /** $864A — 0612<3 且 fn_8138(0444)≥$80: (05FB^$0B)+5 钳 $7F 回写; X=1 */
  private pred_864A(): number {
    if (this._store.read(KEY_0612) >= 3) return 0;
    const a = this.fn_8138(this._store.read(KEY_0444));
    if (a < 0x80) return 0;
    const ptr = this._queryNamePtr0034(this._store.read(KEY_05FB) ^ 0x0b);
    let v = this._readRamByte(ptr + 5);
    if (v >= 0x80) v = 0x7f;
    this._writeRamByte(ptr + 5, v);
    return 1;
  }

  /** $868A — 0441 名字区 byte0 匹配 $86A6 对表 → 结果值; 恒置 0516 bit2 */
  private pred_868A(): number {
    const v = this.fn_8207(this._store.read(KEY_0441));
    let y = 0;
    for (; y < 14; y += 2) {
      if (v === readB16Pair86A6(y)) break;
    }
    const x = readB16Pair86A6(y + 1);
    this.fn_8211(1);
    return x;
  }

  /** $86B6 — 043C&$7F 匹配 $86C8=[08 0A 10 1F] → X 0-3, 否则 4 */
  private pred_86B6(): number {
    const v = this._store.read(KEY_043C) & 0x7f;
    for (let x = 0; x < 4; x++) {
      if (v === readB16Lookup86C8(x)) return x;
    }
    return 4;
  }

  /** $86CC — 0441 名字区 byte0 匹配 $86E3(17B) → X (0-16/17); 恒调 fn_8211(名字字节) 置 0516 bit2 */
  private pred_86CC(): number {
    const v = this.fn_8207(this._store.read(KEY_0441));
    let x = 0;
    while (x < 0x11 && v !== readB16Table86E3(x)) x++;
    this.fn_8211(v); // $86DE-$86E1: 匹配/未匹配两路均 JMP $8211 (A=名字字节)
    return x;
  }

  // ──────────────────────────────────────────────
  // $8207: 入口
  // ──────────────────────────────────────────────

  /**
   * $8207 — 入口: 查询球员名字区 byte0 (JSR $C50C 语义)
   * @param id 球员 ID (调用方置 A)
   */
  entry_8207(id: number): number {
    return this.fn_8207(id);
  }

  // ──────────────────────────────────────────────
  // $829A: 入口
  // ──────────────────────────────────────────────

  /**
   * $8297/$829A — LDX ram_043D; RTS (表 B idx10)
   */
  entry_829A(): number {
    return this._store.read(KEY_043D);
  }

  // ──────────────────────────────────────────────
  // $8330: 入口
  // ──────────────────────────────────────────────

  /**
   * $8330 — 入口 (表 D idx2 目标尾部: 0612=2)
   */
  entry_8330(): void {
    this._store.write(KEY_0612, 2);
  }

  // ──────────────────────────────────────────────
  // $839B: 入口
  // ──────────────────────────────────────────────

  /**
   * $8398/$839B — ram_0442 = $C548(ram_05FB ^ $0B)
   * 原始: bank_16.asm $8398-$83A3 (LDA ram_05FB; EOR #$0B; JSR $C548; STA ram_0442; RTS)
   */
  entry_839B(): void {
    this._store.write(KEY_0442, this._fixedC548(this._store.read(KEY_05FB) ^ 0x0b));
  }

  // ──────────────────────────────────────────────
  // $83B7: 入口
  // ──────────────────────────────────────────────

  /**
   * $83B4/$83B7 — LDY ram_043B; LDX $83BB,Y; RTS
   * 原始: bank_16.asm $83B4-$83BA
   */
  entry_83B7(): number {
    return readB16Lookup83BB(this._store.read(KEY_043B));
  }

  // ──────────────────────────────────────────────
  // $83C5: 入口
  // ──────────────────────────────────────────────

  /**
   * $83C2/$83C5 — LDX ram_0612; RTS
   * 原始: bank_16.asm $83C2-$83C5
   */
  entry_83C5(): number {
    return this._store.read(KEY_0612);
  }

  // ──────────────────────────────────────────────
  // $83E7: 入口
  // ──────────────────────────────────────────────

  /**
   * $83E4/$83E7 — LDA ram_043E; AND #$7F; TAX; RTS
   * 原始: bank_16.asm $83E4-$83EA
   */
  entry_83E7(): number {
    return this._store.read(KEY_043E) & 0x7f;
  }

  // ──────────────────────────────────────────────
  // $8451: 入口
  // ──────────────────────────────────────────────

  /**
   * $844E/$8451 — LDX ram_0447; BNE; INC ram_0447; RTS
   * 原始: bank_16.asm $844E-$8456
   */
  entry_8451(): number {
    const x = this._store.read(KEY_0447);
    if (x === 0) this._store.write(KEY_0447, 1);
    return x;
  }

  // ──────────────────────────────────────────────
  // $8583: 入口
  // ──────────────────────────────────────────────

  /**
   * $8580/$8583 — LDA ram_043E; AND #$7F; TAX; RTS
   * 原始: bank_16.asm $8580-$8586
   */
  entry_8583(): number {
    return this._store.read(KEY_043E) & 0x7f;
  }

  // ──────────────────────────────────────────────
  // $863E: 入口
  // ──────────────────────────────────────────────

  /**
   * $863B/$863E — LDA ram_043D; AND #$0F; TAY; LDX $8645,Y; RTS
   * 原始: bank_16.asm $863B-$8644
   */
  entry_863E(): number {
    return readB16Lookup8645(this._store.read(KEY_043D) & 0x0f);
  }

  // ──────────────────────────────────────────────
  // $86B8: 入口
  // ──────────────────────────────────────────────

  /**
   * $86B6/$86B8 — 043C&$7F 匹配 $86C8=[08 0A 10 1F] → X, 否则 4
   * 原始: bank_16.asm $86B6-$86C7
   */
  entry_86B8(): number {
    return this.pred_86B6();
  }

  // ──────────────────────────────────────────────
  // $87E2: 入口
  // ──────────────────────────────────────────────

  /**
   * $87E0/$87E2 — 表 A idx4: ram_052A = $40 (LDA #$40; STA ram_052A; RTS)
   */
  entry_87E2(): void {
    this._store.write(KEY_052A, 0x40);
  }

  // ──────────────────────────────────────────────
  // $886A: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $886A — 表 F ($886D) 分派: 读脚本字节 → 检查函数 → X (0/$40)
   */
  private fn_886A(a: number): number {
    switch (readB16ScriptBytePtr(a)) {
      case 0x8877: return this.entry_8879(); // $8877: LDA #$00 → 位置象限检查
      case 0x88aa: return (this._store.read(KEY_0616) & 0x01) ? 0x40 : 0x00;
      case 0x88b5: return this._store.read(KEY_05FB) !== 0 ? 0x40 : 0x00;
      case 0x88bf: return this._check88BF();
      case 0x88d9: return (this._store.read(KEY_062C) & 0x80) ? 0x40 : 0x00;
      default: return 0x40;
    }
  }

  // ──────────────────────────────────────────────
  // $8879: 入口
  // ──────────────────────────────────────────────

  /**
   * $8877/$8879 — 表 F idx0: 球(ram_0638) 相对球员1 位置象限计数
   *   ram_003B: 球Y<球员Y → +1; 球X<球员X → +2; 计数 0 或 3 → $40, 否则 0
   */
  entry_8879(): number {
    let c = 0; // ram_003B
    const np = this._queryNamePtr0034(this._store.read(KEY_0441));
    const { x, y } = this._fixedC536(this._store.read(KEY_0638));
    if (y < this._readRamByte(np + 0x08)) c++;    // $888A-$888F
    if (x < this._readRamByte(np + 0x06)) c += 2; // $8894-$889B
    return c === 0 || c === 3 ? 0x40 : 0x00;      // $889D-$88A9
  }

  /** $88BF — 表 F idx3: player1 名字区+8 (随 ram_05FB 取反) ≥ $80 → 0, 否则 $40 */
  private _check88BF(): number {
    const np = this._queryNamePtr0034(this._store.read(KEY_0441));
    let a = this._readRamByte(np + 0x08);
    if (this._store.read(KEY_05FB) !== 0) a = (~a) & 0xff;
    return a >= 0x80 ? 0x00 : 0x40;
  }

  // ──────────────────────────────────────────────
  // $8910: 入口
  // ──────────────────────────────────────────────

  /**
   * $890D/$8910 — 表 G idx1: 反击推进条件
   *   ram_05FB==0 且 ram_002B==5 且 ram_0446≠0 且 ram_043C≠3 且 ram_0446<4 且 ram_043C≠0
   *   → ram_0446++ 且 X=旧 ram_0446 ($8927 LDX 先于 $8933 INC); 否则 X=0 → JMP $812F
   */
  entry_8910(): void {
    let x = 0;
    if (this._store.read(KEY_05FB) === 0 && this._store.read(KEY_002B) === 5) {
      const v = this._store.read(KEY_0446);
      if (v === 0) {
        x = 0;                        // $8919 LDX 0446 → $891C BEQ $893A
      } else if (this._store.read(KEY_043C) === 3) {
        x = 1;                        // $891E LDX #$01 → $8925 BEQ $893A
      } else if (v >= 4) {
        x = 0;                        // $892A CPX #$04 → $892C BCS $8938
      } else if (this._store.read(KEY_043C) === 0) {
        x = 0;                        // $8931 BEQ $8938
      } else {
        this._store.write(KEY_0446, (v + 1) & 0xff);
        x = v;                        // $8927 LDX 0446 (旧值) → $8936 BNE $893A → JMP $812F
      }
    }
    this._jmp812F(x);
  }

  // ──────────────────────────────────────────────
  // $8944: 入口
  // ──────────────────────────────────────────────

  /**
   * $8942/$8944 — 表 G idx3: 搜索名字区 byte0==$1A 的球员 (id 1-10)
   *   命中 且 ram_043C≥3 且 ram_0449 bit7=0 → ram_0449++; ==2 时: ram_00E2<0x20
   *   → ram_044A=$1E, ram_0449=$80, X=1; 否则 ram_0449=0 → JMP $812F
   */
  entry_8944(): void {
    let x = 0;
    if (this._store.read(KEY_05FB) === 0) {
      let hit = false;
      for (let id = 1; id <= 0x0a; id++) {
        if (this._readRamByte(this._queryNamePtr0034(id)) === 0x1a) { hit = true; break; }
      }
      if (hit && this._store.read(KEY_043C) >= 3 && (this._store.read(KEY_0449) & 0x80) === 0) {
        const v = (this._store.read(KEY_0449) + 1) & 0xff;
        this._store.write(KEY_0449, v);
        if (v === 2) {
          if (this._store.read(KEY_00E2) < 0x20) {
            this._store.write(KEY_044A, 0x1e);
            this._store.write(KEY_0449, 0x80);
            x = 1;
          } else {
            this._store.write(KEY_0449, 0x00);
          }
        }
      }
    }
    this._jmp812F(x);
  }

  // ──────────────────────────────────────────────
  // $8991: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $8991 — 表 ($8997): [0]→$8999 (LDA #$FF; RTS) — 恒返 $FF
   */
  private fn_8991(_a: number): number {
    return 0xff;
  }

  // ──────────────────────────────────────────────
  // $899C: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $899C — 表 ($89A2): [0]→$89A4 (LDA #$FF; RTS) — 恒返 $FF
   */
  private fn_899C(_a: number): number {
    return 0xff;
  }

  // ──────────────────────────────────────────────
  // $89A7: 内部函数
  // ──────────────────────────────────────────────

  /**
   * $89A7 — 表 ($89AD): [0]→$89B1 (LDA #$FF; RTS), [1]→$89B4 (实际执行)
   */
  private fn_89A7(a: number): number {
    const idx = (a - 0xf0) & 0xff;
    if (idx === 1) return this.entry_89B3();
    return 0xff;
  }

  // ──────────────────────────────────────────────
  // $89B3: 入口
  // ──────────────────────────────────────────────

  /**
   * $89B4 — fn_89A7 表 idx1 目标: ram_05E3 |= $40; 返回 $FF
   *   (AD E3 05; 09 40; 8D E3 05; A9 FF; 60)
   */
  entry_89B3(): number {
    this._store.write(KEY_05E3, this._store.read(KEY_05E3) | 0x40);
    return 0xff;
  }

}