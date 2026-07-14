import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_B_BASE = 0xE000;
const COLS = 40;
const ROWS = 28;

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
    word,
    addr
  };
}

console.log('=== Plane B调色板使用分析 ===');
console.log('');

const paletteCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
const paletteTiles = { 0: [], 1: [], 2: [], 3: [] };

for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (e.word !== 0) {
      paletteCounts[e.palette]++;
      if (!paletteTiles[e.palette].includes(e.tileIdx)) {
        paletteTiles[e.palette].push(e.tileIdx);
      }
    }
  }
}

console.log('调色板使用统计:');
for (let p = 0; p < 4; p++) {
  console.log(`  调色板 ${p}: ${paletteCounts[p]} 个条目, 使用 ${paletteTiles[p].length} 个不同tile`);
}

console.log('');
console.log('=== Plane B使用的tile索引范围 ===');
const allTiles = [];
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (e.word !== 0) {
      allTiles.push(e.tileIdx);
    }
  }
}
console.log(`最小tile: ${Math.min(...allTiles)}, 最大tile: ${Math.max(...allTiles)}`);

console.log('');
console.log('=== 标题区域的nametable条目 ===');
console.log('标题区域大约在 ty=5-8, tx=8-30');
console.log('');
console.log('位置 | 调色板 | TileIdx | Hflip | Vflip | Priority');
console.log('-----|--------|---------|-------|-------|---------');
for (let ty = 5; ty <= 8; ty++) {
  for (let tx = 8; tx <= 30; tx++) {
    const e = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (e.word !== 0) {
      console.log(`${ty},${tx}  | ${e.palette}     | ${e.tileIdx.toString().padStart(4)} | ${e.hflip}     | ${e.vflip}     | ${e.priority}`);
    }
  }
}

console.log('');
console.log('=== 检查VRAM中Plane B数据 ===');
console.log('Plane B起始地址: 0xE000');
console.log('');
console.log('原始VRAM数据 (0xE000-0xE03F):');
for (let i = 0; i < 64; i += 8) {
  const addr = 0xE000 + i;
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(vram[addr + j].toString(16).padStart(2, '0'));
  }
  console.log(`${addr.toString(16).toUpperCase()}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 解析这些nametable条目 ===');
for (let i = 0; i < 32; i += 2) {
  const addr = 0xE000 + i;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  const priority = (word >> 15) & 1;
  const palette = (word >> 13) & 3;
  const hflip = (word >> 12) & 1;
  const vflip = (word >> 11) & 1;
  const tileIdx = word & 0x7FF;
  console.log(`0x${addr.toString(16).toUpperCase()}: 0x${word.toString(16).padStart(4, '0')} -> priority=${priority}, palette=${palette}, hflip=${hflip}, vflip=${vflip}, tile=${tileIdx}`);
}
