import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-bottom.png');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

const PLANE_A_BASE = 0x0000;
const PLANE_B_BASE = 0xE000;
const SCREEN_WIDTH = 40;

const START_ROW = 24;
const END_ROW = 28;
const SCALE = 6;
const ROWS = END_ROW - START_ROW;
const COLS = SCREEN_WIDTH;

const canvas = createCanvas(COLS * 8 * SCALE, ROWS * 8 * SCALE);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function cramToRgb(word) {
  const b = ((word >> 9) & 7) * 36;
  const g = ((word >> 5) & 7) * 36;
  const r = ((word >> 1) & 7) * 36;
  return [r, g, b];
}

const palette = [];
for (let line = 0; line < 4; line++) {
  for (let i = 0; i < 16; i++) {
    const cramOffset = (line * 16 + i) * 2;
    const word = (cram[cramOffset] << 8) | cram[cramOffset + 1];
    palette.push(cramToRgb(word));
  }
}

function getTile(tileIndex) {
  const offset = (tileIndex & 0x7FF) * 32;
  if (offset + 32 > vram.length) return new Uint8Array(32);
  return vram.slice(offset, offset + 32);
}

function readNameTable(planeBase, row, col) {
  const offset = planeBase + (row * SCREEN_WIDTH + col) * 2;
  if (offset + 2 > vram.length) return 0;
  return (vram[offset] << 8) | vram[offset + 1];
}

function renderPlane(planeBase, canvasY) {
  for (let row = START_ROW; row < END_ROW; row++) {
    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const word = readNameTable(planeBase, row, col);
      const tileIndex = word & 0x7FF;
      const hFlip = (word >> 11) & 1;
      const vFlip = (word >> 12) & 1;
      const paletteLine = (word >> 13) & 3;

      const tile = getTile(tileIndex);

      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const px = hFlip ? 7 - x : x;
          const py = vFlip ? 7 - y : y;
          const bit = 7 - px;
          const p0 = (tile[py * 4 + 0] >> bit) & 1;
          const p1 = ((tile[py * 4 + 1] >> bit) & 1) << 1;
          const p2 = ((tile[py * 4 + 2] >> bit) & 1) << 2;
          const p3 = ((tile[py * 4 + 3] >> bit) & 1) << 3;
          const colorIndex = p0 | p1 | p2 | p3;
          const [r, g, b] = palette[paletteLine * 16 + colorIndex];
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect((col * 8 + x) * SCALE, ((row - START_ROW) * 8 + y + canvasY) * SCALE, SCALE, SCALE);
        }
      }
    }
  }
}

renderPlane(PLANE_B_BASE, 0);
renderPlane(PLANE_A_BASE, 0);

import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('Bottom rows rendered to:', OUT_PATH);

// Also print the tile indices used in bottom rows for both planes
console.log('\nTile indices used in rows 24-27:');
for (let plane of [PLANE_A_BASE, PLANE_B_BASE]) {
  console.log(plane === PLANE_A_BASE ? 'Plane A:' : 'Plane B:');
  for (let row = START_ROW; row < END_ROW; row++) {
    const indices = [];
    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const word = readNameTable(plane, row, col);
      indices.push(word & 0x7FF);
    }
    console.log(`  Row ${row}:`, indices.map(i => '0x' + i.toString(16).padStart(3, '0')).join(' '));
  }
}
