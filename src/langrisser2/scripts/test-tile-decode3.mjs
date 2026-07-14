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

const testTiles = [546, 608, 668];

const canvas = createCanvas(200, 150);
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
        ctx.fillRect(x + px * 4, y + py * 4, 4, 4);
      }
    }
  }
  ctx.fillStyle = '#0f0';
  ctx.font = '8px monospace';
  ctx.fillText(label, x, y + 36);
}

let x = 10, y = 10;
for (const idx of testTiles) {
  const tilePlane = decodeTilePlaneMajor(idx);
  const tileRow = decodeTileRowMajor(idx);
  
  drawTile(tilePlane, x, y, `${idx} Plane`);
  drawTile(tileRow, x + 40, y, `${idx} Row`);
  
  y += 45;
}

const OUT_PATH = join(DATA_DIR, 'output/tile-decode-compare3.png');
writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`输出: ${OUT_PATH}`);

console.log('');
console.log('=== 关键测试: 渲染整个画面对比 ===');

function renderScreen(decodeFunc, label) {
  const PLANE_A_BASE = 0xC000;
  const PLANE_B_BASE = 0xE000;
  const DISPLAY_W = 320;
  const DISPLAY_H = 224;
  const COLS = 40;
  const ROWS = 28;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) {
    tileCache[i] = decodeFunc(i);
  }

  function readNametableEntry(base, tx, ty) {
    const addr = base + (ty * 64 + tx) * 2;
    const lo = vram[addr];
    const hi = vram[addr + 1];
    const word = (hi << 8) | lo;
    return {
      priority: (word >> 15) & 1,
      palette:  (word >> 13) & 3,
      hflip:    (word >> 12) & 1,
      vflip:    (word >> 11) & 1,
      tileIdx:  word & 0x7FF,
      word
    };
  }

  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  const bgColor = palette[4];
  for (let i = 0; i < data.length; i += 4) {
    data[i] = bgColor.r; data[i+1] = bgColor.g; data[i+2] = bgColor.b; data[i+3] = 255;
  }

  const PAL_OFFSETS = [0, 16, 32, 48];

  function renderPlane(base) {
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const e = readNametableEntry(base, tx, ty);
        if (e.word === 0) continue;
        const tp = tileCache[e.tileIdx];
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const srcX = e.hflip ? (7 - px) : px;
            const srcY = e.vflip ? (7 - py) : py;
            const ci = tp[srcY * 8 + srcX];
            if (ci !== 0) {
              const c = palette[PAL_OFFSETS[e.palette] + ci];
              const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
              data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
            }
          }
        }
      }
    }
  }

  renderPlane(PLANE_A_BASE);
  renderPlane(PLANE_B_BASE);
  ctx.putImageData(imgData, 0, 0);
  writeFileSync(join(DATA_DIR, `output/title-${label}.png`), canvas.toBuffer('image/png'));
  console.log(`  输出: title-${label}.png`);
}

renderScreen(decodeTilePlaneMajor, 'plane-major');
renderScreen(decodeTileRowMajor, 'row-major');
