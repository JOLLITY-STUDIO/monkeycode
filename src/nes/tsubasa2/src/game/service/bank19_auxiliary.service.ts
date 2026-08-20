/**
 * Bank 19 Service — 剧情场景精灵/文字渲染库 (完整翻译)
 *
 * 数据已直接 import `rom-data/prg-bank-19.ts`, 无 MMC3 切换。
 *
 * ── MMC3 窗口映射 (关键修正) ─────────────────────────────
 * Bank19 物理 0x026010-0x02800F 被映射到 CPU $A000-$BFFF 窗口 (R7)。
 * 反汇编 asm 中的标注地址 (前缀 09, 形如 $9000) 是「$8000 相对偏移」,
 * 实际 CPU 地址 = 标注地址 + $2000 (即 $9000 → $B000)。
 * 因此骨架中标注的「外部函数 $B043/$B0AF/$B127/$B15A/$B160/$B2A6/
 * $B339/$B3CB/$B3FA/$B406」全部是本 bank 自己的代码段:
 *   $B043←$9043  $B0AF←$90AF  $B127←$9127  $B15A←$915A
 *   $B160←$9160  $B2A6←$92A6  $B339←$9339  $B3CB←$93CB
 *   $B3FA←$93FA  $B406←$9406
 *
 * ── 功能总览 ────────────────────────────────────────────
 * 处理一条「剧情数据流」(指针 $B467 = 标注 $9467, 本 bank 内)：
 *   字节 < $E0  → 精灵渲染 (单精灵 / 精灵组, 取决于 ram_063F bit6)
 *   字节 ≥ $E0  → 控制码 (减 $E0 后经 15 路跳转表 $B166 分派)
 * 另含: 名字区文字写入($C50C/$C524)、调色板特效(fade/清空/填充)、
 * 延时($C515 帧同步)、场景重置($B349)。
 *
 * 外部通过 start() 开始播放, update() 每帧驱动 (渲染层消费 oam/NT)。
 */

import { DataStore } from '../data/DataStore';
import PRG_BANK_19 from '../data/prg-bank-19';
import PRG_BANK_31 from '../data/prg-bank-31'; // $FBCC 调色板表 (固定区)

// ═══════════════════════════════════════════════════════════════
// 常量 (地址均为本 bank 数组内索引)
// ═══════════════════════════════════════════════════════════════

/** 数据流起点: 标注 $9467 → 数组索引 $9467-$8000 */
export const BANK19_STREAM_OFFSET = 0x1467;
/** 控制码最小值 (≥ $E0 为控制码) */
export const BANK19_CTRL_MIN = 0xe0;

/**
 * 控制码跳转表 (CPU $B166 起, 索引 = 控制码-$E0) — ROM dump 验证:
 *   仅 idx 0-6 有效 (B1A6/B1E0/B1F3/B218/B21B/B224/B235),
 *   idx 7-27 为 00 00 (数据区, 不可达), idx 28 = $B333 (控制码 $FC 动画锁)。
 */
export const BANK19_CTRL_TABLE: ReadonlyArray<number | null> = (() => {
  const t: Array<number | null> = new Array(32).fill(null);
  const entries: ReadonlyArray<[number, number]> = [
    [0, 0xb1a6], [1, 0xb1e0], [2, 0xb1f3], [3, 0xb218],
    [4, 0xb21b], [5, 0xb224], [6, 0xb235], [28, 0xb333],
  ];
  for (const [i, addr] of entries) t[i] = addr;
  return t;
})();

// ═══════════════════════════════════════════════════════════════
// Bank19Service
// ═══════════════════════════════════════════════════════════════

export class Bank19Service {
  // ── 状态 (对应 NES RAM) ──

  /** 数据流指针 (PRG_BANK_19 数组索引, 对应 ram_0088/0089 指针) */
  private _streamPtr = 0;
  /** 数据流内偏移 (对应 ram_008A) */
  private _streamPos = 0;
  /** 子索引 (对应 ram_008B) */
  private _subIndex = 0;
  /** 模式标志 (对应 ram_063F: bit6=1 单精灵模式) */
  private _modeFlag = 0;
  /** 延时控制码剩余帧数 ($B1E0) */
  private _delayFrames = 0;
  /** 场景重置计数 (对应 ram_004A) */
  private _resetCount = 0;
  /** 名字区文字位置 (对应 ram_02F8-$02FF PPU 队列) */
  private _textQueue = new Uint8Array(8);

  /** 数据流结束 (对应 $B3FA 无限等待) */
  private _done = false;

  /** 单精灵模式循环 ($B0AF 每帧一个字符, ram_063F bit6=1) */
  private _singleMode = false;

  /** 场景重置子阶段状态机 ($B349) */
  private _scenePhase = 0;
  /** $B406 精灵组绘制轮次 (0-3) */
  private _sceneRow = 0;
  /** $B406 当前 A 参数 (tile 高位) */
  private _sceneTileHi = 0;
  /** $B2A6 调色板填充当前值 */
  private _palValue = 0;
  /** $B1A6 文字区清空索引 (ram_0557/0558 游标) */
  private _clearIdx = 0;

  /** $B349 场景重置初始延时帧数 (ram_004A 递减前的 $60 帧) */
  private _sceneDelay = 0;

  constructor(private _store: DataStore) {}

  // ──────────────────────────────────────────────
  // 公开接口
  // ──────────────────────────────────────────────

  /** 主入口 ($9000/CPU $B000): 初始化状态并开始处理数据流 */
  start(streamOffset: number = BANK19_STREAM_OFFSET): void {
    const s = this._store;
    // $9000-$902B: 初始化
    s.write('ram_0490', 0);
    s.write('ram_0491', 2);
    s.write('ram_0087', 2);
    this._streamPtr = streamOffset;  // ram_0088/0089 = $B467 → 数组索引 $1467
    s.write('ram_05FB', 0);
    s.write('ram_0441', 9);
    s.write('ram_0442', 0x14);
    s.write('ram_063F', 0x80);
    this._modeFlag = 0x80;
    this._streamPos = 0;
    this._done = false;
    this._singleMode = false;
    this._scenePhase = 0;
    this._sceneDelay = 0;
    this._resetCount = 0;
    this._delayFrames = 0;
  }

  /** 每帧驱动: 处理一个数据流步骤 (对应原版一次 $C515 帧同步后的逻辑) */
  update(_frameCount: number): boolean {
    if (this._done) return true;
    // 延时控制码计数 ($B1E0)
    if (this._delayFrames > 0) {
      this._delayFrames--;
      return false;
    }
    // 场景重置状态机 ($B349 多帧驱动)
    if (this._scenePhase > 0) {
      this._sceneTick();
      return false;
    }
    // 单精灵模式: $B0AF 每帧一个字符
    if (this._singleMode) {
      if (this._peekStreamByte() >= BANK19_CTRL_MIN) {
        this._singleMode = false; // $90AF: ≥$E0 → RTS 回数据流
      } else {
        this._drawSingleChar();
      }
      return false;
    }
    // $B02D: 数据流一步
    const b = this._peekStreamByte();
    if (b >= BANK19_CTRL_MIN) {
      this._streamPos = (this._streamPos + 1) & 0xff; // INC ram_008A
      this._handleControl(b);
    } else {
      this._dispatchSprite(b);
    }
    return false;
  }

  /** 当前精灵忙标志 (对应 ram_0515: 0 空闲 / 1 构建中 / $80 完成) */
  get busy(): number {
    return this._store.oam.busy;
  }

  /** 读取名字区文字队列 (View 层消费) */
  getTextQueue(): Uint8Array {
    return this._textQueue;
  }

  // ──────────────────────────────────────────────
  // 数据流循环 ($B02D) 与分发 ($B043)
  // ──────────────────────────────────────────────

  /** $B02D: 处理下一个数据流字节; 返回 true=数据流结束 */
  private _streamStep(): boolean {
    return this.update(0);
  }

  /** $B043: 分发 — ram_063F bit6=1 → 单精灵 $B0AF; =0 → 精灵组 $904B */
  private _dispatchSprite(byte: number): void {
    if ((this._modeFlag & 0x40) !== 0) {
      this._singleMode = true; // $9048: JMP $B0AF
      this._drawSingleChar();
    } else {
      this._drawSpriteGroup(); // $904B
    }
  }

  /**
   * $904B: 精灵组批量绘制。
   *   等 busy==0 → busy=1 → 清 $04A5-$04EC → 槽0 tile 计算 →
   *   $9092 循环读数据流字节 (<$E0) 经 $C524 写 $04A8/$04CB 区 → busy=$80。
   */
  private _drawSpriteGroup(): void {
    const oam = this._store.oam;
    oam.setBusy(1); // $9055: STA ram_0515 = 1
    oam.clearRange(0, 0x48); // $905A-$9062: 清 $04A5-$04EC
    oam.writeByte(0, 0x20);  // $9064: 槽0 attr
    oam.writeByte(0x23, 0x20); // $9069: $04C8
    // $906C-$9079: v = $88|(ram_008B&7); A = v>>2; 低2位旋转进 003A
    const v = 0x88 | (this._subIndex & 7);
    const aHi = v >> 2;
    const lo = ((v & 1) << 6) | (((v >> 1) & 1) << 7); // ROR×2
    oam.writeByte(2, aHi);       // $907B: 槽0 tileHi ($04A7)
    oam.writeByte(0x25, aHi);    // $907E: $04CA
    oam.writeByte(1, lo);        // $9083: 槽0 tileLo ($04A6)
    oam.writeByte(0x24, (lo + 0x20) & 0xff); // $9089: $04C9
    let x = this._subIndex >> 3; // $908C-$9091: ram_008B>>3
    // $9092-$90A7: 读数据流字节 → $C524 映射 → 写 $04A8+X / $04CB+X
    for (;;) {
      const b = this._peekStreamByte();
      if (b >= BANK19_CTRL_MIN) break; // $9098: BCS $90A9
      const [pat, attr] = this._mapCharC524(b);
      oam.writeByte(0x26 + x, pat); // $909D: ram_04CB,X
      oam.writeByte(3 + x, attr);   // $90A1: ram_04A8,X
      x = (x + 1) & 0xff;           // $90A4: INX
      this._streamPos = (this._streamPos + 1) & 0xff; // INC ram_008A
    }
    oam.endBuild(); // $90A9: STA ram_0515 = $80
  }

  /**
   * $B0AF: 单精灵字符绘制 (每帧一个字符)。
   *   读字节 → 构建 3 槽精灵组 ($04A5-$04AD) → busy=$80 →
   *   $B127 文字位置 (A=0,2,4,6) → ram_008B += 8。
   */
  private _drawSingleChar(): void {
    const oam = this._store.oam;
    const b = this._readStreamByte(); // $90B8: INC ram_008A + 读字节 (PHA)
    oam.setBusy(1); // $90C5: STA ram_0515 = 1
    oam.writeByte(8, 0);   // $90CA: $04AD 槽2 tileHi=0
    oam.writeByte(0, 1);   // $90CC: $04A5 槽0 attr=1
    oam.writeByte(4, 1);   // $90D5: $04A9 槽1 tileLo=1
    // $90D8-$90E2: v = $88|(ram_008B&7); aHi = v>>2; ror = 低2位旋转
    const v = 0x88 | (this._subIndex & 7);
    const aHi = v >> 2;
    const ror = ((v & 1) << 6) | (((v >> 1) & 1) << 7);
    oam.writeByte(2, aHi);    // $90E4: $04A7 槽0 tileHi
    oam.writeByte(5, aHi);    // $90E7: $04AB 槽2 attr
    const t0 = ((this._subIndex >> 3) + ror) & 0xff; // $90EA: 槽0 tileLo
    oam.writeByte(1, t0);     // $90F2: $04A6
    oam.writeByte(6, (t0 + 0x20) & 0xff); // $90F5-$90F8: $04AA 槽1 tileHi
    const [pat, attr] = this._mapCharC524(b); // $90FC: JSR $C524
    oam.writeByte(7, pat);    // $9100: $04AC 槽2 tileLo
    oam.writeByte(3, attr);   // $9102: $04A8 槽1 attr
    oam.endBuild();           // $9105: STA ram_0515 = $80
    // $910A-$911B: A=0,2,4,6 → $B127 文字位置 (H5 同步, 保留末次)
    for (let a = 0; a < 8; a += 2) this._buildTextPos(a);
    // $911D-$9122: ram_008B += 8
    this._subIndex = (this._subIndex + 8) & 0xff;
  }

  /** $B127: 构建名字区文字位置 (ram_02F8-$02FF 队列) */
  private _buildTextPos(a: number): void {
    const q = this._textQueue;
    const v = (((this._subIndex & 7) << 4) + 0x7c) & 0xff; // $9139-$9142
    const w = ((this._subIndex & 0xf8) + a) & 0xff;        // $914C-$9153
    q[0] = v; q[1] = 1; q[2] = 0; q[3] = w;
    q[4] = (v + 8) & 0xff; q[5] = 1; q[6] = 0; q[7] = w;
  }

  // ──────────────────────────────────────────────
  // 控制码处理 ($B15A / $B160 / 15 路跳转表)
  // ──────────────────────────────────────────────

  /** $B15A: 控制码入口 — $B160 分派后 $B339 推进指针 */
  private _handleControl(code: number): void {
    this._dispatchControl(code); // $915A: JSR $B160
    // $915D: JMP $B339 — 场景重置/无限等待入口不返回, 跳过推进
    if (this._scenePhase === 0 && !this._done) {
      this._advanceStreamPtr();
    }
  }

  /** $B160: 控制码分派 (经 $C509 表跳转, 语义化直接 switch) */
  private _dispatchControl(ctrl: number): void {
    // $9166 跳转表 (ROM dump 验证): 仅 0-6 与 28 有效
    //   0:B1A6  1:B1E0  2:B1F3  3:B218  4:B21B  5:B224  6:B235  28:B333($FC)
    const idx = (ctrl - BANK19_CTRL_MIN) & 0xff; // SEC; SBC #$E0
    switch (idx) {
      case 0: this._ctrl_ClearText(); break;      // $B1A6
      case 1: this._ctrl_Delay(); break;          // $B1E0
      case 2: this._ctrl_WriteName(); break;      // $B1F3
      case 3: this._sceneReset(); break;          // $B218 → JMP $B349
      case 4: this._ctrl_SetSubPos(); break;      // $B21B
      case 5: this._ctrl_SubDispatch(); break;    // $B224
      case 6: this._ctrl_SetFlag40(); break;      // $B235
      case 28: this._setAnimLock(); break;        // $B333 (控制码 $FC)
      default: break;
    }
  }

  /** 入口0 $B1A6: 清文字区 (ram_0557/$0558 6 位置 = $FF, ram_05D2=0) */
  private _ctrl_ClearText(): void {
    const s = this._store;
    this._fixedC52D();               // $91A6: JSR $C52D
    const b = this._readStreamByte(); // $91A9-$91AF: 读 1 字节 → $C54E
    this._fixedC54E(b);              // $91AF
    // $91BC-$91CA: 清零
    s.write('ram_0011', 0);
    s.write('ram_0012', 0);
    s.write('ram_000D', 0);
    s.write('ram_000E', 0);
    s.write('ram_05D2', 0);
    // $91CE-$91DD: X=0,21,42,63,84,105 → ram_0557+X / 0558+X = $FF
    for (let x = 0; x !== 0x7e; x = (x + 0x15) & 0xff) {
      s.write(`ram_0557+${x}`, 0xff);
      s.write(`ram_0558+${x}`, 0xff);
    }
  }

  /** 入口1 $B1E0: 延时 — 读 N 字节, 等待 N 帧 */
  private _ctrl_Delay(): void {
    const n = this._readStreamByte(); // $91E0-$91E6: 读 N
    this._delayFrames = n;            // $91E7-$91F2: 帧同步 N 次 (H5: update 每帧减 1)
  }

  /** 入口2 $B1F3: 写名字区 — 读 3 字节 (X,A,pos), $C50C → (ram_0034),Y=A */
  private _ctrl_WriteName(): void {
    const s = this._store;
    const b0 = this._readStreamByte(); // X ($91F3-$91F7)
    const b1 = this._readStreamByte(); // A ($91F8-$91FB)
    const b2 = this._readStreamByte(); // pos ($91FC-$9200)
    if (b2 < 0x0b) {
      s.write('ram_002A', b0); // $9206: STX ram_002A
    } else {
      s.write('ram_002B', b0); // $920C: STX ram_002B
    }
    // $920F: JSR $C50C → 名字区指针; $9212: STA (ram_0034),Y (Y=0)
    const namePtr = this._queryNamePtr0034(b2);
    s.write(`ram_${namePtr.toString(16).toUpperCase().padStart(4, '0')}`, b1);
  }

  /** 入口3 $B218: JMP $B349 (场景重置) */
  private _ctrl_SceneReset(): void {
    this._sceneReset();
  }

  /** 入口4 $B21B: 读 1 字节 → ram_008B (子索引) */
  private _ctrl_SetSubPos(): void {
    this._subIndex = this._readStreamByte(); // $921B-$9223
  }

  /** 入口5 $B224: 读 1 字节 → $C509 (嵌套控制码表跳转) */
  private _ctrl_SubDispatch(): void {
    const v = this._readStreamByte(); // $9224-$922A
    // $922D 子表: 3E B2 / 46 B2 / A6 B2 / DB B2
    switch (v) {
      case 0: this._ctrl_ClearPal(); break;      // $B23E
      case 1: this._subPalFill30(); break;       // $B246 (CDL 误标数据)
      case 2: this._palFill(); break;            // $B2A6
      case 3: this._palFadeIn(); break;          // $B2DB
      default: break;
    }
  }

  /** 入口6 $B235: ram_063F |= $40 */
  private _ctrl_SetFlag40(): void {
    this._modeFlag = (this._modeFlag | 0x40) & 0xff; // $9235-$923D
    this._store.write('ram_063F', this._modeFlag);
  }

  /** 入口7 $B23E: ram_0472=$0F → JMP $B2F7 (清调色板) */
  private _ctrl_ClearPal(): void {
    this._store.write('ram_0472', 0x0f); // $923E-$9240
    this._clearPalette(0x0f);            // $9243: JMP $B2F7
  }

  /** $B246: E5 子分派 1 — 调色板填充30 (ram_0472=$30; 复制→0408; palCheck; 三层填充) */
  private _subPalFill30(): void {
    const s = this._store;
    s.write('ram_0472', 0x30); // $9246-$924A: LDA #$30; STA ram_0472
    for (let x = 0; x < 0x20; x++) {
      s.write(`ram_0408+${x}`, s.read(`ram_046F+${x}`)); // $924D-$9256 复制
    }
    this._palCheck();      // $9258: JSR $B310
    this._fixedC515();     // $925B: A=$30 (H5 空)
    // 值层 $20/$10/$00 (PLA; SBC #$10; BPL 循环, $F0 负结束)
    for (let value = 0x20; (value & 0x80) === 0; value = (value - 0x10) & 0xff) {
      this._fixedC515();   // $9263: A=$05 (H5 空)
      for (let x = 0; x < 0x20; x++) {
        const lo = s.read(`ram_0408+${x}`);
        let out: number;
        if ((lo & 0xf0) >= value) {
          out = lo;                       // $9278: BCS $9291 — 直接存原值
        } else if ((lo & 0x0f) === 0x0f) {
          out = ((0x0f | value) & 0xff) === 0x0f ? 0x0f : 0x00; // $927C-$9288
        } else {
          const v = ((lo & 0x0f) | value) & 0xff; // $928B-$928D
          out = v === 0 ? 0x0f : v;               // $928F
        }
        s.write(`ram_046F+${x}`, out);          // $9291
      }
      this._fixedC533();   // $9299
    }
  }

  /** 入口8 $B2A6: 调色板填充 — value $30/$20/$10/$00, 组第 0 色跳过, value=0 写 $0F */
  private _palFill(): void {
    const s = this._store;
    for (let value = 0x30; ; value = (value - 0x10) & 0xff) {
      this._fixedC515();   // $92A9: A=$02 (H5 空)
      for (let x = 0; x < 0x20; x++) {
        if ((x & 3) === 0) continue;             // $92B4-$92B6: X&3==0 跳过
        let v = (s.read(`ram_046F+${x}`) & 0x0f) | value; // $92B8-$92BD
        if (value === 0) v = 0x0f;               // $92BF-$92C3: value==0 → $0F
        s.write(`ram_046F+${x}`, v);             // $92C5
      }
      this._fixedC533();   // $92CD
      if ((value & 0x80) !== 0) break;           // $92D3-$92D8: $F0 负 → RTS
    }
  }

  /** 入口9 $B2DB: 调色板 fade-in — ram_0472 = $10/$20/$30 (到 $40 停) */
  private _palFadeIn(): void {
    const s = this._store;
    for (let value = 0x10; value !== 0x40; value = (value + 0x10) & 0xff) {
      this._fixedC515();                 // $92DE: A=$02 (H5 空)
      s.write('ram_0472', value);        // $92E5: STA ram_0472
      this._fixedC533();                 // $92E8
    }
  }

  /** 入口10 $B2F7: 清调色板 — A 写 ram_046F 偏移 0,4,8,...,28; +$C533; +$C515 */
  private _clearPalette(a: number): void {
    const s = this._store;
    for (let x = 0; x < 0x20; x += 4) {
      s.write(`ram_046F+${x}`, a); // $92F9-$9302: STA ram_046F,X; X+=4
    }
    this._fixedC533();   // $9304
    this._fixedC515();   // $930A: A=$01 (H5 空)
  }

  /** 入口11 $B310: 调色板检查 (CDL 误标数据段, 实为代码) */
  private _palCheck(): void {
    const s = this._store;
    for (let x = 0; x < 0x20; x++) {
      let v = (s.read(`ram_046F+${x}`) & 0x0f) | 0x30; // $9312-$9317
      if (v === 0x3f) v = 0x30;                        // $9319-$931D
      s.write(`ram_046F+${x}`, v);
    }
    this._fixedC533();   // $9327
    this._fixedC515();   // $932D: A=$01 (H5 空)
  }

  /** 入口12 $B333: ram_0515=$80 (动画构建完成锁) */
  private _setAnimLock(): void {
    this._store.oam.endBuild(); // $9333-$9335: LDA #$80; STA ram_0515
  }

  /** 入口13 $B339: 推进数据流指针 (ram_0088 += ram_008A; 008A=0) */
  private _advanceStreamPtr(): void {
    this._streamPtr = (this._streamPtr + this._streamPos) & 0xffff; // $9339-$9342
    this._streamPos = 0;                                            // $9344-$9346
  }

  /** 入口14 $B349: 场景重置 (调色板/精灵组/文字区/计数器) — 多帧部分由 _sceneTick 驱动 */
  private _sceneReset(): void {
    const s = this._store;
    this._palFill();                       // $9349: JSR $B2A6
    s.write('ram_046B', 1);                // $934C-$934E
    s.write('ram_004B', 0);                // $9351-$9353
    s.write('ram_0517', 0);                // $9355-$9357
    s.write('ram_053C', 0);                // $9358-$935A
    s.write('ram_053A', 0x80);             // $935B-$935D
    this._resetCount = 0x24;               // $9360-$9362: ram_004A = $24
    s.write('ram_004A', this._resetCount);
    this._drawGroup2(0x20);                // $9364-$9366
    this._drawGroup2(0x28);                // $9369-$936B
    s.write('ram_0020', s.read('ram_0020') & 0xfc); // $936E-$9372
    this._fixedC530(0x10, 0x15);           // $9374-$9378
    this._fixedC530(0x00, 0x16);           // $937B-$937F
    this._fixedC533();                     // $9382
    // $9388-$9391: 表 $B402 (7C 71 52 53) → ram_0494-0497
    for (let i = 0; i < 4; i++) {
      s.write(`ram_0494+${i}`, [0x7c, 0x71, 0x52, 0x53][i]);
    }
    s.write('ram_0490', 0x7c);             // $9393-$9395
    s.write('ram_0491', 0x7e);             // $9398-$939A
    s.write('ram_0557', 0xff);             // $939D-$939F
    s.write('ram_0558', 0xff);             // $93A2
    s.write('ram_0541', 0xff);             // $93A5
    s.write('ram_054F', 0xff);             // $93AA
    s.write('ram_0553', 0xdd);             // $93AD-$93AF
    s.write('ram_0547', 0x80);             // $93B2-$93B4
    s.write('ram_0559', 0x31);             // $93B7-$93B9
    this._fixedC533();                     // $93BC
    // $93C2-$93C9: $60 帧延时后 ram_008A=0 → 落入 $93CB 循环 (多帧状态机)
    this._scenePhase = 1;
    this._sceneDelay = 0x60;
    this._sceneRow = 0;
    this._streamPos = 0;
  }

  /** $B3CB: 场景重置循环体 (每 3 帧一次迭代, 由 _sceneTick 驱动) */
  private _sceneResetLoop(): void {
    const s = this._store;
    s.write('ram_054F', (s.read('ram_054F') - 1) & 0xff); // $93D9: DEC ram_054F
    this._resetCount = (this._resetCount - 1) & 0xff;     // $93DC: DEC ram_004A
    s.write('ram_004A', this._resetCount);
    if (this._resetCount === 0) {
      this._sceneResetWait();              // $93DE: BEQ $93FA — 无限等待 → H5 结束
      return;
    }
    let x = 0;                             // $93E0-$93EC
    if (this._resetCount === 0x14) x = 0x06;  // CMP #$14 → X=$06
    else if (this._resetCount === 0x08) x = 0x16; // CMP #$08 → X=$16
    else return;                           // BNE $93CB — 继续下一轮
    s.write('ram_0470', x);                // $93EE: STX ram_0470
    this._fixedC533();                     // $93F1
    // $93F7: JMP $B3CB (由 _sceneTick 继续)
  }

  /** $B3FA: 无限等待循环 (JSR $C515; JMP $B3FA) → H5 标记场景结束 */
  private _sceneResetWait(): void {
    this._done = true;
    this._scenePhase = 0;
  }

  /** 场景重置多帧驱动 (每帧由 update() 调用) */
  private _sceneTick(): void {
    if (this._scenePhase === 1) {
      // $93C2-$93C9: $C515 × $60 (96 帧) 后 ram_008A=0 → 落入 $93CB
      this._sceneDelay--;
      if (this._sceneDelay <= 0) {
        this._scenePhase = 2;
        this._sceneRow = 0;
      }
      return;
    }
    // $93CB 循环: ram_008A += $60 三次后进位 → 每 3 帧一次迭代
    this._sceneRow++;
    if (this._sceneRow < 3) return;
    this._sceneRow = 0;
    this._sceneResetLoop();
  }

  /** $B406: 精灵组绘制 (4 行) — 每行清 0x25B、slot0 attr=$20、tileLo=row*$20、tileHi=value|row */
  private _drawGroup2(value: number): void {
    const oam = this._store.oam;
    for (let row = 0; row < 4; row++) {
      this._fixedC515();       // $940D: A=$01 (H5 空)
      this._awaitOamIdle();    // $9412-$9415: ram_0515!=0 → 等待
      oam.setBusy(1);          // $9417-$9419
      oam.clearRange(0, 0x25); // $941C-$9424: 清 $04A5..$04C9 (0x25B)
      oam.writeByte(0, 0x20);  // $9426-$9428: slot0 attr
      oam.writeByte(1, (row * 0x20) & 0xff);   // $942B-$942D: tileLo = ram_008A
      oam.writeByte(2, (value | row) & 0xff);  // $9430-$9434: tileHi = A|ram_008B
      oam.endBuild();          // $9437-$9439: ram_0515=$80
      // $943C-$9446: ram_008A += $20; ram_008B += carry (row 递增)
    }
  }

  // ──────────────────────────────────────────────
  // 固定区例程 (bank30, H5 语义化)
  // ──────────────────────────────────────────────

  /** $C515 渲染同步等待 — H5 同步由渲染层驱动 */
  private _fixedC515(): void {
    // H5 空
  }

  /**
   * $C52D→$CC46 (bank30): 清 OAM 并构建基础精灵组。
   *   原始: 6 轮帧同步构建 (tile 递增) 后, 最终槽0 = attr $20 / tile $23E0,
   *   清 $04A8-$04C8。H5: 直接呈现最终状态, 动画轮次由渲染层驱动 (TODO)。
   */
  private _fixedC52D(): void {
    const oam = this._store.oam;
    oam.setBusy(1); // ram_0515 = 1
    oam.clearRange(0, 0x50);   // 清 $04A5-$04F4
    oam.writeSlot(0, 0x20, 0xe0, 0x23); // $CCAD: attr=$20, tileLo=$E0, tileHi=$23
    oam.clearRange(3, 0x21);   // 清 $04A8-$04C8
    oam.endBuild(); // ram_0515 = $80
  }

  /** $C533 PPU 队列渲染 — H5 空 (参数 3 字节被跳过) */
  private _fixedC533(): void {
    // H5 空
  }

  /** $C524 (bank30 $CBC2): 假名/ASCII 编码 → [图案, 属性] */
  private _mapCharC524(a: number): [number, number] {
    if (a < 0xa0) return [a, 0]; // CBC2-$CBC6
    let attr = 0x94; // CBC8
    let v = a;
    if (a >= 0xc8) {
      // CBCE-$CBD8: 属性 $95, A-$AE, <$1F 直接返回, 否则再 -$05
      attr = 0x95;
      v = (a - 0xae) & 0xff;
      if (v < 0x1f) return [v, attr];
      v = (v - 0x05) & 0xff;
      return [(v + 0x40) & 0xff, attr]; // CBED: CLC; ADC #$40
    }
    // CBDA-$CBE8: A-$B4(≥时) → -$9A → ≥$15 时 +5
    const carryB4 = a >= 0xb4; // CMP #$B4; PHP
    if (a >= 0xb4) v = (v - 0x14) & 0xff;
    v = (v - 0x9a) & 0xff;
    if (v >= 0x15) v = (v + 0x05) & 0xff;
    if (!carryB4) return [v, attr]; // CBEA: PLP; BCC $CBF0
    return [(v + 0x40) & 0xff, attr]; // CBED: CLC; ADC #$40
  }

  /** $C50C (bank30 $CD7C): A(ID) → $0300+ID*12 名字区指针 */
  private _queryNamePtr0034(id: number): number {
    return 0x0300 + (id & 0xff) * 12;
  }

  /** $C530 (bank30 $CC02): A 查 $FBCC 表 (A*12) → 从 ram_046F+X 填 16B 调色板 */
  private _fixedC530(x: number, a: number): void {
    const s = this._store;
    const ptr = 0x1bcc + ((a * 12) & 0xff); // $FBCC-$E000 (PRG_BANK_31 数组索引)
    let y = 0;
    for (let i = 0; i < 16; i++) {
      let v: number;
      if ((x & 3) === 0) {
        v = 0x0f; // $CC2E: X&3==0 → 每组第 0 色透明
      } else {
        v = PRG_BANK_31[ptr + y] ?? 0x0f; // $CC30: (ram_0065),Y 连续读表
        y++;
      }
      s.write(`ram_046F+${x}`, v);
      x = (x + 1) & 0xff;
    }
    s.write('ram_046C', 0x20); // $CC42: 后续 BG 区长度
  }

  /** $C54E (bank30 $CBB0): 文字显示辅助 — H5 语义化 (记录文字索引, 无需帧等待) */
  private _fixedC54E(a: number): void {
    const s = this._store;
    s.write('ram_0518', a);   // $CBB0: STA ram_0518
    s.write('ram_0516', 0);   // $CBB3: STA ram_0516=$80 → H5 渲染同步, 置 0
    s.write('ram_0005', 0);   // $CBB8: STA ram_0005
  }

  // ──────────────────────────────────────────────
  // 读写辅助
  // ──────────────────────────────────────────────

  /** 读数据流字节并推进 ram_008A (对应 (ram_0088),Y; INC ram_008A) */
  private _readStreamByte(): number {
    const b = PRG_BANK_19[this._streamPtr + this._streamPos] ?? 0xff;
    this._streamPos = (this._streamPos + 1) & 0xff;
    return b;
  }

  /** 读数据流字节 (不推进) */
  private _peekStreamByte(): number {
    return PRG_BANK_19[this._streamPtr + this._streamPos] ?? 0xff;
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

  /** 读本 bank 数组原始字节 (内部数据访问, 仅本 service 可用) */
  private readByte(addr: number): number {
    return PRG_BANK_19[addr - 0x8000] ?? 0xff;
  }

  /** 读本 bank 16bit 小端 */
  private readU16(addr: number): number {
    return this.readByte(addr) | (this.readByte(addr + 1) << 8);
  }

  get store(): DataStore { return this._store; }
}
