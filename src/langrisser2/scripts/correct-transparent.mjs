/**
 * 正确的 MD 渲染方式：颜色索引0 = 背景色（透明）
 * 
 * MD VDP 渲染规则：
 * - 颜色索引0 在所有调色板中都是透明的
 * - 透明像素显示背景色（由 VDP 寄存器 R7 决定）
 * - R7 的 bit7-0 = 背景色索引，指向 CRAM 中的颜色
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
// 正确的 CRAM 解码
// byte0 = {B2 B1 B0 G2 G1 G0 R2 R1}
// byte1 = {R0 | 7位填充}
// ============================================================
function decodeCRAM(i) {
  const byte0 = cram[i * 2];
  const byte1 = cram[i * 2 + 1];
  
  const b = (byte0 >> 5) & 7;
  const g = (byte0 >> 2) & 7;
  const r2r1 = byte0 & 3;
  const r0 = (byte1 >> 7) & 1;
  const r = r2r1 | (r0 << 2);
  
  return {
    r: r * 36,
    g: g * 36,
    b: b * 36,
  };
}

// ============================================================
// 背景色设置
// ============================================================
// 从汇编代码得知 R7 = 0xD2
const R7_VALUE = 0xD2;
const BG_INDEX = R7_VALUE & 0x3F; // 背景色索引 = 0x12 = 18
const bgColor = decodeCRAM(BG_INDEX);

console.log(`=== 背景色 ===`);
console.log(`R7 = 0x${R7_VALUE.toString(16)}`);
console.log(`背景色索引 = ${BG_INDEX}`);
console.log(`背景色 = rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

// ============================================================
// 平面优先 tile 解码
// ============================================================
function decodeTilePlane(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + y + 8];
    const p2 = vram[offset + y + 16];
    const p3 = vram[offset + y + 24];
    
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

// ============================================================
// Nametable 解析
// ============================================================
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
// 渲染：颜色索引0 = 背景色
// ============================================================
const canvas = createCanvas(320, 224);
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(320, 224);
const data = imgData.data;

// 先填充背景色
for (let i = 0; i < data.length; i += 4) {
  data[i] = bgColor.r;
  data[i + 1] = bgColor.g;
  data[i + 2] = bgColor.b;
  data[i + 3] = 255;
}

// 渲染 Plane A
const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) tileCache[i] = decodeTilePlane(i);

const PAL_OFFSETS = [0, 16, 32, 48];

for (let ty = 0; ty < 28; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const e = readNametableEntry(tx, ty);
    const tp = tileCache[e.tileIdx] || tileCache[0];
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const srcX = e.hflip ? (7 - px) : px;
        const srcY = e.vflip ? (7 - py) : py;
        const ci = tp[srcY * 8 + srcX];
        
        // 颜色索引0 = 透明 = 背景色（已经填充了，不需要修改）
        // 其他颜色索引 = CRAM 中的颜色
        if (ci !== 0) {
          const c = decodeCRAM(PAL_OFFSETS[e.palette] + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r;
          data[di + 1] = c.g;
          data[di + 2] = c.b;
          data[di + 3] = 255;
        }
      }
    }
  }
}

ctx.putImageData(imgData, 0, 0);

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-correct-transparent.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

// ============================================================
// 对比截图验证
// ============================================================
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

console.log('\n=== 对比截图验证 ===');

// 背景区域
let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const scrColor = getScreenshotPixel(6 * 8 + px, 8 * 8 + py);
    bgR += scrColor.r; bgG += scrColor.g; bgB += scrColor.b; bgCount++;
  }
}
console.log(`截图背景区域: rgb(${Math.round(bgR/bgCount)},${Math.round(bgG/bgCount)},${Math.round(bgB/bgCount)})`);
console.log(`渲染背景色: rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

// 标题字母区域
let letterR = 0, letterG = 0, letterB = 0, letterCount = 0;
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const scrColor = getScreenshotPixel(10 * 8 + px, 8 * 8 + py);
    letterR += scrColor.r; letterG += scrColor.g; letterB += scrColor.b; letterCount++;
  }
}
console.log(`截图字母区域: rgb(${Math.round(letterR/letterCount)},${Math.round(letterG/letterCount)},${Math.round(letterB/letterCount)})`);

// 获取渲染图像中对应位置的颜色
const renderedImgData = ctx.getImageData(6 * 8, 8 * 8, 8, 8);
const rd = renderedImgData.data;
let renderBgR = 0, renderBgG = 0, renderBgB = 0;
for (let i = 0; i < rd.length; i += 4) {
  renderBgR += rd[i]; renderBgG += rd[i+1]; renderBgB += rd[i+2];
}
console.log(`渲染背景区域: rgb(${Math.round(renderBgR/64)},${Math.round(renderBgG/64)},${Math.round(renderBgB/64)})`);

const renderedLetterData = ctx.getImageData(10 * 8, 8 * 8, 8, 8);
const rld = renderedLetterData.data;
let renderLetterR = 0, renderLetterG = 0, renderLetterB = 0;
for (let i = 0; i < rld.length; i += 4) {
  renderLetterR += rld[i]; renderLetterG += rld[i+1]; renderLetterB += rld[i+2];
}
console.log(`渲染字母区域: rgb(${Math.round(renderLetterR/64)},${Math.round(renderLetterG/64)},${Math.round(renderLetterB/64)})`);
