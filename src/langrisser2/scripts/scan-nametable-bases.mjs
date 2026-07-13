import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

const baseDir = 'd:/studio/github/monkeycode/src/langrisser2/20260713';
const vram = fs.readFileSync(path.join(baseDir, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'));
const cram = fs.readFileSync(path.join(baseDir, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram'));

function getColor(pal, idx) {
  const off = (pal * 16 + idx) * 2;
  const word = (cram[off + 1] << 8) | cram[off];
  const r = ((word >> 1) & 7) << 5;
  const g = ((word >> 5) & 7) << 5;
  const b = ((word >> 9) & 7) << 5;
  return [r, g, b];
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

function scorePlane(ntBase, width, height) {
  let nonblank = 0;
  let uniqueTiles = new Set();
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const off = ntBase + (row * width + col) * 2;
      if (off + 2 > vram.length) continue;
      const raw = (vram[off + 1] << 8) | vram[off];
      const tileIdx = raw & 0x7FF;
      if (tileIdx !== 0) {
        nonblank++;
        uniqueTiles.add(tileIdx);
      }
    }
  }
  return { nonblank, unique: uniqueTiles.size };
}

function renderPlane(ntBase, width, height, name) {
  const scale = 2;
  const canvas = createCanvas(width * 8 * scale, height * 8 * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const off = ntBase + (row * width + col) * 2;
      if (off + 2 > vram.length) continue;
      const raw = (vram[off + 1] << 8) | vram[off];
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
          const [r, g, b] = getColor(pal, c);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect((col * 8 + x) * scale, (row * 8 + y) * scale, scale, scale);
        }
      }
    }
  }

  const outPath = path.join(baseDir, 'output', 'scan', name + '.png');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
}

console.log('Scanning Plane A/B nametable bases...');
const aBases = [0x0000, 0x2000, 0x4000, 0x6000, 0x8000, 0xA000, 0xC000, 0xE000];
const bBases = [0x0000, 0x2000, 0x4000, 0x6000, 0x8000, 0xA000, 0xC000, 0xE000];

for (const aBase of aBases) {
  const s = scorePlane(aBase, 64, 32);
  console.log(`Plane A base 0x${aBase.toString(16).padStart(4,'0')}: nonblank=${s.nonblank}, unique=${s.unique}`);
  if (s.nonblank > 50) renderPlane(aBase, 64, 32, `planeA_0x${aBase.toString(16)}`);
}

for (const bBase of bBases) {
  const s = scorePlane(bBase, 64, 32);
  console.log(`Plane B base 0x${bBase.toString(16).padStart(4,'0')}: nonblank=${s.nonblank}, unique=${s.unique}`);
  if (s.nonblank > 50) renderPlane(bBase, 64, 32, `planeB_0x${bBase.toString(16)}`);
}

// Also try 40x28 visible region only
for (const aBase of aBases) {
  const s = scorePlane(aBase, 40, 28);
  if (s.nonblank > 20) renderPlane(aBase, 40, 28, `visibleA_0x${aBase.toString(16)}`);
}
