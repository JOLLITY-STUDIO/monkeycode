import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
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

const BG_COLOR_INDEX = 4;
const bgColor = palette[BG_COLOR_INDEX];

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

const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) {
  tileCache[i] = decodeTile(i);
}

const PLANE_B_BASE = 0xE000;
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
    word
  };
}

const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
const data = imgData.data;

for (let i = 0; i < data.length; i += 4) {
  data[i] = bgColor.r;
  data[i + 1] = bgColor.g;
  data[i + 2] = bgColor.b;
  data[i + 3] = 255;
}

const PAL_OFFSETS = [0, 16, 32, 48];

function renderPlane(base, label) {
  let entryCount = 0;
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word === 0) continue;
      entryCount++;
      const tp = tileCache[e.tileIdx];
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          if (ci !== 0) {
            const c = palette[PAL_OFFSETS[e.palette] + ci];
            const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
            data[di] = c.r;
            data[di + 1] = c.g;
            data[di + 2] = c.b;
            data[di + 3] = 255;
          }
        }
      }
    }
  }
  console.log(`${label}: ${entryCount} 个非空条目`);
}

renderPlane(PLANE_B_BASE, 'Plane B');

ctx.putImageData(imgData, 0, 0);

const labeled = createCanvas(DISPLAY_W + 20, DISPLAY_H + 60);
const lctx = labeled.getContext('2d');
lctx.fillStyle = '#000';
lctx.fillRect(0, 0, labeled.width, labeled.height);
lctx.fillStyle = '#0f0';
lctx.font = '12px monospace';
lctx.fillText('Langrisser II - Title Screen (Plane B Only)', 10, 20);
lctx.drawImage(canvas, 10, 60);

writeFileSync(join(DATA_DIR, 'output/title-plane-b-only.png'), labeled.toBuffer('image/png'));
console.log('✅ 输出: title-plane-b-only.png');

console.log('');
console.log('=== 调色板3颜色 ===');
for (let i = 48; i < 64; i++) {
  const c = palette[i];
  console.log(`  [${i-48}]: rgb(${c.r},${c.g},${c.b})`);
}

const renderedData = ctx.getImageData(80, 40, 64, 32);
const rd = renderedData.data;
let r = 0, g = 0, b = 0, count = 0;
for (let i = 0; i < rd.length; i += 4) {
  if (rd[i] + rd[i+1] + rd[i+2] > 20) {
    r += rd[i]; g += rd[i+1]; b += rd[i+2]; count++;
  }
}
console.log('');
console.log(`Plane B渲染字母区域: rgb(${Math.round(r/count)},${Math.round(g/count)},${Math.round(b/count)})`);
console.log('截图字母区域: rgb(38,23,75)');
