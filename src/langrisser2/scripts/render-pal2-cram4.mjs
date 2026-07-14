/**
 * pal2 从 CRAM[4] 开始的映射
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
// 方式: 每个调色板从不同 CRAM 偏移开始
// pal2 从 CRAM[4] 开始，这样 pal2[0] = rgb(0,0,72)
// ============================================================

const PAL_OFFSETS = [0, 16, 4, 48]; // pal0, pal1, pal2, pal3 的 CRAM 起始偏移

function getColor(palette, colorIdx) {
  return decodeCRAM(PAL_OFFSETS[palette] + colorIdx);
}

console.log('=== 每个调色板的颜色0 ===');
for (let p = 0; p < 4; p++) {
  const c = getColor(p, 0);
  console.log(`  pal${p}[0] (CRAM[${PAL_OFFSETS[p]}]) = rgb(${c.r},${c.g},${c.b})`);
}

console.log('\n=== pal2 所有颜色 ===');
for (let i = 0; i < 16; i++) {
  const c = getColor(2, i);
  console.log(`  pal2[${i}] (CRAM[${PAL_OFFSETS[2] + i}]) = rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 渲染
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
const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-pal2-cram4.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

// ============================================================
// 对比截图验证
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

console.log('\n=== 对比截图验证 ===');

// 检查标题区域的几个关键位置
const testPositions = [
  { tx: 6, ty: 8, desc: '背景区域' },
  { tx: 10, ty: 8, desc: '标题字母' },
  { tx: 15, ty: 8, desc: '标题字母' },
  { tx: 20, ty: 8, desc: '标题字母' },
  { tx: 25, ty: 8, desc: '标题字母' },
];

for (const pos of testPositions) {
  const entry = readNametableEntry(pos.tx, pos.ty);
  const tile = decodeTile(entry.tileIdx);
  const tileColors = {};
  
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const srcX = entry.hflip ? (7 - px) : px;
      const srcY = entry.vflip ? (7 - py) : py;
      const ci = tile[srcY * 8 + srcX];
      const c = getColor(entry.palette, ci);
      if (!tileColors[ci]) tileColors[ci] = c;
    }
  }
  
  // 获取截图颜色
  const scrColors = [];
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const scrColor = getScreenshotPixel(pos.tx * 8 + px, pos.ty * 8 + py);
      scrColors.push(scrColor);
    }
  }
  const avgScr = {
    r: Math.round(scrColors.reduce((s, c) => s + c.r, 0) / scrColors.length),
    g: Math.round(scrColors.reduce((s, c) => s + c.g, 0) / scrColors.length),
    b: Math.round(scrColors.reduce((s, c) => s + c.b, 0) / scrColors.length),
  };
  
  console.log(`[tx=${pos.tx},ty=${pos.ty}] ${pos.desc}: tile=${entry.tileIdx} pal=${entry.palette}`);
  console.log(`  渲染颜色: ${JSON.stringify(tileColors)}`);
  console.log(`  截图平均: rgb(${avgScr.r},${avgScr.g},${avgScr.b})`);
}
