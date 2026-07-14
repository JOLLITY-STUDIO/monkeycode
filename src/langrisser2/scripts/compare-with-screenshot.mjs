/**
 * 读取真实模拟器截图，分析像素颜色
 * 对比我的渲染结果，找出颜色解码问题
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

// ============================================================
// 读取真实模拟器BMP截图
// ============================================================
const bmpBuf = readFileSync(BMP_PATH);

// BMP头解析
const header = bmpBuf.toString('ascii', 0, 2);
const fileSize = bmpBuf.readUInt32LE(2);
const dataOffset = bmpBuf.readUInt32LE(10);
const infoSize = bmpBuf.readUInt32LE(14);
const width = bmpBuf.readInt32LE(18);
const height = bmpBuf.readInt32LE(22);
const bpp = bmpBuf.readUInt16LE(28);
const compression = bmpBuf.readUInt32LE(30);

console.log('=== 真实模拟器截图 BMP 信息 ===');
console.log(`  Header: ${header}`);
console.log(`  FileSize: ${fileSize}`);
console.log(`  Width: ${width}, Height: ${height}`);
console.log(`  BPP: ${bpp}, Compression: ${compression}`);
console.log(`  DataOffset: ${dataOffset}, InfoSize: ${infoSize}`);

// 提取像素数据 (24-bit BMP)
const absH = Math.abs(height);
const rowSize = ((width * 3 + 3) >> 2) * 4; // 4字节对齐
const bmpPixels = [];
for (let y = 0; y < absH; y++) {
  const srcY = height > 0 ? (absH - 1 - y) : y; // BMP默认bottom-up
  for (let x = 0; x < width; x++) {
    const srcOff = dataOffset + srcY * rowSize + x * 3;
    const r = bmpBuf[srcOff + 2];
    const g = bmpBuf[srcOff + 1];
    const b = bmpBuf[srcOff + 0];
    bmpPixels.push({ r, g, b });
  }
}

// ============================================================
// 分析截图中的颜色分布
// ============================================================
const colorMap = {};
for (const p of bmpPixels) {
  const key = `${p.r},${p.g},${p.b}`;
  colorMap[key] = (colorMap[key] || 0) + 1;
}

console.log('\n=== 截图颜色统计 (按出现次数排序) ===');
const sortedColors = Object.entries(colorMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

let idx = 0;
for (const [color, count] of sortedColors) {
  const [r, g, b] = color.split(',').map(Number);
  const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  const pct = (count / bmpPixels.length * 100).toFixed(2);
  console.log(`  [${idx++}] rgb(${r},${g},${b}) ${hex} : ${count} 像素 (${pct}%)`);
}

// ============================================================
// 分析关键区域的颜色
// ============================================================
console.log('\n=== 关键区域颜色分析 ===');

// 背景区域 (左上角)
const bgColors = new Set();
for (let y = 0; y < 20; y++) {
  for (let x = 0; x < 20; x++) {
    const p = bmpPixels[y * width + x];
    bgColors.add(`${p.r},${p.g},${p.b}`);
  }
}
console.log('左上角背景颜色:', [...bgColors].join('; '));

// 标题文字区域 (中间)
const titleColors = new Set();
for (let y = Math.floor(absH / 3); y < Math.floor(absH / 2); y++) {
  for (let x = Math.floor(width / 4); x < Math.floor(width * 3 / 4); x++) {
    const p = bmpPixels[y * width + x];
    // 排除背景色
    if (p.r > 50 || p.g > 50 || p.b > 50) {
      titleColors.add(`${p.r},${p.g},${p.b}`);
    }
  }
}
console.log('标题文字区域颜色:', [...titleColors].join('; '));

// 边框装饰区域
const borderColors = new Set();
for (let y = Math.floor(absH / 2); y < Math.floor(absH * 2 / 3); y++) {
  for (let x = Math.floor(width / 4); x < Math.floor(width * 3 / 4); x++) {
    const p = bmpPixels[y * width + x];
    if (p.r > 50 || p.g > 50 || p.b > 50) {
      borderColors.add(`${p.r},${p.g},${p.b}`);
    }
  }
}
console.log('边框装饰区域颜色:', [...borderColors].join('; '));

// 底部文字区域
const textColors = new Set();
for (let y = Math.floor(absH * 3 / 4); y < absH - 20; y++) {
  for (let x = Math.floor(width / 3); x < Math.floor(width * 2 / 3); x++) {
    const p = bmpPixels[y * width + x];
    if (p.r > 50 || p.g > 50 || p.b > 50) {
      textColors.add(`${p.r},${p.g},${p.b}`);
    }
  }
}
console.log('底部文字区域颜色:', [...textColors].join('; '));

// ============================================================
// 对比 CRAM 解码
// ============================================================
console.log('\n=== CRAM 颜色对比 ===');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAMLE(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}

// 我的颜色映射: (c * 36)
function map36(word) {
  const r = (word & 7) * 36;
  const g = ((word >> 3) & 7) * 36;
  const b = ((word >> 6) & 7) * 36;
  return { r, g, b };
}

// 标准 Genesis 颜色映射: c * 36 + 18 (中间值)
function map36m(word) {
  const r = (word & 7) * 36 + 18;
  const g = ((word >> 3) & 7) * 36 + 18;
  const b = ((word >> 6) & 7) * 36 + 18;
  return { r, g, b };
}

// 另一种映射: c * 32 + 16
function map32(word) {
  const r = (word & 7) * 32 + 16;
  const g = ((word >> 3) & 7) * 32 + 16;
  const b = ((word >> 6) & 7) * 32 + 16;
  return { r, g, b };
}

// 打印调色板2（标题使用）
console.log('\n调色板2 (标题使用):');
for (let i = 0; i < 16; i++) {
  const idx = 2 * 16 + i;
  const word = decodeCRAMLE(idx);
  const c36 = map36(word);
  const c36m = map36m(word);
  const c32 = map32(word);
  console.log(`  [${i}] word=0x${word.toString(16).padStart(4,'0')}`);
  console.log(`        ×36:   rgb(${c36.r},${c36.g},${c36.b})`);
  console.log(`        ×36+18: rgb(${c36m.r},${c36m.g},${c36m.b})`);
  console.log(`        ×32+16: rgb(${c32.r},${c32.g},${c32.b})`);
}

// ============================================================
// 生成对比图
// ============================================================
const vram = new Uint8Array(readFileSync(VRAM_PATH));

// 渲染我的版本
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

function readNametableEntry(tx, ty) {
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

function renderPlane(colorFn) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(vram, i);

  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(tx, ty);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      const palBase = e.palette * 16;
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = colorFn(palBase + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// 不同颜色映射的渲染
const pal36 = [];
const pal36m = [];
const pal32 = [];
for (let i = 0; i < 64; i++) {
  const word = decodeCRAMLE(i);
  pal36.push(map36(word));
  pal36m.push(map36m(word));
  pal32.push(map32(word));
}

const c1 = renderPlane(i => pal36[i]);
const c2 = renderPlane(i => pal36m[i]);
const c3 = renderPlane(i => pal32[i]);

// 拼接输出
const out = createCanvas(320 * 4 + 30, 224 + 30);
const octx = out.getContext('2d');
octx.fillStyle = '#000';
octx.fillRect(0, 0, out.width, out.height);
octx.font = '12px monospace';
octx.fillStyle = '#0f0';

// 截图
const refCanvas = createCanvas(width, absH);
const rctx = refCanvas.getContext('2d');
const rImg = rctx.createImageData(width, absH);
for (let i = 0; i < bmpPixels.length; i++) {
  const p = bmpPixels[i];
  rImg.data[i * 4] = p.r;
  rImg.data[i * 4 + 1] = p.g;
  rImg.data[i * 4 + 2] = p.b;
  rImg.data[i * 4 + 3] = 255;
}
rctx.putImageData(rImg, 0, 0);
octx.drawImage(refCanvas, 0, 25);
octx.fillText('0. 真实模拟器截图', 5, 15);

octx.drawImage(c1, 320 + 10, 25);
octx.fillText('1. CRAM ×36', 320 + 10, 15);

octx.drawImage(c2, 640 + 20, 25);
octx.fillText('2. CRAM ×36+18', 640 + 20, 15);

octx.drawImage(c3, 960 + 30, 25);
octx.fillText('3. CRAM ×32+16', 960 + 30, 15);

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-vs-screenshot.png');
writeFileSync(OUT_PATH, out.toBuffer('image/png'));
console.log(`\n✅ 输出对比图: ${OUT_PATH}`);
