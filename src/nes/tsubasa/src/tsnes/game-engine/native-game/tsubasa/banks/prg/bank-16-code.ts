/**
 * Bank 16: Scene Logic/Script Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 场景渲染/脚本引擎 — 场景数据解码、PPU 批量写入、脚本解释执行
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（场景脚本引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8006 (scene dispatch init)
 *   $8003 → JMP $8021 (scene update/tick)
 *
 * Phase 2b: 骨架实现 — 字节码场景脚本解释器
 *   负责将 ROM 中的场景脚本数据（TECMO logo、标题画面等）解码并写入 PPU nametable
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_16_scene_logic.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track } from '../debug-log';

// ── ROM data registration ──// ═════════════════════════════════════════════════
// Scene script bytecode opcodes ($8000 entry)
// ═════════════════════════════════════════════════
//
// $8000/$8006: 场景脚本分派入口。
// 6502 原始: 从 $05EA 表的场景索引读取脚本指针 ($5D/$5E)，
// 然后逐字节解释执行场景脚本。
//
// 场景脚本格式 (bytecode):
//   < $F0: tile data → 写入 PPU nametable
//   ≥ $F0: 控制码 → 分发给子处理器
//     $F0-FE: 各控制码子功能
//     $FF: 脚本结束/RTS

/** $8000/$8006: 场景分派入口 — 场景脚本解释器 */
export function bank16_dispatchEntry(sys: SystemState): void {
  track('bank16_dispatchEntry', { sceneIdx: sys.mem[0x05EA] });

  // ── 从 $05EA 表读取场景脚本指针 ──
  // $8006: LDX $05EA; LDA $05EA+1  (actual offsets in ROM)
  // 读取 $5D/$5E 脚本指针
  const sceneIdx = sys.mem[0x05EA] || 0;
  const ptrLo = readMem(sys, 0x8000 + sceneIdx * 2);
  const ptrHi = readMem(sys, 0x8000 + sceneIdx * 2 + 1);

  if (ptrLo === 0 && ptrHi === 0) {
    // 无效指针 → 返回 (场景未定义)
    console.log(`[bank16] dispatchEntry: scene #${sceneIdx} not defined`);
    return;
  }

  sys.mem[0x5D] = ptrLo;
  sys.mem[0x5E] = ptrHi;
  sys.mem[0x3A] = 0; // 脚本偏移归零

  console.log(`[bank16] dispatchEntry: scene #${sceneIdx} → $${ptrHi.toString(16)}${ptrLo.toString(16)}`);

  // 进入字节码执行循环
  _bank16_executeBytecode(sys);
}

/** $8003/$8021: 场景更新/tick — 每帧调用以推进脚本 */
export function bank16_sceneTick(sys: SystemState): void {
  track('bank16_sceneTick');
  // 如果脚本指针有效，继续执行
  if (sys.mem[0x5E] !== 0 || sys.mem[0x5D] !== 0) {
    _bank16_executeBytecode(sys);
  }
}

// ═════════════════════════════════════════════════
// 字节码执行器 — 核心解释循环
// ═════════════════════════════════════════════════

/**
 * 字节码解释器主循环。
 *
 * 6502 逻辑: 从 ($5D)+Y 逐字节读取，根据值分发：
 *   < $F0: 写入当前 PPU 队列的 tile 数据
 *   ≥ $F0: 控制码 → 查跳转表，执行子处理器
 *
 * 安全上限: 每帧最多 200 个字节码，防止死循环
 */
function _bank16_executeBytecode(sys: SystemState): void {
  const ptr = (sys.mem[0x5E] << 8) | sys.mem[0x5D];
  if (ptr < 0x8000 || ptr > 0xBFFF) {
    return; // 无效指针
  }

  let offset = sys.mem[0x3A] || 0;
  const MAX_OPS = 200;
  let ops = 0;

  while (ops < MAX_OPS) {
    const byte = readMem(sys, (ptr + offset) & 0xFFFF);
    ops++;

    if (byte >= 0xFF) {
      // $FF: 脚本终止
      console.log(`[bank16] bytecode end at offset ${offset}`);
      sys.mem[0x5D] = 0;
      sys.mem[0x5E] = 0;
      sys.mem[0x3A] = 0;
      return;
    }

    if (byte >= 0xF0) {
      // 控制码: 跳到子处理器
      const handlerOffset = byte - 0xF0;
      offset = (offset + 1) & 0xFF;
      const shouldContinue = _bank16_handleControl(sys, handlerOffset, ptr, offset);
      if (!shouldContinue) {
        sys.mem[0x3A] = offset;
        return; // 控制码请求暂停（等 NMI 或下一帧）
      }
      // 控制码处理后可能跳转到新位置
      offset = sys.mem[0x3A] || offset;
    } else {
      // tile 数据: 写入 PPU nametable 队列
      _bank16_writeTileToQueue(sys, byte);
      offset = (offset + 1) & 0xFF;
    }
  }

  sys.mem[0x3A] = offset;
  if (ops >= MAX_OPS) {
    console.log(`[bank16] bytecode yield: ${ops} ops, resume at offset ${offset}`);
  }
}

// ═════════════════════════════════════════════════
// 控制码处理器
// ═════════════════════════════════════════════════

/**
 * 控制码分派 ($F0-$FE)。
 *
 * 6502 跳转表 ($80AF → 16 个条目):
 *   F0 → $80CF (设置标志)
 *   F1 → $80D4 (跳转/偏移)
 *   F2 → $80F4 (设置 nametable 坐标)
 *   F3 → $8105 (PPU 批量写入)
 *   F4 → $81E0 (子脚本调用)
 *   F5 → $81F6 (返回)
 *   F6 → $81EC (循环)
 *   F7 → $81F9 (条件)
 *   ... (F8-FE 各种辅助)
 */
function _bank16_handleControl(
  sys: SystemState,
  code: number,
  basePtr: number,
  offset: number,
): boolean {
  switch (code) {
    case 0x00: // F0: 设置场景标志
      // 读下一字节作为标志
      sys.mem[0x052A] = readMem(sys, (basePtr + offset) & 0xFFFF);
      sys.mem[0x3A] = (offset + 1) & 0xFF;
      return true;

    case 0x01: // F1: 脚本指针跳转
      // 读 2 字节新地址 → $5D/$5E
      const newLo = readMem(sys, (basePtr + offset) & 0xFFFF);
      const newHi = readMem(sys, (basePtr + offset + 1) & 0xFFFF);
      sys.mem[0x5D] = newLo;
      sys.mem[0x5E] = newHi;
      sys.mem[0x3A] = 0;
      return true;

    case 0x02: // F2: 设置 nametable 写入位置
      // 读 2 字节 → PPU 地址
      writeMem(sys, 0x0523, readMem(sys, (basePtr + offset) & 0xFFFF)); // addr lo
      writeMem(sys, 0x0524, readMem(sys, (basePtr + offset + 1) & 0xFFFF)); // addr hi
      sys.mem[0x3A] = (offset + 2) & 0xFF;
      return true;

    case 0x03: // F3: PPU 批量数据写入
      // 读 count 字节，写入 PPU 队列
      {
        const count = readMem(sys, (basePtr + offset) & 0xFFFF);
        if (count === 0) {
          writeMem(sys, 0x0516, (readMem(sys, 0x0516) | 0x04) & 0xEF);
          sys.mem[0x3A] = 0;
          return false; // 等待 NMI
        }
        const ppuLo = readMem(sys, 0x0523);
        const ppuHi = readMem(sys, 0x0524);
        const qIdx = readMem(sys, 0x0628) || 0;

        // 构建队列条目
        writeMem(sys, 0x05E8 + qIdx, count);
        writeMem(sys, 0x05E9 + qIdx, ppuLo);
        writeMem(sys, 0x05EA + qIdx, ppuHi);
        for (let i = 0; i < count; i++) {
          writeMem(sys, 0x05EB + qIdx + i, readMem(sys, (basePtr + offset + 1 + i) & 0xFFFF));
        }
        writeMem(sys, 0x0628, qIdx + 3 + count);
        writeMem(sys, 0x05E8 + qIdx + 3 + count, 0); // 终止符

        // NMI 标志
        writeMem(sys, 0x0515, 0x80);
        sys.mem[0x3A] = (offset + 1 + count) & 0xFF;
        return true;
      }

    case 0x04: // F4: 子脚本调用（保存返回地址到 $0522 栈）
      {
        const retLo = sys.mem[0x5D];
        const retHi = sys.mem[0x5E];
        const retOff = (offset + 2) & 0xFF;
        const stackIdx = readMem(sys, 0x0522) || 0;

        // 保存返回地址到调用栈
        writeMem(sys, 0x051A + stackIdx, retLo);
        writeMem(sys, 0x051B + stackIdx, retHi);
        writeMem(sys, 0x0522, stackIdx + 2);

        // 跳到子脚本
        sys.mem[0x5D] = readMem(sys, (basePtr + offset) & 0xFFFF);
        sys.mem[0x5E] = readMem(sys, (basePtr + offset + 1) & 0xFFFF);
        sys.mem[0x3A] = 0;
        return true;
      }

    case 0x05: // F5: 从子脚本返回
      {
        const stackIdx = (readMem(sys, 0x0522) || 0) - 2;
        if (stackIdx < 0) {
          // 栈空 → 脚本结束
          sys.mem[0x5D] = 0;
          sys.mem[0x5E] = 0;
          return false;
        }
        sys.mem[0x5D] = readMem(sys, 0x051A + stackIdx);
        sys.mem[0x5E] = readMem(sys, 0x051B + stackIdx);
        sys.mem[0x0522] = stackIdx;
        sys.mem[0x3A] = (offset + 1) & 0xFF;
        return true;
      }

    case 0x07: // F7: 条件跳转 (检查 $052A 标志)
      {
        const flag = readMem(sys, 0x052A) || 0;
        const jumpLo = readMem(sys, (basePtr + offset) & 0xFFFF);
        const jumpHi = readMem(sys, (basePtr + offset + 1) & 0xFFFF);
        if (flag !== 0) {
          sys.mem[0x5D] = jumpLo;
          sys.mem[0x5E] = jumpHi;
          sys.mem[0x3A] = 0;
        } else {
          sys.mem[0x3A] = (offset + 2) & 0xFF;
        }
        return true;
      }

    default:
      // F6, F8-FE: 其他控制码（延迟、属性、音频触发等）
      // 大部分只读 1-2 字节参数然后继续
      const param = readMem(sys, (basePtr + offset) & 0xFFFF);
      console.log(`[bank16] control F${code.toString(16)}: param=$${param.toString(16)}`);
      sys.mem[0x3A] = (offset + 1) & 0xFF;
      return true;
  }
}

// ═════════════════════════════════════════════════
// PPU 队列辅助
// ═════════════════════════════════════════════════

/** 将单个 tile 写入 PPU 队列 */
function _bank16_writeTileToQueue(sys: SystemState, tile: number): void {
  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, 1); // entry: 1 tile
  writeMem(sys, 0x05E9 + qIdx, sys.mem[0x0523] || 0); // PPU addr lo
  writeMem(sys, 0x05EA + qIdx, sys.mem[0x0524] || 0x22); // PPU addr hi
  writeMem(sys, 0x05EB + qIdx, tile);
  writeMem(sys, 0x05EB + qIdx + 1, 0); // terminator

  // 推进 nametable 列
  sys.mem[0x0523] = (sys.mem[0x0523] + 1) & 0xFF;
  writeMem(sys, 0x0628, qIdx + 4);

  // NMI flag
  writeMem(sys, 0x0515, 0x80);
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

/** Bank 16 dispatch table (offset → handler) */
export const bank16_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank16_dispatchEntry,
  0x03: bank16_sceneTick,
};

console.log('[bank16] ✅ Phase 2b — 场景脚本解释器 (dispatch|tick|bytecode)');
