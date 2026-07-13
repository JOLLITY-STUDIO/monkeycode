import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-screen.png');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

// VDP register values from ROM 0x80B2
const PLANE_A_BASE = 0x0000;    // Reg 2 = 0x30
const PLANE_B_BASE = 0xE000;    // Reg 4 = 0x07
const WINDOW_BASE = 0x7800;     // Reg 3 = 0x3C
const SPRITE_BASE = 0xD800;     // Reg 5 = 0x6C

const SCREEN_WIDTH = 40;  // H40 mode
const SCREEN_HEIGHT = 28; // 224 lines / 8 = 28 tiles
const SCALE = 3;

const canvas = createCanvas(SCREEN_WIDTH * 8 * SCALE, SCREEN_HEIGHT * 8 * SCALE);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function cramToRgb(word) {
  const b = ((word >> 9) & 7) * 36;
  const g = ((word >> 5) & 7) * 36;
  const r = ((word >> 1) & 7) * 36;
  return [r, g, b];
}

// Build full palette: 4 lines × 16 colors
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

function renderPlane(planeBase, nameOffset) {
  for (let row = 0; row < SCREEN_HEIGHT; row++) {
    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const nameTableOffset = planeBase + (row * SCREEN_WIDTH + col) * 2;
      if (nameTableOffset + 2 > vram.length) continue;
      const word = (vram[nameTableOffset] << 8) | vram[nameTableOffset + 1];
      const tileIndex = word & 0x7FF;
      const hFlip = (word >> 11) & 1;
      const vFlip = (word >> 12) & 1;
      const paletteLine = (word >> 13) & 3;
      const priority = (word >> 15) & 1;

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
          ctx.fillRect((col * 8 + x) * SCALE, (row * 8 + y) * SCALE, SCALE, SCALE);
        }
      }
    }
  }
}

// Render both planes (B first, then A on top)
renderPlane(PLANE_B_BASE, 0);
renderPlane(PLANE_A_BASE, 0);

import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('Title screen rendered to:', OUT_PATH);
