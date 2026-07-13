import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/tile-sheet-large.png');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

const TILES_X = 32;
const TILES_Y = 32;
const SCALE = 12;
const canvas = createCanvas(TILES_X * 8 * SCALE, TILES_Y * 8 * SCALE + TILES_Y * 14);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function cramToRgb(word) {
  const b = ((word >> 9) & 7) * 36;
  const g = ((word >> 5) & 7) * 36;
  const r = ((word >> 1) & 7) * 36;
  return `rgb(${r},${g},${b})`;
}

const palette = [];
for (let i = 0; i < 16; i++) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  palette.push(cramToRgb(word));
}

for (let ty = 0; ty < TILES_Y; ty++) {
  for (let tx = 0; tx < TILES_X; tx++) {
    const tileIndex = ty * TILES_X + tx;
    const offset = tileIndex * 32;
    if (offset + 32 > vram.length) continue;
    const tile = vram.slice(offset, offset + 32);

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        const p0 = (tile[y * 4 + 0] >> bit) & 1;
        const p1 = ((tile[y * 4 + 1] >> bit) & 1) << 1;
        const p2 = ((tile[y * 4 + 2] >> bit) & 1) << 2;
        const p3 = ((tile[y * 4 + 3] >> bit) & 1) << 3;
        const colorIndex = p0 | p1 | p2 | p3;
        ctx.fillStyle = palette[colorIndex] || '#000';
        ctx.fillRect(tx * 8 * SCALE + x * SCALE, ty * (8 * SCALE + 14) + y * SCALE, SCALE, SCALE);
      }
    }
  }
}

ctx.fillStyle = '#fff';
ctx.font = '10px monospace';
for (let ty = 0; ty < TILES_Y; ty++) {
  for (let tx = 0; tx < TILES_X; tx++) {
    const tileIndex = ty * TILES_X + tx;
    ctx.fillText('0x' + tileIndex.toString(16).toUpperCase().padStart(2, '0'), tx * 8 * SCALE, ty * (8 * SCALE + 14) + 8 * SCALE + 12);
  }
}

import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('Large tile sheet saved to:', OUT_PATH);
