/**
 * 重新分析布局数据格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }

const layoutBase = 0x6EC28;
const layoutSize = 64 * 32 * 2;

console.log('=== 布局数据作为 byte 序列 ===');
for (let i = 0; i < 256; i += 32) {
  const line = Array.from({ length: 32 }, (_, j) => {
    const b = readByte(layoutBase + i + j);
    return b.toString(16).padStart(2, '0');
  }).join(' ');
  console.log(`0x${(layoutBase + i).toString(16)}: ${line}`);
}

console.log('\n=== 布局数据作为 word 序列 (前 64 个) ===');
for (let i = 0; i < 128; i += 16) {
  const line = Array.from({ length: 8 }, (_, j) => {
    const w = readWord(layoutBase + i + j * 2);
    return w.toString(16).padStart(4, '0');
  }).join(' ');
  console.log(`0x${(layoutBase + i).toString(16)}: ${line}`);
}

console.log('\n=== 检查布局数据的规律 ===');
console.log('每行 64 个 word, 共 32 行');
for (let row = 0; row < 8; row++) {
  const firstNonZero = [];
  for (let col = 0; col < 64; col++) {
    const w = readWord(layoutBase + (row * 64 + col) * 2);
    if (w !== 0) {
      firstNonZero.push(`(${col})=${w.toString(16)}`);
    }
  }
  console.log(`行 ${row}: ${firstNonZero.join(' ')}`);
}

console.log('\n=== 检查重映射表的结构 ===');
const remapBase = 0x6AE28;
console.log('重映射表前 64 个 byte:');
for (let i = 0; i < 64; i += 16) {
  const line = Array.from({ length: 16 }, (_, j) => {
    const b = readByte(remapBase + i + j);
    return b.toString(16).padStart(2, '0');
  }).join(' ');
  console.log(`[${i}-${i + 15}]: ${line}`);
}

console.log('\n=== VRAM dump 中 Plane B 的 tile 使用统计 ===');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = fs.readFileSync(VRAM_PATH);

const PLANE_B_NT = 0xE000;
const tileCounts = new Map();
for (let i = 0; i < 2048; i++) {
  const entry = ((vram[PLANE_B_NT + i * 2] & 0xff) << 8) | (vram[PLANE_B_NT + i * 2 + 1] & 0xff);
  const tileIdx = entry & 0x7ff;
  if (tileIdx !== 0) {
    tileCounts.set(tileIdx, (tileCounts.get(tileIdx) || 0) + 1);
  }
}

const sorted = [...tileCounts.entries()].sort((a, b) => a[0] - b[0]);
console.log('所有引用的 tile 索引:');
for (const [tile, count] of sorted) {
  console.log(`  ${tile}: ${count} 次`);
}

console.log('\n=== 查找基础索引 ===');
const baseIndices = new Set();
for (const tile of sorted.map(e => e[0])) {
  const base = tile % 256;
  baseIndices.add(base);
}
console.log('基础索引:', [...baseIndices].sort((a, b) => a - b));

console.log('\n=== 检查基础索引在重映射表中的值 ===');
for (const base of [...baseIndices].sort((a, b) => a - b)) {
  const remapVal = readByte(remapBase + base);
  console.log(`重映射表[${base}] = ${remapVal}`);
}
