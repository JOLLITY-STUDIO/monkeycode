/**
 * 分析 tile 256 的颜色索引，确定 pal2 的正确映射
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

// ============================================================
// 分析 tile 256 (截图确认是背景色)
// ============================================================
const tile256 = decodeTile(256);
console.log('=== Tile 256 颜色索引分析 ===');

const colorCounts = new Array(16).fill(0);
for (let i = 0; i < 64; i++) {
  colorCounts[tile256[i]]++;
}

console.log('颜色索引分布:');
for (let i = 0; i < 16; i++) {
  if (colorCounts[i] > 0) {
    console.log(`  颜色${i}: ${colorCounts[i]}个像素`);
  }
}

// 如果 tile256 主要是颜色索引0，那么 pal2[0] = rgb(0,0,72)
// 但 CRAM[32] = rgb(0,0,0)，所以一定有其他映射方式

// ============================================================
// 关键测试: 尝试所有可能的 palette 映射方式
// ============================================================
console.log('\n=== 尝试不同的 palette→CRAM 映射 ===');

// LE+BGR 解码
function decodeCRAM_LE_BGR(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

// 方式1: 标准映射 palN[C] → CRAM[N*16 + C]
console.log('\n方式1: 标准映射 palN[C] → CRAM[N*16 + C]');
for (let p = 0; p < 4; p++) {
  const c0 = decodeCRAM_LE_BGR(p * 16);
  console.log(`  pal${p}[0] = rgb(${c0.r},${c0.g},${c0.b})`);
}

// 方式2: 颜色索引优先 palN[C] → CRAM[C*4 + N]
console.log('\n方式2: 颜色索引优先 palN[C] → CRAM[C*4 + N]');
for (let p = 0; p < 4; p++) {
  const c0 = decodeCRAM_LE_BGR(0 * 4 + p);
  console.log(`  pal${p}[0] = rgb(${c0.r},${c0.g},${c0.b})`);
}

// 方式3: 每个调色板从不同CRAM位置开始
// pal0[0] = CRAM[0], pal1[0] = CRAM[16], pal2[0] = CRAM[32], pal3[0] = CRAM[48]
// 但 pal2[0] 需要 rgb(0,0,72) = CRAM[4]
// 所以 pal2 可能从 CRAM[4] 开始
console.log('\n方式3: 调色板偏移');
const offsets = [0, 16, 4, 48]; // pal0, pal1, pal2, pal3 的CRAM起始偏移
for (let p = 0; p < 4; p++) {
  const c0 = decodeCRAM_LE_BGR(offsets[p]);
  console.log(`  pal${p}[0] (CRAM[${offsets[p]}]) = rgb(${c0.r},${c0.g},${c0.b})`);
}

// ============================================================
// 方式4: 尝试所有可能的CRAM偏移，找到能匹配截图的
// ============================================================
console.log('\n=== 方式4: 穷举 pal2 偏移 ===');

// tile256 使用的颜色索引
const usedColors = [];
for (let i = 0; i < 16; i++) {
  if (colorCounts[i] > 0) usedColors.push(i);
}
console.log(`tile256 使用的颜色索引: ${usedColors}`);

// 截图显示这个tile是背景色 rgb(0,0,72)
// 所以至少有一个颜色索引对应 rgb(0,0,72)
const targetColor = { r: 0, g: 0, b: 72 };

for (let offset = 0; offset < 64; offset++) {
  let match = false;
  for (const ci of usedColors) {
    const c = decodeCRAM_LE_BGR(offset + ci);
    if (c.r === targetColor.r && c.g === targetColor.g && c.b === targetColor.b) {
      match = true;
      console.log(`  pal2 偏移=${offset}: pal2[${ci}] = rgb(${c.r},${c.g},${c.b}) ✓ 匹配背景色`);
    }
  }
}

// ============================================================
// 方式5: 直接用截图颜色反向推导CRAM映射
// ============================================================
console.log('\n=== 方式5: 反向推导 ===');

// 读取截图
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

// 获取 tile256 在截图中的像素颜色
// tile256 位于 tx=6, ty=8，所以屏幕坐标是 (6*8, 8*8) = (48, 64)
console.log('\ntile256 截图像素分析:');
const pixelColors = {};
for (let py = 0; py < 8; py++) {
  for (let px = 0; px < 8; px++) {
    const screenX = 6 * 8 + px;
    const screenY = 8 * 8 + py;
    const scrColor = getScreenshotPixel(screenX, screenY);
    const idx = tile256[py * 8 + px];
    if (!pixelColors[idx]) pixelColors[idx] = [];
    pixelColors[idx].push(scrColor);
  }
}

for (const [idx, colors] of Object.entries(pixelColors)) {
  const avgR = Math.round(colors.reduce((sum, c) => sum + c.r, 0) / colors.length);
  const avgG = Math.round(colors.reduce((sum, c) => sum + c.g, 0) / colors.length);
  const avgB = Math.round(colors.reduce((sum, c) => sum + c.b, 0) / colors.length);
  console.log(`  颜色索引${idx}: 平均 rgb(${avgR},${avgG},${avgB}) (${colors.length}个像素)`);
}

// 现在我们知道:
// tile256 颜色索引0 → 截图平均颜色
// 需要找到 CRAM 映射使得 decodeCRAM(pal2_base + idx) = 截图颜色

// ============================================================
// 方式6: Gens CRAM dump 的实际格式
// Gens 的 CRAM dump 可能是按调色板存储的，但字节序或位域不同
// ============================================================
console.log('\n=== 方式6: 重新分析 Gens CRAM dump 格式 ===');

// Gens 源码中 CRAM 的存储方式:
// - CRAM 是 64 个颜色，每个颜色 9 位
// - 在 Gens 中，每个颜色存为 16 位字
// - 格式可能是: { B2 B1 B0 G2 G1 G0 R2 R1 } 低8位, { R0 | 7位填充 } 高8位

function decodeGensCRAM(i) {
  const lo = cram[i * 2];
  const hi = cram[i * 2 + 1];
  const r2r1 = lo & 3;
  const g = (lo >> 2) & 7;
  const b = (lo >> 5) & 7;
  const r0 = (hi >> 7) & 1;
  const r = r2r1 | (r0 << 2);
  return { r: r * 36, g: g * 36, b: b * 36 };
}

console.log('Gens格式解码:');
console.log('调色板0:');
for (let i = 0; i < 16; i++) {
  const c = decodeGensCRAM(i);
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
}
console.log('调色板2:');
for (let i = 32; i < 48; i++) {
  const c = decodeGensCRAM(i);
  console.log(`  [${i-32}] rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 方式7: 最可能的正确方案
// Gens CRAM dump 中，每个颜色是 2 字节，但存储顺序是:
// byte0 = { R0 | 7位填充 }
// byte1 = { B2 B1 B0 G2 G1 G0 R2 R1 }
// ============================================================
console.log('\n=== 方式7: 交换字节顺序 ===');

function decodeCRAM_Swapped(i) {
  const byte0 = cram[i * 2];
  const byte1 = cram[i * 2 + 1];
  const r0 = (byte0 >> 7) & 1;
  const r2r1 = byte1 & 3;
  const g = (byte1 >> 2) & 7;
  const b = (byte1 >> 5) & 7;
  const r = r2r1 | (r0 << 2);
  return { r: r * 36, g: g * 36, b: b * 36 };
}

console.log('交换字节格式解码:');
console.log('调色板0:');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_Swapped(i);
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
}
console.log('调色板2:');
for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_Swapped(i);
  console.log(`  [${i-32}] rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 方式8: 检查 CRAM 文件大小
// ============================================================
console.log('\n=== CRAM 文件信息 ===');
console.log(`CRAM 文件大小: ${cram.length} 字节`);
console.log(`CRAM 颜色数量: ${cram.length / 2}`);

// 如果 CRAM 是 128 字节，那就是 64 个颜色，每个 2 字节
// 但 Gens 的 CRAM 可能是 64 字节，每个颜色 1 字节 (只存8位，R0丢失)
if (cram.length === 128) {
  console.log('CRAM 是标准的 64色 × 2字节格式');
} else if (cram.length === 64) {
  console.log('CRAM 是 64色 × 1字节格式');
}

// ============================================================
// 终极测试: 用所有可能的方式渲染，对比截图
// ============================================================
function renderAndCompare(decodeFn, name) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(i);

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
          const c = decodeFn(palBase + ci);
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
}

console.log('\n=== 渲染测试 ===');
renderAndCompare(decodeCRAM_LE_BGR, 'le-bgr');
renderAndCompare(decodeGensCRAM, 'gens');
renderAndCompare(decodeCRAM_Swapped, 'swapped');
