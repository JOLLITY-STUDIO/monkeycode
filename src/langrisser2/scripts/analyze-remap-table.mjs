/**
 * 分析场景重映射表 (ROM 0x6AE28 - 标题画面)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function readLong(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

const remapBase = 0x6AE28;
console.log(`标题画面重映射表: 0x${remapBase.toString(16)}`);

console.log('\n=== 读取前 256 个 word ===');
for (let i = 0; i < 256; i++) {
  const val = readWord(remapBase + i * 2);
  if (val !== 0) {
    console.log(`[${i}] = 0x${val.toString(16)} (${val})`);
  }
}

console.log('\n=== 读取前 512 个 byte ===');
for (let i = 0; i < 512; i += 16) {
  const line = Array.from({ length: 16 }, (_, j) => {
    const b = readByte(remapBase + i + j);
    return b.toString(16).padStart(2, '0');
  }).join(' ');
  console.log(`0x${(remapBase + i).toString(16)}: ${line}`);
}

console.log('\n=== 检查前 256 个 byte 是否是重映射表 ===');
const remapTable = new Array(256);
for (let i = 0; i < 256; i++) {
  remapTable[i] = readByte(remapBase + i);
}

console.log('重映射表 (索引 0-127):');
for (let i = 0; i < 128; i += 16) {
  const line = remapTable.slice(i, i + 16).map(v => v.toString(16).padStart(2, '0')).join(' ');
  console.log(`[${i}-${i + 15}]: ${line}`);
}

console.log('\n=== 验证重映射假设 ===');
console.log('VRAM dump 中 Plane B 引用的 tile: 97, 98, 105, 106, 353, 354, 361, 362, ...');
console.log('规律: 97 + 256*n = 97, 353, 609, 865, 1121, 1377, 1633, 1889');

const baseIndices = [97, 98, 105, 106];
for (const base of baseIndices) {
  const remapVal = remapTable[base];
  console.log(`重映射表[${base}] = ${remapVal} (0x${remapVal.toString(16)})`);
}

console.log('\n=== 检查重映射表是否包含完整的 0-255 映射 ===');
const uniqueValues = new Set(remapTable);
console.log(`重映射表不同值的数量: ${uniqueValues.size}`);
console.log('值范围:', Math.min(...remapTable), '-', Math.max(...remapTable));

console.log('\n=== 检查是否是连续映射 ===');
let isSequential = true;
for (let i = 0; i < 256; i++) {
  if (remapTable[i] !== i) {
    isSequential = false;
    break;
  }
}
console.log('是否连续映射:', isSequential);

console.log('\n=== 检查重映射表大小 ===');
let size = 0;
while (size < 1024) {
  if (readByte(remapBase + size) === 0xff) break;
  size++;
}
console.log(`重映射表大小: ${size} byte`);
