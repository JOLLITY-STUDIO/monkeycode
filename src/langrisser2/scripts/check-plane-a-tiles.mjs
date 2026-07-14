import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

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

console.log('=== Plane A标题区域Tile分析 ===');
console.log('');

const planeATiles = [256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270];

for (const idx of planeATiles) {
  const tile = decodeTile(idx);
  const colors = new Set();
  let hasData = false;
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) {
      colors.add(tile[i]);
      hasData = true;
    }
  }
  if (hasData) {
    console.log(`Tile ${idx}: 颜色 ${Array.from(colors).sort((a,b)=>a-b).join(', ')}`);
  } else {
    console.log(`Tile ${idx}: 空`);
  }
}

console.log('');
console.log('=== 调色板2颜色 ===');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_LE(i);
  console.log(`  [${i-32}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== Plane A标题区域tile数据 ===');
for (const idx of planeATiles) {
  const offset = idx * 32;
  const bytes = [];
  for (let i = 0; i < 32; i++) {
    bytes.push(vram[offset + i].toString(16).padStart(2, '0'));
  }
  console.log(`Tile ${idx} (0x${offset.toString(16).toUpperCase()}): ${bytes.join(' ')}`);
}

console.log('');
console.log('=== Plane B标题区域tile数据 ===');
const planeBTiles = [505, 504, 503, 502, 501, 500, 499, 498];

for (const idx of planeBTiles) {
  const offset = idx * 32;
  const bytes = [];
  for (let i = 0; i < 32; i++) {
    bytes.push(vram[offset + i].toString(16).padStart(2, '0'));
  }
  console.log(`Tile ${idx} (0x${offset.toString(16).toUpperCase()}): ${bytes.join(' ')}`);
}
