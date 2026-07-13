import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/tile-sheet.png');

const rom = new Uint8Array(readFileSync(ROM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

const TILES_X = 32;
const TILES_Y = 32;
const SCALE = 2;
const canvas = createCanvas(TILES_X * 8 * SCALE, TILES_Y * 8 * SCALE);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function cramToRgb(word) {
  // Genesis CRAM: 9-bit color, BGR
  // word = 0b0000BBB0GGG0RRR
  const b = ((word >> 9) & 7) * 36;
  const g = ((word >> 5) & 7) * 36;
  const r = ((word >> 1) & 7) * 36;
  return `rgb(${r},${g},${b})`;
}

// Build palette line 0 (colors 0-15) from CRAM
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
      // Genesis tile: 4 bytes per row (4 bitplanes interleaved)
      // 4bpp: each pixel is 4 bits, but in tile format:
      // Actually Genesis tile format: 4 bytes per row, each byte is a bitplane
      // Byte 0 = plane 0, byte 1 = plane 1, byte 2 = plane 2, byte 3 = plane 3
      // For each pixel, the bit from each byte forms the 4-bit index
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        const p0 = (tile[y * 4 + 0] >> bit) & 1;
        const p1 = ((tile[y * 4 + 1] >> bit) & 1) << 1;
        const p2 = ((tile[y * 4 + 2] >> bit) & 1) << 2;
        const p3 = ((tile[y * 4 + 3] >> bit) & 1) << 3;
        const colorIndex = p0 | p1 | p2 | p3;
        ctx.fillStyle = palette[colorIndex] || '#000';
        ctx.fillRect((tx * 8 + x) * SCALE, (ty * 8 + y) * SCALE, SCALE, SCALE);
      }
    }
  }
}

// Draw grid lines and tile numbers
ctx.strokeStyle = 'rgba(255,0,0,0.3)';
ctx.lineWidth = 1;
for (let i = 0; i <= TILES_X; i++) {
  ctx.beginPath();
  ctx.moveTo(i * 8 * SCALE, 0);
  ctx.lineTo(i * 8 * SCALE, canvas.height);
  ctx.stroke();
}
for (let i = 0; i <= TILES_Y; i++) {
  ctx.beginPath();
  ctx.moveTo(0, i * 8 * SCALE);
  ctx.lineTo(canvas.width, i * 8 * SCALE);
  ctx.stroke();
}

ctx.fillStyle = 'rgba(255,255,255,0.8)';
ctx.font = '10px monospace';
for (let ty = 0; ty < TILES_Y; ty++) {
  for (let tx = 0; tx < TILES_X; tx++) {
    const tileIndex = ty * TILES_X + tx;
    ctx.fillText(tileIndex.toString(16).toUpperCase().padStart(2, '0'), tx * 8 * SCALE + 2, ty * 8 * SCALE + 10);
  }
}

import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('Tile sheet saved to:', OUT_PATH);
console.log('Each tile has its hex index drawn in the top-left corner.');
console.log('Look for the copyright symbol and tell me its tile index.');
