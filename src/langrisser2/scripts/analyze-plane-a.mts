/**
 * 分析 Plane A 渲染的竖线问题
 *
 * 1. 画出所有 Plane A 用到的 tile，看看 tile 本身的形状
 * 2. 用不同的 tile 解码格式对比
 * 3. 对比按 tile 排列的网格图
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

const PLANE_A_BASE = 0xC000;
const COLS = 40;
const ROWS = 28;

// 行主序解码 (当前使用的格式)
function decodeTileRowMajor(tileIdx: number): Uint8Array {
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

// 平面主序解码 (测试用)
function decodeTilePlaneMajor(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];         // plane0 第 y 行
    const p1 = vram[offset + 8 + y];    // plane1 第 y 行
    const p2 = vram[offset + 16 + y];   // plane2 第 y 行
    const p3 = vram[offset + 24 + y];   // plane3 第 y 行
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

// 读取 nametable 条目
function readNtEntry(base: number, tx: number, ty: number) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    tileIdx: word & 0x7FF,
    palette: (word >> 13) & 3,
    priority: (word >> 15) & 1,
    hFlip: (word >> 12) & 1,
    vFlip: (word >> 11) & 1,
  };
}

// 收集 Plane A 中所有用到的 tile
const usedTiles = new Set<number>();
const tileGrid: number[][] = [];
for (let y = 0; y < ROWS; y++) {
  tileGrid[y] = [];
  for (let x = 0; x < COLS; x++) {
    const e = readNtEntry(PLANE_A_BASE, x, y);
    tileGrid[y][x] = e.tileIdx;
    if (e.tileIdx !== 0) {
      usedTiles.add(e.tileIdx);
    }
  }
}

console.log(`Plane A 使用了 ${usedTiles.size} 个不同的 tile (非空)`);

// ========================================
// 测试 1: 画所有用到的 tile 的图谱 (行主序)
// ========================================
const tileArray = Array.from(usedTiles).sort((a, b) => a - b);
const tilesPerRow = 16;
const tileMapRows = Math.ceil(tileArray.length / tilesPerRow);
const tileMapW = tilesPerRow * 9 - 1; // 8px + 1px gap
const tileMapH = tileMapRows * 9 - 1;

function drawTileMap(decoder: (idx: number) => Uint8Array, label: string) {
  const canvas = createCanvas(tileMapW, tileMapH);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000066';
  ctx.fillRect(0, 0, tileMapW, tileMapH);

  for (let i = 0; i < tileArray.length; i++) {
    const tx = (i % tilesPerRow) * 9;
    const ty = Math.floor(i / tilesPerRow) * 9;
    const pixels = decoder(tileArray[i]);
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const v = pixels[py * 8 + px];
        if (v !== 0) {
          // 用灰度显示颜色索引
          const gray = Math.floor(v * 16);
          ctx.fillStyle = `rgb(${gray},${gray * 2},${255 - gray})`;
          ctx.fillRect(tx + px, ty + py, 1, 1);
        }
      }
    }
  }

  const outPath = resolve(OUT_DIR, `tilemap-${label}.png`);
  writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Tile map (${label}) 保存到: ${outPath}`);
}

drawTileMap(decodeTileRowMajor, 'row-major');
drawTileMap(decodeTilePlaneMajor, 'plane-major');

// ========================================
// 测试 2: 放大版 Plane A 渲染 (每像素 2x2)，用颜色区分 tile 边界
// ========================================
const SCALE = 2;
const bigW = COLS * 8 * SCALE;
const bigH = ROWS * 8 * SCALE;
const bigCanvas = createCanvas(bigW, bigH);
const bigCtx = bigCanvas.getContext('2d');
bigCtx.fillStyle = '#000044';
bigCtx.fillRect(0, 0, bigW, bigH);

for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNtEntry(PLANE_A_BASE, tx, ty);
    if (e.tileIdx === 0) continue;
    const pixels = decodeTileRowMajor(e.tileIdx);
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const v = pixels[py * 8 + px];
        if (v !== 0) {
          const hue = (e.tileIdx * 37) % 360;
          bigCtx.fillStyle = `hsl(${hue}, 80%, ${30 + v * 4}%)`;
          bigCtx.fillRect(
            (tx * 8 + px) * SCALE,
            (ty * 8 + py) * SCALE,
            SCALE, SCALE
          );
        }
      }
    }
    // 画 tile 边框
    bigCtx.strokeStyle = 'rgba(255,255,255,0.1)';
    bigCtx.strokeRect(tx * 8 * SCALE, ty * 8 * SCALE, 8 * SCALE, 8 * SCALE);
  }
}

const bigOutPath = resolve(OUT_DIR, 'plane-a-scaled-colored.png');
writeFileSync(bigOutPath, bigCanvas.toBuffer('image/png'));
console.log(`放大版 Plane A (彩色区分 tile) 保存到: ${bigOutPath}`);

// ========================================
// 测试 3: 统计每列的非透明像素数 (看看是不是有规律的竖线)
// ========================================
const colCounts = new Array(COLS * 8).fill(0);
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNtEntry(PLANE_A_BASE, tx, ty);
    if (e.tileIdx === 0) continue;
    const pixels = decodeTileRowMajor(e.tileIdx);
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        if (pixels[py * 8 + px] !== 0) {
          colCounts[tx * 8 + px]++;
        }
      }
    }
  }
}

console.log('\n=== 每列非透明像素数统计 (前 80 列) ===');
let colStr = '';
for (let x = 0; x < 80; x++) {
  const c = colCounts[x];
  colStr += (c > 10 ? '█' : c > 5 ? '▓' : c > 2 ? '▒' : c > 0 ? '░' : ' ');
}
console.log(colStr);

// ========================================
// 测试 4: 检查 tile 0 是否真的为空
// ========================================
const tile0 = decodeTileRowMajor(0);
let tile0NonZero = 0;
tile0.forEach(v => { if (v !== 0) tile0NonZero++; });
console.log(`\nTile 0 非零像素数: ${tile0NonZero}`);

// ========================================
// 测试 5: 检查 Plane A 第一行前几个 tile 的像素分布
// ========================================
console.log('\n=== Plane A 第 5 行 tile 序列 ===');
const row5: string[] = [];
for (let x = 0; x < COLS; x++) {
  const e = readNtEntry(PLANE_A_BASE, x, 5);
  row5.push(e.tileIdx.toString().padStart(4, ' '));
}
console.log(row5.join(' '));

// 取一个 tile，打印它的 ASCII 图
function printTileAscii(tileIdx: number) {
  const pixels = decodeTileRowMajor(tileIdx);
  console.log(`\nTile ${tileIdx}:`);
  for (let y = 0; y < 8; y++) {
    let line = '';
    for (let x = 0; x < 8; x++) {
      const v = pixels[y * 8 + x];
      line += v === 0 ? '.' : v.toString(16).toUpperCase();
    }
    console.log(`  ${line}`);
  }
}

// 找第一个非空 tile 打印
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    const e = readNtEntry(PLANE_A_BASE, x, y);
    if (e.tileIdx !== 0) {
      printTileAscii(e.tileIdx);
      break;
    }
  }
  break;
}
