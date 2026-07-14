/**
 * 验证 VRAM 0x2000 tile data 来源
 * 假设: tile data 来自 ROM 0x080674 或 0x080328 的 tile data 表
 * 表格式: 每 entry 34 字节 (2 字节 tile index + 32 字节 tile data)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }

console.log('=== 1. 检查 ROM 0x080674 tile data 表 (场景 1 用) ===');
// 表格式: 每 entry 34 字节
// byte 0-1: tile index (大端)
// byte 2-33: tile data (32 字节)

// 读取前 5 个 entries
for (let i = 0; i < 5; i++) {
  const entryOff = 0x080674 + i * 34;
  const tileIndex = readWord(entryOff);
  console.log(`\nEntry ${i} (ROM 0x${entryOff.toString(16)}):`);
  console.log(`  Tile index: ${tileIndex} (0x${tileIndex.toString(16)})`);

  // 显示 tile data
  console.log(`  Tile data:`);
  for (let y = 0; y < 8; y++) {
    let line = '    ';
    for (let p = 0; p < 4; p++) {
      line += rom[entryOff + 2 + y * 4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }

  // 对比 VRAM 0x2000 + tileIndex * 32
  const vramOff = 0x2000 + tileIndex * 32;
  console.log(`  VRAM 0x${vramOff.toString(16)} (tile ${tileIndex}):`);
  for (let y = 0; y < 8; y++) {
    let line = '    ';
    for (let p = 0; p < 4; p++) {
      line += vram[vramOff + y * 4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }

  // 计算匹配率
  let match = 0;
  for (let j = 0; j < 32; j++) {
    if (rom[entryOff + 2 + j] === vram[vramOff + j]) match++;
  }
  console.log(`  匹配: ${match}/32 (${(match/32*100).toFixed(0)}%)`);
}

console.log('\n=== 2. 扫描整个表，计算总体匹配率 ===');
let totalEntries = 0;
let matchedEntries = 0;
let totalBytes = 0;
let matchedBytes = 0;
let entryIdx = 0;

while (entryIdx < 300) {
  const entryOff = 0x080674 + entryIdx * 34;
  const tileIndex = readWord(entryOff);

  // 检查是否到表末尾 (0xFFFF)
  if (tileIndex === 0xFFFF) {
    console.log(`表结束于 entry ${entryIdx} (ROM 0x${entryOff.toString(16)}), tile index = 0xFFFF`);
    break;
  }

  // 检查 tile index 是否有效
  if (tileIndex > 255) {
    console.log(`异常 tile index ${tileIndex} 在 entry ${entryIdx}, 停止`);
    break;
  }

  const vramOff = 0x2000 + tileIndex * 32;
  let match = 0;
  for (let j = 0; j < 32; j++) {
    if (rom[entryOff + 2 + j] === vram[vramOff + j]) match++;
  }
  totalEntries++;
  totalBytes += 32;
  matchedBytes += match;
  if (match === 32) matchedEntries++;

  entryIdx++;
}

console.log(`\n总计: ${totalEntries} entries`);
console.log(`完全匹配: ${matchedEntries}/${totalEntries}`);
console.log(`字节匹配: ${matchedBytes}/${totalBytes} (${(matchedBytes/totalBytes*100).toFixed(1)}%)`);

console.log('\n=== 3. 也检查 0x080328 表 ===');
totalEntries = 0;
matchedEntries = 0;
totalBytes = 0;
matchedBytes = 0;
entryIdx = 0;

while (entryIdx < 300) {
  const entryOff = 0x080328 + entryIdx * 34;
  const tileIndex = readWord(entryOff);

  if (tileIndex === 0xFFFF) {
    console.log(`表结束于 entry ${entryIdx} (ROM 0x${entryOff.toString(16)})`);
    break;
  }

  if (tileIndex > 255) {
    console.log(`异常 tile index ${tileIndex} 在 entry ${entryIdx}, 停止`);
    break;
  }

  const vramOff = 0x2000 + tileIndex * 32;
  let match = 0;
  for (let j = 0; j < 32; j++) {
    if (rom[entryOff + 2 + j] === vram[vramOff + j]) match++;
  }
  totalEntries++;
  totalBytes += 32;
  matchedBytes += match;
  if (match === 32) matchedEntries++;

  entryIdx++;
}

console.log(`\n0x080328 表总计: ${totalEntries} entries`);
console.log(`完全匹配: ${matchedEntries}/${totalEntries}`);
console.log(`字节匹配: ${matchedBytes}/${totalBytes} (${(matchedBytes/totalBytes*100).toFixed(1)}%)`);

// 也检查 0x080328 + base offset 0x100 的情况
console.log('\n=== 4. 检查 0x080328 表 + base offset 0x100 ===');
totalEntries = 0;
matchedEntries = 0;
totalBytes = 0;
matchedBytes = 0;
entryIdx = 0;

while (entryIdx < 300) {
  const entryOff = 0x080328 + entryIdx * 34;
  const tileIndex = readWord(entryOff);

  if (tileIndex === 0xFFFF) break;
  if (tileIndex > 255) break;

  // base offset = 0x100, 所以 VRAM 地址 = 0x2000 + (tileIndex + 0x100) * 32
  const vramOff = 0x2000 + (tileIndex + 0x100) * 32;
  if (vramOff + 32 > vram.length) break;

  let match = 0;
  for (let j = 0; j < 32; j++) {
    if (rom[entryOff + 2 + j] === vram[vramOff + j]) match++;
  }
  totalEntries++;
  totalBytes += 32;
  matchedBytes += match;
  if (match === 32) matchedEntries++;

  entryIdx++;
}

console.log(`base 0x100: ${totalEntries} entries, 完全匹配 ${matchedEntries}, 字节匹配 ${matchedBytes}/${totalBytes} (${(matchedBytes/totalBytes*100).toFixed(1)}%)`);

// 检查 0x080674 + base offset 0x100
console.log('\n=== 5. 检查 0x080674 表 + base offset 0x100 ===');
totalEntries = 0;
matchedEntries = 0;
totalBytes = 0;
matchedBytes = 0;
entryIdx = 0;

while (entryIdx < 300) {
  const entryOff = 0x080674 + entryIdx * 34;
  const tileIndex = readWord(entryOff);

  if (tileIndex === 0xFFFF) break;
  if (tileIndex > 255) break;

  const vramOff = 0x2000 + (tileIndex + 0x100) * 32;
  if (vramOff + 32 > vram.length) break;

  let match = 0;
  for (let j = 0; j < 32; j++) {
    if (rom[entryOff + 2 + j] === vram[vramOff + j]) match++;
  }
  totalEntries++;
  totalBytes += 32;
  matchedBytes += match;
  if (match === 32) matchedEntries++;

  entryIdx++;
}

console.log(`base 0x100: ${totalEntries} entries, 完全匹配 ${matchedEntries}, 字节匹配 ${matchedBytes}/${totalBytes} (${(matchedBytes/totalBytes*100).toFixed(1)}%)`);

// 在 ROM 中搜索 VRAM 0x2000 tile 1 的数据
console.log('\n=== 6. 在 ROM 中搜索 VRAM tile 1 数据 ===');
const tile1Data = Array.from(vram.slice(0x2020, 0x2040)); // 0x2000 + 1*32
console.log(`VRAM tile 1 数据: ${tile1Data.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);

// 搜索这个 32 字节模式
for (let i = 0; i < rom.length - 32; i++) {
  let match = true;
  for (let j = 0; j < 32; j++) {
    if (rom[i + j] !== tile1Data[j]) { match = false; break; }
  }
  if (match) {
    console.log(`找到! ROM 0x${i.toString(16)}`);
    break;
  }
}

// 搜索前 8 字节 (可能有部分匹配)
const search8 = tile1Data.slice(16, 24); // 第 5-6 行
console.log(`\n搜索 tile 1 第 5 行数据: ${search8.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
let found = 0;
for (let i = 0; i < rom.length - 8 && found < 5; i++) {
  let match = true;
  for (let j = 0; j < 8; j++) {
    if (rom[i + j] !== search8[j]) { match = false; break; }
  }
  if (match) {
    console.log(`  ROM 0x${i.toString(16)}`);
    found++;
  }
}
