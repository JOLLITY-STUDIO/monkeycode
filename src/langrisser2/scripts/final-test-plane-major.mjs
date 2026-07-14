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

console.log('=== 测试位平面优先Tile解码 ===');
console.log('');

function decodeCRAM_3bit(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_3bit(i));
}

const BG_COLOR_INDEX = 4;
const bgColor = palette[BG_COLOR_INDEX];
console.log(`背景色 (CRAM[${BG_COLOR_INDEX}]): rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

function decodeTilePlaneMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let plane = 0; plane < 4; plane++) {
    const planeOffset = offset + plane * 8;
    for (let y = 0; y < 8; y++) {
      const byte = vram[planeOffset + y];
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        if ((byte >> bit) & 1) {
          pixels[y * 8 + x] |= (1 << plane);
        }
      }
    }
  }
  return pixels;
}

const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) {
  tileCache[i] = decodeTilePlaneMajor(i);
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
renderPlane(PLANE_A_BASE, 'Plane A');

ctx.putImageData(imgData, 0, 0);

const labeled = createCanvas(DISPLAY_W + 20, DISPLAY_H + 60);
const lctx = labeled.getContext('2d');
lctx.fillStyle = '#000';
lctx.fillRect(0, 0, labeled.width, labeled.height);
lctx.fillStyle = '#0f0';
lctx.font = '12px monospace';
lctx.fillText('Langrisser II - Title Screen (Plane Major)', 10, 20);
lctx.fillText(`Plane A: 0xC000 | Plane B: 0xE000 | BG=CRAM[4]`, 10, 35);
lctx.drawImage(canvas, 10, 60);

const OUT_PATH = join(DATA_DIR, 'output/title-plane-major-final.png');
writeFileSync(OUT_PATH, labeled.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

console.log('');
console.log('=== Tile 546位平面优先解码 ===');
const testTile = decodeTilePlaneMajor(546);
const usedColors = new Set();
for (let i = 0; i < 64; i++) {
  if (testTile[i] !== 0) usedColors.add(testTile[i]);
}
console.log(`使用颜色索引: ${Array.from(usedColors).sort((a,b)=>a-b).join(', ')}`);
console.log('对应的调色板3颜色:');
for (const ci of usedColors) {
  const c = palette[48 + ci];
  console.log(`  [${ci}]: rgb(${c.r},${c.g},${c.b})`);
}

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const width = bmpBuf.readInt32LE(18);
const height = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((width * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = height > 0 ? (height - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return { r: bmpBuf[srcOff + 2], g: bmpBuf[srcOff + 1], b: bmpBuf[srcOff + 0] };
}

const letterR = [], letterG = [], letterB = [];
for (let py = 0; py < 32; py++) {
  for (let px = 0; px < 64; px++) {
    const c = getScreenshotPixel(80 + px, 40 + py);
    if (c.r + c.g + c.b > 20) {
      letterR.push(c.r); letterG.push(c.g); letterB.push(c.b);
    }
  }
}
const avgLetterR = Math.round(letterR.reduce((a,b)=>a+b,0)/letterR.length);
const avgLetterG = Math.round(letterG.reduce((a,b)=>a+b,0)/letterG.length);
const avgLetterB = Math.round(letterB.reduce((a,b)=>a+b,0)/letterB.length);
console.log('');
console.log(`截图字母区域: rgb(${avgLetterR},${avgLetterG},${avgLetterB})`);

const renderedLetterData = ctx.getImageData(80, 40, 64, 32);
const rld = renderedLetterData.data;
let renderLetterR = 0, renderLetterG = 0, renderLetterB = 0, count = 0;
for (let i = 0; i < rld.length; i += 4) {
  if (rld[i] + rld[i+1] + rld[i+2] > 20) {
    renderLetterR += rld[i]; renderLetterG += rld[i+1]; renderLetterB += rld[i+2]; count++;
  }
}
console.log(`渲染字母区域: rgb(${Math.round(renderLetterR/count)},${Math.round(renderLetterG/count)},${Math.round(renderLetterB/count)})`);
