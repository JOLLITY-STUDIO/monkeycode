/**
 * 完整追踪标题画面任务链
 * 从 FUN_0000c92c 开始，追踪所有任务函数
 *
 * 已知任务链 (来自 execution-trace.md):
 *   DAT_ffff8004 初始值 = FUN_0000c92c (Reset 函数中设置)
 *   FUN_0000c93a 设置 DAT_ffff8004 = FUN_0000c9a0
 *   FUN_0000ca00 设置 DAT_ffff8004 = FUN_0000ca68
 *   ...
 *
 * 我们需要找出所有任务函数，以及它们加载了什么资源
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, decompressLZSS, decompressNibbleRLE, RESOURCE_POINTER_TABLE_BASE } from '../dist/game/hw/resource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));
const rom = new ArrayBufferRomReader(romData);

function readByte(off) { return romData[off] & 0xff; }
function readWord(off) { return ((romData[off] & 0xff) << 8) | (romData[off + 1] & 0xff); }
function readLong(off) {
  return (
    ((romData[off] & 0xff) << 24) |
    ((romData[off + 1] & 0xff) << 16) |
    ((romData[off + 2] & 0xff) << 8) |
    (romData[off + 3] & 0xff)
  );
}

console.log('=== 标题画面任务链完整追踪 ===\n');

// ============================================================
// 首先找出所有向 DAT_ffff8004 写入的地方
// 这是任务切换的标志
// ============================================================

console.log('1. 搜索所有写入 DAT_ffff8004 (任务函数指针) 的位置:\n');

const taskSwitches = [];

// 搜索 MOVE.L #xxx, (0xFFFF8004).L
// 编码: 21FC xxxxxxxx 8004
// 不对，MOVE.L #imm, (addr).L 的编码是:
//   0x21FC (MOVE.L #imm, (xxx).L)
//   然后是 32-bit immediate (新的任务函数指针)
//   然后是 32-bit address (0xFFFF8004)
// 不对，让我重新想...

// 实际上，MOVE.L #xxx, $FFFF8004.L 的编码是:
//   0x23FC  (MOVE.L #imm, abs.L)
//   0xXXXX  (高 16 位 immediate)
//   0xXXXX  (低 16 位 immediate)
//   0xFFFF  (高 16 位地址)
//   0x8004  (低 16 位地址)

// 等等，0x21FC 是 MOVE.L Dn, (An) 之类的？
// 让我搜索更通用的模式: 写入 0xFFFF8004

// 最简单的方法: 搜索数据 0xFFFF8004 出现在哪里
for (let i = 0; i < romData.length - 4; i++) {
  if (romData[i] === 0xFF && romData[i + 1] === 0xFF &&
      romData[i + 2] === 0x80 && romData[i + 3] === 0x04) {
    // 找到 0xFFFF8004，看看前面的指令是什么
    // 回退几个字节看看操作码
    for (let back = 2; back <= 12; back += 2) {
      const opAddr = i - back;
      if (opAddr < 0) break;
      const op = readWord(opAddr);

      // MOVE.L #imm, (abs).L  = 0x23FC
      if (op === 0x23FC && back === 8) {
        const funcPtr = readLong(opAddr + 2);
        taskSwitches.push({
          addr: opAddr,
          type: 'MOVE.L #imm, (FFFF8004).L',
          taskFunc: funcPtr,
        });
        break;
      }

      // MOVEA.L #imm, An 然后 MOVE.L An, (abs).L
      // 或者其他模式
    }
  }
}

console.log(`找到 ${taskSwitches.length} 个任务切换:\n`);

for (const ts of taskSwitches) {
  const inTitle = ts.addr >= 0xC800 && ts.addr <= 0xCC00;
  const mark = inTitle ? ' ← 标题画面区域' : '';
  console.log(`  [0x${ts.addr.toString(16).padStart(6, '0')}] ${ts.type}`);
  console.log(`    → 任务函数 = 0x${ts.taskFunc.toString(16).padStart(8, '0')}${mark}`);
}

// ============================================================
// 现在，从 0xC92C 开始，追踪任务链
// ============================================================
console.log('\n\n2. 从 FUN_0000c92c 开始追踪任务链:\n');

const tasks = [];
let currentTask = 0x0000C92C; // 初始任务
const visited = new Set();

while (currentTask && !visited.has(currentTask) && tasks.length < 30) {
  visited.add(currentTask);

  // 找出这个任务函数的范围 (到下一个 RTS 或 RTS 之前)
  // 同时找出它设置的下一个任务

  let nextTask = null;
  let funcEnd = currentTask + 512; // 先假设最大 512 字节
  const jsrCalls = [];
  const moveTo8004 = [];

  for (let i = currentTask; i < currentTask + 1024 && i < romData.length; ) {
    const op = readWord(i);

    // RTS = 0x4E75
    if (op === 0x4E75) {
      funcEnd = i;
      break;
    }

    // JSR (xxx).L = 0x4EB9
    if (op === 0x4EB9) {
      const target = readLong(i + 2);
      jsrCalls.push({ addr: i, target });
      i += 6;
      continue;
    }

    // 检查是不是 MOVE.L #xxx, (0xFFFF8004).L
    if (op === 0x23FC) {
      const imm = readLong(i + 2);
      const destAddr = readLong(i + 6);
      if (destAddr === 0xFFFF8004) {
        nextTask = imm;
        moveTo8004.push({ addr: i, value: imm });
      }
      i += 10;
      continue;
    }

    // MOVE.W #imm, Dn = 0x3n3C (4 字节)
    if ((op & 0xF1FF) === 0x303C) {
      i += 4;
      continue;
    }

    // MOVE.L #imm, Dn = 0x2n3C (6 字节)
    if ((op & 0xF1FF) === 0x203C) {
      i += 6;
      continue;
    }

    // LEA (xxx).L, An = 0x4nF9 (6 字节)
    if ((op & 0xF1FF) === 0x41F9) {
      i += 6;
      continue;
    }

    // BSR.W = 0x6100 (4 字节)
    if ((op & 0xFF00) === 0x6100 && (op & 0x00FF) === 0x00) {
      const offset = readWord(i + 2);
      const target = i + 2 + offset;
      jsrCalls.push({ addr: i, target, type: 'BSR.W' });
      i += 4;
      continue;
    }

    // JMP (xxx).L = 0x4EF9
    if (op === 0x4EF9) {
      const target = readLong(i + 2);
      funcEnd = i;
      // 检查是不是跳到 0x85EE (帧同步)
      if (target === 0x000085EE) {
        // 帧同步，这是任务函数的常见结尾
      }
      break;
    }

    // 其他指令，默认 2 字节
    i += 2;
  }

  tasks.push({
    addr: currentTask,
    end: funcEnd,
    size: funcEnd - currentTask,
    jsrCalls,
    nextTask,
    moveTo8004,
  });

  currentTask = nextTask;
}

console.log(`任务链 (共 ${tasks.length} 个任务):\n`);

for (let i = 0; i < tasks.length; i++) {
  const t = tasks[i];
  console.log(`任务 ${i + 1}: FUN_${t.addr.toString(16).padStart(8, '0')}`);
  console.log(`  大小: ${t.size} 字节 (0x${t.addr.toString(16)} - 0x${t.end.toString(16)})`);
  console.log(`  调用 ${t.jsrCalls.length} 个子函数:`);

  for (const call of t.jsrCalls.slice(0, 10)) {
    const type = call.type || 'JSR';
    console.log(`    [0x${call.addr.toString(16).padStart(6, '0')}] ${type} 0x${call.target.toString(16).padStart(8, '0')}`);
  }
  if (t.jsrCalls.length > 10) {
    console.log(`    ... 还有 ${t.jsrCalls.length - 10} 个`);
  }

  if (t.nextTask) {
    console.log(`  → 下一个任务: FUN_${t.nextTask.toString(16).padStart(8, '0')}`);
  } else {
    console.log(`  → 结束 (无下一任务)`);
  }
  console.log('');
}

// ============================================================
// 列出所有调用的函数，看看哪些是资源加载相关的
// ============================================================
console.log('\n\n3. 所有被调用的函数汇总:\n');

const allCalled = new Map();
for (const t of tasks) {
  for (const call of t.jsrCalls) {
    if (!allCalled.has(call.target)) {
      allCalled.set(call.target, []);
    }
    allCalled.get(call.target).push({ fromTask: t.addr, fromAddr: call.addr });
  }
}

// 按调用次数排序
const sorted = Array.from(allCalled.entries()).sort((a, b) => b[1].length - a[1].length);

console.log(`共调用 ${sorted.length} 个不同函数:\n`);

for (const [target, callers] of sorted) {
  const callerList = callers.map(c => `0x${c.fromTask.toString(16).padStart(6, '0')}`).join(', ');
  console.log(`  FUN_${target.toString(16).padStart(8, '0')}  (被调用 ${callers.length} 次: ${callerList})`);
}

console.log('\n=== 追踪完成 ===');
