/**
 * 尝试不同的颜色映射系数，匹配截图颜色
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));

// ============================================================
// 尝试不同的颜色映射系数
// MD 9位颜色: R2R1R0 G2G1G0 B2B1B0 (每通道3位)
// 映射到 256 级的不同方式
// ============================================================

function decodeTile(tileIdx) {
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

// ============================================================
// 方式1: 使用 (c << 5) | (c << 2) | (c >> 1) 扩展
// ============================================================
function decodeCRAM_Extend(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word >> 0) & 7;
  const g = (word >> 3) & 7;
  const b = (word >> 6) & 7;
  
  const expand = c => (c << 5) | (c << 2) | (c >> 1);
  
  return {
    r: expand(r),
    g: expand(g),
    b: expand(b),
  };
}

// ============================================================
// 方式2: 使用 (c / 7) * 255
// ============================================================
function decodeCRAM_Float(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word >> 0) & 7;
  const g = (word >> 3) & 7;
  const b = (word >> 6) & 7;
  
  const scale = c => Math.round((c / 7) * 255);
  
  return {
    r: scale(r),
    g: scale(g),
    b: scale(b),
  };
}

// ============================================================
// 方式3: 使用不同的位域排列
// ============================================================
function decodeCRAM_BGR(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 6) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 0) & 7) * 36,
  };
}

function decodeCRAM_RGB(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

// ============================================================
// 方式4: 考虑 R0 在高字节
// ============================================================
function decodeCRAM_R0High(i) {
  const lo = cram[i * 2];
  const hi = cram[i * 2 + 1];
  const r2r1 = lo & 3;
  const g = (lo >> 2) & 7;
  const b = (lo >> 5) & 7;
  const r0 = (hi >> 7) & 1;
  const r = r2r1 | (r0 << 2);
  
  return {
    r: r * 36,
    g: g * 36,
    b: b * 36,
  };
}

// ============================================================
// 渲染函数
// ============================================================
function render(decodeFn, name, palOffsets) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(i);

  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(tx, ty);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = decodeFn(palOffsets[e.palette] + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  
  const OUT_PATH = join(ROOT, `src/langrisser2/20260713/output/title-${name}.png`);
  writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
  console.log(`✅ 输出: ${OUT_PATH}`);
  
  return OUT_PATH;
}

// ============================================================
// 测试不同方式
// ============================================================
const PAL_OFFSETS = [0, 16, 4, 48];

console.log('=== 测试不同颜色映射方式 ===\n');

// 方式1: 扩展映射
console.log('方式1: 位扩展映射');
render(decodeCRAM_Extend, 'extend', PAL_OFFSETS);

// 方式2: 浮点映射
console.log('方式2: 浮点映射');
render(decodeCRAM_Float, 'float', PAL_OFFSETS);

// 方式3: BGR顺序
console.log('方式3: BGR顺序');
render(decodeCRAM_BGR, 'bgr-order', PAL_OFFSETS);

// 方式4: RGB顺序
console.log('方式4: RGB顺序');
render(decodeCRAM_RGB, 'rgb-order', PAL_OFFSETS);

// 方式5: R0在高字节
console.log('方式5: R0在高字节');
render(decodeCRAM_R0High, 'r0-high', PAL_OFFSETS);

// ============================================================
// 分析标题区域的颜色差异
// ============================================================
console.log('\n=== 分析标题区域颜色 ===');

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const width = bmpBuf.readInt32LE(18);
const height = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((width * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = height > 0 ? (height - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return {
    r: bmpBuf[srcOff + 2],
    g: bmpBuf[srcOff + 1],
    b: bmpBuf[srcOff + 0],
  };
}

// 获取标题区域的平均颜色
function getTitleAvgColor() {
  let r = 0, g = 0, b = 0, count = 0;
  for (let ty = 8; ty < 12; ty++) {
    for (let tx = 6; tx < 34; tx++) {
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const scrColor = getScreenshotPixel(tx * 8 + px, ty * 8 + py);
          r += scrColor.r;
          g += scrColor.g;
          b += scrColor.b;
          count++;
        }
      }
    }
  }
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

const titleAvg = getTitleAvgColor();
console.log(`标题区域平均颜色: rgb(${titleAvg.r},${titleAvg.g},${titleAvg.b})`);

// ============================================================
// 穷举所有可能的 CRAM 映射，找到能产生标题颜色的组合
// ============================================================
console.log('\n=== 穷举标题颜色匹配 ===');

// 标题区域主要使用 pal2，让我们看看哪个 CRAM 位置能产生接近截图的颜色
for (let i = 0; i < 64; i++) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  
  // 尝试不同的位域排列
  const colors = [
    { name: 'LE+BGR', r: ((word >> 0) & 7) * 36, g: ((word >> 3) & 7) * 36, b: ((word >> 6) & 7) * 36 },
    { name: 'LE+RGB', r: ((word >> 6) & 7) * 36, g: ((word >> 3) & 7) * 36, b: ((word >> 0) & 7) * 36 },
    { name: 'BE+BGR', r: ((word >> 8) & 7) * 36, g: ((word >> 11) & 7) * 36, b: ((word >> 14) & 7) * 36 },
    { name: 'BE+RGB', r: ((word >> 14) & 7) * 36, g: ((word >> 11) & 7) * 36, b: ((word >> 8) & 7) * 36 },
  ];
  
  for (const c of colors) {
    // 检查是否接近标题颜色 (偏蓝紫)
    if (c.b > 50 && c.b > c.r && c.b > c.g) {
      console.log(`CRAM[${i}] word=0x${word.toString(16).padStart(4,'0')} ${c.name} = rgb(${c.r},${c.g},${c.b})`);
    }
  }
}
