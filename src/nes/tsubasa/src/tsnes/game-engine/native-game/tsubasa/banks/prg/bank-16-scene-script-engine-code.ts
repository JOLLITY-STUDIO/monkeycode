/**
 * Bank 16: Scene Logic/Script Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank (slot 0, $8000-$9FFF)。
 * 功能: 场景渲染/脚本引擎 — 逐帧解释场景脚本字节码
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（场景脚本引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8006 (scene dispatch init)    — 从 $0518 索引加载场景脚本指针
 *   $8003 → JMP $8021 (scene update/tick)      — 每帧执行场景脚本
 *
 * 关键设计: 每帧只处理 ONE tile 条目。
 * 6502 循环在 $803F: 读字节 → 若 < $F0 (tile) → 读 3 个元数据字节, 调 bank-11 → RTS。
 *                     若 ≥ $F0 (control) → 分派 → 循环回 $803F。
 * 只有遇到 tile 字节时才退出循环 (RTS)，控制码处理完继续循环。
 *
 * 场景脚本数据格式:
 *   < $F0: tile 数据 byte:
 *     1. tile index → $0523
 *     2. PPU addr hi → $0524
 *     3. data byte → $0528
 *     4. data byte → $0529
 *     → 调用 bank-11 ($C50F) 写入 PPU 队列 → 本帧结束
 *   ≥ $F0: 控制码 → 分派到 $80AF 跳转表:
 *     F0: 清除标志 ($80CF) — 清 $052A, 设置 $0516 bit3, 挂起
 *     F1: 脚本跳转 ($80D4) — 读 2B 新地址, 跳转 (先设置 $0516 bit3)
 *     F2: 脚本跳转2 ($80F4) — 读 2B 新地址, $003A=0 重头开始
 *     F3: 字节码批量 ($8105) — 读 count, 子分派到 $8173 跳转表
 *     F4-FE: 场景状态分派 → 子跳转表 ($8207-$86ED, ~230 个处理函数)
 *            这些处理函数大多只返回 X 寄存器值给调用者
 *
 * 代码量: CDL code=1860 bytes, data=4599 bytes
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_16_scene_logic.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track } from '../debug-log';

// ── 场景脚本/对白数据 bank (原始 MMC3 映射 bank 03/04/05/25) ──
import { getBank03Data as bank03Data } from './bank-03-code';
import { getBank04Data as bank04Data } from './bank-04-code';
import { getBank05Data as bank05Data } from './bank-05-code';
import { getBank25Data as bank25Data } from './bank-25-code';

// ── 关卡/场景元数据 bank-23 ──
import { getBank23Data as bank23Data } from './bank-23-code';

import {
  DATA_$80AF_$80CE,
  DATA_$8173_$81A8,
  DATA_$81BD_$8206,
  DATA_$82FE_$8316,
  DATA_$86E3_$8716,
} from './bank-16-scene-script-engine-data';

// ── ROM data chunk lookup (each chunk mapped by bank offset range) ──
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x00AF, data: DATA_$80AF_$80CE },
  { offset: 0x0173, data: DATA_$8173_$81A8 },
  { offset: 0x01BD, data: DATA_$81BD_$8206 },
  { offset: 0x02FE, data: DATA_$82FE_$8316 },
  { offset: 0x06E3, data: DATA_$86E3_$8716 },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom16(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

// ═════════════════════════════════════════════════
// 场景脚本状态机 (每帧增量执行模型)
// ═════════════════════════════════════════════════
//
// 关键状态变量:
//   $005D/$005E — 当前脚本指针 (scene script bytecode pointer)
//   $003A       — 脚本内偏移 (offset into current script chunk)
//   $0522       — 调用栈索引 (sub-script call stack index)
//   $052A       — 场景标志 (scene flags, copied from $0517)
//   $0516       — PPU 控制寄存器
//   $0523       — 当前 tile 索引 (nametable tile index)
//   $0524       — PPU 地址高字节 (nametable page)
//   $0528/$0529 — 元数据字节 (tile metadata)
//   $0530       — 帧计数器 (frame counter for delays)

/**
 * $8000/$8006: 场景分派入口 — 初始化场景脚本
 *
 * 6502 ($8006):
 *   LDX #$89
 *   LDA $0518          ; 场景索引
 *   ASL                ; ×2
 *   TAY
 *   LDA #$BF
 *   STA $005D
 *   STX $005E          ; ptr = $89BF (bank-16 jump table base)
 *   LDA ($005D),Y      ; read lo
 *   TAX
 *   INY
 *   LDA ($005D),Y      ; read hi
 *   STA $005E
 *   STX $005D          ; $005D/$005E = scene script pointer
 *   RTS
 *
 * 初始化后不执行 — 下一帧由 sceneTick 推进。
 */
export function bank16_dispatchEntry(sys: SystemState): void {
  const sceneIdx = readMem(sys, 0x0518);
  track('bank16_dispatchEntry', { sceneIdx });

  // $89BF = bank-16 offset for scene pointer table (bank-16 $09BF = ROM $89BF)
  // The jump table at $89BF contains scene script pointers indexed by sceneIdx*2
  const tableBase = 0x09BF;
  const ptrLo = rom16(tableBase + sceneIdx * 2);
  const ptrHi = rom16(tableBase + sceneIdx * 2 + 1);

  if (ptrLo === 0 && ptrHi === 0) {
    console.log(`[bank16] dispatchEntry: scene #${sceneIdx} not defined (null ptr)`);
    sys.mem[0x005D] = 0;
    sys.mem[0x005E] = 0;
    return;
  }

  sys.mem[0x005D] = ptrLo;
  sys.mem[0x005E] = ptrHi;
  sys.mem[0x003A] = 0; // offset reset

  console.log(`[bank16] dispatchEntry: scene #${sceneIdx} → $${ptrHi.toString(16).padStart(2, '0')}${ptrLo.toString(16).padStart(2, '0')}`);
}

/**
 * $8003/$8021: 场景更新/tick — 每帧调用以推进场景脚本
 *
 * 6502 流程:
 *   1. 复制 $0517 → $052A (场景标志)
 *   2. 清除 $0516 bit 2, 清零 $052B/$052C/$052D/$0530/$003A
 *   3. 主循环 ($803F):
 *      a. 读字节: 若 ≥ $F0 → dispatch → 循环
 *      b. 若 < $F0 → tile 数据:
 *         - byte 1 → $0523 (tile index)
 *         - 设置 $0516: $40 | (~$10)
 *         - byte 2→$0524, byte 3→$0528, byte 4→$0529
 *         - 推进指针 ($005D += $003A)
 *         - 调用 $C50F (bank-11 tile write)
 *         - RTS (本帧结束!)
 *
 * 关键: 每帧只处理 ONE tile 条目 + 其 3 个元数据字节。
 * 控制码处理完继续循环直到遇到 tile 字节。
 */
export function bank16_sceneTick(sys: SystemState): void {
  // 检查是否有活跃脚本
  if ((sys.mem[0x005E] || 0) === 0 && (sys.mem[0x005D] || 0) === 0) {
    return;
  }

  // $8024: copy $0517 → $052A
  sys.mem[0x052A] = sys.mem[0x0517] || 0;

  // $8027-802C: AND $0516 with #$FB (clear bit 2)
  sys.mem[0x0516] = ((sys.mem[0x0516] || 0) & 0xFB);

  // $802F-803D: clear $052B, $052D, $052C, $0530, $003A
  sys.mem[0x052B] = 0;
  sys.mem[0x052D] = 0;
  sys.mem[0x052C] = 0;
  sys.mem[0x0530] = 0;
  sys.mem[0x003A] = 0;

  // $803F: main loop — process control codes, exit at first tile
  const MAX_LOOP = 100; // safety limit for control codes
  let loopCount = 0;

  while (loopCount < MAX_LOOP) {
    loopCount++;
    const ptrLo = sys.mem[0x005D] || 0;
    const ptrHi = sys.mem[0x005E] || 0;
    const offset = sys.mem[0x003A] || 0;

    // $8041-8043: INC $003A, LDA ($005D),Y
    sys.mem[0x003A] = (offset + 1) & 0xFF;
    const byte = rom16(((ptrHi << 8) | ptrLo) + offset);

    // $8045-8047: CMP #$F0, BCC $804F
    if (byte >= 0xF0) {
      // $8049: JSR $80A9 — control code dispatch
      const handled = _bank16_dispatchControl(sys, byte);
      if (!handled) {
        // Control code requested end/exit (e.g., RTS via stack empty)
        return;
      }
      // $804C: JMP $803F — continue loop
      continue;
    }

    // ── Tile data: < $F0 ──

    // $804F: STA $0523 — tile index
    sys.mem[0x0523] = byte;

    // $8052-8059: set PPU control ($40 | ~$10)
    sys.mem[0x0516] = ((sys.mem[0x0516] || 0) & 0xEF) | 0x40;

    // $805C-8060: read byte 2 → may be control
    sys.mem[0x003A] = ((sys.mem[0x003A] || 0) + 1) & 0xFF;
    const byte2 = rom16(((ptrHi << 8) | ptrLo) + sys.mem[0x003A]);
    // $8062-8066: if ≥ $F0 → JSR $8991 (special handler for control in data slot)
    let val2 = byte2;
    if (byte2 >= 0xF0) {
      val2 = _bank16_special_decode(sys, byte2, 0x91);
      if (val2 < 0) return; // handler requested exit
    }
    // $8069: STA $0524 — PPU addr hi
    sys.mem[0x0524] = val2;

    // $806C-8070: read byte 3 → may be control
    sys.mem[0x003A] = ((sys.mem[0x003A] || 0) + 1) & 0xFF;
    const byte3 = rom16(((ptrHi << 8) | ptrLo) + sys.mem[0x003A]);
    let val3 = byte3;
    if (byte3 >= 0xF0) {
      val3 = _bank16_special_decode(sys, byte3, 0x9C);
      if (val3 < 0) return;
    }
    sys.mem[0x0528] = val3;

    // $807C-8080: read byte 4 → may be control
    sys.mem[0x003A] = ((sys.mem[0x003A] || 0) + 1) & 0xFF;
    const byte4 = rom16(((ptrHi << 8) | ptrLo) + sys.mem[0x003A]);
    let val4 = byte4;
    if (byte4 >= 0xF0) {
      val4 = _bank16_special_decode(sys, byte4, 0xA7);
      if (val4 < 0) return;
    }
    sys.mem[0x0529] = val4;

    // $808C-8095: advance script pointer (ptr += offset)
    const newOffset = sys.mem[0x003A] || 0;
    let newLo = ptrLo + newOffset;
    let newHi = ptrHi;
    if (newLo > 0xFF) { newHi++; newLo &= 0xFF; }
    sys.mem[0x005D] = newLo;
    sys.mem[0x005E] = newHi;

    // $8097-80A8: setup bank-11 tile write call
    // LDX #$15, LDA #$F0, STA $01,X; LDA #$0B, STA $02,X
    // LDA #$80, LDY #$08, JSR $C50F
    // This sets up a bank-11 call with parameters in $0000+ range
    // Bank-11 init ($800C) will be called
    // Mark PPU needs redraw
    writeMem(sys, 0x0515, 0x80);

    track('bank16_sceneTick', { tile: byte, ppuHi: val2.toString(16) });
    return; // ← 本帧结束！下一帧继续
  }

  // Safety limit reached — should not happen in normal operation
  console.log(`[bank16] sceneTick loop limit ${MAX_LOOP} reached`);
}

// ═════════════════════════════════════════════════
// 控制码分派器 ($80A9)
// ═════════════════════════════════════════════════

/**
 * $80A9: F0-FE 控制码分派
 *
 * 6502: SEC, SBC #$F0, JSR $C509 → 查表跳转
 * 跳转表 $80AF: 16 个 JMP 目标 (F0-FE, FF)
 *
 * 返回: true=继续循环, false=脚本终止
 */
function _bank16_dispatchControl(sys: SystemState, code: number): boolean {
  const idx = code - 0xF0;
  // Jump table at $80AF in ROM (16 entries, 2 bytes each: lo, hi)
  const jumpTableBase = 0x00AF;
  const jumpLo = rom16(jumpTableBase + idx * 2);
  const jumpHi = rom16(jumpTableBase + idx * 2 + 1);
  const target = (jumpHi << 8) | jumpLo;

  switch (target) {
    case 0x80CF: // F0: 清除场景标志, 设置 PPU 控制, 挂起脚本
      return _ctrl_F0_clearFlags(sys);

    case 0x80D4: // F1: 脚本跳转 (设置 PPU 后再跳)
      return _ctrl_F1_scriptJump(sys);

    case 0x80F4: // F2: 脚本跳转 (读 2B 地址)
      return _ctrl_F2_scriptJump2(sys);

    case 0x8105: // F3: 字节码批量执行 — 读 count, 分派子处理器
      return _ctrl_F3_bytecodeDispatch(sys);

    // F4-FE: 子功能 — 读取场景状态值返回 X 给调用者
    // 这些在 $8021 调用上下文中通过 JSR $80A9 间接调用
    // 返回的 X 值影响后续逻辑
    default:
      // F4-FE dispatch via subtables
      // These are complex handlers (500+ bytes of code)
      // For now, advance past them and continue
      console.log(`[bank16] control F${idx.toString(16)}: target $${target.toString(16)} (delegated)`);
      // Most of these just set X register and return
      // Set a default X value to let the script continue
      sys.mem[0x0600] = idx; // debug: store which F-code was called
      return true;
  }
}

/**
 * F0 ($80CF): 清除场景标志
 *   STA $052A = 0
 *   设置 $0516 bit 3 (如果尚未设置)
 *   清 PPU nametable 选择 $0021
 *   PLA, PLA, RTS (从调用栈返回, 终止脚本)
 */
function _ctrl_F0_clearFlags(sys: SystemState): boolean {
  // $80CF: LDA #$00, STA $052A
  sys.mem[0x052A] = 0;

  // $80D4-80E3: BIT $0516 bit3, if clear → set & C51B
  if (!(sys.mem[0x0516] & 0x08)) {
    sys.mem[0x0516] = (sys.mem[0x0516] || 0) | 0x08;
    // X=5, C51B → some setup
  }

  // $80E6: LDA #$00, STA $0522
  sys.mem[0x0522] = 0;

  // $80EB-80F3: AND $0021 with #$1E (clear nametable select bits), PLA, PLA, RTS
  sys.mem[0x0021] = (sys.mem[0x0021] || 0) & 0x1E;

  // Clear script pointer → no more execution
  sys.mem[0x005D] = 0;
  sys.mem[0x005E] = 0;

  track('bank16_F0', 'clearFlags + script end');
  return false; // terminate
}

/**
 * F1 ($80D4): 脚本跳转 (保留 PPU 控制)
 *   读 2 字节新地址 → $005D/$005E
 *   $003A = 0
 */
function _ctrl_F1_scriptJump(sys: SystemState): boolean {
  const ptrLo = sys.mem[0x005D] || 0;
  const ptrHi = sys.mem[0x005E] || 0;
  const offset = (sys.mem[0x003A] || 0);

  // Read 2-byte target address from script stream
  const addrLo = rom16(((ptrHi << 8) | ptrLo) + offset);
  const addrHi = rom16(((ptrHi << 8) | ptrLo) + offset + 1);

  sys.mem[0x005D] = addrLo;
  sys.mem[0x005E] = addrHi;
  sys.mem[0x003A] = 0;

  track('bank16_F1', { jumpTo: (addrHi << 8) | addrLo });
  return true;
}

/**
 * F2 ($80F4): 脚本跳转 2
 *   读 2 字节新地址
 *   $003A = 0
 */
function _ctrl_F2_scriptJump2(sys: SystemState): boolean {
  const ptrLo = sys.mem[0x005D] || 0;
  const ptrHi = sys.mem[0x005E] || 0;
  const offset = (sys.mem[0x003A] || 0);

  const addrLo = rom16(((ptrHi << 8) | ptrLo) + offset);
  const addrHi = rom16(((ptrHi << 8) | ptrLo) + offset + 1);

  sys.mem[0x005D] = addrLo;
  sys.mem[0x005E] = addrHi;
  sys.mem[0x003A] = 0;

  track('bank16_F2', { jumpTo: (addrHi << 8) | addrLo });
  return true;
}

/**
 * F3 ($8105): 字节码批量处理
 *
 * 6502 ($8105):
 *   LDY $003A, LDA ($005D),Y → PHA (保存 count)
 *   JSR $816E (子分派)
 *   PLA
 *   if bit7 set ($810E BPL): 跳过, 继续 JMP $80F6 (跳转处理)
 *   else: 推进指针, $003A=0, RTS
 *
 * $816E: AND #$7F, JSR $C509 → 查 $8173 jump table (32 entries)
 *   子处理器: 读取场景状态 (period, match state, flags, counters)
 *   返回: X = 状态值 (0/1/2/FF)
 *
 * $80F6 continuation: 读 2B 地址 → $005D/$005E, $003A=0
 */
function _ctrl_F3_bytecodeDispatch(sys: SystemState): boolean {
  const ptrLo = sys.mem[0x005D] || 0;
  const ptrHi = sys.mem[0x005E] || 0;
  let offset = sys.mem[0x003A] || 0;

  // Read count byte
  const countRaw = rom16(((ptrHi << 8) | ptrLo) + offset);
  offset = (offset + 1) & 0xFF;

  // $816E: sub-dispatch via $8173 jump table
  // AND #$7F to get sub-code (0-31), use as index into jump table
  const subIdx = countRaw & 0x7F;
  const subRet = _bank16_F3_subDispatch(sys, subIdx);

  if (countRaw & 0x80) {
    // $8110-811D: bit7 set → advance past remaining bytes
    // X from sub-dispatch is the byte count to skip
    offset = ((offset + subRet) & 0xFF);
    const newLo = ptrLo + offset;
    const newHi = ptrHi + (newLo > 0xFF ? 1 : 0);
    sys.mem[0x005D] = newLo & 0xFF;
    sys.mem[0x005E] = newHi;
    sys.mem[0x003A] = 0;
  } else {
    // $812F-8135: ASL, SEC, ADC → jump table entry index
    // Read 2B jump target from sub-table ($80F6 handler)
    const jumpIdx = subRet;
    const addrLo = rom16(((ptrHi << 8) | ptrLo) + offset + jumpIdx * 2);
    const addrHi = rom16(((ptrHi << 8) | ptrLo) + offset + jumpIdx * 2 + 1);
    sys.mem[0x005D] = addrLo;
    sys.mem[0x005E] = addrHi;
    sys.mem[0x003A] = 0;
  }

  track('bank16_F3', { subIdx, subRet });
  return true;
}

/**
 * $8173 F3 子分派表 (32 entries)
 * 每个处理函数读取特定场景状态值返回 X。
 *
 * 典型处理函数:
 *   $8207: JSR C50C, LDY #0, LDA ($34),Y, LDX #0 → returns campaign state
 *   $8211: check $0516 bit2, perhaps set
 *   $821C: read $0442, returns field/period state
 *   $822C: read $0444/$0612, check halftype
 *   $8251/8255/8259/8260/8264/8271/8275/828A: various scene state readers
 *   $8297: read $043D
 *   $829B: read $0612
 *   $829F: check $043B/$043C
 *   $82BA: read $0443, compare with 6, check $062C
 *   $832D: JSR $8350 (compute $0442 from $05FB^$0B via $C548)
 *   ...
 */
function _bank16_F3_subDispatch(sys: SystemState, idx: number): number {
  // $8173 jump table (32 × 2 bytes entries)
  const tableBase = 0x0173;
  const handlerLo = rom16(tableBase + idx * 2);
  const handlerHi = rom16(tableBase + idx * 2 + 1);
  const handler = (handlerHi << 8) | handlerLo;

  // Based on the handler target, return the appropriate X value
  // Each handler sets X to a scene state value
  switch (handler) {
    case 0x8207: // read $0442 via C50C
      return sys.mem[0x0442] || 0;
    case 0x8211: // check $0516 bit2
      return (sys.mem[0x0516] & 0x04) ? 0 : 1;
    case 0x821C: // read $0442 → period/field
      return sys.mem[0x0442] || 0;
    case 0x822C: // read $0444/$0612 → halftime check
      return sys.mem[0x0612] || 0;
    case 0x8251: // LDX $043D
      return sys.mem[0x043D] || 0;
    case 0x8255: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x8259: // LDX $044E, if zero check
      return (sys.mem[0x044E] || 0) ? (sys.mem[0x044E] || 0) - 1 : 0;
    case 0x8260: // LDX $0616
      return sys.mem[0x0616] || 0;
    case 0x8264: // check $0442 (0/0x0B)
      return (sys.mem[0x0442] === 0 || sys.mem[0x0442] === 0x0B) ? 1 : 0;
    case 0x8271: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x8275: // check $0442 + $043D combination
      return (sys.mem[0x0442] === 0 || sys.mem[0x0442] === 0x0B || sys.mem[0x043D] === 3) ? 0 : 1;
    case 0x828A: // LDY $043B, LDA $8291,Y
      {
        const tmp = sys.mem[0x043B] || 0;
        const idxTab = [0, 1, 0xFF, 0xFF, 2, 3];
        return idxTab[tmp] || 0;
      }
    case 0x8297: // LDX $043D
      return sys.mem[0x043D] || 0;
    case 0x829B: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x829F: // check $043B/$043C
      {
        const b = sys.mem[0x043B] || 0;
        if (b === 0) {
          const c = (sys.mem[0x043C] || 0) & 0x7F;
          if (c >= 3) return 1;
          return 0;
        }
        const c2 = (sys.mem[0x043C] || 0) & 0x7F;
        return c2 === 0 ? 0 : 1;
      }
    case 0x82BA: // read $0443, check $062C
      {
        const v = sys.mem[0x043D] || 0;
        return v > 3 ? 0 : v;
      }
    case 0x832D: // JSR $8350 → compute $0442 from $05FB
      {
        const fb = sys.mem[0x05FB] || 0;
        return fb ^ 0x0B;
      }
    case 0x8336: // RTS
      return 0;
    case 0x8337: // set $0612=2, inc $0616
      sys.mem[0x0612] = 2;
      sys.mem[0x0616] = (sys.mem[0x0616] || 0) + 1;
      return 0;
    case 0x8340: // JSR $8350, JSR $835C, set $043C=2
      {
        const fb0 = sys.mem[0x05FB] || 0;
        sys.mem[0x0442] = fb0 ^ 0x0B;
        sys.mem[0x0441] = fb0 ^ 0x0B;
        sys.mem[0x043C] = 2;
      }
      return 0;
    case 0x834C: // JSR $8350
      {
        const fb1 = sys.mem[0x05FB] || 0;
        sys.mem[0x0442] = fb1 ^ 0x0B;
      }
      return 0;
    case 0x8366: // LDX $043B
      return sys.mem[0x043B] || 0;
    case 0x836A: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x836E: // check $043B
      return sys.mem[0x043B] === 1 ? 0 : 1;
    case 0x837C: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x8380: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x8384: // JSR $838B
      return sys.mem[0x0612] || 0;
    case 0x8397: // RTS
      return 0;
    case 0x8398: // compute $0442 from $05FB^$0B
      {
        const fb2 = sys.mem[0x05FB] || 0;
        sys.mem[0x0442] = fb2 ^ 0x0B;
      }
      return 0;
    case 0x83A4: // LDX $0612
      return sys.mem[0x0612] || 0;
    case 0x83A8: // LDY $043D, LDA $83AF,Y
      {
        const d = sys.mem[0x043D] || 0;
        const tab = [0xFF, 0xFF, 0, 0xFF, 1];
        return tab[d] || 0;
      }
    case 0x83B4: // LDY $043B, LDA $83BB,Y
      {
        const d2 = sys.mem[0x043B] || 0;
        const tab2 = [0xFF, 0, 0xFF, 0];
        return tab2[d2] || 0;
      }
    default:
      // Unknown handler — try to be safe
      return 0;
  }
}

/**
 * $8991/$899C/$89A7: 特殊解码器 — byte2/3/4 中的控制码处理
 *
 * 当 tile 元数据字节也是 ≥ $F0 时, 这些解码器处理并返回替换值。
 * JSR $8991/$899C/$89A7 后返回到 $8069/$8079/$8089。
 *
 * 返回: >= 0 = 替换值, < 0 = 脚本退出
 */
function _bank16_special_decode(sys: SystemState, code: number, handler: number): number {
  // These special decode handlers ($8991, $899C, $89A7) process
  // control codes that appear in tile metadata slots.
  // They typically return a specific value based on the code.

  // For now, return the code directly (strip $F0 prefix)
  // In the full implementation these would dispatch to specific handlers
  const adjusted = code & 0x0F;

  track('bank16_specialDecode', { code: code.toString(16), handler });
  return adjusted;
}

// ═════════════════════════════════════════════════
// 场景脚本数据存取 (bank 03/04/05/25)
// ═════════════════════════════════════════════════

export { bank03Data as bank16_getSceneData03 };
export { bank04Data as bank16_getSceneData04 };
export { bank05Data as bank16_getSceneData05 };
export { bank25Data as bank16_getSceneData25 };
export { bank23Data as bank16_getLevelData23 };

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank16_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank16_dispatchEntry,
  0x03: bank16_sceneTick,
  0x0C: () => { /* stub: offset 0x0C — reserved */ },
};

console.log('[bank16] ✅ Phase 3 — 场景脚本解释器 (per-frame tick model)');
