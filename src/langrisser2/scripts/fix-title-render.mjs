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

console.log('=== 修正标题画面渲染 ===');
console.log('');
console.log('关键修正:');
console.log('  - Plane A: 0x4000 → 0xC000 (R2=0x30)');
console.log('  - Plane B: 0xC000 → 0xE000 (R4=0x07)');
console.log('');

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
console.log(`背景色 (CRAM[${BG_COLOR_INDEX}]): rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + y + 8];
    const p2 = vram[offset + y + 16];
    const p3 = vram[offset + y + 24];
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

const PLANE_A_BASE = 0xC000;
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
      const tp = tileCache[e.tileIdx] || tileCache[0];
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

renderPlane(PLANE_A_BASE, 'Plane A (0xC000)');
renderPlane(PLANE_B_BASE, 'Plane B (0xE000)');

ctx.putImageData(imgData, 0, 0);

const labeled = createCanvas(DISPLAY_W + 20, DISPLAY_H + 60);
const lctx = labeled.getContext('2d');
lctx.fillStyle = '#000';
lctx.fillRect(0, 0, labeled.width, labeled.height);
lctx.fillStyle = '#0f0';
lctx.font = '12px monospace';
lctx.fillText('Langrisser II - Title Screen (Fixed)', 10, 20);
lctx.fillText(`Plane A: 0xC000 | Plane B: 0xE000 | BG=CRAM[4]`, 10, 35);
lctx.drawImage(canvas, 10, 60);

const OUT_PATH = join(DATA_DIR, 'output/title-fixed.png');
writeFileSync(OUT_PATH, labeled.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

const planeACanvas = createCanvas(DISPLAY_W, DISPLAY_H);
const paCtx = planeACanvas.getContext('2d');
const paImgData = paCtx.createImageData(DISPLAY_W, DISPLAY_H);
const paData = paImgData.data;
for (let i = 0; i < paData.length; i += 4) {
  paData[i] = bgColor.r; paData[i+1] = bgColor.g; paData[i+2] = bgColor.b; paData[i+3] = 255;
}
renderPlane(PLANE_A_BASE, 'Plane A单独渲染');
paCtx.putImageData(paImgData, 0, 0);
writeFileSync(join(DATA_DIR, 'output/plane-a-fixed.png'), planeACanvas.toBuffer('image/png'));

const planeBCanvas = createCanvas(DISPLAY_W, DISPLAY_H);
const pbCtx = planeBCanvas.getContext('2d');
const pbImgData = pbCtx.createImageData(DISPLAY_W, DISPLAY_H);
const pbData = pbImgData.data;
for (let i = 0; i < pbData.length; i += 4) {
  pbData[i] = bgColor.r; pbData[i+1] = bgColor.g; pbData[i+2] = bgColor.b; pbData[i+3] = 255;
}
renderPlane(PLANE_B_BASE, 'Plane B单独渲染');
pbCtx.putImageData(pbImgData, 0, 0);
writeFileSync(join(DATA_DIR, 'output/plane-b-fixed.png'), planeBCanvas.toBuffer('image/png'));

console.log('');
console.log('=== Plane B调色板使用分析 ===');
const planeBAddr = 0xE000;
let paletteStats = [0, 0, 0, 0];
let tileRange = { min: 2047, max: 0 };
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(planeBAddr, tx, ty);
    if (e.word === 0) continue;
    paletteStats[e.palette]++;
    if (e.tileIdx < tileRange.min) tileRange.min = e.tileIdx;
    if (e.tileIdx > tileRange.max) tileRange.max = e.tileIdx;
  }
}
console.log(`调色板使用: pal0=${paletteStats[0]}, pal1=${paletteStats[1]}, pal2=${paletteStats[2]}, pal3=${paletteStats[3]}`);
console.log(`Tile索引范围: ${tileRange.min}-${tileRange.max}`);

console.log('');
console.log('=== 调色板3颜色 ===');
for (let i = 0; i < 16; i++) {
  const c = palette[48 + i];
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
}
