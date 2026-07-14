/**
 * 深入测试不同的 tile 解码格式
 * 找到正确的 Genesis VDP 4bpp tile 格式
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

// 取一个有代表性的 tile (比如标题文字里的 tile)
const TILE_IDX = 300;

console.log(`\n=== 分析 tile ${TILE_IDX} 的原始数据 ===`);
const base = TILE_IDX * 32;
for (let y = 0; y < 8; y++) {
  const off = base + y * 4;
  const b0 = vram[off].toString(2).padStart(8, '0');
  const b1 = vram[off + 1].toString(2).padStart(8, '0');
  const b2 = vram[off + 2].toString(2).padStart(8, '0');
  const b3 = vram[off + 3].toString(2).padStart(8, '0');
  console.log(`行 ${y}: p0=${b0} p1=${b1} p2=${b2} p3=${b3}`);
}

// ========================================
// 格式 1: 行主序, bit7=x0 (当前使用的)
// ========================================
function decodeRowMajorBit7Left(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x; // bit7 = 最左
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

// ========================================
// 格式 2: 行主序, bit0=x0 (bit 顺序反过来)
// ========================================
function decodeRowMajorBit0Left(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = x; // bit0 = 最左
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

// ========================================
// 格式 3: 平面主序 (plane-major, 8+8+8+8 bytes)
// ========================================
function decodePlaneMajor(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + 8 + y];
    const p2 = vram[offset + 16 + y];
    const p3 = vram[offset + 24 + y];
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

// ========================================
// 格式 4: 行主序但每对字节交换 (word-swap)
// (VRAM 是 16 位 little-endian, 每 2 字节是一个 word)
// 每行 4 字节 = 2 个 word，如果 word 是 LE 的，那字节序要交换
// 但我们直接读字节的话应该是对的，除非...
// 让我们试试把每行的 4 字节按 word 交换
// ========================================
function decodeRowMajorWordSwap(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    // 交换每对字节
    const p0 = vram[rowOffset + 1]; // 原来是 p1
    const p1 = vram[rowOffset];     // 原来是 p0
    const p2 = vram[rowOffset + 3]; // 原来是 p3
    const p3 = vram[rowOffset + 2]; // 原来是 p2
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

// ========================================
// 格式 5: 转置 (行变列)
// 就是把 tile 旋转/转置，看看是不是竖线变横线
// ========================================
function decodeTransposed(tileIdx: number): Uint8Array {
  const original = decodeRowMajorBit7Left(tileIdx);
  const transposed = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      transposed[x * 8 + y] = original[y * 8 + x];
    }
  }
  return transposed;
}

// ========================================
// 格式 6: 行主序，但是 plane 顺序反过来 (p3,p2,p1,p0)
// ========================================
function decodeRowMajorPlaneRev(tileIdx: number): Uint8Array {
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
      const b0 = (p3 >> bit) & 1; // 反过来
      const b1 = (p2 >> bit) & 1;
      const b2 = (p1 >> bit) & 1;
      const b3 = (p0 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

// ========================================
// 打印 tile 的 ASCII 图
// ========================================
function printTile(name: string, pixels: Uint8Array) {
  console.log(`\n--- ${name} ---`);
  for (let y = 0; y < 8; y++) {
    let line = '';
    for (let x = 0; x < 8; x++) {
      const v = pixels[y * 8 + x];
      line += v === 0 ? '.' : v.toString(16).toUpperCase();
    }
    console.log(`  ${line}`);
  }
  // 统计非零像素的行/列分布
  const rowNZ = new Array(8).fill(0);
  const colNZ = new Array(8).fill(0);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (pixels[y * 8 + x] !== 0) {
        rowNZ[y]++;
        colNZ[x]++;
      }
    }
  }
  console.log(`  行非零数: ${rowNZ.join(',')}`);
  console.log(`  列非零数: ${colNZ.join(',')}`);
}

// 测试几种格式
const formats: [string, (i: number) => Uint8Array][] = [
  ['行主序 bit7=左 (当前)', decodeRowMajorBit7Left],
  ['行主序 bit0=左', decodeRowMajorBit0Left],
  ['平面主序', decodePlaneMajor],
  ['行主序+Word交换', decodeRowMajorWordSwap],
  ['转置(行变列)', decodeTransposed],
  ['行主序 plane反转', decodeRowMajorPlaneRev],
];

for (const [name, fn] of formats) {
  printTile(name, fn(TILE_IDX));
}

// ========================================
// 把所有格式的 Plane A 都渲染出来对比
// ========================================
const PLANE_A_BASE = 0xC000;
const COLS = 40;
const ROWS = 28;

function readNtEntry(base: number, tx: number, ty: number) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    tileIdx: word & 0x7FF,
    palette: (word >> 13) & 3,
    priority: (word >> 15) & 1,
  };
}

function renderPlaneA(decoder: (i: number) => Uint8Array): Uint8Array {
  const w = COLS * 8;
  const h = ROWS * 8;
  const data = new Uint8Array(w * h * 4);
  // 背景蓝
  for (let i = 0; i < w * h; i++) {
    data[i * 4 + 2] = 72; // 蓝
    data[i * 4 + 3] = 255;
  }
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNtEntry(PLANE_A_BASE, tx, ty);
      if (e.tileIdx === 0) continue;
      const pixels = decoder(e.tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const v = pixels[py * 8 + px];
          if (v !== 0) {
            const dx = tx * 8 + px;
            const dy = ty * 8 + py;
            const di = (dy * w + dx) * 4;
            // 用伪彩色显示 (方便看形状)
            data[di] = (v * 36) % 256;
            data[di + 1] = (v * 50 + 100) % 256;
            data[di + 2] = 255 - (v * 20);
            data[di + 3] = 255;
          }
        }
      }
    }
  }
  return data;
}

console.log('\n=== 渲染各种格式的 Plane A 对比 ===');
const compareW = 320 * 3 + 20; // 3列
const compareH = 224 * 2 + 10;  // 2行
const compareCanvas = createCanvas(compareW, compareH);
const ctx = compareCanvas.getContext('2d');
ctx.fillStyle = '#222';
ctx.fillRect(0, 0, compareW, compareH);

for (let i = 0; i < formats.length; i++) {
  const [name, decoder] = formats[i];
  const data = renderPlaneA(decoder);
  const imgData = ctx.createImageData(320, 224);
  imgData.data.set(data);
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = col * (320 + 10);
  const y = row * (224 + 10);
  ctx.putImageData(imgData, x, y);
  ctx.fillStyle = 'white';
  ctx.font = '12px monospace';
  ctx.fillText(name, x + 4, y + 16);
}

const outPath = resolve(OUT_DIR, 'format-compare.png');
writeFileSync(outPath, compareCanvas.toBuffer('image/png'));
console.log(`对比图保存到: ${outPath}`);
