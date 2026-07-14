import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
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

console.log('=== Tile数据调试 ===');
console.log('');

console.log('小端序解码的标题Tile索引: 472, 482, 481, 484, 495, 494, 493, 497, 496');
console.log('');

const tileIndices = [472, 482, 481, 484, 495, 494, 493, 497, 496];
for (const idx of tileIndices) {
  const tile = decodeTile(idx);
  console.log(`Tile ${idx}:`);
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x++) {
      row += tile[y * 8 + x].toString(16).padStart(2, '0') + ' ';
    }
    console.log(`  ${row}`);
  }
  
  const counts = {};
  for (let i = 0; i < 64; i++) {
    counts[tile[i]] = (counts[tile[i]] || 0) + 1;
  }
  console.log(`  颜色分布:`, counts);
  console.log('');
}

console.log('=== 大端序解码的标题Tile索引: 105, 617, 361, 1121, 1129, 873, 1897, 1641, 1385, 353 ===');
console.log('');

const tileIndicesBE = [105, 617, 361];
for (const idx of tileIndicesBE) {
  const tile = decodeTile(idx);
  console.log(`Tile ${idx}:`);
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x++) {
      row += tile[y * 8 + x].toString(16).padStart(2, '0') + ' ';
    }
    console.log(`  ${row}`);
  }
  
  const counts = {};
  for (let i = 0; i < 64; i++) {
    counts[tile[i]] = (counts[tile[i]] || 0) + 1;
  }
  console.log(`  颜色分布:`, counts);
  console.log('');
}

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i, scale) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * scale;
  const g = ((word >> 3) & 0x07) * scale;
  const b = ((word >> 6) & 0x07) * scale;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i, 36));
}

console.log('=== 使用调色板3计算Tile 472的平均颜色 ===');
console.log('');

const tile472 = decodeTile(472);
let sumR = 0, sumG = 0, sumB = 0, count = 0;
for (let i = 0; i < 64; i++) {
  const ci = tile472[i];
  if (ci !== 0) {
    const c = palette[48 + ci];
    sumR += c.r;
    sumG += c.g;
    sumB += c.b;
    count++;
  }
}
console.log(`Tile 472 (调色板3): rgb(${Math.round(sumR/count)},${Math.round(sumG/count)},${Math.round(sumB/count)})`);

console.log('');
console.log('=== 使用调色板2计算Tile 105的平均颜色 ===');
console.log('');

const tile105 = decodeTile(105);
sumR = 0; sumG = 0; sumB = 0; count = 0;
for (let i = 0; i < 64; i++) {
  const ci = tile105[i];
  if (ci !== 0) {
    const c = palette[32 + ci];
    sumR += c.r;
    sumG += c.g;
    sumB += c.b;
    count++;
  }
}
console.log(`Tile 105 (调色板2): rgb(${Math.round(sumR/count)},${Math.round(sumG/count)},${Math.round(sumB/count)})`);

console.log('');
console.log('目标字母颜色: rgb(59,30,41)');
