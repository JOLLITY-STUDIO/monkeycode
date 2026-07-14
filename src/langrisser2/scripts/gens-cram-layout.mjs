/**
 * Gens CRAM dump 可能每个调色板有 64 个颜色
 * pal0 = CRAM[0-63], pal1 = CRAM[64-127], pal2 = CRAM[128-191], pal3 = CRAM[192-255]
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

// 正确的 CRAM 解码
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
// 检查每个调色板64色布局
// ============================================================
console.log('=== 每个调色板64色布局 ===');

const palettes = ['pal0', 'pal1', 'pal2', 'pal3'];
for (let p = 0; p < 4; p++) {
  const base = p * 64;
  console.log(`\n${palettes[p]} (CRAM[${base}-${base+63}]):`);
  
  // 只打印前16个颜色
  for (let i = 0; i < 16; i++) {
    const c = decodeCRAM(base + i);
    console.log(`  ${palettes[p]}[${i}] = rgb(${c.r},${c.g},${c.b})`);
  }
}

// ============================================================
// 检查背景色
// ============================================================
console.log('\n=== 背景色检查 ===');

// 尝试不同的背景色索引
for (let i = 0; i < 64; i++) {
  const c = decodeCRAM(i);
  if (c.r === 0 && c.g === 0 && c.b === 72) {
    console.log(`CRAM[${i}] = rgb(${c.r},${c.g},${c.b}) ✓ 匹配截图背景色`);
  }
}

// ============================================================
// 渲染测试：每个调色板64色
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

// 每个调色板64色布局
const PAL_OFFSETS = [0, 64, 128, 192];

// 搜索背景色 rgb(0,0,72) 在 pal2 中的位置
console.log('\n=== 搜索 pal2 中接近背景色的颜色 ===');
for (let i = 0; i < 64; i++) {
  const c = decodeCRAM(PAL_OFFSETS[2] + i);
  if (c.r < 36 && c.g < 36 && Math.abs(c.b - 72) < 36) {
    console.log(`pal2[${i}] = rgb(${c.r},${c.g},${c.b})`);
  }
}

// ============================================================
// 尝试另一种布局：Gens 将每个调色板的每个颜色存储在不同位置
// color[0] = CRAM[0, 64, 128, 192]
// color[1] = CRAM[1, 65, 129, 193]
// ...
// ============================================================
console.log('\n=== 按颜色索引布局 ===');
for (let c = 0; c < 16; c++) {
  const colors = [];
  for (let p = 0; p < 4; p++) {
    colors.push(decodeCRAM(c + p * 64));
  }
  console.log(`color[${c}]: pal0=rgb(${colors[0].r},${colors[0].g},${colors[0].b}) pal1=rgb(${colors[1].r},${colors[1].g},${colors[1].b}) pal2=rgb(${colors[2].r},${colors[2].g},${colors[2].b}) pal3=rgb(${colors[3].r},${colors[3].g},${colors[3].b})`);
}

// ============================================================
// 渲染：使用标准布局但背景色使用 CRAM[20] = rgb(0,0,72)
// ============================================================
console.log('\n=== 渲染测试 ===');

// 背景色 = rgb(0,0,72) = CRAM[20]
const bgColor = decodeCRAM(20);
console.log(`背景色 = rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

const canvas = createCanvas(320, 224);
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(320, 224);
const data = imgData.data;

// 填充背景色
for (let i = 0; i < data.length; i += 4) {
  data[i] = bgColor.r;
  data[i + 1] = bgColor.g;
  data[i + 2] = bgColor.b;
  data[i + 3] = 255;
}

// 标准调色板布局
const STD_PAL_OFFSETS = [0, 16, 32, 48];

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
        if (ci !== 0) {
          const c = decodeCRAM(STD_PAL_OFFSETS[e.palette] + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
}
ctx.putImageData(imgData, 0, 0);

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-bg-cram20.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`✅ 输出: ${OUT_PATH}`);
