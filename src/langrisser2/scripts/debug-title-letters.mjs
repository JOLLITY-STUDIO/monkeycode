import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

const PLANE_A_BASE = 0x4000;

function readNametableEntry(tx, ty) {
  const addr = PLANE_A_BASE + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    palette: (word >> 13) & 3,
    tileIdx: word & 0x7FF,
    word
  };
}

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: (word & 0x07) * 36,
    g: ((word >> 3) & 0x07) * 36,
    b: ((word >> 6) & 0x07) * 36,
  };
}

function decodeTile(tileIdx) {
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

console.log('=== 标题字母区域分析 ===');
console.log('位置: tx=10, ty=8 (字母区域)');
console.log('');

const e = readNametableEntry(10, 8);
console.log(`Nametable条目: word=0x${e.word.toString(16).padStart(4,'0')}`);
console.log(`  palette=${e.palette}, tileIdx=${e.tileIdx}`);
console.log('');

const tp = decodeTile(e.tileIdx);
const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

const PAL_OFFSETS = [0, 16, 32, 48];
const palBase = PAL_OFFSETS[e.palette];

console.log(`使用调色板 ${e.palette}, 基址 CRAM[${palBase}]-CRAM[${palBase+15}]`);
console.log('');
console.log('该调色板颜色:');
for (let i = 0; i < 16; i++) {
  const c = palette[palBase + i];
  console.log(`  CRAM[${palBase+i}]: rgb(${c.r},${c.g},${c.b})`);
}
console.log('');

console.log('Tile像素颜色索引分布:');
const colorCounts = {};
for (let i = 0; i < 64; i++) {
  const ci = tp[i];
  colorCounts[ci] = (colorCounts[ci] || 0) + 1;
}
for (const ci of Object.keys(colorCounts).sort((a,b)=>a-b)) {
  const c = palette[palBase + parseInt(ci)];
  console.log(`  颜色索引 ${ci}: ${colorCounts[ci]} 像素 -> rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 尝试不同缩放系数 ===');
for (const scale of [28, 32, 34, 36, 38]) {
  console.log(`缩放系数 ×${scale}:`);
  let totalR = 0, totalG = 0, totalB = 0, count = 0;
  for (let i = 0; i < 64; i++) {
    const ci = tp[i];
    if (ci !== 0) {
      const word = (cram[(palBase + ci) * 2 + 1] << 8) | cram[(palBase + ci) * 2];
      totalR += (word & 0x07) * scale;
      totalG += ((word >> 3) & 0x07) * scale;
      totalB += ((word >> 6) & 0x07) * scale;
      count++;
    }
  }
  if (count > 0) {
    console.log(`  字母区域平均: rgb(${Math.round(totalR/count)},${Math.round(totalG/count)},${Math.round(totalB/count)})`);
  }
}

console.log('');
console.log('目标字母颜色: rgb(59,30,41)');
