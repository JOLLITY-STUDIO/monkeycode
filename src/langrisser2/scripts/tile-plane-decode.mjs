/**
 * MD tile 位平面布局分析
 * 
 * MD VRAM 中 4bpp tile 格式:
 * - 每个 tile 32 字节
 * - 按平面存储: Plane0(8字节) + Plane1(8字节) + Plane2(8字节) + Plane3(8字节)
 * - 每个平面中，每字节代表一行的一个位平面
 * 
 * 所以:
 * Plane0[y] = vram[tile*32 + y]
 * Plane1[y] = vram[tile*32 + y + 8]
 * Plane2[y] = vram[tile*32 + y + 16]
 * Plane3[y] = vram[tile*32 + y + 24]
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
// 方式1: 平面优先解码 (正确的 MD 格式)
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
// 方式2: 行优先解码 (之前的方式)
// ============================================================
function decodeTileRow(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (vram[rowOff + 0] >> bit) & 1;
      const b1 = (vram[rowOff + 1] >> bit) & 1;
      const b2 = (vram[rowOff + 2] >> bit) & 1;
      const b3 = (vram[rowOff + 3] >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  
  return pixels;
}

// ============================================================
// 对比两种方式解码 tile 256
// ============================================================
console.log('=== tile 256 解码对比 ===');

const tPlane = decodeTilePlane(256);
const tRow = decodeTileRow(256);

console.log('平面优先: 颜色索引分布', Array.from(new Set(tPlane)).sort());
console.log('行优先: 颜色索引分布', Array.from(new Set(tRow)).sort());

// 打印平面优先方式的详细数据
console.log('\ntile 256 平面优先解码详情:');
for (let y = 0; y < 8; y++) {
  const line = [];
  for (let x = 0; x < 8; x++) {
    line.push(tPlane[y * 8 + x]);
  }
  console.log(`  行${y}: [${line.join(',')}]`);
}

// ============================================================
// 检查 tile 256 的原始 VRAM 数据
// ============================================================
console.log('\ntile 256 原始 VRAM 数据:');
const tile256Offset = 256 * 32;
console.log('Plane0 (字节0-7):', Array.from(vram.slice(tile256Offset, tile256Offset + 8)).map(b => b.toString(16).padStart(2,'0')));
console.log('Plane1 (字节8-15):', Array.from(vram.slice(tile256Offset + 8, tile256Offset + 16)).map(b => b.toString(16).padStart(2,'0')));
console.log('Plane2 (字节16-23):', Array.from(vram.slice(tile256Offset + 16, tile256Offset + 24)).map(b => b.toString(16).padStart(2,'0')));
console.log('Plane3 (字节24-31):', Array.from(vram.slice(tile256Offset + 24, tile256Offset + 32)).map(b => b.toString(16).padStart(2,'0')));

// ============================================================
// 检查标题字母 tile 260
// ============================================================
console.log('\n=== tile 260 解码对比 ===');

const t260Plane = decodeTilePlane(260);
const t260Row = decodeTileRow(260);

console.log('平面优先: 颜色索引分布', Array.from(new Set(t260Plane)).sort());
console.log('行优先: 颜色索引分布', Array.from(new Set(t260Row)).sort());

// ============================================================
// 使用平面优先方式渲染
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

function render(decodeFn, name) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeFn(i);

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
          const c = decodeCRAM(PAL_OFFSETS[e.palette] + ci);
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

render(decodeTilePlane, 'plane-correct');
render(decodeTileRow, 'row-correct');
