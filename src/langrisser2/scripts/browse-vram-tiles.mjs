import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

const baseDir = 'd:/studio/github/monkeycode/src/langrisser2/20260713';
const vram = fs.readFileSync(path.join(baseDir, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'));
const cram = fs.readFileSync(path.join(baseDir, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram'));

// CRAM is 64 colors x 2 bytes = 128 bytes in BE, expand to 256 for 4 palettes
const palettes = [];
for (let pal = 0; pal < 4; pal++) {
  const colors = [];
  for (let i = 0; i < 16; i++) {
    const idx = (pal * 16 + i) * 2;
    const be = (cram[idx] << 8) | cram[idx + 1];
    const le = (cram[idx + 1] << 8) | cram[idx];
    colors.push({ idx, be, le });
  }
  palettes.push(colors);
}

function decodeTile(tileBytes, palIndex) {
  // Standard MD 4bpp: 4 planes, each 8 bytes
  // bytes 0-7 = plane 0 (bit 0), bytes 8-15 = plane 1 (bit 1), etc.
  const pixels = new Uint8Array(8 * 8);
  for (let y = 0; y < 8; y++) {
    for (let p = 0; p < 4; p++) {
      const byte = tileBytes[y + p * 8];
      for (let x = 0; x < 8; x++) {
        const bit = (byte >> (7 - x)) & 1;
        pixels[y * 8 + x] |= bit << p;
      }
    }
  }
  return pixels;
}

function mdColorToRGBA(word) {
  const r = ((word >> 1) & 7) << 5;
  const g = ((word >> 5) & 7) << 5;
  const b = ((word >> 9) & 7) << 5;
  return [r, g, b, 255];
}

const tileCount = vram.length / 32;
const cols = 64;
const rows = Math.ceil(tileCount / cols);
const scale = 2;
const canvas = createCanvas(cols * 8 * scale, rows * 8 * scale);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let copyrightCandidates = [];

for (let t = 0; t < tileCount; t++) {
  const tileBytes = vram.slice(t * 32, t * 32 + 32);
  const isBlank = tileBytes.every(b => b === 0);
  if (isBlank) continue;

  // Render with palette 0
  const pixels = decodeTile(tileBytes, 0);
  const col = t % cols;
  const row = Math.floor(t / cols);

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const c = pixels[y * 8 + x];
      const colorWord = palettes[0][c].be;
      const [r, g, b, a] = mdColorToRGBA(colorWord);
      ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
      ctx.fillRect((col * 8 + x) * scale, (row * 8 + y) * scale, scale, scale);
    }
  }

  // Simple heuristic: count non-zero pixels
  const nonzero = pixels.filter(p => p !== 0).length;
  if (nonzero > 10 && nonzero < 40) {
    copyrightCandidates.push({ tile: t, nonzero, hex: tileBytes.toString('hex') });
  }
}

const outPath = path.join(baseDir, 'output', 'vram-tile-browser.png');
fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log('Tile browser saved:', outPath);
console.log('Non-blank tile candidates:', copyrightCandidates.length);
copyrightCandidates.slice(0, 20).forEach(c => {
  console.log(`Tile 0x${c.tile.toString(16)} (${c.tile}), nonzero=${c.nonzero}, hex=${c.hex}`);
});

// Also save candidates as individual images
const candDir = path.join(baseDir, 'output', 'candidates');
fs.mkdirSync(candDir, { recursive: true });
for (const c of copyrightCandidates.slice(0, 30)) {
  const tileBytes = vram.slice(c.tile * 32, c.tile * 32 + 32);
  const pixels = decodeTile(tileBytes, 0);
  const cvs = createCanvas(8 * 8, 8 * 8);
  const cct = cvs.getContext('2d');
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const col = pixels[y * 8 + x];
      const word = palettes[0][col].be;
      const [r, g, b, a] = mdColorToRGBA(word);
      cct.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
      cct.fillRect(x * 8, y * 8, 8, 8);
    }
  }
  fs.writeFileSync(path.join(candDir, `tile_${c.tile.toString(16).padStart(3,'0')}.png`), cvs.toBuffer('image/png'));
}
