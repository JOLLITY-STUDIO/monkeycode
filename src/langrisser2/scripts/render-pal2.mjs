/**
 * 使用 pal2[0] = CRAM[4] 的偏移来渲染
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

console.log(`CRAM 大小: ${cram.length} 字节 = ${cram.length / 2} 颜色`);

// ============================================================
// 方式: 每个调色板的颜色存储在 CRAM 的不同位置
// pal2[0] = CRAM[4] = rgb(0,0,72) ✓
// 假设每个调色板有 64 个颜色（因为 4*64=256）
// ============================================================

// LE+BGR 解码
function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

// 尝试: 每个调色板 64 个颜色，每个颜色在 CRAM 中占 4 个位置（每个调色板一个）
// pal0[N] = CRAM[N * 4 + 0]
// pal1[N] = CRAM[N * 4 + 1]
// pal2[N] = CRAM[N * 4 + 2]
// pal3[N] = CRAM[N * 4 + 3]

function getColor(palette, colorIdx) {
  return decodeCRAM(colorIdx * 4 + palette);
}

console.log('\n=== 测试每个调色板的颜色0 ===');
for (let p = 0; p < 4; p++) {
  const c = getColor(p, 0);
  console.log(`  pal${p}[0] = rgb(${c.r},${c.g},${c.b})`);
}

console.log('\n=== 测试调色板2的颜色 ===');
for (let i = 0; i < 16; i++) {
  const c = getColor(2, i);
  console.log(`  pal2[${i}] = rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 渲染测试
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

function renderPlane() {
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
          const c = getColor(e.palette, ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

const canvas = renderPlane();
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-pal2-offset.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

// ============================================================
// 验证其他颜色索引
// ============================================================
console.log('\n=== 验证其他 tile 的颜色 ===');

// tile 257 在截图中不是背景色，看看它用什么颜色索引
const tile257 = decodeTile(257);
const colorCounts257 = new Array(16).fill(0);
for (let i = 0; i < 64; i++) {
  colorCounts257[tile257[i]]++;
}
console.log('tile257 颜色索引分布:');
for (let i = 0; i < 16; i++) {
  if (colorCounts257[i] > 0) {
    const c = getColor(2, i);
    console.log(`  颜色${i}: ${colorCounts257[i]}个像素 → rgb(${c.r},${c.g},${c.b})`);
  }
}
