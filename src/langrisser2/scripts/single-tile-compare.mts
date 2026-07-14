/**
 * 精确对比单个 tile - 截图 vs VRAM
 * 找到截图中某个 tile 的精确像素模式，然后在 VRAM 中搜索
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

// 从截图提取 8x8 tile 的 mask - 用最常见的颜色作为背景
function getShotTileMask(px: number, py: number): Uint8Array {
  const mask = new Uint8Array(64);
  const colorCount = new Map<number, number>();
  const pixels = new Array<number>(64);

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const idx = ((py + y) * 320 + (px + x)) * 4;
      const r = shot[idx];
      const g = shot[idx + 1];
      const b = shot[idx + 2];
      const rgb = (r << 16) | (g << 8) | b;
      pixels[y * 8 + x] = rgb;
      colorCount.set(rgb, (colorCount.get(rgb) || 0) + 1);
    }
  }

  // 找到出现最多的颜色作为背景
  let bgColor = 0, bgCount = 0;
  for (const [c, cnt] of colorCount) {
    if (cnt > bgCount) {
      bgCount = cnt;
      bgColor = c;
    }
  }

  for (let i = 0; i < 64; i++) {
    mask[i] = (pixels[i] === bgColor) ? 0 : 1;
  }
  return mask;
}

// 手动选一个文字笔画位置 - "ラ"字的第一笔附近，大概 x=80, y=96
const TILE_PX = 88;
const TILE_PY = 104;

const target = getShotTileMask(TILE_PX, TILE_PY);

console.log(`截图 tile @ (${TILE_PX}, ${TILE_PY}) 的 mask:`);
for (let y = 0; y < 8; y++) {
  let line = '  ';
  for (let x = 0; x < 8; x++) {
    line += target[y * 8 + x] ? '█' : '·';
  }
  console.log(line);
}
let nz = 0;
target.forEach(v => v && nz++);
console.log(`  非零像素: ${nz}/64`);

// 行主序解码
function decRow(tileIdx: number, bit7Left = true): Uint8Array {
  const offset = tileIdx * 32;
  const mask = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    const anyPlane = p0 | p1 | p2 | p3;
    for (let x = 0; x < 8; x++) {
      const bit = bit7Left ? (7 - x) : x;
      mask[y * 8 + x] = (anyPlane >> bit) & 1;
    }
  }
  return mask;
}

// 列主序解码
function decCol(tileIdx: number, bit7Top = true): Uint8Array {
  const offset = tileIdx * 32;
  const mask = new Uint8Array(64);
  for (let col = 0; col < 8; col++) {
    const colOff = offset + col * 4;
    const p0 = vram[colOff];
    const p1 = vram[colOff + 1];
    const p2 = vram[colOff + 2];
    const p3 = vram[colOff + 3];
    const anyPlane = p0 | p1 | p2 | p3;
    for (let row = 0; row < 8; row++) {
      const bit = bit7Top ? (7 - row) : row;
      mask[row * 8 + col] = (anyPlane >> bit) & 1;
    }
  }
  return mask;
}

// 计算匹配度
function matchScore(a: Uint8Array, b: Uint8Array): number {
  let s = 0;
  for (let i = 0; i < 64; i++) {
    if (a[i] === b[i]) s++;
  }
  return s;
}

// 搜索所有 tile
let bestRowIdx = -1, bestRowScore = 0;
let bestColIdx = -1, bestColScore = 0;
let bestRowFlipIdx = -1, bestRowFlipScore = 0;

for (let i = 0; i < 2048; i++) {
  const row = decRow(i);
  const rs = matchScore(row, target);
  if (rs > bestRowScore) {
    bestRowScore = rs;
    bestRowIdx = i;
  }

  // H-flip + V-flip 行主序
  const rowHF = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      rowHF[y * 8 + x] = row[y * 8 + (7 - x)];
    }
  }
  const rfs = matchScore(rowHF, target);
  if (rfs > bestRowFlipScore) {
    bestRowFlipScore = rfs;
    bestRowFlipIdx = i;
  }

  const col = decCol(i);
  const cs = matchScore(col, target);
  if (cs > bestColScore) {
    bestColScore = cs;
    bestColIdx = i;
  }
}

console.log(`\n搜索结果 (2048 tiles):`);
console.log(`  行主序最佳: tile ${bestRowIdx}, 匹配 ${bestRowScore}/64 (${(bestRowScore/64*100).toFixed(1)}%)`);
console.log(`  行主序H翻转最佳: tile ${bestRowFlipIdx}, 匹配 ${bestRowFlipScore}/64 (${(bestRowFlipScore/64*100).toFixed(1)}%)`);
console.log(`  列主序最佳: tile ${bestColIdx}, 匹配 ${bestColScore}/64 (${(bestColScore/64*100).toFixed(1)}%)`);

// 画出对比
function drawMask(ctx: CanvasRenderingContext2D, x: number, y: number, mask: Uint8Array, scale: number, label: string) {
  ctx.fillStyle = '#000066';
  ctx.fillRect(x, y, 8 * scale, 8 * scale);
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      if (mask[py * 8 + px]) {
        ctx.fillStyle = '#ffcc33';
        ctx.fillRect(x + px * scale, y + py * scale, scale, scale);
      }
    }
  }
  ctx.fillStyle = 'white';
  ctx.font = '10px sans-serif';
  ctx.fillText(label, x, y - 2);
}

const scale = 10;
const canvas = createCanvas(500, 200);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, 500, 200);

let cx = 20, cy = 40;
drawMask(ctx, cx, cy, target, scale, '截图目标');
cx += 8 * scale + 30;

const rowBest = decRow(bestRowIdx);
drawMask(ctx, cx, cy, rowBest, scale, `行主序 tile${bestRowIdx}`);
cx += 8 * scale + 30;

const colBest = decCol(bestColIdx);
drawMask(ctx, cx, cy, colBest, scale, `列主序 tile${bestColIdx}`);
cx += 8 * scale + 30;

// 也看看 Plane A 中这个位置实际引用的是哪个 tile
const BASE = 0xC000;
const tileX = Math.floor(TILE_PX / 8);
const tileY = Math.floor(TILE_PY / 8);
const ntAddr = BASE + (tileY * 64 + tileX) * 2;
const ntWord = (vram[ntAddr + 1] << 8) | vram[ntAddr];
const actualTile = ntWord & 0x7FF;
const cx2 = 20, cy2 = 120;

const actualRow = decRow(actualTile);
const actualRowHF = new Uint8Array(64);
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    actualRowHF[y * 8 + x] = actualRow[y * 8 + (7 - x)];
  }
}
const actualCol = decCol(actualTile);

const rowScore = matchScore(actualRow, target);
const rowHFScore = matchScore(actualRowHF, target);
const colScore = matchScore(actualCol, target);

console.log(`\nPlane A 实际 tile ${actualTile} 的匹配度:`);
console.log(`  行主序: ${rowScore}/64 (${(rowScore/64*100).toFixed(1)}%)`);
console.log(`  行主序H翻: ${rowHFScore}/64 (${(rowHFScore/64*100).toFixed(1)}%)`);
console.log(`  列主序: ${colScore}/64 (${(colScore/64*100).toFixed(1)}%)`);

drawMask(ctx, cx2, cy2, actualRow, scale, `实际tile${actualTile} 行主序`);
let cx3 = cx2 + 8 * scale + 30;
drawMask(ctx, cx3, cy2, actualRowHF, scale, `行主序H翻`);
cx3 += 8 * scale + 30;
drawMask(ctx, cx3, cy2, actualCol, scale, `列主序`);

console.log(`\nPlane A 中 tile (${tileX}, ${tileY}) 引用的是 tile index = ${actualTile}`);
console.log(`  priority: ${(ntWord >> 15) & 1}, palette: ${(ntWord >> 13) & 3}`);
console.log(`  hFlip: ${!!(ntWord & 0x1000)}, vFlip: ${!!(ntWord & 0x0800)}`);

const outPath = resolve(OUT_DIR, 'single-tile-compare.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`\n对比图: ${outPath}`);
