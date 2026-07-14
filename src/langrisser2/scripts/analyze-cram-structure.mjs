/**
 * 分析 CRAM 文件结构
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log(`CRAM 文件大小: ${cram.length} 字节`);
console.log(`颜色数量: ${cram.length / 2}`);

// ============================================================
// 检查 CRAM 文件是否包含重复数据
// ============================================================
console.log('\n=== 检查 CRAM 文件结构 ===');

// 比较不同区域的内容
for (let i = 0; i < 64; i++) {
  const word1 = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const word2 = (cram[(i + 64) * 2 + 1] << 8) | cram[(i + 64) * 2];
  const word3 = (cram[(i + 128) * 2 + 1] << 8) | cram[(i + 128) * 2];
  const word4 = (cram[(i + 192) * 2 + 1] << 8) | cram[(i + 192) * 2];
  
  if (word1 !== word2 || word2 !== word3 || word3 !== word4) {
    console.log(`CRAM[${i}] = 0x${word1.toString(16).padStart(4,'0')}`);
    console.log(`CRAM[${i+64}] = 0x${word2.toString(16).padStart(4,'0')}`);
    console.log(`CRAM[${i+128}] = 0x${word3.toString(16).padStart(4,'0')}`);
    console.log(`CRAM[${i+192}] = 0x${word4.toString(16).padStart(4,'0')}`);
    console.log('---');
  }
}

// ============================================================
// 检查是否前 128 字节是标准 CRAM
// ============================================================
console.log('\n=== 前 64 个颜色 (标准 CRAM) ===');
function decodeCRAM_LE_BGR(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

for (let i = 0; i < 64; i++) {
  const c = decodeCRAM_LE_BGR(i);
  if (c.r > 0 || c.g > 0 || c.b > 0) {
    console.log(`  CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
  }
}

// ============================================================
// 检查是否每个调色板有独立的 CRAM 区域
// ============================================================
console.log('\n=== 检查每个调色板区域 ===');

// 标准布局: pal0[0-15] = CRAM[0-15], pal1[0-15] = CRAM[16-31], pal2[0-15] = CRAM[32-47], pal3[0-15] = CRAM[48-63]
console.log('标准布局:');
for (let p = 0; p < 4; p++) {
  const c0 = decodeCRAM_LE_BGR(p * 16);
  console.log(`  pal${p}[0] (CRAM[${p*16}]) = rgb(${c0.r},${c0.g},${c0.b})`);
}

// Gens 可能使用不同的布局: 每个调色板64色
// pal0[0-63] = CRAM[0-63], pal1[0-63] = CRAM[64-127], pal2[0-63] = CRAM[128-191], pal3[0-63] = CRAM[192-255]
console.log('\n每个调色板64色布局:');
for (let p = 0; p < 4; p++) {
  const c0 = decodeCRAM_LE_BGR(p * 64);
  console.log(`  pal${p}[0] (CRAM[${p*64}]) = rgb(${c0.r},${c0.g},${c0.b})`);
}

// ============================================================
// 关键测试: 如果每个调色板64色，pal2[0] = CRAM[128]
// ============================================================
console.log('\n=== 每个调色板64色布局的 pal2 ===');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_LE_BGR(128 + i);
  console.log(`  pal2[${i}] (CRAM[${128+i}]) = rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 另一种可能: Gens 的 CRAM dump 是按颜色索引存储的
// 每个颜色索引有4个调色板版本，共64个颜色索引 × 4个调色板 = 256
// color[N][P] = CRAM[N * 4 + P]
// ============================================================
console.log('\n=== 按颜色索引存储布局 ===');
for (let c = 0; c < 16; c++) {
  const colors = [];
  for (let p = 0; p < 4; p++) {
    colors.push(decodeCRAM_LE_BGR(c * 4 + p));
  }
  console.log(`  color[${c}]: pal0=rgb(${colors[0].r},${colors[0].g},${colors[0].b}) pal1=rgb(${colors[1].r},${colors[1].g},${colors[1].b}) pal2=rgb(${colors[2].r},${colors[2].g},${colors[2].b}) pal3=rgb(${colors[3].r},${colors[3].g},${colors[3].b})`);
}

// ============================================================
// 尝试使用每个调色板64色的方式渲染
// ============================================================
import { createCanvas } from 'canvas';

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

const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

function renderWith64ColorPalette() {
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
      const palBase = e.palette * 64;
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = decodeCRAM_LE_BGR(palBase + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  
  const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-64color-pal.png');
  writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
  console.log(`\n✅ 输出: ${OUT_PATH}`);
}

renderWith64ColorPalette();
