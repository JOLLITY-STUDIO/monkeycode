import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_B_BASE = 0xE000;

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

console.log('=== 大端序VRAM标题区域Tile分析 ===');
console.log('');

const beTileIndices = new Set();
for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const ntOffset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[ntOffset];
    const hi = vram[ntOffset + 1];
    const entry = (lo << 8) | hi;
    const tileIdx = entry & 0x7FF;
    if (tileIdx !== 0) {
      beTileIndices.add(tileIdx);
    }
  }
}

console.log('大端序VRAM标题区域Tile索引:', Array.from(beTileIndices).sort((a,b)=>a-b));
console.log('');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

console.log('=== 大端序VRAM标题区域Tile内容 ===');
for (const idx of Array.from(beTileIndices).sort((a,b)=>a-b)) {
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
console.log('=== 大端序VRAM标题区域调色板使用 ===');
const paletteCounts = {};
for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const ntOffset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[ntOffset];
    const hi = vram[ntOffset + 1];
    const entry = (lo << 8) | hi;
    const tileIdx = entry & 0x7FF;
    if (tileIdx !== 0) {
      const paletteIdx = (entry >> 13) & 3;
      paletteCounts[paletteIdx] = (paletteCounts[paletteIdx] || 0) + 1;
    }
  }
}

console.log('调色板使用:', paletteCounts);

console.log('');
console.log('=== 所有调色板颜色 ===');
for (let p = 0; p < 4; p++) {
  console.log('');
  console.log(`调色板${p}:`);
  for (let i = 0; i < 16; i++) {
    const c = palette[p * 16 + i];
    console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
  }
}
