/**
 * 精简版: 只分析标题画面任务链的资源加载
 *
 * 任务链:
 *   FUN_0000c914 -> FUN_0000c92c -> FUN_0000c93a -> FUN_0000c9a0 -> FUN_0000ca00
 *
 * 追踪每个函数中对 FUN_000099b2 (LoadResource) 的调用
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return romData[off] & 0xff; }
function r16(off) { return ((romData[off] & 0xff) << 8) | (romData[off + 1] & 0xff); }
function r32(off) {
  return (
    ((romData[off] & 0xff) << 24) |
    ((romData[off + 1] & 0xff) << 16) |
    ((romData[off + 2] & 0xff) << 8) |
    (romData[off + 3] & 0xff)
  );
}

const RESOURCE_TABLE = 0x000B0000;
const RESOURCE_COUNT = 0xE8;

function getResourceInfo(index) {
  if (index < 0 || index >= RESOURCE_COUNT) return null;
  const offset = r32(RESOURCE_TABLE + index * 4);
  const nextOffset = index < RESOURCE_COUNT - 1 
    ? r32(RESOURCE_TABLE + (index + 1) * 4) 
    : romData.length;
  const size = nextOffset - offset;
  const header = r8(offset);
  let format = 'unknown';
  if (header === 0x00 || header === 0x01) format = 'LZSS';
  else if (header === 0x02 || header === 0x03) format = 'Nibble RLE';
  else if (header === 0xFF) format = 'Raw';
  return { index, offset, size, format, header };
}

/**
 * 在指定地址范围内搜索 JSR 0x99b2 调用
 */
function find99b2CallsInRange(start, end) {
  const calls = [];
  for (let i = start; i < end - 6; i += 2) {
    if (r16(i) === 0x4eb9 && r32(i + 2) === 0x000099b2) {
      calls.push(i);
    }
  }
  return calls;
}

/**
 * 回溯查找 D0 值 (资源 ID)
 * 从 callAddr 向前找 MOVE #imm, D0
 */
function findD0Value(callAddr) {
  for (let back = 2; back <= 64; back += 2) {
    const addr = callAddr - back;
    if (addr < 0) break;
    const op = r16(addr);
    
    // MOVE.L #imm, D0 = 0x203c
    if ((op & 0xfff8) === 0x203c) {
      return { value: r32(addr + 2), size: 'L' };
    }
    // MOVE.W #imm, D0 = 0x303c
    if ((op & 0xfff8) === 0x303c) {
      return { value: r16(addr + 2), size: 'W' };
    }
  }
  return null;
}

/**
 * 回溯查找 A1 值 (目标地址)
 */
function findA1Value(callAddr) {
  for (let back = 2; back <= 64; back += 2) {
    const addr = callAddr - back;
    if (addr < 0) break;
    const op = r16(addr);
    
    // LEA (xxx).L, A1 = 0x43f9
    if ((op & 0xfff8) === 0x43f8) {
      return { value: r32(addr + 2), type: 'absolute' };
    }
    // MOVEA.L D0, A1 = 0x2240
    if (op === 0x2240) {
      return { value: 'D0', type: 'register' };
    }
  }
  return null;
}

// ============================================================
// 主程序
// ============================================================

console.log('=== 标题画面任务链资源加载分析 ===\n');

const taskChain = [
  { name: 'FUN_0000c914', start: 0xc914, end: 0xc92c },
  { name: 'FUN_0000c92c', start: 0xc92c, end: 0xc93a },
  { name: 'FUN_0000c93a', start: 0xc93a, end: 0xc9a0 },
  { name: 'FUN_0000c9a0', start: 0xc9a0, end: 0xca00 },
  { name: 'FUN_0000ca00', start: 0xca00, end: 0xca68 },
  { name: 'FUN_0000ca68', start: 0xca68, end: 0xca8a },
  { name: 'FUN_0000ca8a', start: 0xca8a, end: 0xca9e },
  { name: 'FUN_0000ca9e', start: 0xca9e, end: 0xcb00 },
];

// FUN_0000c9a0 调用的子函数
const subFuncs = [
  { name: 'FUN_00010abe', start: 0x10abe, end: 0x10abe + 0x200 },
  { name: 'FUN_00010fde', start: 0x10fde, end: 0x10fde + 0x200 },
  { name: 'FUN_0001105c', start: 0x1105c, end: 0x1105c + 0x200 },
  { name: 'FUN_000110a8', start: 0x110a8, end: 0x110a8 + 0x200 },
];

const allFuncs = [...taskChain, ...subFuncs];

for (const func of allFuncs) {
  const calls = find99b2CallsInRange(func.start, func.end);
  
  if (calls.length === 0) continue;
  
  console.log(`${func.name} (0x${func.start.toString(16).padStart(6, '0')}):`);
  
  for (const callAddr of calls) {
    const d0 = findD0Value(callAddr);
    const a1 = findA1Value(callAddr);
    
    let resInfo = '';
    if (d0 && d0.value >= 0x8000) {
      const index = (d0.value - 0x8000) >> 1;
      const info = getResourceInfo(index);
      if (info) {
        resInfo = ` [entry ${index}, ${info.format}, ${info.size}B @ 0x${info.offset.toString(16)}]`;
      }
    }
    
    console.log(`  JSR @ 0x${callAddr.toString(16).padStart(6, '0')}: ` +
      `D0=${d0 ? '0x' + d0.value.toString(16).padStart(4, '0') : '?'} ` +
      `A1=${a1 ? (a1.type === 'absolute' ? '0x' + a1.value.toString(16).padStart(6, '0') : a1.value) : '?'}` +
      resInfo);
  }
  console.log('');
}

// 另外，搜索 FUN_0000a78c (可能是调色板加载) 的调用
console.log('=== 搜索调用 FUN_0000a78c 的位置 ===\n');
const a78cCalls = [];
for (let i = 0; i < romData.length - 6; i += 2) {
  if (r16(i) === 0x4eb9 && r32(i + 2) === 0x0000a78c) {
    a78cCalls.push(i);
  }
}
console.log(`找到 ${a78cCalls.length} 个调用`);

// 只显示标题画面附近的
const titleNear = a78cCalls.filter(a => a >= 0xc000 && a < 0xd000);
console.log(`标题画面附近: ${titleNear.length} 个`);
for (const addr of titleNear) {
  console.log(`  0x${addr.toString(16).padStart(6, '0')}`);
}

// 也看看 0x10000-0x12000 范围的
const midRange = a78cCalls.filter(a => a >= 0x10000 && a < 0x12000);
console.log(`0x10000-0x12000 范围: ${midRange.length} 个`);
for (const addr of midRange) {
  console.log(`  0x${addr.toString(16).padStart(6, '0')}`);
}

console.log('\n=== 完成 ===');
