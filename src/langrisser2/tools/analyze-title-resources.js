/**
 * 分析标题画面资源加载链
 *
 * 从 ROM 机器码中搜索所有调用 FUN_000099b2 (通用资源加载) 的地方，
 * 记录 D0 (资源ID) 和 A1 (VDP目标地址) 参数。
 *
 * 重点分析:
 *   - FUN_0000c80c (游戏主初始化)
 *   - FUN_0000c92c (默认任务)
 *   - FUN_0000c93a (标题画面主任务)
 *   - FUN_0000c9a0 (下一任务)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

console.log('=== 标题画面资源加载链分析 ===\n');

// ============================================================
// 68K 指令解码辅助函数
// ============================================================

function readWord(off) {
  return (rom[off] << 8) | rom[off + 1];
}

function readLong(off) {
  return (
    (rom[off] << 24) |
    (rom[off + 1] << 16) |
    (rom[off + 2] << 8) |
    rom[off + 3]
  );
}

/**
 * 反汇编一段 68K 代码，搜索 JSR/JMP 到 FUN_000099b2 的调用
 * 并尝试找出之前的 MOVE 指令设置的 D0/A1 参数
 */
function findResourceCalls(startAddr, endAddr, label) {
  console.log(`\n--- 分析 ${label} (0x${startAddr.toString(16)} - 0x${endAddr.toString(16)}) ---`);

  const calls = [];
  let off = startAddr;

  while (off < endAddr) {
    const opcode = readWord(off);

    // JSR (绝对长跳转)  0x4EB9 xxxxxxxx
    if (opcode === 0x4EB9) {
      const target = readLong(off + 2);
      if (target === 0x000099b2) {
        // 找到了调用 FUN_000099b2 的地方
        // 回溯找 D0 和 A1 的设置
        const ctx = findParamSetup(off);
        calls.push({
          callAddr: off,
          d0: ctx.d0,
          a1: ctx.a1,
          d0Source: ctx.d0Source,
          a1Source: ctx.a1Source,
        });
        console.log(`  [0x${off.toString(16).padStart(6, '0')}] JSR FUN_000099b2`);
        console.log(`    D0 = ${formatVal(ctx.d0)}  (${ctx.d0Source})`);
        console.log(`    A1 = ${formatVal(ctx.a1)}  (${ctx.a1Source})`);
      }
      off += 6;
      continue;
    }

    // JSR (PC相对)  0x4EBA xxxx
    if ((opcode & 0xFFC0) === 0x4E80) {
      // 各种 JSR 寻址模式，暂时跳过，只处理绝对长跳转
      off += 2 + getOpSize(opcode);
      continue;
    }

    // 常见指令长度估算 (简化)
    off += getInstructionLength(opcode, off);
  }

  return calls;
}

/**
 * 回溯查找 D0 和 A1 的设置
 */
function findParamSetup(callAddr) {
  let d0 = null;
  let a1 = null;
  let d0Source = 'unknown';
  let a1Source = 'unknown';

  // 回溯最多 40 字节
  let off = callAddr - 2;
  let steps = 0;
  const maxSteps = 30;

  while (off > callAddr - 80 && steps < maxSteps) {
    const opcode = readWord(off);

    // MOVE.W #xxx, D0  : 0x303C xxxx
    if (opcode === 0x303C) {
      if (d0 === null) {
        d0 = readWord(off + 2);
        d0Source = `MOVE.W #0x${d0.toString(16)}, D0`;
      }
      off -= 4;
      steps++;
      continue;
    }

    // MOVE.L #xxx, D0  : 0x203C xxxxxxxx
    if (opcode === 0x203C) {
      if (d0 === null) {
        d0 = readLong(off + 2);
        d0Source = `MOVE.L #0x${d0.toString(16)}, D0`;
      }
      off -= 6;
      steps++;
      continue;
    }

    // MOVE.W #xxx, D1  : 0x323C xxxx  (可能是 A1 的初始值)
    if (opcode === 0x323C) {
      if (a1 === null) {
        a1 = readWord(off + 2);
        a1Source = `MOVE.W #0x${a1.toString(16)}, D1`;
      }
      off -= 4;
      steps++;
      continue;
    }

    // LEA #xxx, A1  : 0x43F9 xxxxxxxx  (绝对长地址)
    if (opcode === 0x43F9) {
      if (a1 === null) {
        a1 = readLong(off + 2);
        a1Source = `LEA #0x${a1.toString(16)}, A1`;
      }
      off -= 6;
      steps++;
      continue;
    }

    // LEA #xxx, A1  : 0x43FA xxxx  (PC相对)
    if (opcode === 0x43FA) {
      if (a1 === null) {
        const disp = readWord(off + 2);
        if (disp & 0x8000) {
          a1 = off + 2 + (disp - 0x10000);
        } else {
          a1 = off + 2 + disp;
        }
        a1Source = `LEA (PC, ${disp.toString(16)}), A1 → 0x${a1.toString(16)}`;
      }
      off -= 4;
      steps++;
      continue;
    }

    // MOVE.W D1, A1  : 0x3241
    if (opcode === 0x3241) {
      if (a1 === null) {
        a1Source = 'MOVE.W D1, A1 (from D1)';
        // a1 沿用 D1 的值，这里标记一下
      }
      off -= 2;
      steps++;
      continue;
    }

    // 其他指令，尝试跳过
    const len = getInstructionLength(opcode, off);
    off -= len;
    steps++;
  }

  return { d0, a1, d0Source, a1Source };
}

function formatVal(v) {
  if (v === null) return '?';
  return '0x' + v.toString(16).padStart(4, '0');
}

function getInstructionLength(opcode, off) {
  // 简化的长度计算，只处理常见指令
  // MOVE.W #xxx, Dn  0x303C+...
  if ((opcode & 0xF1FF) === 0x303C) return 4;
  // MOVE.L #xxx, Dn  0x203C+...
  if ((opcode & 0xF1FF) === 0x203C) return 6;
  // LEA (xxx).L, An  0x41F9+...
  if ((opcode & 0xF1FF) === 0x41F9) return 6;
  // LEA (PC, xxx), An  0x41FA+...
  if ((opcode & 0xF1FF) === 0x41FA) return 4;
  // MOVEM.L  0x48E7 / 0x4CDF
  if (opcode === 0x48E7 || opcode === 0x4CDF) return 4;
  // JSR (xxx).L  0x4EB9+...
  if (opcode === 0x4EB9) return 6;
  // RTS  0x4E75
  if (opcode === 0x4E75) return 2;
  // BSR  0x61xx
  if ((opcode & 0xFF00) === 0x6100) {
    const disp = opcode & 0xFF;
    if (disp === 0) return 4; // BSR.W
    return 2;
  }
  // BRA  0x60xx
  if ((opcode & 0xFF00) === 0x6000) {
    const disp = opcode & 0xFF;
    if (disp === 0) return 4;
    return 2;
  }
  // 默认 2 字节
  return 2;
}

function getOpSize(opcode) {
  // 简化版
  return 2;
}

// ============================================================
// 分析各函数
// ============================================================

// FUN_0000c80c: 游戏主初始化 (0xC80C - 0xC914 之前)
findResourceCalls(0xC80C, 0xC914, 'FUN_0000c80c (游戏主初始化)');

// FUN_0000c914: 资源加载函数本身 (0xC914 - 0xC92C)
console.log('\n--- FUN_0000c914 (ROM 0xC914) ---');
console.log('  已知: 加载资源 ID 0x8001 到 VRAM 地址 0x0000');
console.log('  (execution-trace.md 已验证)');

// FUN_0000c92c: 默认任务 (0xC92C - 0xC93A)
findResourceCalls(0xC92C, 0xC980, 'FUN_0000c92c (默认任务)');

// FUN_0000c93a: 标题画面主任务 (0xC93A - 0xC9A0)
findResourceCalls(0xC93A, 0xC9A0, 'FUN_0000c93a (标题画面主任务)');

// FUN_0000c9a0: 下一任务 (0xC9A0 - 0xCA00)
findResourceCalls(0xC9A0, 0xCA20, 'FUN_0000c9a0 (下一任务)');

// ============================================================
// 列出资源指针表前 32 个 entry
// ============================================================

console.log('\n\n=== 资源指针表前 32 个 entry (ROM 0x000B0000) ===\n');
const TABLE_BASE = 0x000B0000;
for (let i = 0; i < 32; i++) {
  const ptr = readLong(TABLE_BASE + i * 4);
  const typeByte = ptr < rom.length ? rom[ptr] : -1;
  let typeName = '?';
  let size = 0;
  if (typeByte === 1) {
    typeName = 'Nibble RLE';
    size = (rom[ptr + 1] << 8) | rom[ptr + 2];
  } else if (typeByte === 3) {
    typeName = 'LZSS';
    size = (rom[ptr + 1] << 8) | rom[ptr + 2];
  } else if (typeByte >= 0) {
    typeName = `Type ${typeByte}`;
    if (ptr + 2 < rom.length) {
      size = (rom[ptr + 1] << 8) | rom[ptr + 2];
    }
  }
  const sizeK = (size / 1024).toFixed(1);
  console.log(`  entry ${i.toString().padStart(2, ' ')}: 0x${ptr.toString(16).padStart(8, '0')}` +
    `  type=${typeName.padEnd(10)}  size=${size.toString().padStart(5, ' ')}B (${sizeK}KB)`);
}

console.log('\n=== 分析完成 ===');
