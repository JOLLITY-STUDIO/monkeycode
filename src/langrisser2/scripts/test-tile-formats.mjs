/**
 * 测试4种 tile 格式组合
 *
 * tile 193 @ dump 0x1820 原始字节:
 *   11 11 21 53 33 13 11 32 22 12 11 32 33 33 32 33
 *   22 22 22 32 13 11 11 32 33 13 11 21 22 12 11 11
 *
 * 格式A (Genesis标准, 每行4字节4平面):
 *   row0 = [p0r0, p1r0, p2r0, p3r0] = [11, 11, 21, 53]
 *   解码: 084b008f (中间有00空隙)
 *
 * 格式B (每平面8字节连续):
 *   plane0 = [0-7], plane1 = [8-15], plane2 = [16-23], plane3 = [24-31]
 *   row0 = [p0byte0, p1byte0, p2byte0, p3byte0] = [11, 22, 22, 33]
 *
 * 同时测试 word-swap (每2字节交换)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_PATH  = join(DATA_DIR, 'output/title-tile-format-compare.png');

const vramOrig = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

// word-swap 版本
const vramSwap = new Uint8Array(vramOrig.length);
for (let i = 0; i < vramOrig.length; i += 2) {
  vramSwap[i] = vramOrig[i + 1];
  vramSwap[i + 1] = vramOrig[i];
}

// CRAM LE
function cramWordLE(i) { return (cram[i * 2 + 1] << 8) | cram[i * 2]; }
function cramWordToRgb(w) {
  return { r: (w & 7) * 36, g: ((w >> 3) & 7) * 36, b: ((w >> 6) & 7) * 36 };
}
const palette = [];
for (let i = 0; i < 64; i++) palette.push(cramWordToRgb(cramWordLE(i)));

// 格式A: 每行4字节 (Genesis标准)
function decodeTileA(vram, tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[rowOff + 0] >> bit) & 1;
      const p1 = (vram[rowOff + 1] >> bit) & 1;
      const p2 = (vram[rowOff + 2] >> bit) & 1;
      const p3 = (vram[rowOff + 3] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// 格式B: 每平面8字节连续
function decodeTileB(vram, tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[offset + 0 * 8 + y] >> bit) & 1;
      const p1 = (vram[offset + 1 * 8 + y] >> bit) & 1;
      const p2 = (vram[offset + 2 * 8 + y] >> bit) & 1;
      const p3 = (vram[offset + 3 * 8 + y] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// 格式C: 每行4字节，但位平面顺序反 (p3,p2,p1,p0)
function decodeTileC(vram, tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[rowOff + 3] >> bit) & 1;  // 交换 p0<->p3
      const p1 = (vram[rowOff + 2] >> bit) & 1;  // 交换 p1<->p2
      const p2 = (vram[rowOff + 1] >> bit) & 1;
      const p3 = (vram[rowOff + 0] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// nametable LE 读取
function readNametableEntry(tx, ty, vram) {
  const addr = 0xC000 + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    palette: (word >> 13) & 3,
    hflip:   (word >> 12) & 1,
    vflip:   (word >> 11) & 1,
    tileIdx: word & 0x7FF,
  };
}

const DISPLAY_W = 320, DISPLAY_H = 224;
const COLS = 40, ROWS = 28;

function renderPlane(vramForName, vramForTile, decodeFn, label) {
  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeFn(vramForTile, i);

  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNametableEntry(tx, ty, vramForName);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      const palBase = e.palette * 16;
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = palette[palBase + ci] || palette[0];
          const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// ============================================================
// 先看 tile 193 的4种解码
// ============================================================
function printTile(p, label) {
  console.log(label);
  for (let y = 0; y < 8; y++) {
    let row = '  ';
    for (let x = 0; x < 8; x++) row += p[y * 8 + x].toString(16);
    console.log(row);
  }
}

console.log('=== Tile 193 四种解码 ===');
printTile(decodeTileA(vramOrig, 193), 'A. 格式A 原始 (每行4字节):');
printTile(decodeTileA(vramSwap, 193), 'B. 格式A word-swap:');
printTile(decodeTileB(vramOrig, 193), 'C. 格式B 原始 (每平面8字节):');
printTile(decodeTileB(vramSwap, 193), 'D. 格式B word-swap:');

// ============================================================
// 渲染4种组合
// ============================================================
console.log('\n=== 渲染4种组合 ===');
const c1 = renderPlane(vramOrig, vramOrig, decodeTileA, 'A');
const c2 = renderPlane(vramOrig, vramSwap, decodeTileA, 'B');
const c3 = renderPlane(vramOrig, vramOrig, decodeTileB, 'C');
const c4 = renderPlane(vramOrig, vramSwap, decodeTileB, 'D');

// 2x2 网格
const GAP = 10;
const LABEL_H = 25;
const W = DISPLAY_W * 2 + GAP * 3;
const H = DISPLAY_H * 2 + GAP * 3 + LABEL_H * 2;
const total = createCanvas(W, H);
const tctx = total.getContext('2d');
tctx.fillStyle = '#000';
tctx.fillRect(0, 0, W, H);
tctx.font = '14px monospace';

const drawLabeled = (canvas, x, y, label) => {
  tctx.fillStyle = '#0f0';
  tctx.fillText(label, x, y + 15);
  tctx.drawImage(canvas, x, y + LABEL_H);
};

drawLabeled(c1, GAP, GAP, 'A. 格式A原始 (每行4字节, Genesis标准)');
drawLabeled(c2, DISPLAY_W + GAP * 2, GAP, 'B. 格式A + word-swap tile');
drawLabeled(c3, GAP, DISPLAY_H + GAP * 2 + LABEL_H, 'C. 格式B原始 (每平面8字节)');
drawLabeled(c4, DISPLAY_W + GAP * 2, DISPLAY_H + GAP * 2 + LABEL_H, 'D. 格式B + word-swap tile');

writeFileSync(OUT_PATH, total.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);
