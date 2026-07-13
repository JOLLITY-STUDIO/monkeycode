/**
 * 深入分析 FUN_0000ca00 (0xCA00 附近) 的资源加载
 *
 * 发现 0xCA70 有 JSR 0x99b2 调用，
 * 让我们回溯它的 D0 (资源ID) 和 A1 (目标地址)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, loadResource, decompressLZSS, decompressNibbleRLE, RESOURCE_POINTER_TABLE_BASE } from '../dist/game/hw/resource.js';

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

console.log('=== 深入分析 FUN_0000ca00 附近的资源加载 ===\n');

// ============================================================
// 分析 0xCA70 的 JSR 0x99b2 调用
// ============================================================

const CALL_ADDR = 0xCA70;

console.log(`分析调用 @ 0x${CALL_ADDR.toString(16)}:`);
console.log('');

// 回溯 D0 和 A1
// 从 0xCA70 往前找，最多 128 字节
let d0 = null;
let a1 = null;
let d0Info = '';
let a1Info = '';

for (let off = CALL_ADDR - 2; off > CALL_ADDR - 128; ) {
  const op0 = romData[off];
  const op1 = romData[off + 1];

  // MOVE.W #xxx, D0  0x303C
  if (op0 === 0x30 && op1 === 0x3C) {
    if (d0 === null) {
      d0 = readWord(off + 2);
      d0Info = `MOVE.W #0x${d0.toString(16)}, D0 @ 0x${off.toString(16)}`;
    }
    off -= 4;
    continue;
  }

  // MOVE.L #xxx, D0  0x203C
  if (op0 === 0x20 && op1 === 0x3C) {
    if (d0 === null) {
      d0 = readLong(off + 2) & 0xFFFF;
      d0Info = `MOVE.L #..., D0 (low=0x${d0.toString(16)}) @ 0x${off.toString(16)}`;
    }
    off -= 6;
    continue;
  }

  // LEA (xxx).L, A1  0x43F9
  if (op0 === 0x43 && op1 === 0xF9) {
    if (a1 === null) {
      a1 = readLong(off + 2);
      a1Info = `LEA #0x${a1.toString(16)}, A1 @ 0x${off.toString(16)}`;
    }
    off -= 6;
    continue;
  }

  // 其他指令，假设 2 字节
  off -= 2;

  if (d0 !== null && a1 !== null) break;
}

console.log(`  D0 = ${d0 !== null ? '0x' + d0.toString(16).padStart(4, '0') : '?'}`);
console.log(`     ${d0Info}`);
console.log(`  A1 = ${a1 !== null ? '0x' + a1.toString(16).padStart(4, '0') : '?'}`);
console.log(`     ${a1Info}`);

// 计算资源 entry
if (d0 !== null && (d0 & 0x8000)) {
  const shift = d0 & 0x3F;
  const entry = (d0 & 0x7FFF) >> shift;
  const ptr = readLong(RESOURCE_POINTER_TABLE_BASE + entry * 4);
  const typeByte = rom.readByte(ptr);
  console.log(`\n  资源ID 0x${d0.toString(16)} → shift=${shift} → entry ${entry}`);
  console.log(`  ROM 地址: 0x${ptr.toString(16)}`);
  console.log(`  类型: ${typeByte}`);

  // 尝试解压
  try {
    let result;
    if (typeByte === 3) {
      result = decompressLZSS(rom, ptr);
      console.log(`  解压算法: LZSS`);
    } else if (typeByte === 1) {
      result = decompressNibbleRLE(rom, ptr);
      console.log(`  解压算法: Nibble RLE`);
    } else {
      console.log(`  未知类型，跳过`);
    }

    if (result) {
      console.log(`  解压后大小: ${result.size} 字节 (${(result.size / 32).toFixed(0)} 个 tile)`);
      // 前 32 字节 hex dump
      console.log(`  前 32 字节:`);
      let hexStr = '    ';
      for (let i = 0; i < 32 && i < result.size; i++) {
        hexStr += result.data[i].toString(16).padStart(2, '0') + ' ';
        if ((i + 1) % 16 === 0) {
          console.log(hexStr);
          hexStr = '    ';
        }
      }
      if (hexStr.trim()) console.log(hexStr);
    }
  } catch (e) {
    console.log(`  解压失败: ${e.message}`);
  }
}

// ============================================================
// 现在，让我们找出 FUN_0000ca00 到 FUN_0000cc80 之间所有资源加载
// ============================================================

console.log('\n\n=== FUN_0000ca00 - 0xCC80 范围内所有资源加载 ===\n');

const calls = [];
for (let i = 0xCA00; i < 0xCC80; i++) {
  if (romData[i] === 0x4E && romData[i + 1] === 0xB9) {
    const target = readLong(i + 2);
    if (target === 0x000099b2) {
      calls.push(i);
    }
  }
}

console.log(`找到 ${calls.length} 个调用:\n`);

for (const callAddr of calls) {
  // 回溯 D0
  let d = null;
  let a = null;
  let dInfo = '';
  let aInfo = '';

  for (let off = callAddr - 2; off > callAddr - 80; ) {
    const op0 = romData[off];
    const op1 = romData[off + 1];

    if (op0 === 0x30 && op1 === 0x3C) { // MOVE.W #xxx, D0
      if (d === null) {
        d = readWord(off + 2);
        dInfo = `@0x${off.toString(16)}`;
      }
      off -= 4;
      continue;
    }
    if (op0 === 0x20 && op1 === 0x3C) { // MOVE.L #xxx, D0
      if (d === null) {
        d = readLong(off + 2) & 0xFFFF;
        dInfo = `@0x${off.toString(16)} (L)`;
      }
      off -= 6;
      continue;
    }
    if (op0 === 0x43 && op1 === 0xF9) { // LEA #xxx.L, A1
      if (a === null) {
        a = readLong(off + 2) & 0xFFFF;
        aInfo = `@0x${off.toString(16)}`;
      }
      off -= 6;
      continue;
    }

    off -= 2;
    if (d !== null && a !== null) break;
  }

  let entryInfo = '';
  if (d !== null && (d & 0x8000)) {
    const shift = d & 0x3F;
    const entry = (d & 0x7FFF) >> shift;
    entryInfo = `entry ${entry}`;
  }

  console.log(`  [0x${callAddr.toString(16).padStart(6, '0')}] ` +
    `D0=0x${(d || 0).toString(16).padStart(4, '0')}  ` +
    `A1=0x${(a || 0).toString(16).padStart(4, '0')}  ` +
    `${entryInfo}`);
}

console.log('\n=== 分析完成 ===');
