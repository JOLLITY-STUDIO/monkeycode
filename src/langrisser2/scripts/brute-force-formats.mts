/**
 * 穷举更多 tile 解码格式，找到正确的那个
 *
 * 变量:
 * 1. 组织方式: 行主序 vs 列主序
 * 2. 每行列内字节顺序: p0p1p2p3, p2p3p0p1, p1p0p3p2, 等
 * 3. bit 顺序: bit7=左/上 vs bit0=左/上
 * 4. 平面顺序: p0=LSB vs p3=LSB
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

function readNtEntry(base: number, tx: number, ty: number) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return { tileIdx: word & 0x7FF };
}

// 生成各种解码器
type Decoder = (idx: number) => Uint8Array;

// 行主序，不同的字节顺序和 bit 顺序
function makeRowMajor(byteOrder: number[], bit7Left: boolean, planeOrder: 'normal' | 'reverse'): Decoder {
  return (tileIdx: number) => {
    const offset = tileIdx * 32;
    const pixels = new Uint8Array(64);
    for (let y = 0; y < 8; y++) {
      const rowBase = offset + y * 4;
      const bytes = byteOrder.map(i => vram[rowBase + i]);
      for (let x = 0; x < 8; x++) {
        const bit = bit7Left ? (7 - x) : x;
        const bits = bytes.map(b => (b >> bit) & 1);
        let val: number;
        if (planeOrder === 'normal') {
          val = bits[0] | (bits[1] << 1) | (bits[2] << 2) | (bits[3] << 3);
        } else {
          val = bits[3] | (bits[2] << 1) | (bits[1] << 2) | (bits[0] << 3);
        }
        pixels[y * 8 + x] = val;
      }
    }
    return pixels;
  };
}

// 列主序（每列 4 字节）
function makeColMajor(byteOrder: number[], bit7Top: boolean, planeOrder: 'normal' | 'reverse'): Decoder {
  return (tileIdx: number) => {
    const offset = tileIdx * 32;
    const pixels = new Uint8Array(64);
    for (let x = 0; x < 8; x++) {
      const colBase = offset + x * 4;
      const bytes = byteOrder.map(i => vram[colBase + i]);
      for (let y = 0; y < 8; y++) {
        const bit = bit7Top ? (7 - y) : y;
        const bits = bytes.map(b => (b >> bit) & 1);
        let val: number;
        if (planeOrder === 'normal') {
          val = bits[0] | (bits[1] << 1) | (bits[2] << 2) | (bits[3] << 3);
        } else {
          val = bits[3] | (bits[2] << 1) | (bits[1] << 2) | (bits[0] << 3);
        }
        pixels[y * 8 + x] = val;
      }
    }
    return pixels;
  };
}

// 2bpp x 2组 (像 SNES 那样的平面主序，但分两组)
function makePlaneMajor2bpp(): Decoder {
  return (tileIdx: number) => {
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
  };
}

// 行主序，但每行 2 个 word，每个 word 是 p0p1 组成 2bpp 的 8 像素
// 然后第二个 word 是 p2p3
// 实际上就是行主序的另一种说法...
// 换一个: 行主序交错 (p0 p2 p1 p3 这样的字节顺序)

// 生成一组候选格式
const formats: { name: string; decode: Decoder }[] = [];

// 行主序变体
const byteOrders = [
  [0, 1, 2, 3],  // p0 p1 p2 p3 (标准)
  [1, 0, 3, 2],  // p1 p0 p3 p2 (word swap)
  [2, 3, 0, 1],  // p2 p3 p0 p1
  [3, 2, 1, 0],  // p3 p2 p1 p0 (reverse)
  [0, 2, 1, 3],  // p0 p2 p1 p3 (interleaved)
];

for (const bo of byteOrders) {
  for (const bit7 of [true, false]) {
    for (const po of ['normal', 'reverse'] as const) {
      const name = `行_字节[${bo.join(',')}]_bit7=${bit7}_plane=${po}`;
      formats.push({ name, decode: makeRowMajor(bo, bit7, po) });
    }
  }
}

// 列主序变体
for (const bo of byteOrders) {
  for (const bit7 of [true, false]) {
    for (const po of ['normal', 'reverse'] as const) {
      const name = `列_字节[${bo.join(',')}]_bit7=${bit7}_plane=${po}`;
      formats.push({ name, decode: makeColMajor(bo, bit7, po) });
    }
  }
}

// 平面主序
formats.push({ name: '平面主序', decode: makePlaneMajor2bpp() });

console.log(`共 ${formats.length} 种格式，渲染第 1 行 Plane A 进行视觉对比`);

// 只渲染标题中间 3 行的 tile，缩小对比图
const sampleRows = [8, 9, 10]; // 取中间几行
const sampleCols = 20; // 20 列

function renderSample(decoder: Decoder): { data: Uint8Array; w: number; h: number } {
  const w = sampleCols * 8;
  const h = sampleRows.length * 8;
  const data = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    data[i * 4 + 2] = 72;
    data[i * 4 + 3] = 255;
  }
  for (let ry = 0; ry < sampleRows.length; ry++) {
    const ty = sampleRows[ry];
    for (let tx = 2; tx < 2 + sampleCols; tx++) {
      const e = readNtEntry(PLANE_A_BASE, tx, ty);
      if (e.tileIdx === 0) continue;
      const pixels = decoder(e.tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const v = pixels[py * 8 + px];
          if (v !== 0) {
            const dx = (tx - 2) * 8 + px;
            const dy = ry * 8 + py;
            const di = (dy * w + dx) * 4;
            data[di] = 255;
            data[di + 1] = 200;
            data[di + 2] = 50;
            data[di + 3] = 255;
          }
        }
      }
    }
  }
  return { data, w, h };
}

// 画对比图（4 列 × N 行）
const COLS_PER_ROW = 4;
const thumbW = sampleCols * 8;
const thumbH = sampleRows.length * 8;
const gapX = 10;
const gapY = 20;
const labelH = 14;

const rows = Math.ceil(formats.length / COLS_PER_ROW);
const canvasW = COLS_PER_ROW * thumbW + (COLS_PER_ROW + 1) * gapX;
const canvasH = rows * (thumbH + labelH) + (rows + 1) * gapY;

const canvas = createCanvas(canvasW, canvasH);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, canvasW, canvasH);

for (let i = 0; i < formats.length; i++) {
  const col = i % COLS_PER_ROW;
  const row = Math.floor(i / COLS_PER_ROW);
  const x = gapX + col * (thumbW + gapX);
  const y = gapY + row * (thumbH + labelH + gapY);

  const { data } = renderSample(formats[i].decode);
  const imgData = ctx.createImageData(thumbW, thumbH);
  imgData.data.set(data);
  ctx.putImageData(imgData, x, y);

  ctx.fillStyle = '#fff';
  ctx.font = '10px monospace';
  ctx.fillText(formats[i].name, x, y - 2);
}

const outPath = resolve(OUT_DIR, 'format-brute-force.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`暴力对比图保存到: ${outPath}`);
console.log(`共 ${formats.length} 种格式，${rows} 行`);
