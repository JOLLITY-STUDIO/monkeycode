import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

function decodeTileRowMajor(tileIdx) {
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

function decodeTilePlaneMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let plane = 0; plane < 4; plane++) {
    const planeOffset = offset + plane * 8;
    for (let y = 0; y < 8; y++) {
      const byte = vram[planeOffset + y];
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        if ((byte >> bit) & 1) {
          pixels[y * 8 + x] |= (1 << plane);
        }
      }
    }
  }
  return pixels;
}

function decodeTileRowMajorAlt(tileIdx) {
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

const testTileIdx = 472;

const tileRowMajor = decodeTileRowMajor(testTileIdx);
const tilePlaneMajor = decodeTilePlaneMajor(testTileIdx);
const tileRowAlt = decodeTileRowMajorAlt(testTileIdx);

const tileSize = 64;
const canvas = createCanvas(tileSize * 3 + 20, tileSize + 40);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawTile(tile, x, y, label) {
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const ci = tile[py * 8 + px];
      if (ci !== 0) {
        const c = palette[48 + ci];
        ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        ctx.fillRect(x + px * 8, y + py * 8, 8, 8);
      }
    }
  }
  ctx.fillStyle = '#0f0';
  ctx.font = '10px monospace';
  ctx.fillText(label, x, y + tileSize + 15);
}

drawTile(tileRowMajor, 5, 5, 'Row Major');
drawTile(tilePlaneMajor, tileSize + 10, 5, 'Plane Major');
drawTile(tileRowAlt, tileSize * 2 + 15, 5, 'Row Alt (4B/row)');

const OUT_PATH = join(DATA_DIR, 'output/tile-decode-compare.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`输出: ${OUT_PATH}`);

console.log('');
console.log('=== Tile数据原始值 ===');
const offset = testTileIdx * 32;
console.log(`Tile ${testTileIdx} 偏移: 0x${offset.toString(16)}`);
for (let i = 0; i < 32; i += 8) {
  process.stdout.write(`  [${i}]: `);
  for (let j = 0; j < 8; j++) {
    process.stdout.write(`${vram[offset + i + j].toString(16).padStart(2,'0')} `);
  }
  console.log('');
}

console.log('');
console.log('=== 三种解码方式的像素值对比 ===');
console.log('位置 | Row Major | Plane Major | Row Alt');
console.log('-----|-----------|-------------|--------');
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    const idx = y * 8 + x;
    console.log(`(${x},${y}) | ${tileRowMajor[idx].toString(2).padStart(4,'0')} | ${tilePlaneMajor[idx].toString(2).padStart(4,'0')} | ${tileRowAlt[idx].toString(2).padStart(4,'0')}`);
  }
}
