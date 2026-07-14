import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

const PLANE_B_BASE = 0xE000;

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

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

console.log('=== Plane B标题区域Tile颜色索引分析 ===');
console.log('');

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

const titleTileIndices = new Set();
for (let row = 4; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const ntOffset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[ntOffset];
    const hi = vram[ntOffset + 1];
    const entry = (hi << 8) | lo;
    const tileIdx = entry & 0x7FF;
    if (tileIdx !== 0) {
      titleTileIndices.add(tileIdx);
    }
  }
}

console.log('标题区域使用的Tile索引:', Array.from(titleTileIndices).sort((a,b)=>a-b));
console.log('');

const colorUsage = {};
for (const idx of titleTileIndices) {
  const tile = decodeTile(idx);
  for (let i = 0; i < 64; i++) {
    const ci = tile[i];
    if (ci !== 0) {
      colorUsage[ci] = (colorUsage[ci] || 0) + 1;
    }
  }
}

console.log('颜色索引使用统计:');
for (const [ci, count] of Object.entries(colorUsage).sort((a,b)=>b[1]-a[1])) {
  console.log(`  颜色${ci}: ${count}次`);
}

console.log('');
console.log('=== 使用调色板3的颜色 ===');
for (const [ci, count] of Object.entries(colorUsage).sort((a,b)=>parseInt(a)-parseInt(b))) {
  const c = palette[3 * 16 + parseInt(ci)];
  console.log(`  颜色${ci}: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 使用调色板2的颜色 ===');
for (const [ci, count] of Object.entries(colorUsage).sort((a,b)=>parseInt(a)-parseInt(b))) {
  const c = palette[2 * 16 + parseInt(ci)];
  console.log(`  颜色${ci}: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 使用调色板1的颜色 ===');
for (const [ci, count] of Object.entries(colorUsage).sort((a,b)=>parseInt(a)-parseInt(b))) {
  const c = palette[1 * 16 + parseInt(ci)];
  console.log(`  颜色${ci}: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 使用调色板0的颜色 ===');
for (const [ci, count] of Object.entries(colorUsage).sort((a,b)=>parseInt(a)-parseInt(b))) {
  const c = palette[0 * 16 + parseInt(ci)];
  console.log(`  颜色${ci}: rgb(${c.r},${c.g},${c.b})`);
}
