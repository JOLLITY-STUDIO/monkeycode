/**
 * 精确匹配截图颜色
 * 
 * 截图颜色:
 *   背景: rgb(0,0,72)
 *   红色: rgb(32,0,0), rgb(72,0,0), rgb(104,0,0), rgb(216,0,0)
 *   金色: rgb(248,216,0)
 *   绿色: rgb(0,72,0), rgb(0,108,0), rgb(0,252,0)
 *   白色: rgb(216,216,216), rgb(248,252,248)
 * 
 * 尝试找到正确的 CRAM → RGB 映射
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
// 尝试多种颜色映射系数
// ============================================================
console.log('=== 尝试不同的颜色映射系数 ===');

function tryMapping(name, scale, offset) {
  console.log(`\n${name} (scale=${scale}, offset=${offset}):`);
  let foundBg = false;
  let foundRed = false;
  
  for (let i = 0; i < 64; i++) {
    // 尝试标准 LE
    const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
    const r = ((word >> 0) & 7) * scale + offset;
    const g = ((word >> 3) & 7) * scale + offset;
    const b = ((word >> 6) & 7) * scale + offset;
    
    if (Math.abs(b - 72) <= 5 && Math.abs(r) <= 5 && Math.abs(g) <= 5) {
      console.log(`  CRAM[${i}] → rgb(${r},${g},${b}) 接近背景色!`);
      foundBg = true;
    }
    if (Math.abs(r - 72) <= 5 && Math.abs(g) <= 5 && Math.abs(b) <= 5) {
      console.log(`  CRAM[${i}] → rgb(${r},${g},${b}) 接近红色!`);
      foundRed = true;
    }
  }
  
  if (!foundBg) console.log('  未找到背景色');
  if (!foundRed) console.log('  未找到红色');
}

tryMapping('×36', 36, 0);
tryMapping('×32', 32, 0);
tryMapping('×36+18', 36, 18);
tryMapping('×32+16', 32, 16);
tryMapping('×40', 40, 0);
tryMapping('×24', 24, 0);
tryMapping('×28', 28, 0);
tryMapping('×30', 30, 0);

// ============================================================
// 尝试不同的位域排列 + 不同系数
// ============================================================
console.log('\n=== 尝试不同位域 + ×32 ===');

function tryBitField(name, getRgb) {
  console.log(`\n${name}:`);
  let foundBg = false;
  let foundRed = false;
  
  for (let i = 0; i < 64; i++) {
    const { r, g, b } = getRgb(i);
    if (Math.abs(b - 72) <= 5 && Math.abs(r) <= 5 && Math.abs(g) <= 5) {
      console.log(`  CRAM[${i}] → rgb(${r},${g},${b}) 接近背景色!`);
      foundBg = true;
    }
    if (Math.abs(r - 72) <= 5 && Math.abs(g) <= 5 && Math.abs(b) <= 5) {
      console.log(`  CRAM[${i}] → rgb(${r},${g},${b}) 接近红色!`);
      foundRed = true;
    }
  }
  
  return { foundBg, foundRed };
}

// 位域1: 标准 BGR
tryBitField('标准 BGR (R=bit2-0,G=bit5-3,B=bit8-6) ×32', (i) => {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 32,
    g: ((word >> 3) & 7) * 32,
    b: ((word >> 6) & 7) * 32,
  };
});

// 位域2: RGB
tryBitField('RGB (R=bit8-6,G=bit5-3,B=bit2-0) ×32', (i) => {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 6) & 7) * 32,
    g: ((word >> 3) & 7) * 32,
    b: ((word >> 0) & 7) * 32,
  };
});

// 位域3: 交换字节 + BGR
tryBitField('交换字节+BGR ×32', (i) => {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  return {
    r: ((word >> 0) & 7) * 32,
    g: ((word >> 3) & 7) * 32,
    b: ((word >> 6) & 7) * 32,
  };
});

// 位域4: 交换字节 + RGB
tryBitField('交换字节+RGB ×32', (i) => {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  return {
    r: ((word >> 6) & 7) * 32,
    g: ((word >> 3) & 7) * 32,
    b: ((word >> 0) & 7) * 32,
  };
});

// ============================================================
// 关键发现！截图中背景色 rgb(0,0,72)
// 72 = 2 × 36, 所以 B=2
// 搜索所有能产生 B=2 的 CRAM 条目
// ============================================================
console.log('\n=== 搜索 B=2 的 CRAM 条目 ===');
for (let i = 0; i < 64; i++) {
  const wordLE = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const wordBE = (cram[i * 2] << 8) | cram[i * 2 + 1];
  
  // BGR ×36: B = ((word >> 6) & 7)
  if (((wordLE >> 6) & 7) === 2) {
    const r = ((wordLE >> 0) & 7) * 36;
    const g = ((wordLE >> 3) & 7) * 36;
    const b = ((wordLE >> 6) & 7) * 36;
    console.log(`  CRAM[${i}] LE word=0x${wordLE.toString(16).padStart(4,'0')} → rgb(${r},${g},${b})`);
  }
  if (((wordBE >> 6) & 7) === 2) {
    const r = ((wordBE >> 0) & 7) * 36;
    const g = ((wordBE >> 3) & 7) * 36;
    const b = ((wordBE >> 6) & 7) * 36;
    console.log(`  CRAM[${i}] BE word=0x${wordBE.toString(16).padStart(4,'0')} → rgb(${r},${g},${b})`);
  }
}

// ============================================================
// 另一个思路: Gens 的 CRAM dump 可能是按 16 位字存储的
// 每个字的格式可能是: { 7位 | B2 B1 B0 G2 G1 G0 R2 R1 }
// R0 在某个地方
// ============================================================
console.log('\n=== 尝试 Gens 16位格式 ===');
function decodeGens16(i) {
  // cram[i*2] = bit7-0: B2 B1 B0 G2 G1 G0 R2 R1
  // cram[i*2+1] = bit15-8: R0 + 7位填充
  const lo = cram[i * 2];
  const hi = cram[i * 2 + 1];
  
  const r = ((lo & 3) << 1) | (hi & 1);  // R2 R1 R0
  const g = (lo >> 2) & 7;                 // G2 G1 G0
  const b = (lo >> 5) & 7;                 // B2 B1 B0
  
  return {
    r: r * 36,
    g: g * 36,
    b: b * 36,
  };
}

console.log('调色板0 (应该包含背景色):');
for (let i = 0; i < 16; i++) {
  const c = decodeGens16(i);
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
}

console.log('调色板2 (标题使用):');
for (let i = 32; i < 48; i++) {
  const c = decodeGens16(i);
  console.log(`  [${i-32}] rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 渲染测试: 用 decodeGens16
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

const palGens = [];
for (let i = 0; i < 64; i++) palGens.push(decodeGens16(i));

const canvas = renderPlane(i => palGens[i]);
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-gens-format.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);
