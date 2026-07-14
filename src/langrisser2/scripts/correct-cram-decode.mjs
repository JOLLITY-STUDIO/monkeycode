/**
 * 使用正确的 MD CRAM 位域排列解码
 * 
 * MD CRAM 格式:
 * - 每个颜色 9 位: R2R1R0 G2G1G0 B2B1B0
 * - 存储为 2 字节:
 *   byte0 = B2 B1 B0 G2 G1 G0 R2 R1
 *   byte1 = R0 | 7位填充 (通常为0)
 * 
 * 所以:
 * B = (byte0 >> 5) & 7
 * G = (byte0 >> 2) & 7  
 * R = ((byte0 >> 0) & 3) | ((byte1 >> 7) & 1) << 2
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
// 正确的 MD CRAM 解码
// ============================================================
function decodeCRAM_Correct(i) {
  const byte0 = cram[i * 2];
  const byte1 = cram[i * 2 + 1];
  
  const b = (byte0 >> 5) & 7;
  const g = (byte0 >> 2) & 7;
  const r2r1 = byte0 & 3;
  const r0 = (byte1 >> 7) & 1;
  const r = r2r1 | (r0 << 2);
  
  // 映射到 256 级
  const scale = c => c * 36;
  
  return {
    r: scale(r),
    g: scale(g),
    b: scale(b),
  };
}

// ============================================================
// 测试解码结果
// ============================================================
console.log('=== 正确 CRAM 解码 ===');

console.log('调色板0 (CRAM[0-15]):');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_Correct(i);
  console.log(`  pal0[${i}] = rgb(${c.r},${c.g},${c.b})`);
}

console.log('\n调色板2 (CRAM[32-47]):');
for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_Correct(i);
  console.log(`  pal2[${i-32}] = rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 检查背景色
// ============================================================
console.log('\n=== 检查背景色 ===');
const bgIndex = 0xD2 & 0x3F; // R7 = 0xD2
console.log(`背景色索引 = ${bgIndex}`);
const bgColor = decodeCRAM_Correct(bgIndex);
console.log(`CRAM[${bgIndex}] = rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

// ============================================================
// 渲染
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

// 标准调色板布局: pal0=CRAM[0-15], pal1=CRAM[16-31], pal2=CRAM[32-47], pal3=CRAM[48-63]
const PAL_OFFSETS = [0, 16, 32, 48];

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
        const c = decodeCRAM_Correct(PAL_OFFSETS[e.palette] + ci);
        const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
        data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
      }
    }
  }
}
ctx.putImageData(imgData, 0, 0);

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-correct-cram.png');
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
const bgTile = decodeTile(256);
const bgColors = new Set();
for (let i = 0; i < 64; i++) bgColors.add(bgTile[i]);
console.log('tile256 使用的颜色索引:', Array.from(bgColors));
for (const ci of bgColors) {
  const c = decodeCRAM_Correct(PAL_OFFSETS[2] + ci);
  console.log(`  pal2[${ci}] = rgb(${c.r},${c.g},${c.b})`);
}

let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const scrColor = getScreenshotPixel(6 * 8 + px, 8 * 8 + py);
    bgR += scrColor.r; bgG += scrColor.g; bgB += scrColor.b; bgCount++;
  }
}
console.log(`截图背景平均: rgb(${Math.round(bgR/bgCount)},${Math.round(bgG/bgCount)},${Math.round(bgB/bgCount)})`);

// 标题字母区域
const letterTile = decodeTile(260);
const letterColors = new Set();
for (let i = 0; i < 64; i++) letterColors.add(letterTile[i]);
console.log('\ntile260 使用的颜色索引:', Array.from(letterColors));
for (const ci of letterColors) {
  const c = decodeCRAM_Correct(PAL_OFFSETS[2] + ci);
  console.log(`  pal2[${ci}] = rgb(${c.r},${c.g},${c.b})`);
}

let letterR = 0, letterG = 0, letterB = 0, letterCount = 0;
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const scrColor = getScreenshotPixel(10 * 8 + px, 8 * 8 + py);
    letterR += scrColor.r; letterG += scrColor.g; letterB += scrColor.b; letterCount++;
  }
}
console.log(`截图字母平均: rgb(${Math.round(letterR/letterCount)},${Math.round(letterG/letterCount)},${Math.round(letterB/letterCount)})`);
