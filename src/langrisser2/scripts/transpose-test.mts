/**
 * 测试：把每个 tile 内部转置（行变列），看看是不是正确的文字
 *
 * 关键观察: Plane A 的整体轮廓和标题完全匹配，但每个 tile 内部是竖线条。
 * 如果把每个 tile 转置 90 度，竖线变横线，是不是就变成正常文字了？
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

// 标准行主序解码
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

// 行主序 + tile 内转置 (行列互换)
function decodeTileTransposed(tileIdx: number): Uint8Array {
  const original = decodeTileRowMajor(tileIdx);
  const transposed = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      transposed[x * 8 + y] = original[y * 8 + x];
    }
  }
  return transposed;
}

// 直接按列主序读取 (每列 4 字节，bit7=y0)
function decodeTileColumnMajor(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let col = 0; col < 8; col++) {
    const colOffset = offset + col * 4;
    const p0 = vram[colOffset];
    const p1 = vram[colOffset + 1];
    const p2 = vram[colOffset + 2];
    const p3 = vram[colOffset + 3];
    for (let row = 0; row < 8; row++) {
      const bit = 7 - row; // bit7 = 最上面一行
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[row * 8 + col] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

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

function renderPlane(
  base: number,
  decoder: (idx: number) => Uint8Array,
  color: string
): Uint8Array {
  const w = 320, h = 224;
  const data = new Uint8Array(w * h * 4);
  // 背景深蓝
  for (let i = 0; i < w * h; i++) {
    data[i * 4 + 2] = 72;
    data[i * 4 + 3] = 255;
  }
  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNtEntry(base, tx, ty);
      if (e.tileIdx === 0) continue;
      const pixels = decoder(e.tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hFlip ? 7 - px : px;
          const srcY = e.vFlip ? 7 - py : py;
          const v = pixels[srcY * 8 + srcX];
          if (v !== 0) {
            const dx = tx * 8 + px;
            const dy = ty * 8 + py;
            const di = (dy * w + dx) * 4;
            // 按颜色索引用伪彩色
            const hue = (v * 40 + e.palette * 80) % 360;
            const light = 30 + v * 5;
            // 简化: 直接金色
            data[di] = 255;
            data[di + 1] = 200 - v * 10;
            data[di + 2] = 0;
            data[di + 3] = 255;
          }
        }
      }
    }
  }
  return data;
}

// 加载截图做对比
const bmpBuf = readFileSync(resolve(ROOT, 'screenshots/Langrisser II (Japan)_034.bmp'));
function parseBMP(buffer: Buffer): Uint8Array {
  const width = buffer.readInt32LE(0x12);
  const height = buffer.readInt32LE(0x16);
  const dataOffset = buffer.readUInt32LE(0x0A);
  const absHeight = Math.abs(height);
  const data = new Uint8Array(width * absHeight * 4);
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  for (let y = 0; y < absHeight; y++) {
    const srcY = height > 0 ? (absHeight - 1 - y) : y;
    const srcOffset = dataOffset + srcY * rowSize;
    const dstOffset = y * width * 4;
    for (let x = 0; x < width; x++) {
      const s = srcOffset + x * 3;
      const d = dstOffset + x * 4;
      data[d] = buffer[s + 2];
      data[d + 1] = buffer[s + 1];
      data[d + 2] = buffer[s];
      data[d + 3] = 255;
    }
  }
  return data;
}
const shotData = parseBMP(bmpBuf);

// 生成对比图: 截图 vs 行主序 vs 转置版 vs 列主序
const canvas = createCanvas(320 * 3 + 40, 224 + 40);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#111';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 1. 截图
const img1 = ctx.createImageData(320, 224);
img1.data.set(shotData);
ctx.putImageData(img1, 10, 20);
ctx.fillStyle = 'white';
ctx.font = '12px sans-serif';
ctx.fillText('截图 (原始)', 10, 15);

// 2. 行主序 (当前)
const rowData = renderPlane(0xC000, decodeTileRowMajor, 'gold');
const img2 = ctx.createImageData(320, 224);
img2.data.set(rowData);
ctx.putImageData(img2, 340, 20);
ctx.fillText('行主序 (当前)', 340, 15);

// 3. tile 内转置
const transData = renderPlane(0xC000, decodeTileTransposed, 'gold');
const img3 = ctx.createImageData(320, 224);
img3.data.set(transData);
ctx.putImageData(img3, 670, 20);
ctx.fillText('每个tile内部转置', 670, 15);

const outPath = resolve(OUT_DIR, 'transpose-test.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`对比图保存到: ${outPath}`);

// 打印几个 tile 的 ASCII 对比
console.log('\n=== Tile 300 对比 ===');
const t300Row = decodeTileRowMajor(300);
const t300Trans = decodeTileTransposed(300);
console.log('行主序:');
for (let y = 0; y < 8; y++) {
  let line = '  ';
  for (let x = 0; x < 8; x++) {
    line += t300Row[y * 8 + x] ? t300Row[y * 8 + x].toString(16) : '.';
  }
  console.log(line);
}
console.log('转置后:');
for (let y = 0; y < 8; y++) {
  let line = '  ';
  for (let x = 0; x < 8; x++) {
    line += t300Trans[y * 8 + x] ? t300Trans[y * 8 + x].toString(16) : '.';
  }
  console.log(line);
}
