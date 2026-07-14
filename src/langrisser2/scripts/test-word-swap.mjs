/**
 * 测试 VRAM word-swap 假设
 *
 * 假设: Gens dump VRAM 时按 little-endian word 存储
 *      dump[0]=VRAM[1], dump[1]=VRAM[0], dump[2]=VRAM[3], dump[3]=VRAM[2]...
 *
 * 验证: tile 193 @ dump 0x1820 = "11 11 21 53 33 13..."
 *      word-swap 后 = "11 11 53 21 13 33..."
 *      4bpp 解码看哪个更像真实图像
 *
 * 渲染4个版本对比:
 *   1. 原始tile + LE nametable
 *   2. word-swap tile + LE nametable
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
const OUT_PATH  = join(DATA_DIR, 'output/title-word-swap-compare.png');

const vramOrig = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

// 创建 word-swap 版本: 每2字节交换
const vramSwap = new Uint8Array(vramOrig.length);
for (let i = 0; i < vramOrig.length; i += 2) {
  vramSwap[i] = vramOrig[i + 1];
  vramSwap[i + 1] = vramOrig[i];
}

// CRAM 解码 (LE)
function cramWordLE(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}
function cramWordToRgb(word) {
  return {
    r: (word & 0x07) * 36,
    g: ((word >> 3) & 0x07) * 36,
    b: ((word >> 6) & 0x07) * 36
  };
}
const palette = [];
for (let i = 0; i < 64; i++) palette.push(cramWordToRgb(cramWordLE(i)));

// tile 解码 (使用指定的 VRAM)
function decodeTile(vram, tileIdx) {
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

// nametable 读取 (LE) - 注意: nametable 也从对应 VRAM 读取
// 但如果用 swap 版本，nametable 读取会变成 BE！
// 所以需要分开处理: nametable 用原 VRAM 的 LE 读取，tile 用 swap 版本

function readNametableEntry(planeBase, tx, ty, vram) {
  const addr = planeBase + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;  // LE
  return {
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
  };
}

const PLANE_A_BASE = 0xC000;
const DISPLAY_W = 320, DISPLAY_H = 224;
const COLS = 40, ROWS = 28;

function renderPlane(vramForNametable, vramForTile, label) {
  // 预解码 tiles
  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(vramForTile, i);

  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const entry = readNametableEntry(PLANE_A_BASE, tx, ty, vramForNametable);
      const tilePixels = tileCache[entry.tileIdx] || tileCache[0];
      const palBase = entry.palette * 16;

      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = entry.hflip ? (7 - px) : px;
          const srcY = entry.vflip ? (7 - py) : py;
          const colorIdx = tilePixels[srcY * 8 + srcX];
          const color = palette[palBase + colorIdx] || palette[0];
          const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
          data[di] = color.r; data[di+1] = color.g; data[di+2] = color.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// ============================================================
// 先验证: tile 193 word-swap 前后的解码
// ============================================================
console.log('=== Tile 193 解码对比 ===');
console.log('原始字节 (dump 0x1820):');
let hex = '';
for (let i = 0; i < 32; i++) {
  hex += vramOrig[0x1820 + i].toString(16).padStart(2, '0') + ' ';
  if ((i + 1) % 16 === 0) { console.log('  ' + hex); hex = ''; }
}
console.log('word-swap 后:');
hex = '';
for (let i = 0; i < 32; i++) {
  hex += vramSwap[0x1820 + i].toString(16).padStart(2, '0') + ' ';
  if ((i + 1) % 16 === 0) { console.log('  ' + hex); hex = ''; }
}

function printTileAscii(pixels, label) {
  console.log(`${label}:`);
  for (let y = 0; y < 8; y++) {
    let row = '  ';
    for (let x = 0; x < 8; x++) {
      const c = pixels[y * 8 + x];
      row += c.toString(16);
    }
    console.log(row);
  }
}

printTileAscii(decodeTile(vramOrig, 193), 'Tile 193 原始解码:');
printTileAscii(decodeTile(vramSwap, 193), 'Tile 193 word-swap解码:');

// ============================================================
// 渲染两个版本
// ============================================================
console.log('\n=== 渲染对比 ===');

// 版本1: 原始tile + LE nametable (之前已渲染)
const canvas1 = renderPlane(vramOrig, vramOrig, '原始');

// 版本2: word-swap tile + LE nametable
// 注意: nametable 从原 VRAM 读 (LE), tile 从 swap 版本读
const canvas2 = renderPlane(vramOrig, vramSwap, 'word-swap tile');

// 拼接
const GAP = 20;
const LABEL_H = 30;
const total = createCanvas(DISPLAY_W * 2 + GAP, DISPLAY_H + LABEL_H);
const tctx = total.getContext('2d');
tctx.fillStyle = '#000';
tctx.fillRect(0, 0, total.width, total.height);

tctx.drawImage(canvas1, 0, LABEL_H);
tctx.fillStyle = '#0f0';
tctx.font = '14px monospace';
tctx.fillText('1. 原始tile + LE nametable', 10, 20);

tctx.drawImage(canvas2, DISPLAY_W + GAP, LABEL_H);
tctx.fillStyle = '#0f0';
tctx.fillText('2. word-swap tile + LE nametable', DISPLAY_W + GAP + 10, 20);

writeFileSync(OUT_PATH, total.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);
