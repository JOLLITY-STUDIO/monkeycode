import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

const baseDir = 'd:/studio/github/monkeycode/src/langrisser2/20260713';
const vram = fs.readFileSync(path.join(baseDir, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'));
const cram = fs.readFileSync(path.join(baseDir, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram'));

console.log('VRAM size:', vram.length);
console.log('CRAM size:', cram.length);

// CRAM: 4 palettes x 16 colors x 2 bytes, big-endian
function getColor(pal, idx, be = true) {
  const off = (pal * 16 + idx) * 2;
  const word = be ? (cram[off] << 8) | cram[off + 1] : (cram[off + 1] << 8) | cram[off];
  const r = ((word >> 1) & 7) << 5;
  const g = ((word >> 5) & 7) << 5;
  const b = ((word >> 9) & 7) << 5;
  return `rgb(${r},${g},${b})`;
}

function decodeTile(tileIdx) {
  const addr = tileIdx * 32;
  if (addr + 32 > vram.length) return null;
  const pixels = new Uint8Array(8 * 8);
  for (let y = 0; y < 8; y++) {
    for (let p = 0; p < 4; p++) {
      const byte = vram[addr + y + p * 8];
      for (let x = 0; x < 8; x++) {
        const bit = (byte >> (7 - x)) & 1;
        pixels[y * 8 + x] |= bit << p;
      }
    }
  }
  return pixels;
}

function renderPlane(ntBase, width, height, scale, name, useBE = true) {
  const canvas = createCanvas(width * 8 * scale, height * 8 * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const off = ntBase + (row * width + col) * 2;
      if (off + 2 > vram.length) continue;
      const raw = useBE ? (vram[off] << 8) | vram[off + 1] : (vram[off + 1] << 8) | vram[off];
      const tileIdx = raw & 0x7FF;
      const pal = (raw >> 13) & 3;
      const hflip = (raw >> 11) & 1;
      const vflip = (raw >> 12) & 1;
      const pixels = decodeTile(tileIdx);
      if (!pixels) continue;

      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const sx = hflip ? 7 - x : x;
          const sy = vflip ? 7 - y : y;
          const c = pixels[sy * 8 + sx];
          if (c === 0) continue;
          ctx.fillStyle = getColor(pal, c, useBE);
          ctx.fillRect((col * 8 + x) * scale, (row * 8 + y) * scale, scale, scale);
        }
      }
    }
  }

  const outPath = path.join(baseDir, 'output', name + (useBE ? '_BE' : '_LE') + '.png');
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Rendered:', outPath);
}

// Standard MD nametable layout
renderPlane(0xC000, 64, 32, 2, 'title-planeA', true);
renderPlane(0xC000, 64, 32, 2, 'title-planeA', false);
renderPlane(0xE000, 64, 32, 2, 'title-planeB', true);
renderPlane(0xE000, 64, 32, 2, 'title-planeB', false);

// Also render SATB at 0x0000? Actually SATB address depends on reg5
// Try sprite table at 0x0000 and 0x8000
function renderSprites(satBase, scale, name) {
  const canvas = createCanvas(40 * 8 * scale, 28 * 8 * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let s = 0; s < 80; s++) {
    const off = satBase + s * 8;
    if (off + 8 > vram.length) break;
    const y = vram[off] & 0xFF; // not exact but ok
    const size = vram[off + 1];
    const link = vram[off + 2] & 0x7F;
    const tileIdx = ((vram[off + 4] << 8) | vram[off + 5]) & 0x7FF;
    const x = ((vram[off + 6] << 8) | vram[off + 7]) & 0x1FF;
    const pal = (vram[off + 4] >> 5) & 3;

    if (tileIdx === 0) continue;
    const pixels = decodeTile(tileIdx);
    if (!pixels) continue;

    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const c = pixels[py * 8 + px];
        if (c === 0) continue;
        ctx.fillStyle = getColor(pal, c);
        ctx.fillRect((x + px) * scale, ((y & 0xFF) + py) * scale, scale, scale);
      }
    }
  }

  const outPath = path.join(baseDir, 'output', name + '.png');
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Rendered:', outPath);
}

renderSprites(0x0000, 2, 'title-sprites-0000');
renderSprites(0x8000, 2, 'title-sprites-8000');
