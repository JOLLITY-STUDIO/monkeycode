import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_A_BASE = 0xC000;
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

console.log('=== Plane A分析 ===');
console.log('');

const paletteCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
const paletteTiles = { 0: [], 1: [], 2: [], 3: [] };

for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_A_BASE, tx, ty);
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
console.log('Plane A使用的tile索引范围:');
const allTiles = [];
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_A_BASE, tx, ty);
    if (e.word !== 0) {
      allTiles.push(e.tileIdx);
    }
  }
}
console.log(`最小tile: ${Math.min(...allTiles)}, 最大tile: ${Math.max(...allTiles)}`);

console.log('');
console.log('=== 标题区域的Plane A条目 ===');
console.log('标题区域大约在 ty=5-8, tx=8-30');
console.log('');
console.log('位置 | 调色板 | TileIdx | Hflip | Vflip | Priority');
console.log('-----|--------|---------|-------|-------|---------');
for (let ty = 5; ty <= 8; ty++) {
  for (let tx = 8; tx <= 30; tx++) {
    const e = readNametableEntry(PLANE_A_BASE, tx, ty);
    if (e.word !== 0) {
      console.log(`${ty},${tx}  | ${e.palette}     | ${e.tileIdx.toString().padStart(4)} | ${e.hflip}     | ${e.vflip}     | ${e.priority}`);
    }
  }
}

console.log('');
console.log('=== 调色板0-2颜色分析 ===');
function decodeCRAM_LE(i) {
  const word = (vram[i * 2 + 1] << 8) | vram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeColor(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

for (let p = 0; p < 3; p++) {
  console.log(`\n调色板${p} (条目${p*16}-${p*16+15}):`);
  for (let i = p * 16; i < (p + 1) * 16; i++) {
    const c = decodeColor(i);
    console.log(`  [${i-p*16}]: rgb(${c.r},${c.g},${c.b})`);
  }
}

console.log('');
console.log('=== Plane A的tile数据 ===');
function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

const planeATiles = [...new Set(allTiles)];
console.log(`\nPlane A使用的${planeATiles.length}个tile:`);
for (const idx of planeATiles) {
  const tile = decodeTile(idx);
  const colors = new Set();
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) colors.add(tile[i]);
  }
  console.log(`  Tile ${idx.toString().padStart(4)}: 颜色 ${Array.from(colors).sort((a,b)=>a-b).join(', ')}`);
}
