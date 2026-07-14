/**
 * 验证 nametable 条目解析
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
// 验证 nametable 条目解析
// ============================================================
console.log('=== 验证 nametable 条目解析 ===');

// 读取标题区域的 nametable 条目
function readNametableEntry(tx, ty) {
  const addr = 0xC000 + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  
  return {
    addr,
    lo,
    hi,
    word,
    priority: (word >> 15) & 1,
    palette: (word >> 13) & 3,
    hflip: (word >> 12) & 1,
    vflip: (word >> 11) & 1,
    tileIdx: word & 0x7FF,
  };
}

// 检查标题区域的几个条目
console.log('\n标题区域 nametable 条目:');
for (let ty = 8; ty < 10; ty++) {
  for (let tx = 6; tx < 12; tx++) {
    const e = readNametableEntry(tx, ty);
    console.log(`[tx=${tx},ty=${ty}] addr=0x${e.addr.toString(16)} word=0x${e.word.toString(16).padStart(4,'0')}`);
    console.log(`  tile=${e.tileIdx} pal=${e.palette} hflip=${e.hflip} vflip=${e.vflip} priority=${e.priority}`);
  }
}

// ============================================================
// 检查是否所有标题区域的 tile 都使用 palette 2
// ============================================================
console.log('\n=== 检查标题区域调色板使用情况 ===');
const paletteCounts = new Array(4).fill(0);
for (let ty = 8; ty < 12; ty++) {
  for (let tx = 6; tx < 34; tx++) {
    const e = readNametableEntry(tx, ty);
    paletteCounts[e.palette]++;
  }
}
console.log(`调色板使用计数: pal0=${paletteCounts[0]} pal1=${paletteCounts[1]} pal2=${paletteCounts[2]} pal3=${paletteCounts[3]}`);

// ============================================================
// 验证 tile 解码
// ============================================================
console.log('\n=== 验证 tile 解码 ===');

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

// 打印 tile 256 的数据
const tile256Data = [];
for (let y = 0; y < 8; y++) {
  const row = [];
  for (let x = 0; x < 8; x++) {
    const offset = 256 * 32 + y * 4;
    row.push({
      p0: vram[offset],
      p1: vram[offset + 1],
      p2: vram[offset + 2],
      p3: vram[offset + 3],
    });
  }
  tile256Data.push(row);
}

console.log('\ntile 256 原始数据 (每字节十六进制):');
for (let y = 0; y < 8; y++) {
  const line = [];
  for (let x = 0; x < 4; x++) {
    const d = tile256Data[y][x];
    line.push(`${d.p0.toString(16).padStart(2,'0')} ${d.p1.toString(16).padStart(2,'0')} ${d.p2.toString(16).padStart(2,'0')} ${d.p3.toString(16).padStart(2,'0')}`);
  }
  console.log(`  行${y}: ${line.join(' ')}`);
}

// ============================================================
// 尝试不同的 tile 解码方式
// ============================================================
console.log('\n=== 尝试不同的 tile 解码方式 ===');

// 方式1: 行优先 (当前方式)
function decodeTileRow(tileIdx) {
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

// 方式2: 平面优先
function decodeTilePlane(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[offset + y] >> bit) & 1;
      const p1 = (vram[offset + y + 8] >> bit) & 1;
      const p2 = (vram[offset + y + 16] >> bit) & 1;
      const p3 = (vram[offset + y + 24] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// 方式3: 每平面8字节，每行2字节
function decodeTilePlane2(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[offset + y * 2] >> bit) & 1;
      const p1 = (vram[offset + y * 2 + 1] >> bit) & 1;
      const p2 = (vram[offset + y * 2 + 16] >> bit) & 1;
      const p3 = (vram[offset + y * 2 + 17] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// 对比三种方式解码 tile 256
const t1 = decodeTileRow(256);
const t2 = decodeTilePlane(256);
const t3 = decodeTilePlane2(256);

console.log('tile 256 颜色索引分布:');
console.log('行优先:', Array.from(new Set(t1)).sort());
console.log('平面优先:', Array.from(new Set(t2)).sort());
console.log('平面优先2:', Array.from(new Set(t3)).sort());

// ============================================================
// 尝试使用平面优先方式渲染
// ============================================================
function renderWithTileDecode(decodeFn, name) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeFn(i);

  function decodeCRAM(i) {
    const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
    return {
      r: ((word >> 0) & 7) * 36,
      g: ((word >> 3) & 7) * 36,
      b: ((word >> 6) & 7) * 36,
    };
  }

  const PAL_OFFSETS = [0, 16, 4, 48];

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

renderWithTileDecode(decodeTileRow, 'row-decode');
renderWithTileDecode(decodeTilePlane, 'plane-decode');
renderWithTileDecode(decodeTilePlane2, 'plane-decode2');
