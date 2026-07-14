/**
 * 重新检查哪个 Plane 包含标题文字
 *
 * 1. 分别渲染 Plane A / Plane B / Sprite 表
 * 2. 对比截图形状
 * 3. 看看标题文字到底在哪个层
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

// 行主序解码 (标准 Genesis 格式)
function decodeTile(tileIdx: number): Uint8Array {
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

function readNtEntry(base: number, tx: number, ty: number, stride: number = 64) {
  const addr = base + (ty * stride + tx) * 2;
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

// 渲染一个 plane 的 mask
function renderPlaneMask(base: number, cols: number, rows: number, stride: number = 64): {
  mask: Uint8Array; w: number; h: number; stats: { nonZero: number; tiles: number }
} {
  const w = cols * 8;
  const h = rows * 8;
  const mask = new Uint8Array(w * h);
  let nonZero = 0;
  let tileCount = 0;

  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      const e = readNtEntry(base, tx, ty, stride);
      if (e.tileIdx === 0) continue;
      tileCount++;
      const pixels = decodeTile(e.tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          if (pixels[py * 8 + px] !== 0) {
            const dx = tx * 8 + (e.hFlip ? 7 - px : px);
            const dy = ty * 8 + (e.vFlip ? 7 - py : py);
            if (dx < w && dy < h) {
              mask[dy * w + dx] = e.palette + 1; // 用不同颜色区分调色板
              nonZero++;
            }
          }
        }
      }
    }
  }
  return { mask, w, h, stats: { nonZero, tiles: tileCount } };
}

// ========================================
// 检查所有可能的 plane 基址
// ========================================
console.log('=== 扫描可能的 Plane 基址 ===\n');

const candidates = [
  { name: 'Plane A (R2=0x30 → 0xC000)', base: 0xC000 },
  { name: 'Plane B (R4=0x07 → 0xE000)', base: 0xE000 },
  { name: 'Window (R3=0x38 → 0xE000?)', base: 0xB800 },
  { name: 'Plane A alt (0x8000)', base: 0x8000 },
  { name: 'Plane A alt (0xA000)', base: 0xA000 },
  { name: 'Plane alt (0xD000)', base: 0xD000 },
  { name: 'Plane alt (0xF000)', base: 0xF000 },
];

const COLS = 40;
const ROWS = 28;

// 渲染对比图
const canvas = createCanvas(320 * 2 + 30, 224 * 4 + 50);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#111';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 先画截图的 1-bit 版本在左上角
const bmpBuf = readFileSync(resolve(ROOT, 'screenshots/Langrisser II (Japan)_034.bmp'));
function parseBMP(buffer: Buffer): { width: number; height: number; data: Uint8Array } {
  const width = buffer.readInt32LE(0x12);
  const height = buffer.readInt32LE(0x16);
  const bpp = buffer.readUInt16LE(0x1C);
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
  return { width, height: absHeight, data };
}
const { data: shotData } = parseBMP(bmpBuf);

// 画截图
const shotImg = ctx.createImageData(320, 224);
shotImg.data.set(shotData);
ctx.putImageData(shotImg, 10, 20);
ctx.fillStyle = 'white';
ctx.font = '12px sans-serif';
ctx.fillText('原始截图', 10, 15);

// 渲染每个 candidate
const palColors = [
  'rgb(255,100,100)', // pal0
  'rgb(100,255,100)', // pal1
  'rgb(255,255,100)', // pal2
  'rgb(100,200,255)', // pal3
];

for (let i = 0; i < candidates.length; i++) {
  const { name, base } = candidates[i];
  const { mask, stats } = renderPlaneMask(base, COLS, ROWS);

  console.log(`${name}:`);
  console.log(`  非空 tile 数: ${stats.tiles}`);
  console.log(`  非透明像素: ${stats.nonZero}`);

  const col = (i + 1) % 2; // 第 0 个位置是截图，从第 1 个开始
  const row = Math.floor((i + 1) / 2);
  const x = col * (320 + 10) + 10;
  const y = row * (224 + 10) + 20;

  // 先填背景
  ctx.fillStyle = '#000066';
  ctx.fillRect(x, y, 320, 224);

  // 画非透明像素 (按调色板分色)
  for (let py = 0; py < 224; py++) {
    for (let px = 0; px < 320; px++) {
      const v = mask[py * 320 + px];
      if (v !== 0) {
        ctx.fillStyle = palColors[v - 1] || 'white';
        ctx.fillRect(x + px, y + py, 1, 1);
      }
    }
  }

  ctx.fillStyle = 'white';
  ctx.fillText(name, x, y - 4);
}

const outPath = resolve(OUT_DIR, 'plane-scan.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`\n扫描图保存到: ${outPath}`);

// ========================================
// 也检查一下 Sprite 表
// ========================================
console.log('\n=== 检查 Sprite 表 ===');

// R5 通常是 sprite 表基址: 0x7800? 0x3C00?
const spriteBases = [0x7800, 0x3C00, 0xBC00, 0xFC00];

for (const base of spriteBases) {
  let nonZeroSprites = 0;
  let visibleCount = 0;
  for (let i = 0; i < 80; i++) {
    const addr = base + i * 8;
    // 简单检查: y 位置不为 0 就算可见
    const yLo = vram[addr];
    const yHi = vram[addr + 1];
    const y = ((yHi << 8) | yLo) & 0x3FF;
    const tileIdx = vram[addr + 4] | (vram[addr + 5] << 8);
    if (y !== 0 && (tileIdx & 0x7FF) !== 0) {
      nonZeroSprites++;
    }
    if (y >= 128 && y < 352) { // 可见范围
      visibleCount++;
    }
  }
  console.log(`Sprite 表 @ 0x${base.toString(16)}: ${nonZeroSprites} 个非空 sprite, ${visibleCount} 个可见`);
}
