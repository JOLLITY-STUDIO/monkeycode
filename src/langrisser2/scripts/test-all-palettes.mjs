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

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

function decodeCRAM_LE_SCALE(i, scale) {
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

async function renderWithPalette(paletteNum, scale) {
  const palette = [];
  for (let i = 0; i < 64; i++) {
    palette.push(decodeCRAM_LE_SCALE(i, scale));
  }

  const bgColor = palette[4];
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
        const hFlip = (entry >> 12) & 1;
        const vFlip = (entry >> 11) & 1;
        const tile = decodeTile(tileIdx);
        for (let ty = 0; ty < TILE_H; ty++) {
          for (let tx = 0; tx < TILE_W; tx++) {
            const py = hFlip ? (TILE_W - 1 - tx) : tx;
            const px = vFlip ? (TILE_H - 1 - ty) : ty;
            const colorIdx = tile[px * TILE_W + py];
            if (colorIdx !== 0) {
              const color = palette[paletteNum * 16 + colorIdx];
              const x = col * TILE_W + tx;
              const y = row * TILE_H + ty;
              const idx = (y * DISPLAY_W + x) * 4;
              imgData.data[idx] = color.r;
              imgData.data[idx + 1] = color.g;
              imgData.data[idx + 2] = color.b;
              imgData.data[idx + 3] = 255;
            }
          }
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const outputPath = join(DATA_DIR, 'output', `title-palette${paletteNum}-scale${scale}.png`);
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

  if (titleColors.length > 0) {
    const avgR = Math.round(titleColors.reduce((sum, c) => sum + c.r, 0) / titleColors.length);
    const avgG = Math.round(titleColors.reduce((sum, c) => sum + c.g, 0) / titleColors.length);
    const avgB = Math.round(titleColors.reduce((sum, c) => sum + c.b, 0) / titleColors.length);
    return { paletteNum, scale, avgR, avgG, avgB };
  }
  return { paletteNum, scale, avgR: bgColor.r, avgG: bgColor.g, avgB: bgColor.b };
}

console.log('=== 测试所有调色板和缩放因子 ===');
console.log('');
console.log('截图字母区域平均颜色: rgb(39,22,62)');
console.log('');

const results = [];
for (const paletteNum of [0, 1, 2, 3]) {
  for (const scale of [32, 36, 42, 48]) {
    const result = await renderWithPalette(paletteNum, scale);
    results.push(result);
    const diff = Math.abs(result.avgR - 39) + Math.abs(result.avgG - 22) + Math.abs(result.avgB - 62);
    console.log(`调色板${paletteNum}, 缩放${scale}: rgb(${result.avgR},${result.avgG},${result.avgB}) 差异: ${diff}`);
  }
}

console.log('');
console.log('=== 最佳匹配 ===');
const best = results.sort((a, b) => {
  const diffA = Math.abs(a.avgR - 39) + Math.abs(a.avgG - 22) + Math.abs(a.avgB - 62);
  const diffB = Math.abs(b.avgR - 39) + Math.abs(b.avgG - 22) + Math.abs(b.avgB - 62);
  return diffA - diffB;
})[0];

console.log(`调色板${best.paletteNum}, 缩放${best.scale}: rgb(${best.avgR},${best.avgG},${best.avgB})`);
