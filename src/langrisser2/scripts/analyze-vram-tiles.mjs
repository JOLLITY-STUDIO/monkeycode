/**
 * 分析 VRAM dump 中的 tile 数据布局
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = fs.readFileSync(VRAM_PATH);

function readWord(o) { return ((vram[o] & 0xff) << 8) | (vram[o + 1] & 0xff); }

console.log('=== VRAM tile 数据分析 ===');
console.log(`VRAM 大小: ${vram.length}B`);

const TILE_SIZE = 32;
const TILES_PER_BANK = 2048;

console.log('\n=== 检查各区域 tile 是否为空 ===');
const regions = [
  { name: 'tile 0-255', addr: 0x0000, count: 256 },
  { name: 'tile 256-511 (Entry 3)', addr: 0x2000, count: 256 },
  { name: 'tile 512-767 (Entry 8)', addr: 0x4000, count: 256 },
  { name: 'tile 768-1023', addr: 0x6000, count: 256 },
  { name: 'tile 1024-1279', addr: 0x8000, count: 256 },
  { name: 'tile 1280-1535', addr: 0xA000, count: 256 },
  { name: 'tile 1536-1791', addr: 0xC000, count: 256 },
  { name: 'tile 1792-2047', addr: 0xE000, count: 256 },
];

for (const region of regions) {
  let nonEmpty = 0;
  for (let t = 0; t < region.count; t++) {
    const tileStart = region.addr + t * TILE_SIZE;
    let isEmpty = true;
    for (let i = 0; i < TILE_SIZE; i++) {
      if (vram[tileStart + i] !== 0) {
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) nonEmpty++;
  }
  console.log(`${region.name}: ${nonEmpty}/${region.count} 非空`);
}

console.log('\n=== 检查 tile 0 (VRAM 0x0000) ===');
console.log('前 32 字节:', Array.from(vram.slice(0, 32)).map(b => b.toString(16).padStart(2, '0')).join(' '));

console.log('\n=== 检查 tile 128 (VRAM 0x1000) ===');
console.log('前 32 字节:', Array.from(vram.slice(0x1000, 0x1020)).map(b => b.toString(16).padStart(2, '0')).join(' '));

console.log('\n=== 检查 tile 256 (VRAM 0x2000) ===');
console.log('前 32 字节:', Array.from(vram.slice(0x2000, 0x2020)).map(b => b.toString(16).padStart(2, '0')).join(' '));

console.log('\n=== 检查 tile 512 (VRAM 0x4000) ===');
console.log('前 32 字节:', Array.from(vram.slice(0x4000, 0x4020)).map(b => b.toString(16).padStart(2, '0')).join(' '));

console.log('\n=== 检查 tile 1985 (VRAM 0xF880) ===');
const tile1985Addr = 1985 * 32;
console.log(`地址: 0x${tile1985Addr.toString(16)}`);
console.log('前 32 字节:', Array.from(vram.slice(tile1985Addr, tile1985Addr + 32)).map(b => b.toString(16).padStart(2, '0')).join(' '));

console.log('\n=== Plane A nametable 引用的 tile 索引统计 ===');
const tileIndicesA = new Set();
const PLANE_A_NT = 0xC000;
for (let i = 0; i < 2048; i++) {
  const entry = readWord(PLANE_A_NT + i * 2);
  const tileIdx = entry & 0x7ff;
  if (tileIdx !== 0) {
    tileIndicesA.add(tileIdx);
  }
}
const sortedA = [...tileIndicesA].sort((a, b) => a - b);
console.log('所有引用的 tile:', sortedA.slice(0, 30), '...');
console.log('tile 索引范围:', sortedA[0], '-', sortedA[sortedA.length - 1]);

console.log('\n=== Plane B nametable 引用的 tile 索引统计 ===');
const tileIndicesB = new Set();
const PLANE_B_NT = 0xE000;
for (let i = 0; i < 2048; i++) {
  const entry = readWord(PLANE_B_NT + i * 2);
  const tileIdx = entry & 0x7ff;
  if (tileIdx !== 0) {
    tileIndicesB.add(tileIdx);
  }
}
const sortedB = [...tileIndicesB].sort((a, b) => a - b);
console.log('所有引用的 tile:', sortedB.slice(0, 30), '...');
console.log('tile 索引范围:', sortedB[0], '-', sortedB[sortedB.length - 1]);

console.log('\n=== 检查 tile 0-255 中被引用的 ===');
const usedLowTiles = sortedA.filter(t => t < 256).concat(sortedB.filter(t => t < 256));
console.log('tile 0-255 中被引用的:', [...new Set(usedLowTiles)].sort((a, b) => a - b));

console.log('\n=== 检查 tile 768+ 中被引用的 ===');
const usedHighTiles = sortedA.filter(t => t >= 768).concat(sortedB.filter(t => t >= 768));
console.log('tile 768+ 中被引用的:', [...new Set(usedHighTiles)].sort((a, b) => a - b));
