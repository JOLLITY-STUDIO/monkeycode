/**
 * 分析 VRAM dump 中的 nametable 数据结构
 * 标题画面 Plane A/B 的 nametable 应该在 0xC000/0xE000
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = fs.readFileSync(VRAM_PATH);

function readWord(o) { return ((vram[o] & 0xff) << 8) | (vram[o + 1] & 0xff); }

const PLANE_A_NT = 0xC000;
const PLANE_B_NT = 0xE000;
const NT_ENTRY_SIZE = 2;
const NT_WIDTH = 64;
const NT_HEIGHT = 32;
const NT_TOTAL = NT_WIDTH * NT_HEIGHT;

console.log('=== Plane A Nametable (VRAM 0xC000) ===');
console.log(`条目数: ${NT_TOTAL}`);

const tileCountsA = new Map();
for (let i = 0; i < NT_TOTAL; i++) {
  const entry = readWord(PLANE_A_NT + i * NT_ENTRY_SIZE);
  const tileIdx = entry & 0x7ff;
  if (tileIdx !== 0) {
    tileCountsA.set(tileIdx, (tileCountsA.get(tileIdx) || 0) + 1);
  }
}
console.log(`使用的 tile 数: ${tileCountsA.size}`);
const sortedA = [...tileCountsA.entries()].sort((a, b) => a[0] - b[0]);
console.log('tile 索引范围:', sortedA[0]?.[0], '-', sortedA[sortedA.length - 1]?.[0]);

console.log('\n=== Plane B Nametable (VRAM 0xE000) ===');
const tileCountsB = new Map();
for (let i = 0; i < NT_TOTAL; i++) {
  const entry = readWord(PLANE_B_NT + i * NT_ENTRY_SIZE);
  const tileIdx = entry & 0x7ff;
  if (tileIdx !== 0) {
    tileCountsB.set(tileIdx, (tileCountsB.get(tileIdx) || 0) + 1);
  }
}
console.log(`使用的 tile 数: ${tileCountsB.size}`);
const sortedB = [...tileCountsB.entries()].sort((a, b) => a[0] - b[0]);
console.log('tile 索引范围:', sortedB[0]?.[0], '-', sortedB[sortedB.length - 1]?.[0]);

console.log('\n=== Plane A Nametable 可视化 (28行×40列) ===');
const DISPLAY_WIDTH = 40;
const DISPLAY_HEIGHT = 28;
for (let y = 0; y < DISPLAY_HEIGHT; y++) {
  let line = '';
  for (let x = 0; x < DISPLAY_WIDTH; x++) {
    const ntIdx = y * NT_WIDTH + x;
    const entry = readWord(PLANE_A_NT + ntIdx * NT_ENTRY_SIZE);
    const tileIdx = entry & 0x7ff;
    const palette = (entry >> 13) & 0x3;
    const priority = (entry >> 15) & 0x1;
    
    if (tileIdx === 0) {
      line += '.';
    } else if (tileIdx >= 256 && tileIdx < 512) {
      line += String.fromCharCode(65 + (tileIdx - 256) % 26);
    } else if (tileIdx >= 512 && tileIdx < 768) {
      line += String.fromCharCode(97 + (tileIdx - 512) % 26);
    } else {
      line += 'X';
    }
  }
  console.log(line);
}

console.log('\n=== Plane B Nametable 可视化 ===');
for (let y = 0; y < DISPLAY_HEIGHT; y++) {
  let line = '';
  for (let x = 0; x < DISPLAY_WIDTH; x++) {
    const ntIdx = y * NT_WIDTH + x;
    const entry = readWord(PLANE_B_NT + ntIdx * NT_ENTRY_SIZE);
    const tileIdx = entry & 0x7ff;
    
    if (tileIdx === 0) {
      line += '.';
    } else if (tileIdx >= 256 && tileIdx < 512) {
      line += String.fromCharCode(65 + (tileIdx - 256) % 26);
    } else if (tileIdx >= 512 && tileIdx < 768) {
      line += String.fromCharCode(97 + (tileIdx - 512) % 26);
    } else {
      line += 'X';
    }
  }
  console.log(line);
}

console.log('\n=== Plane A Nametable 详细结构 (前几行) ===');
for (let y = 0; y < 5; y++) {
  console.log(`行 ${y}:`);
  for (let x = 0; x < 10; x++) {
    const ntIdx = y * NT_WIDTH + x;
    const entry = readWord(PLANE_A_NT + ntIdx * NT_ENTRY_SIZE);
    const tileIdx = entry & 0x7ff;
    const palette = (entry >> 13) & 0x3;
    const priority = (entry >> 15) & 0x1;
    console.log(`  (${x},${y}): entry=0x${entry.toString(16)} tile=${tileIdx} palette=${palette} priority=${priority}`);
  }
}

console.log('\n=== 统计各调色板使用情况 ===');
const paletteCountsA = new Array(4).fill(0);
const paletteCountsB = new Array(4).fill(0);
for (let i = 0; i < NT_TOTAL; i++) {
  const entryA = readWord(PLANE_A_NT + i * NT_ENTRY_SIZE);
  const entryB = readWord(PLANE_B_NT + i * NT_ENTRY_SIZE);
  paletteCountsA[(entryA >> 13) & 0x3]++;
  paletteCountsB[(entryB >> 13) & 0x3]++;
}
console.log('Plane A 调色板分布:', paletteCountsA);
console.log('Plane B 调色板分布:', paletteCountsB);
