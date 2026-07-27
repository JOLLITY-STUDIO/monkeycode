// ============================================================================
// scene/bytecode.ts — 场景字节码解释器
//
// 对应 ROM Bank 0:
//   $8464 — 入口: 根据脚本编号查表 → 设置 $4D/$4E 指针 → 进入主循环
//   $84C5 — 主循环: 逐字节读取 opcode → 分派
//   $8545 — 系统命令跳转表 (E8-FF)
//   $8575 — 系统命令实现
//
// Opcode 分派:
//   $00-$D7 → VRAM 瓦片写入
//   $D8-$DF → 分支/调度控制 (via $8AE6 跳转表)
//   $E1-$E7 → 设置列位置
//   $E8-$FF → 系统命令 (via $8545 跳转表)
// ============================================================================

import type { Ppu } from '../ppu/ppu';
import { wram } from '../core/memory';

// ═══════════════════════════════════════════════
// WRAM 地址 — 帧管线暴露的变量
// ═══════════════════════════════════════════════

/** $1C: joypad held */
const ZP_JOY_HELD  = 0x1C;
/** $1E: joypad edge (rising / just-pressed) */
const ZP_JOY_EDGE  = 0x1E;
/** $4C: 脚本状态 (bytecode internal, bit7=新指令) */
const ZP_SCRIPT_STATUS = 0x4C;
/** $4D: 脚本指针低字节 */
const ZP_SCRIPT_PTR_LO = 0x4D;
/** $4E: 脚本指针高字节 */
const ZP_SCRIPT_PTR_HI = 0x4E;

// ---- Bytecode Opcodes ----

export const OPCODE = {
  /** VRAM 瓦片写入结束 (最大值) */
  TILE_MAX: 0xD7,

  /** 分支/控制流起始 */
  BRANCH_START: 0xD8,
  /** 分支/控制流结束 */
  BRANCH_END: 0xDF,

  /** 文本位置设置起始 */
  POS_START: 0xE1,
  /** 文本位置设置结束 */
  POS_END: 0xE7,

  /** 系统命令起始 ($E8-$FF 通过 $8545 跳转表) */
  SYS_START: 0xE8,
  /** 系统命令结束 */
  SYS_END: 0xFF,

  // ---- 系统命令 (E8-FF) ----
  CALL_SUB:     0xE8, // 调用子场景脚本
  SET_ATTR:     0xE9, // 设置 PPU 属性表
  CLR_NAMETBL:  0xEA, // 清空 nametable
  SET_SPRITE:   0xEB, // 设置精灵布局
  WAIT_VBLANK:  0xEC, // 等待 VBlank
  SET_SCROLL:   0xED, // 设置滚动
  PLAY_MUSIC:   0xEE, // 播放音乐
  PLAY_SFX:     0xEF, // 播放音效
  SET_PALETTE:  0xF0, // 设置调色板
  SET_SPRITE0:  0xF1, // 设置 sprite 0
  SWITCH_BANK:  0xF2, // 切换 MMC3 bank
  TEXT_SPEED:   0xF3, // 设置文本速度
  JUMP_ADDR:    0xF4, // 跳转到指定地址
  WAIT_FRAMES:  0xF5, // 等待 N 帧
  SET_PARAMS:   0xF6, // 设置 game 参数
  READ_INPUT:   0xF7, // 读取输入
  // F8-FF: 见 $8545 跳转表完整实现
} as const;

// ---- 脚本状态 ----

export interface BytecodeState {
  /** 脚本指针低字节 ($4D) */
  ptrLo: number;
  /** 脚本指针高字节 ($4E) */
  ptrHi: number;
  /** 数据 bank 号 ($56) */
  dataBank: number;
  /** 列位置 ($53 / $51) */
  colPos: number;
  /** 行位置 ($52 / $50) */
  rowPos: number;
  /** 初始列位置 ($4F) */
  startPosLo: number;
  /** 初始行位置 ($50) */
  startPosHi: number;
  /** 最小列限制 ($54) */
  minCol: number;
  /** 行计数 ($55): 每页行数, 初始=8 */
  rowCount: number;
  /** 文本速度 */
  textSpeed: number;
  /** 脚本状态 ($4C): bit7=新指令 */
  status: number;
  /** 等待帧计数 */
  waitFrames: number;
  /** 是否在子脚本中 */
  inSub: boolean;
}

export function createBytecodeState(): BytecodeState {
  return {
    ptrLo: 0, ptrHi: 0,
    dataBank: 0,
    colPos: 0, rowPos: 0,
    startPosLo: 0, startPosHi: 0,
    minCol: 0, rowCount: 8,
    textSpeed: 1,
    status: 0, waitFrames: 0,
    inSub: false,
  };
}

// ---- 脚本数据表 ----
//
// 对应 ROM $8AEC 表: 脚本编号 → 指针查找
// 脚本数据位于 PRG $A000 区，通过 dataBank 切换 MMC3 bank
// 此处作为数据容器，实际数据由场景注册时注入

export interface ScriptEntry {
  /** 脚本编号 (对应 ROM 查表的 key) */
  num: number;
  /** 脚本数据所在的 PRG bank */
  bank: number;
  /** 脚本数据 (完整 bytecode 字节流) */
  data: Uint8Array;
}

// ---- 字节码解释器 ----

export class BytecodeInterpreter {
  /** PPU 引用 (用于 VRAM 写入) */
  ppu: Ppu;

  /** 解释器内部状态 */
  state: BytecodeState = createBytecodeState();

  /** 已注册的脚本表 (按编号索引) */
  private scriptTable: ScriptEntry[] = [];

  /** 当前执行的脚本 */
  private currentScript: ScriptEntry | null = null;

  /** 子脚本调用栈 */
  private callStack: { ptrLo: number; ptrHi: number; bank: number }[] = [];

  /** 帧回调 (设置后每帧调用) */
  onFrame: (() => void) | null = null;

  constructor(ppu: Ppu) {
    this.ppu = ppu;
  }

  // ================================================================
  // 脚本注册与加载 — 对应 $8464 入口
  // ================================================================

  /** 注册脚本数据 */
  registerScript(num: number, bank: number, data: Uint8Array): void {
    // 查重替换
    const idx = this.scriptTable.findIndex(s => s.num === num);
    if (idx >= 0) this.scriptTable[idx] = { num, bank, data };
    else this.scriptTable.push({ num, bank, data });
  }

  /**
   * 加载并开始执行脚本 — 对应 ROM $8464 入口
   *
   * ROM 流程 ($8464):
   *   1. 在 $8AEC 表中查找 scriptNum
   *   2. 设置 $4D/$4E = 脚本数据指针
   *   3. 设置 $56 = data bank
   *   4. 清屏 / 初始化位置
   *   5. → $84C5 主循环
   */
  load(scriptNum: number): boolean {
    const entry = this.scriptTable.find(s => s.num === scriptNum);
    if (!entry) return false;

    this.currentScript = entry;

    // 重置状态 (对应 ROM 清 ZP 变量)
    const s = this.state;
    s.ptrLo = 0;          // 从脚本数据偏移 0 开始
    s.ptrHi = 0;
    s.dataBank = entry.bank;
    s.status = 0;
    s.inSub = false;

    // 初始化文本位置:
    // ROM 中的默认值:
    //   $4F=$49, $50=$22 → start position @ $2249
    //   行计数 $55 = 8
    s.startPosLo = 0x49;
    s.startPosHi = 0x22;
    s.colPos = 0x49;
    s.rowPos = 0x22;
    s.minCol = 0x49 & 0x1F;
    s.rowCount = 8;

    this.callStack = [];

    return true;
  }

  // ================================================================
  // 主循环 — 对应 $84C5 (单步执行一个 opcode)
  // ================================================================

  /**
   * 执行一步 (一个 opcode)
   * 返回 false 表示脚本执行完毕或等待帧中
   *
   * ROM 主循环 ($84C5):
   *   LDY #0
   *   LDA ($4D),Y      ; 读取 opcode
   *   CMP #$D8
   *   BCS $84FE        ; ≥ D8 → 控制/系统指令
   *   ; $00-$D7: VRAM tile write → $88CA
   *   ...
   */
  step(): boolean {
    const s = this.state;
    if (!this.currentScript) return false;

    // 等待帧中
    if (s.waitFrames > 0) {
      s.waitFrames--;
      return false;
    }

    // 读取 opcode
    const offset = s.ptrLo + (s.ptrHi << 8);
    if (offset >= this.currentScript.data.length) return false;

    const opcode = this.currentScript.data[offset];

    if (opcode <= OPCODE.TILE_MAX) {
      // === $00-$D7: VRAM 瓦片写入 ===
      this._writeTile(opcode);
    } else if (opcode <= OPCODE.BRANCH_END) {
      // === $D8-$DF: 分支/控制 ===
      return this._dispatchBranch(opcode);
    } else if (opcode <= OPCODE.POS_END) {
      // === $E1-$E7: 设置列位置 ===
      this._setColumn(opcode);
    } else {
      // === $E8-$FF: 系统命令 ===
      return this._dispatchSystem(opcode);
    }

    return true;
  }

  /**
   * 连续执行直到等待帧
   * 返回 true 表示需要等待下一帧
   */
  runFrame(): boolean {
    let keepGoing = true;
    while (keepGoing && this.step()) {
      // 持续执行直到 step 返回 false
    }
    if (this.onFrame) this.onFrame();
    return this.state.waitFrames > 0;
  }

  // ================================================================
  // VRAM 瓦片写入 — $00-$D7
  // ================================================================

  /**
   * 写入一个瓦片到 VRAM
   *
   * ROM 流程:
   *   $84E3: LDA ($4D),Y  → opcode
   *   LDX $52, LDY $53   → VRAM addr
   *   JSR $88CA          → 写 tile + 字体查表
   *   INC $53            → 列前进
   *
   * opcode 值直接作为 nametable tile 索引写入 VRAM。
   * 如果 $55 (行计数) ≠ 0，每写入一行递减。
   */
  private _writeTile(tileIdx: number): void {
    const s = this.state;
    const vramAddr = this._vramPos(s.rowPos, s.colPos);
    this.ppu.writeVRAM(vramAddr, tileIdx);

    // 列前进
    s.colPos++;
    // 检查换行
    if (s.rowCount > 0) {
      s.rowCount--;
      if (s.rowCount === 0) {
        // 行计数用完，重置到 minCol
        s.colPos = s.minCol + ((s.colPos - s.minCol) % 32);
        this._checkMinCol();
      }
    }

    // 字节码指针前进 1
    this._advancePtr(1);
  }

  // ================================================================
  // 分支/控制 — $D8-$DF
  // ================================================================

  /**
   * 分支调度 — 对应 $84FE
   *
   * ROM 流程:
   *   SEC, SBC #$D8    ; 计算分支索引
   *   TAX
   *   LDA $8AE6, X     ; 跳转表
   *   PHA
   *   JSR $899A        ; 刷新文本
   *   PLA, JSR $9FA8   ; 回调
   *   JMP advance
   *
   * $8AE6 跳转表 (7 个分支入口):
   *   0: $D8 → 分支类型 0
   *   1: $D9 → 分支类型 1
   *   ...
   *
   * 语义化实现: 各分支做不同的文本推进/场景切换操作
   */
  private _dispatchBranch(opcode: number): boolean {
    const idx = opcode - OPCODE.BRANCH_START;
    this._advancePtr(1);

    switch (idx) {
      case 0: // $D8: 等待输入后推进下一页文本
        return this._branchWaitInput();
      case 1: // $D9: 无等待推进
        this._advancePage();
        return true;
      case 2: // $DA: 分支选择
        this._advancePage();
        return true;
      default:
        // 其他分支类型 (文本清屏/选择等)
        this._advancePage();
        return true;
    }
  }

  private _branchWaitInput(): boolean {
    // 等待用户按键 → 推进文本页
    // 检测 joypad edge (rising): 任何按键刚按下就推进
    if (wram[ZP_JOY_EDGE] !== 0) {
      this._advancePage();
      return true;
    }
    return false; // 等待
  }

  /** 推进文本到下一组 */
  private _advancePage(): void {
    const s = this.state;
    s.rowCount = 8;
    s.colPos = s.startPosLo & 0xE0; // 对齐到 32 列边界
    // 重置到起始列
    const wrappedCol = s.startPosLo & 0x1F;
    s.colPos = (s.colPos & 0xE0) | wrappedCol;
  }

  // ================================================================
  // 列位置 — $E1-$E7
  // ================================================================

  /**
   * 设置列位置 — 对应 $8514
   *
   * ROM 流程:
   *   SEC, SBC #$E1    ; 计算偏移
   *   EOR #$FF          ; 取反
   *   ADC $53           ; 加到当前列
   *   STA $53           ; 更新列位置
   *
   * $E1 表示 colPos - 0 (不变)
   * $E2 表示 colPos + 1
   * ...
   * $E7 表示 colPos + 6
   */
  private _setColumn(opcode: number): void {
    const s = this.state;
    const offset = opcode - OPCODE.POS_START;
    // ROM 中: EOR #$FF / ADC = 实际是做减法
    s.colPos += offset;

    // 确保在列范围内
    s.colPos &= 0x1F;
    this._checkMinCol();
    this._advancePtr(1);
  }

  // ================================================================
  // 系统命令 — $E8-$FF (via $8545 跳转表)
  // ================================================================

  /**
   * 系统命令调度 — 对应 $852D
   *
   * ROM 流程:
   *   SEC, SBC #$E8    ; 计算命令索引
   *   ASL               ; ×2 (word 表)
   *   TAX
   *   LDA $8546, X     ; 高字节
   *   PHA
   *   LDA $8545, X     ; 低字节
   *   PHA
   *   RTS              ; 间接跳转
   *
   * $8545 跳转表 (E8-FF):
   *   E8 → $8575  ; 调用子脚本
   *   E9 → $857F  ; 设置 PPU 属性
   *   EA → $858C  ; 清 nametable
   *   EB → $85C3  ; 精灵布局
   *   EC → $85D1  ; 等待 VBlank
   *   ED → $85EB  ; 设置滚动
   *   EE → $8603  ; 播放音乐
   *   EF → $8617  ; 播放音效
   *   F0 → $862B  ; 设置调色板
   *   F1 → $8649  ; 设置 sprite 0
   *   F2 → $8677  ; 切换 MMC3 bank
   *   F3 → $8681  ; 文本速度
   *   F4 → $86B7  ; 跳转地址
   *   F5 → $87CA  ; 等待 N 帧
   *   F6 → $87D8  ; 设置参数
   *   F7 → $87F7  ; 读取输入
   *   F8+ ...     ; 更多命令
   */
  private _dispatchSystem(opcode: number): boolean {
    const cmd = opcode - OPCODE.SYS_START;
    this._advancePtr(1); // 消耗 opcode 字节

    switch (cmd) {
      case 0x00: return this._sys_CALL_SUB();
      case 0x01: return this._sys_SET_ATTR();
      case 0x02: return this._sys_CLR_NAMETBL();
      case 0x03: return this._sys_SET_SPRITE();
      case 0x04: return true; // EC: wait VBlank — 帧循环已处理
      case 0x05: return this._sys_SET_SCROLL();
      case 0x06: return true; // EE: 音乐 — TODO
      case 0x07: return true; // EF: 音效 — TODO
      case 0x08: return this._sys_SET_PALETTE();
      case 0x09: return true; // F1: sprite 0 — TODO
      case 0x0A: return true; // F2: MMC3 bank switch — TODO
      case 0x0B: return this._sys_TEXT_SPEED();
      case 0x0C: return this._sys_JUMP_ADDR();
      case 0x0D: return this._sys_WAIT_FRAMES();
      case 0x0E: return true; // F6: 设置参数 — TODO
      case 0x0F: return this._sys_READ_INPUT(); // F7: 读取输入
      // F8-FF: 扩展系统命令 (数据复写/跳转等)
      case 0x10: // F8: 直接跳转
        return this._sys_JUMP_RELATIVE();
      case 0x11: // F9
        return true;
      case 0x12: // FA
        return true;
      case 0x13: // FB: 结束脚本
        this.state.status |= 0x80;
        return false;
      case 0x14: // FC
        return true;
      case 0x15: // FD
        return true;
      case 0x16: // FE: 相对跳转 (后退)
        return this._sys_JUMP_RELATIVE_BACK();
      case 0x17: // FF: 脚本结束
        this.state.status |= 0x80;
        return false;
      default:
        return true;
    }
  }

  // ---- 系统命令实现 ----

  // E8: CALL_SUB — 调用子场景脚本
  // ROM: C8 B1 4D → 读下一个字节作为子脚本编号
  //      20 20 89 → JSR $8920 (加载新脚本)
  //      A9 02 → 返回 2 字节消耗
  private _sys_CALL_SUB(): boolean {
    const subNum = this._peekNextByte();
    this._advancePtr(1);

    // 保存当前脚本位置
    this.callStack.push({
      ptrLo: this.state.ptrLo,
      ptrHi: this.state.ptrHi,
      bank: this.state.dataBank,
    });

    // 加载子脚本
    this.state.inSub = true;
    return this.load(subNum);
  }

  // E9: SET_ATTR — 设置 PPU 属性表
  // ROM: A9 02 20 A8 9F → wait 2 frames
  //      20 7E 99 → JSR $997E (写属性表)
  private _sys_SET_ATTR(): boolean {
    // ROM 中写 PPU 属性表是根据当前 VRAM tile 数据计算 attribute
    // 语义化实现: 属性表通常由场景数据预处理
    // TODO: 根据 nametable tile 重算 attribute
    return true;
  }

  // EA: CLR_NAMETBL — 清空两个 nametable
  // ROM: 20 F0 99 → 调色板重置
  //      20 7F 9B → 清 VRAM
  //      写入 $55 填充两页 nametable
  private _sys_CLR_NAMETBL(): boolean {
    // 清 nametable 0 & 1
    for (let addr = 0x2000; addr < 0x2400; addr++) {
      this.ppu.writeVRAM(addr, 0x55);
    }
    // 同时用 $55 填充 (ROM 行为)
    for (let addr = 0x2000; addr < 0x2800; addr++) {
      this.ppu.writeVRAM(addr, 0x55);
    }
    // 清属性表
    for (let addr = 0x23C0; addr < 0x2400; addr++) {
      this.ppu.writeVRAM(addr, 0x00);
    }
    for (let addr = 0x27C0; addr < 0x2800; addr++) {
      this.ppu.writeVRAM(addr, 0x00);
    }
    // 重置滚动
    this.state.status = 0;
    this.state.colPos = this.state.startPosLo;
    return true;
  }

  // EB: SET_SPRITE — 设置精灵布局
  // ROM: JSR $899A → 刷新文本
  //      JSR $89A3 → 设置精灵 OAM 数据
  private _sys_SET_SPRITE(): boolean {
    // TODO: OAM 精灵数据设置
    return true;
  }

  // ED: SET_SCROLL — 设置滚动位置
  // ROM: C8 B1 4D → 读下一个字节
  //      XX XX → y, x 值
  private _sys_SET_SCROLL(): boolean {
    const scrollY = this._peekNextByte();
    this._advancePtr(1);
    const scrollX = this._peekNextByte();
    this._advancePtr(1);

    this.ppu.setScroll(scrollX, scrollY);
    return true;
  }

  // F0: SET_PALETTE — 设置调色板
  // ROM: C8 B1 4D → 读颜色数
  //      循环写 PPU $3F00
  private _sys_SET_PALETTE(): boolean {
    const count = this._peekNextByte();
    this._advancePtr(1);

    // 写 PPU 调色板 ($3F00)
    for (let i = 0; i < count && i < 32; i++) {
      const color = this._peekNextByte();
      this._advancePtr(1);
      this.ppu.writeVRAM(0x3F00 + i, color);
    }
    return true;
  }

  // F3: TEXT_SPEED — 设置文本速度
  private _sys_TEXT_SPEED(): boolean {
    this.state.textSpeed = this._peekNextByte();
    this._advancePtr(1);
    return true;
  }

  // F4: JUMP_ADDR — 绝对跳转
  // ROM: C8 B1 4D → 读 lo 字节
  //      C8 B1 4D → 读 hi 字节
  //      STA $4E, STX $4D → 跳转
  private _sys_JUMP_ADDR(): boolean {
    const lo = this._peekNextByte();
    this._advancePtr(1);
    const hi = this._peekNextByte();
    this._advancePtr(1);

    this.state.ptrLo = lo;
    this.state.ptrHi = hi;
    return true;
  }

  // F5: WAIT_FRAMES — 等待 N 帧
  private _sys_WAIT_FRAMES(): boolean {
    const frames = this._peekNextByte();
    this._advancePtr(1);
    this.state.waitFrames = frames;
    return false; // 等待
  }

  // F7: READ_INPUT — 读取手柄输入
  // ROM ($87F7): 读取 $1C (held) 和 $1E (edge)
  //   将按键状态存入脚本参数区域，供后续逻辑分派
  private _sys_READ_INPUT(): boolean {
    // 将 joypad held + edge 写回 WRAM 供脚本逻辑读取
    // ROM 会把结果存到 $4C+ 或临时变量中
    // 此处不做额外操作 — 脚本后续通过 wram[$1C]/[$1E] 读取
    // 只需要确认本帧的 edge 已经被 frame pipeline 更新
    return true;
  }

  // F8+: 相对跳转
  private _sys_JUMP_RELATIVE(): boolean {
    const offset = this._peekNextByte();
    this._advancePtr(1);
    const s = this.state;
    let ptr = s.ptrLo + (s.ptrHi << 8);
    ptr += offset;
    s.ptrLo = ptr & 0xFF;
    s.ptrHi = (ptr >> 8) & 0xFF;
    return true;
  }

  // FE: 相对跳转 (后退)
  private _sys_JUMP_RELATIVE_BACK(): boolean {
    const offset = this._peekNextByte();
    this._advancePtr(1);
    const s = this.state;
    let ptr = s.ptrLo + (s.ptrHi << 8);
    ptr -= offset;
    s.ptrLo = ptr & 0xFF;
    s.ptrHi = (ptr >> 8) & 0xFF;
    return true;
  }

  // ================================================================
  // 辅助方法
  // ================================================================

  /** 读取下一个字节 (不消耗指针) */
  private _peekNextByte(): number {
    if (!this.currentScript) return 0;
    const offset = this.state.ptrLo + (this.state.ptrHi << 8);
    if (offset >= this.currentScript.data.length) return 0;
    return this.currentScript.data[offset];
  }

  /** 字节码指针前进 */
  private _advancePtr(count: number): void {
    let ptr = this.state.ptrLo + (this.state.ptrHi << 8);
    ptr += count;
    this.state.ptrLo = ptr & 0xFF;
    this.state.ptrHi = (ptr >> 8) & 0xFF;
  }

  /** 计算 VRAM 地址 */
  private _vramPos(rowHi: number, colLo: number): number {
    const lo = colLo & 0xFF;
    const hi = rowHi & 0xFF;
    // PPU nametable 地址 = (hi << 8) | lo
    // 标准 nametable 范围: $2000-$23FF (NT0), $2400-$27FF (NT1)
    // $28-$2B → mirror
    let addr = (hi << 8) | lo;
    // mirror 处理 (nametable 镜像)
    if (addr >= 0x2800) {
      addr = (addr & 0x23FF) + 0x2000;
    }
    return addr;
  }

  /** 确保列 >= minCol */
  private _checkMinCol(): void {
    if ((this.state.colPos & 0x1F) < this.state.minCol) {
      this.state.colPos = (this.state.colPos & 0xE0) | this.state.minCol;
    }
  }

  /** 重置解释器 */
  reset(): void {
    this.state = createBytecodeState();
    this.currentScript = null;
    this.callStack = [];
  }
}
