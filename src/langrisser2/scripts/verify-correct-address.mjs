import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));
const bmpBuf = readFileSync(BMP_PATH);

const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = bmpHeight > 0 ? (bmpHeight - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return { r: bmpBuf[srcOff + 2], g: bmpBuf[srcOff + 1], b: bmpBuf[srcOff + 0] };
}

function isBackground(c) {
  return Math.abs(c.r - 0) <= 5 && Math.abs(c.g - 0) <= 5 && Math.abs(c.b - 72) <= 10;
}

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) palette.push(decodeCRAM_LE(i));
const bgColor = palette[4];
const PAL_OFFSETS = [0, 16, 32, 48];

const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette: (word >> 13) & 3,
    hflip: (word >> 12) & 1,
    vflip: (word >> 11) & 1,
    tileIdx: word & 0x7FF,
    word
  };
}

// 两种 tile 解码方式
function decodeTileRowMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset], p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2], p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

function decodeTilePlaneMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + y + 8];
    const p2 = vram[offset + y + 16];
    const p3 = vram[offset + y + 24];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

const tileCacheRM = new Array(2048);
const tileCachePM = new Array(2048);
for (let i = 0; i < 2048; i++) {
  tileCacheRM[i] = decodeTileRowMajor(i);
  tileCachePM[i] = decodeTilePlaneMajor(i);
}

console.log('=== 使用正确VDP寄存器值验证 ===');
console.log('R2=0x20 → Plane A @ 0x4000');
console.log('R4=0x60 → Plane B @ 0xC000');
console.log('');

// 检查新地址的nametable内容
function analyzeNametable(base, name) {
  let palStats = [0,0,0,0], priStats = [0,0];
  let tileRange = { min: 2047, max: 0 };
  let nonZero = 0;
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word === 0) continue;
      nonZero++;
      palStats[e.palette]++;
      priStats[e.priority]++;
      if (e.tileIdx < tileRange.min) tileRange.min = e.tileIdx;
      if (e.tileIdx > tileRange.max) tileRange.max = e.tileIdx;
    }
  }
  console.log(`${name} @ 0x${base.toString(16)}:`);
  console.log(`  非空条目: ${nonZero}`);
  console.log(`  调色板: pal0=${palStats[0]}, pal1=${palStats[1]}, pal2=${palStats[2]}, pal3=${palStats[3]}`);
  console.log(`  优先级: 低=${priStats[0]}, 高=${priStats[1]}`);
  console.log(`  Tile: ${tileRange.min}-${tileRange.max}`);
  console.log('');
}

analyzeNametable(0x4000, 'Plane A (新地址)');
analyzeNametable(0xC000, 'Plane B (新地址)');

// 渲染并比较
function renderImage(planeABase, planeBBase, tileCache) {
  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = bgColor.r;
    data[i + 1] = bgColor.g;
    data[i + 2] = bgColor.b;
    data[i + 3] = 255;
  }

  function renderPlane(base) {
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const e = readNametableEntry(base, tx, ty);
        if (e.word === 0) continue;
        const tp = tileCache[e.tileIdx] || tileCache[0];
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const srcX = e.hflip ? (7 - px) : px;
            const srcY = e.vflip ? (7 - py) : py;
            const ci = tp[srcY * 8 + srcX];
            if (ci !== 0) {
              const c = palette[PAL_OFFSETS[e.palette] + ci];
              const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
              data[di] = c.r;
              data[di + 1] = c.g;
              data[di + 2] = c.b;
              data[di + 3] = 255;
            }
          }
        }
      }
    }
  }

  // 渲染顺序: 低优先级 B → 低优先级 A → 高优先级 B → 高优先级 A
  // 简化: 先B后A
  renderPlane(planeBBase);
  renderPlane(planeABase);

  ctx.putImageData(imgData, 0, 0);

  // 透明度匹配
  let match = 0, total = 0;
  let renderedOnly = 0, screenshotOnly = 0;
  for (let y = 0; y < DISPLAY_H; y++) {
    for (let x = 0; x < DISPLAY_W; x++) {
      const di = (y * DISPLAY_W + x) * 4;
      const r = data[di], g = data[di + 1], b = data[di + 2];
      const isRenderedTransparent = (r === bgColor.r && g === bgColor.g && b === bgColor.b);
      const sc = getScreenshotPixel(x, y);
      const isScreenshotTransparent = isBackground(sc);
      total++;
      if (isRenderedTransparent === isScreenshotTransparent) match++;
      else {
        if (!isRenderedTransparent && isScreenshotTransparent) renderedOnly++;
        if (isRenderedTransparent && !isScreenshotTransparent) screenshotOnly++;
      }
    }
  }
  console.log(`  透明度匹配率: ${(match/total*100).toFixed(1)}% (${match}/${total})`);
  console.log(`  误: 渲染非透明但截图透明=${renderedOnly}, 漏: 渲染透明但截图非透明=${screenshotOnly}`);

  return canvas;
}

console.log('=== 渲染对比 ===\n');

console.log('行主序 tile 解码:');
const canvasRM = renderImage(0x4000, 0xC000, tileCacheRM);
console.log('');

console.log('平面主序 tile 解码:');
const canvasPM = renderImage(0x4000, 0xC000, tileCachePM);

// 输出图片
const outCanvas = createCanvas(DISPLAY_W * 2 + 30, DISPLAY_H + 40);
const octx = outCanvas.getContext('2d');
octx.fillStyle = '#000';
octx.fillRect(0, 0, outCanvas.width, outCanvas.height);
octx.fillStyle = '#0f0';
octx.font = '12px monospace';
octx.fillText('Plane A=0x4000, Plane B=0xC000 | 行主序 | 平面主序', 10, 20);
octx.drawImage(canvasRM, 10, 30);
octx.drawImage(canvasPM, DISPLAY_W + 20, 30);

const OUT_PATH = join(DATA_DIR, 'output/correct-address-render.png');
writeFileSync(OUT_PATH, outCanvas.toBuffer('image/png'));
console.log(`\n输出: ${OUT_PATH}`);
