/**
 * 使用 LE+BGR 位域排列和标准调色板布局渲染
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
// LE+BGR 解码
// byte0 = {B2 B1 B0 G2 G1 G0 R2 R1}
// byte1 = {R0 | 7位填充}
// ============================================================
function decodeCRAM_LE_BGR(i) {
  const byte0 = cram[i * 2];
  const byte1 = cram[i * 2 + 1];
  
  // 从 byte0 提取
  const b = (byte0 >> 5) & 7;
  const g = (byte0 >> 2) & 7;
  const r2r1 = byte0 & 3;
  
  // 从 byte1 提取 R0
  const r0 = (byte1 >> 7) & 1;
  const r = r2r1 | (r0 << 2);
  
  return {
    r: r * 36,
    g: g * 36,
    b: b * 36,
  };
}

// ============================================================
// 测试解码
// ============================================================
console.log('=== LE+BGR 解码 ===');

console.log('调色板0 (CRAM[0-15]):');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_LE_BGR(i);
  console.log(`  pal0[${i}] = rgb(${c.r},${c.g},${c.b})`);
}

console.log('\n调色板2 (CRAM[32-47]):');
for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_LE_BGR(i);
  console.log(`  pal2[${i-32}] = rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 关键检查: 背景色
// ============================================================
console.log('\n=== 背景色检查 ===');

// MD R7 = 0xD2, 背景色索引 = 0xD2 & 0x3F = 0x12 = 18
const bgIndex = 0xD2 & 0x3F;
console.log(`背景色索引 = ${bgIndex}`);
const bgColor = decodeCRAM_LE_BGR(bgIndex);
console.log(`CRAM[${bgIndex}] = rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

// 搜索截图背景色 rgb(0,0,72)
console.log('\n搜索 rgb(0,0,72):');
for (let i = 0; i < 64; i++) {
  const c = decodeCRAM_LE_BGR(i);
  if (c.r === 0 && c.g === 0 && c.b === 72) {
    console.log(`  CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
  }
}

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
// 检查 tile 256 和 260 的颜色
// ============================================================
console.log('\n=== tile 颜色检查 ===');

const t256 = decodeTilePlane(256);
console.log('tile256 颜色索引:', Array.from(new Set(t256)));

const t260 = decodeTilePlane(260);
console.log('tile260 颜色索引:', Array.from(new Set(t260)));

// ============================================================
// 渲染测试
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

function render(palOffsets, name) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTilePlane(i);

  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(tx, ty);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = decodeCRAM_LE_BGR(palOffsets[e.palette] + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  
  const OUT_PATH = join(ROOT, `src/langrisser2/20260713/output/title-${name}.png`);
  writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
  console.log(`\n✅ 输出: ${OUT_PATH}`);
}

// 方式1: 标准布局
console.log('\n=== 方式1: 标准布局 ===');
render([0, 16, 32, 48], 'le-bgr-standard');

// 方式2: pal2 从 CRAM[4] 开始
console.log('\n=== 方式2: pal2 从 CRAM[4] 开始 ===');
render([0, 16, 4, 48], 'le-bgr-pal2-cram4');

// 方式3: 背景色填充整个屏幕
console.log('\n=== 方式3: 背景色填充 ===');
const bgCanvas = createCanvas(320, 224);
const bgCtx = bgCanvas.getContext('2d');
const bgImgData = bgCtx.createImageData(320, 224);
const bgData = bgImgData.data;

// 使用 CRAM[4] = rgb(0,0,72) 作为背景
const bgC = decodeCRAM_LE_BGR(4);
for (let i = 0; i < bgData.length; i += 4) {
  bgData[i] = bgC.r;
  bgData[i + 1] = bgC.g;
  bgData[i + 2] = bgC.b;
  bgData[i + 3] = 255;
}

// 然后渲染 tile
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
        // 如果颜色索引不是0，才绘制
        if (ci !== 0) {
          const c = decodeCRAM_LE_BGR(PAL_OFFSETS[e.palette] + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          bgData[di] = c.r; bgData[di+1] = c.g; bgData[di+2] = c.b; bgData[di+3] = 255;
        }
      }
    }
  }
}
bgCtx.putImageData(bgImgData, 0, 0);

const BG_OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-bg-cram4.png');
writeFileSync(BG_OUT_PATH, bgCanvas.toBuffer('image/png'));
console.log(`✅ 输出: ${BG_OUT_PATH}`);
