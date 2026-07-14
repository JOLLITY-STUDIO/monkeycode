/**
 * 放大对比底部版权文字区域，验证哪种格式是对的
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const vram = new Uint8Array(
  readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'))
);

// 加载截图
const bmpBuf = readFileSync(resolve(ROOT, 'screenshots/Langrisser II (Japan)_034.bmp'));
function parseBMP(buffer: Buffer): { w: number; h: number; data: Uint8Array } {
  const w = buffer.readInt32LE(0x12);
  const h = buffer.readInt32LE(0x16);
  const dataOffset = buffer.readUInt32LE(0x0A);
  const absH = Math.abs(h);
  const data = new Uint8Array(w * absH * 4);
  const rowSize = Math.ceil((w * 3) / 4) * 4;
  for (let y = 0; y < absH; y++) {
    const srcY = h > 0 ? (absH - 1 - y) : y;
    const srcOff = dataOffset + srcY * rowSize;
    const dstOff = y * w * 4;
    for (let x = 0; x < w; x++) {
      const s = srcOff + x * 3;
      const d = dstOff + x * 4;
      data[d] = buffer[s + 2];
      data[d + 1] = buffer[s + 1];
      data[d + 2] = buffer[s];
      data[d + 3] = 255;
    }
  }
  return { w, h: absH, data };
}
const { w: SW, h: SH, data: shot } = parseBMP(bmpBuf);

const BASE = 0xC000;

// 行主序解码
function decRow(tileIdx: number): Uint8Array {
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

// 列主序解码
function decCol(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let col = 0; col < 8; col++) {
    const colOff = offset + col * 4;
    const p0 = vram[colOff];
    const p1 = vram[colOff + 1];
    const p2 = vram[colOff + 2];
    const p3 = vram[colOff + 3];
    for (let row = 0; row < 8; row++) {
      const bit = 7 - row;
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[row * 8 + col] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

function readNt(tx: number, ty: number): number {
  const addr = BASE + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  return (hi << 8) | lo;
}

// 渲染底部版权区域并放大
const COPYRIGHT_Y = 25; // tile 行号 (大约第 25-27 行)
const COPYRIGHT_ROWS = 3;
const SCALE = 6;

function renderCopyright(decoder: (idx: number) => Uint8Array, label: string) {
  const w = 40 * 8 * SCALE;
  const h = COPYRIGHT_ROWS * 8 * SCALE;
  const canvas = createCanvas(w, h + 20);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000066';
  ctx.fillRect(0, 0, w, h + 20);
  ctx.fillStyle = 'white';
  ctx.font = '12px sans-serif';
  ctx.fillText(label, 5, 14);

  for (let ty = 0; ty < COPYRIGHT_ROWS; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const word = readNt(tx, COPYRIGHT_Y + ty);
      const tileIdx = word & 0x7FF;
      if (tileIdx === 0) continue;
      const pixels = decoder(tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const v = pixels[py * 8 + px];
          if (v !== 0) {
            ctx.fillStyle = `rgb(${255}, ${200 - v * 10}, ${50})`;
            ctx.fillRect(tx * 8 * SCALE + px * SCALE, 20 + ty * 8 * SCALE + py * SCALE, SCALE, SCALE);
          }
        }
      }
    }
  }
  return { canvas, w, h: h + 20 };
}

// 同时渲染截图底部区域
function shotCopyright() {
  const w = 320 * SCALE;
  const h = 24 * SCALE; // 大约 24 像素高
  const canvas = createCanvas(w, h + 20);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000066';
  ctx.fillRect(0, 0, w, h + 20);
  ctx.fillStyle = 'white';
  ctx.font = '12px sans-serif';
  ctx.fillText('截图底部版权', 5, 14);

  const startY = 180; // 截图中版权文字大约在 y=180
  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 320; x++) {
      const idx = ((startY + y) * 320 + x) * 4;
      const r = shot[idx];
      const g = shot[idx + 1];
      const b = shot[idx + 2];
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x * SCALE, 20 + y * SCALE, SCALE, SCALE);
    }
  }
  return { canvas, w, h: h + 20 };
}

const shotC = shotCopyright();
const rowC = renderCopyright(decRow, '行主序');
const colC = renderCopyright(decCol, '列主序');

const totalH = shotC.h + rowC.h + colC.h + 30;
const totalW = Math.max(shotC.w, rowC.w, colC.w) + 20;

const canvas = createCanvas(totalW, totalH);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#111';
ctx.fillRect(0, 0, totalW, totalH);

ctx.drawImage(shotC.canvas, 10, 10);
ctx.drawImage(rowC.canvas, 10, 10 + shotC.h + 10);
ctx.drawImage(colC.canvas, 10, 10 + shotC.h + 10 + rowC.h + 10);

const outPath = resolve(OUT_DIR, 'copyright-compare.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`版权文字对比图: ${outPath}`);

// ========================================
// 也看看标题文字区域放大
// ========================================
const TITLE_Y = 8;
const TILE_ROWS = 6;
const TITLE_SCALE = 4;

function renderTitle(decoder: (idx: number) => Uint8Array, label: string) {
  const w = 40 * 8 * TITLE_SCALE;
  const h = TILE_ROWS * 8 * TITLE_SCALE;
  const canvas = createCanvas(w, h + 20);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000066';
  ctx.fillRect(0, 0, w, h + 20);
  ctx.fillStyle = 'white';
  ctx.font = '12px sans-serif';
  ctx.fillText(label, 5, 14);

  for (let ty = 0; ty < TILE_ROWS; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const word = readNt(tx, TITLE_Y + ty);
      const tileIdx = word & 0x7FF;
      if (tileIdx === 0) continue;
      const pixels = decoder(tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const v = pixels[py * 8 + px];
          if (v !== 0) {
            ctx.fillStyle = `rgb(${255}, ${200 - v * 10}, ${50})`;
            ctx.fillRect(tx * 8 * TITLE_SCALE + px * TITLE_SCALE, 20 + ty * 8 * TITLE_SCALE + py * TITLE_SCALE, TITLE_SCALE, TITLE_SCALE);
          }
        }
      }
    }
  }
  return { canvas, w, h: h + 20 };
}

function shotTitle() {
  const w = 320 * TITLE_SCALE;
  const h = 48 * TITLE_SCALE;
  const canvas = createCanvas(w, h + 20);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000066';
  ctx.fillRect(0, 0, w, h + 20);
  ctx.fillStyle = 'white';
  ctx.font = '12px sans-serif';
  ctx.fillText('截图标题', 5, 14);

  const startY = 64;
  for (let y = 0; y < 48; y++) {
    for (let x = 0; x < 320; x++) {
      const idx = ((startY + y) * 320 + x) * 4;
      const r = shot[idx];
      const g = shot[idx + 1];
      const b = shot[idx + 2];
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x * TITLE_SCALE, 20 + y * TITLE_SCALE, TITLE_SCALE, TITLE_SCALE);
    }
  }
  return { canvas, w, h: h + 20 };
}

const shotT = shotTitle();
const rowT = renderTitle(decRow, '行主序标题');
const colT = renderTitle(decCol, '列主序标题');

const totalH2 = shotT.h + rowT.h + colT.h + 30;
const totalW2 = Math.max(shotT.w, rowT.w, colT.w) + 20;

const canvas2 = createCanvas(totalW2, totalH2);
const ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = '#111';
ctx2.fillRect(0, 0, totalW2, totalH2);

ctx2.drawImage(shotT.canvas, 10, 10);
ctx2.drawImage(rowT.canvas, 10, 10 + shotT.h + 10);
ctx2.drawImage(colT.canvas, 10, 10 + shotT.h + 10 + rowT.h + 10);

const outPath2 = resolve(OUT_DIR, 'title-compare.png');
writeFileSync(outPath2, canvas2.toBuffer('image/png'));
console.log(`标题文字对比图: ${outPath2}`);
