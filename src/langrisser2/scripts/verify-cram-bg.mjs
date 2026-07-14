/**
 * 验证 CRAM 文件内容和背景色设置
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

console.log('=== CRAM 文件前 128 字节内容 ===');
for (let i = 0; i < 64; i++) {
  const byte0 = cram[i * 2];
  const byte1 = cram[i * 2 + 1];
  const wordLE = (byte1 << 8) | byte0;
  const wordBE = (byte0 << 8) | byte1;
  
  // LE+BGR 解码
  const r = ((wordLE >> 0) & 7) * 36;
  const g = ((wordLE >> 3) & 7) * 36;
  const b = ((wordLE >> 6) & 7) * 36;
  
  if (r > 0 || g > 0 || b > 0) {
    console.log(`CRAM[${i}]: bytes=[0x${byte0.toString(16).padStart(2,'0')},0x${byte1.toString(16).padStart(2,'0')}] LE=0x${wordLE.toString(16).padStart(4,'0')} BE=0x${wordBE.toString(16).padStart(4,'0')} rgb(${r},${g},${b})`);
  }
}

// ============================================================
// 检查背景色设置
// MD VDP R7 的 bit7-0 是背景色索引 (实际只用低6位)
// ============================================================
console.log('\n=== 检查背景色 ===');

// 如果 R7 = 0xD2，背景色索引 = 0xD2 & 0x3F = 0x12 = 18
const bgIndex = 0xD2 & 0x3F;
console.log(`R7 = 0xD2, 背景色索引 = ${bgIndex}`);

const bgWordLE = (cram[bgIndex * 2 + 1] << 8) | cram[bgIndex * 2];
const bgR = ((bgWordLE >> 0) & 7) * 36;
const bgG = ((bgWordLE >> 3) & 7) * 36;
const bgB = ((bgWordLE >> 6) & 7) * 36;
console.log(`CRAM[${bgIndex}] = rgb(${bgR},${bgG},${bgB})`);

// 但截图背景是 rgb(0,0,72)，让我们看看哪个 CRAM 位置产生这个颜色
console.log('\n搜索 rgb(0,0,72):');
for (let i = 0; i < 64; i++) {
  const wordLE = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = ((wordLE >> 0) & 7) * 36;
  const g = ((wordLE >> 3) & 7) * 36;
  const b = ((wordLE >> 6) & 7) * 36;
  if (r === 0 && g === 0 && b === 72) {
    console.log(`  CRAM[${i}] = rgb(${r},${g},${b})`);
  }
}

// ============================================================
// 关键发现: MD 的背景色是由 VDP 生成的，不使用 CRAM
// 背景色是一个独立的9位颜色值，直接存储在 R7 中
// ============================================================
console.log('\n=== MD 背景色真相 ===');
console.log('MD VDP R7 的 bit7-0 是背景色索引，指向 CRAM 中的颜色');
console.log('但 R7 的 bit7 可能有特殊用途');

// R7 = 0xD2 = binary 11010010
// bit7 = 1 (可能启用了某种特殊模式)
// bit6-0 = 0x52 = 82，这不是有效的 CRAM 索引

// ============================================================
// 尝试另一种解释: R7 的 bit7-0 直接是 8 位颜色值
// bit7-5 = 蓝色，bit4-2 = 绿色，bit1-0 = 红色 (缺 R0)
// ============================================================
console.log('\n=== 尝试 R7 直接作为颜色值 ===');
const r7Value = 0xD2;
const bgBlue = ((r7Value >> 5) & 7) * 36;
const bgGreen = ((r7Value >> 2) & 7) * 36;
const bgRed = ((r7Value >> 0) & 3) * 36;
console.log(`R7 = 0x${r7Value.toString(16)} = rgb(${bgRed},${bgGreen},${bgBlue})`);

// ============================================================
// 尝试不同的背景色索引
// ============================================================
console.log('\n=== 尝试不同的背景色索引 ===');
for (let i = 0; i < 64; i++) {
  const wordLE = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = ((wordLE >> 0) & 7) * 36;
  const g = ((wordLE >> 3) & 7) * 36;
  const b = ((wordLE >> 6) & 7) * 36;
  
  // 寻找接近截图背景色 rgb(0,0,72) 的颜色
  if (Math.abs(r) < 36 && Math.abs(g) < 36 && Math.abs(b - 72) < 36) {
    console.log(`  CRAM[${i}] = rgb(${r},${g},${b})`);
  }
}

// ============================================================
// 重新渲染: 使用 CRAM[4] 作为背景色，pal2[0] = CRAM[4]
// ============================================================
console.log('\n=== 重新渲染 ===');

function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

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

// 使用 pal2 偏移 = 4
const PAL_OFFSETS = [0, 16, 4, 48];

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
        const c = decodeCRAM(PAL_OFFSETS[e.palette] + ci);
        const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
        data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
      }
    }
  }
}
ctx.putImageData(imgData, 0, 0);

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-final.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`✅ 输出: ${OUT_PATH}`);

// ============================================================
// 对比截图验证关键区域
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

console.log('\n=== 关键区域对比 ===');

// 背景区域 (tile256)
const bgTile = decodeTile(256);
const bgColors = new Set();
for (let i = 0; i < 64; i++) bgColors.add(bgTile[i]);
console.log('tile256 使用的颜色索引:', Array.from(bgColors));
for (const ci of bgColors) {
  const c = decodeCRAM(PAL_OFFSETS[2] + ci);
  console.log(`  pal2[${ci}] = rgb(${c.r},${c.g},${c.b})`);
}

// 获取截图中背景区域的颜色
let scrBgR = 0, scrBgG = 0, scrBgB = 0, scrBgCount = 0;
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const scrColor = getScreenshotPixel(6 * 8 + px, 8 * 8 + py);
    scrBgR += scrColor.r; scrBgG += scrColor.g; scrBgB += scrColor.b; scrBgCount++;
  }
}
console.log(`截图背景平均: rgb(${Math.round(scrBgR/scrBgCount)},${Math.round(scrBgG/scrBgCount)},${Math.round(scrBgB/scrBgCount)})`);

// 标题字母区域
const letterTile = decodeTile(260);
const letterColors = new Set();
for (let i = 0; i < 64; i++) letterColors.add(letterTile[i]);
console.log('\ntile260 使用的颜色索引:', Array.from(letterColors));
for (const ci of letterColors) {
  const c = decodeCRAM(PAL_OFFSETS[2] + ci);
  console.log(`  pal2[${ci}] = rgb(${c.r},${c.g},${c.b})`);
}

// 获取截图中字母区域的颜色
let scrLetterR = 0, scrLetterG = 0, scrLetterB = 0, scrLetterCount = 0;
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const scrColor = getScreenshotPixel(10 * 8 + px, 8 * 8 + py);
    scrLetterR += scrColor.r; scrLetterG += scrColor.g; scrLetterB += scrColor.b; scrLetterCount++;
  }
}
console.log(`截图字母平均: rgb(${Math.round(scrLetterR/scrLetterCount)},${Math.round(scrLetterG/scrLetterCount)},${Math.round(scrLetterB/scrLetterCount)})`);
