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

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;

function decodeCRAM_LE(i, scale) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * scale;
  const g = ((word >> 3) & 0x07) * scale;
  const b = ((word >> 6) & 0x07) * scale;
  return { r, g, b };
}

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

function readNametableEntryLE(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    palette: (word >> 13) & 3,
    tileIdx: word & 0x7FF,
    hflip: (word >> 12) & 1,
    vflip: (word >> 11) & 1,
  };
}

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = bmpHeight > 0 ? (bmpHeight - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return {
    r: bmpBuf[srcOff + 2],
    g: bmpBuf[srcOff + 1],
    b: bmpBuf[srcOff + 0],
  };
}

const letterR = [], letterG = [], letterB = [];
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const c = getScreenshotPixel(10 * 8 + px, 8 * 8 + py);
    letterR.push(c.r); letterG.push(c.g); letterB.push(c.b);
  }
}
const targetR = Math.round(letterR.reduce((a,b)=>a+b,0)/64);
const targetG = Math.round(letterG.reduce((a,b)=>a+b,0)/64);
const targetB = Math.round(letterB.reduce((a,b)=>a+b,0)/64);

console.log(`目标字母颜色: rgb(${targetR},${targetG},${targetB})`);
console.log('');

const BG_COLOR_INDEX = 4;

for (let scale = 14; scale <= 36; scale += 2) {
  const palette = [];
  for (let i = 0; i < 64; i++) {
    palette.push(decodeCRAM_LE(i, scale));
  }
  
  const bgColor = palette[BG_COLOR_INDEX];
  
  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) {
    tileCache[i] = decodeTile(i);
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
  
  function renderPlane(base) {
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const e = readNametableEntryLE(base, tx, ty);
        if (e.tileIdx === 0 && e.palette === 0) continue;
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
  }
  
  renderPlane(PLANE_B_BASE);
  renderPlane(PLANE_A_BASE);
  
  ctx.putImageData(imgData, 0, 0);
  
  const renderedLetterData = ctx.getImageData(10 * 8, 8 * 8, 8, 8);
  const rld = renderedLetterData.data;
  let renderR = 0, renderG = 0, renderB = 0;
  for (let i = 0; i < rld.length; i += 4) {
    renderR += rld[i]; renderG += rld[i+1]; renderB += rld[i+2];
  }
  
  const avgR = Math.round(renderR/64);
  const avgG = Math.round(renderG/64);
  const avgB = Math.round(renderB/64);
  
  const diff = Math.abs(avgR - targetR) + Math.abs(avgG - targetG) + Math.abs(avgB - targetB);
  
  console.log(`缩放${scale}: 背景 rgb(${bgColor.r},${bgColor.g},${bgColor.b}) | 字母 rgb(${avgR},${avgG},${avgB}) | 差异: ${diff}`);
}
