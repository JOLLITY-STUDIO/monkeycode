import { readFileSync } from 'fs';
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

const DISPLAY_W = 320;
const DISPLAY_H = 224;
const TILE_W = 8;
const TILE_H = 8;
const COLUMNS = DISPLAY_W / TILE_W;
const ROWS = DISPLAY_H / TILE_H;

const PLANE_B_BASE = 0xE000;

const SCALE_36 = 36;
const SCALE_255_7 = Math.round(255 / 7);
const SCALE_256_7 = Math.round(256 / 7);
const SCALE_31 = 31;

function decodeCRAM_LE(i, scale) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * scale;
  const g = ((word >> 3) & 0x07) * scale;
  const b = ((word >> 6) & 0x07) * scale;
  return { r, g, b };
}

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

async function renderWithScale(scale, scaleName) {
  const palette = [];
  for (let i = 0; i < 64; i++) {
    palette.push(decodeCRAM_LE(i, scale));
  }

  const bgColor = palette[4];
  console.log(`${scaleName} (${scale}): 背景色 rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);

  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = bgColor.r;
    imgData.data[i + 1] = bgColor.g;
    imgData.data[i + 2] = bgColor.b;
    imgData.data[i + 3] = 255;
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const ntOffset = PLANE_B_BASE + row * 64 + col * 2;
      const lo = vram[ntOffset];
      const hi = vram[ntOffset + 1];
      const entry = (hi << 8) | lo;
      const tileIdx = entry & 0x7FF;
      if (tileIdx !== 0) {
        const paletteIdx = (entry >> 13) & 3;
        const hFlip = (entry >> 12) & 1;
        const vFlip = (entry >> 11) & 1;
        const tile = decodeTile(tileIdx);
        for (let ty = 0; ty < TILE_H; ty++) {
          for (let tx = 0; tx < TILE_W; tx++) {
            const py = hFlip ? (TILE_W - 1 - tx) : tx;
            const px = vFlip ? (TILE_H - 1 - ty) : ty;
            const colorIdx = tile[px * TILE_W + py];
            if (colorIdx !== 0) {
              const color = palette[paletteIdx * 16 + colorIdx];
              const x = col * TILE_W + tx;
              const y = row * TILE_H + ty;
              const idx = (y * DISPLAY_W + x) * 4;
              imgData.data[idx] = Math.min(255, color.r);
              imgData.data[idx + 1] = Math.min(255, color.g);
              imgData.data[idx + 2] = Math.min(255, color.b);
              imgData.data[idx + 3] = 255;
            }
          }
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const outputPath = join(DATA_DIR, 'output', `title-scale-${scaleName}.png`);
  const fs = await import('fs');
  fs.default.writeFileSync(outputPath, canvas.toBuffer('image/png'));

  const titleColors = [];
  for (let y = 56; y < 88; y++) {
    for (let x = 40; x < 224; x++) {
      const idx = (y * DISPLAY_W + x) * 4;
      const r = imgData.data[idx];
      const g = imgData.data[idx + 1];
      const b = imgData.data[idx + 2];
      if (r !== bgColor.r || g !== bgColor.g || b !== bgColor.b) {
        titleColors.push({ r, g, b });
      }
    }
  }

  const avgR = Math.round(titleColors.reduce((sum, c) => sum + c.r, 0) / titleColors.length);
  const avgG = Math.round(titleColors.reduce((sum, c) => sum + c.g, 0) / titleColors.length);
  const avgB = Math.round(titleColors.reduce((sum, c) => sum + c.b, 0) / titleColors.length);
  
  return { scaleName, scale, avgR, avgG, avgB };
}

console.log('=== 测试不同CRAM缩放因子 ===');
console.log('');
console.log('截图字母区域平均颜色: rgb(39,22,62)');
console.log('截图背景色: rgb(0,0,72)');
console.log('');

const results = [];
results.push(await renderWithScale(SCALE_36, '36'));
results.push(await renderWithScale(SCALE_255_7, '255_7'));
results.push(await renderWithScale(SCALE_256_7, '256_7'));
results.push(await renderWithScale(SCALE_31, '31'));

console.log('');
for (const result of results) {
  const diff = Math.abs(result.avgR - 39) + Math.abs(result.avgG - 22) + Math.abs(result.avgB - 62);
  console.log(`${result.scaleName} (${result.scale}): rgb(${result.avgR},${result.avgG},${result.avgB}) 差异: ${diff}`);
}

console.log('');
console.log('=== 调色板3颜色使用不同缩放因子 ===');
function showPalette3(scale) {
  console.log(`缩放${scale}:`);
  for (let i = 0; i < 16; i++) {
    const c = decodeCRAM_LE(48 + i, scale);
    console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
  }
}

showPalette3(SCALE_36);
console.log('');
showPalette3(SCALE_255_7);
