/**
 * 直接从截图提取正确的 CRAM 映射
 * 
 * 已知:
 *   - 标题使用调色板2
 *   - pal2[0] = 背景色 rgb(0,0,72)
 *   - pal2[1-3] = 红色渐变
 *   - pal2[4-...] = 其他颜色
 * 
 * LE+BGR方式下:
 *   CRAM[4] = rgb(0,0,72) ✓
 *   CRAM[33] = rgb(72,0,0) ✓
 *   CRAM[34] = rgb(144,0,0) ✓
 *   CRAM[35] = rgb(216,0,0) ✓
 * 
 * 但 CRAM[32] (标准pal2[0]) = rgb(0,0,0) ✗
 * 
 * 结论: CRAM 布局不是标准的 pal0[0-15], pal1[0-15], pal2[0-15], pal3[0-15]
 * 可能是其他顺序!
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

// LE+BGR 解码
function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

// ============================================================
// 分析：如果 pal2[0] = rgb(0,0,72)，那么 pal2[0] 应该对应 CRAM[4]
// 也就是说调色板的颜色索引是偏移的
// ============================================================
console.log('=== 分析调色板偏移 ===');

// 假设: pal2[0] = CRAM[4 + offset]
// pal2[0] 需要 rgb(0,0,72), CRAM[4] = rgb(0,0,72)
// 所以 offset = 0 时, pal2[0] = CRAM[4]

// 但 pal2[1] 需要 rgb(72,0,0), CRAM[33] = rgb(72,0,0)
// 如果 pal2[1] = CRAM[4 + 1 + offset], 那 4+1+offset = 33 → offset = 28

// 这不对...

// 另一个假设: 每个调色板的CRAM偏移不同
// pal0[0] = CRAM[0 + offset0]
// pal1[0] = CRAM[16 + offset1]
// pal2[0] = CRAM[32 + offset2]
// pal3[0] = CRAM[48 + offset3]

// 如果 pal2[0] = rgb(0,0,72) = CRAM[4]
// 那么 32 + offset2 = 4 → offset2 = -28

// ============================================================
// 尝试: Gens 的 CRAM dump 是按颜色索引顺序存储的
// 而不是按调色板顺序存储的
// ============================================================
console.log('\n=== 尝试按颜色索引顺序存储 ===');
// 正常: pal0[0], pal0[1], ..., pal0[15], pal1[0], ...
// 可能: color0 of all palettes, color1 of all palettes, ...

function getColorByIndexOrder(pal, color) {
  const idx = pal + color * 4;
  return decodeCRAM(idx);
}

console.log('按颜色索引顺序:');
for (let c = 0; c < 16; c++) {
  const p0 = getColorByIndexOrder(0, c);
  const p2 = getColorByIndexOrder(2, c);
  console.log(`  color ${c}: pal0=rgb(${p0.r},${p0.g},${p0.b}) pal2=rgb(${p2.r},${p2.g},${p2.b})`);
}

// ============================================================
// 尝试: CRAM 只有前64字节有效 (64色 × 1字节)
// 每字节存一个颜色的8位
// ============================================================
console.log('\n=== 尝试单字节模式 ===');
function decodeSingleByte(i) {
  const byte = cram[i];
  return {
    r: ((byte >> 0) & 7) * 36,
    g: ((byte >> 3) & 7) * 36,
    b: ((byte >> 6) & 1) * 36,
  };
}

console.log('前64个单字节颜色:');
for (let i = 0; i < 64; i++) {
  const c = decodeSingleByte(i);
  if (c.r > 0 || c.g > 0 || c.b > 0) {
    console.log(`  CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
  }
}

// ============================================================
// 尝试: CRAM 每2字节存一个颜色, 但位域不同
// 让我们查看 CRAM[4] 和 CRAM[32] 的差异
// ============================================================
console.log('\n=== CRAM[4] vs CRAM[32] ===');
console.log(`CRAM[4] 字节: [0x${cram[8].toString(16).padStart(2,'0')}, 0x${cram[9].toString(16).padStart(2,'0')}]`);
console.log(`CRAM[32] 字节: [0x${cram[64].toString(16).padStart(2,'0')}, 0x${cram[65].toString(16).padStart(2,'0')}]`);

const w4 = (cram[9] << 8) | cram[8];
const w32 = (cram[65] << 8) | cram[64];
console.log(`CRAM[4] LE word: 0x${w4.toString(16).padStart(4,'0')}`);
console.log(`CRAM[32] LE word: 0x${w32.toString(16).padStart(4,'0')}`);

// ============================================================
// 关键发现: Gens 的 CRAM dump 格式可能是:
// 每个颜色存为一个16位字, 格式是 { 7位填充 | B2 B1 B0 G2 G1 G0 R2 R1 }
// R0 在字的 bit8 位置!
// ============================================================
console.log('\n=== 关键测试: R0 在 bit8 ===');

function decodeR0Bit8(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  // bit8 = R0, bit7-0 = B2 B1 B0 G2 G1 G0 R2 R1
  const r0 = (word >> 8) & 1;
  const r2r1 = word & 3;
  const g = (word >> 2) & 7;
  const b = (word >> 5) & 7;
  const r = (r2r1 | (r0 << 2));
  return { r: r * 36, g: g * 36, b: b * 36 };
}

console.log('R0在bit8格式:');
console.log('调色板0:');
for (let i = 0; i < 16; i++) {
  const c = decodeR0Bit8(i);
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
}
console.log('调色板2:');
for (let i = 32; i < 48; i++) {
  const c = decodeR0Bit8(i);
  console.log(`  [${i-32}] rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 测试: 用这个新格式渲染
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

function renderPlane(colorFn) {
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

const palNew = [];
for (let i = 0; i < 64; i++) palNew.push(decodeR0Bit8(i));

const canvas = renderPlane(i => palNew[i]);
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-r0-bit8.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

// ============================================================
// 另一个思路: 直接用截图颜色校准 CRAM 映射
// 我们知道标题画面中每个位置应该是什么颜色
// ============================================================
console.log('\n=== 截图颜色校准 ===');

// 读取截图
const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const width = bmpBuf.readInt32LE(18);
const height = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((width * 3 + 3) >> 2) * 4;

// 获取截图中某个tile位置的平均颜色
function getScreenshotTileColor(tx, ty) {
  let r = 0, g = 0, b = 0, count = 0;
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const sx = tx * 8 + px;
      const sy = ty * 8 + py;
      if (sx >= width || sy >= height) continue;
      const srcY = height > 0 ? (height - 1 - sy) : sy;
      const srcOff = dataOffset + srcY * rowSize + sx * 3;
      r += bmpBuf[srcOff + 2];
      g += bmpBuf[srcOff + 1];
      b += bmpBuf[srcOff + 0];
      count++;
    }
  }
  return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) };
}

// 找到标题区域的tile (ty=8-15)
console.log('标题区域 tile 颜色:');
for (let ty = 8; ty < 12; ty++) {
  for (let tx = 6; tx < 10; tx++) {
    const entry = readNametableEntry(tx, ty);
    const screenshotColor = getScreenshotTileColor(tx, ty);
    console.log(`  [tx=${tx},ty=${ty}] tile=${entry.tileIdx} pal=${entry.palette} screenshot=rgb(${screenshotColor.r},${screenshotColor.g},${screenshotColor.b})`);
  }
}
