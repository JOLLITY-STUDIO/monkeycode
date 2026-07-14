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

// === 截图 ===
const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
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

// === Tile解码: 行主序 vs 平面主序 对比 ===
function decodeTileRowMajor(tileIdx) {
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
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

// 检查(160,80)位置 = tile(20,10) 
// 检查(48,100)位置 = tile(6,12)
const PLANE_B_BASE = 0xE000;
const PLANE_A_BASE = 0xC000;

function readNametableEntryLE(base, tx, ty) {
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

console.log('=== 检查问题像素位置的tile数据 ===');
console.log('');

// (160, 80) = tile col=20, row=10, pixel within tile: (0, 0)
// (48, 100) = tile col=6, row=12, pixel within tile: (0, 4)

const checkPositions = [
  { sx: 160, sy: 80, tx: 20, ty: 10, px: 0, py: 0, desc: '(160,80)' },
  { sx: 48, sy: 100, tx: 6, ty: 12, px: 0, py: 4, desc: '(48,100)' },
];

for (const pos of checkPositions) {
  console.log(`位置 ${pos.desc} → tile(${pos.tx},${pos.ty}), 像素(${pos.px},${pos.py})`);
  
  const ea = readNametableEntryLE(PLANE_A_BASE, pos.tx, pos.ty);
  const eb = readNametableEntryLE(PLANE_B_BASE, pos.tx, pos.ty);
  
  console.log(`  Plane A: tile=${ea.tileIdx}, pal=${ea.palette}, pri=${ea.priority}, hflip=${ea.hflip}, vflip=${ea.vflip}`);
  console.log(`  Plane B: tile=${eb.tileIdx}, pal=${eb.palette}, pri=${eb.priority}, hflip=${eb.hflip}, vflip=${eb.vflip}`);
  
  // 行主序解码
  const tileA_row = decodeTileRowMajor(ea.tileIdx);
  const tileB_row = decodeTileRowMajor(eb.tileIdx);
  
  // 平面主序解码
  const tileA_plane = decodeTilePlaneMajor(ea.tileIdx);
  const tileB_plane = decodeTilePlaneMajor(eb.tileIdx);
  
  // 计算实际像素位置 (考虑翻转)
  const srcX = ea.hflip ? (7 - pos.px) : pos.px;
  const srcY = ea.vflip ? (7 - pos.py) : pos.py;
  const srcXb = eb.hflip ? (7 - pos.px) : pos.px;
  const srcYb = eb.vflip ? (7 - pos.py) : pos.py;
  
  console.log(`  Plane A 像素值: 行主序=${tileA_row[srcY * 8 + srcX]}, 平面主序=${tileA_plane[srcY * 8 + srcX]}`);
  console.log(`  Plane B 像素值: 行主序=${tileB_row[srcYb * 8 + srcXb]}, 平面主序=${tileB_plane[srcYb * 8 + srcXb]}`);
  
  const sc = getScreenshotPixel(pos.sx, pos.sy);
  console.log(`  截图颜色: rgb(${sc.r},${sc.g},${sc.b})`);
  console.log('');
}

// === 对比行主序 vs 平面主序的完整渲染 ===
console.log('=== 行主序 vs 平面主序 渲染对比 ===');
console.log('');

function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) palette.push(decodeCRAM(i));

const bgColor = palette[4];
const PAL_OFFSETS = [0, 16, 32, 48];
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;

function renderWithTileDecoder(decoder, label) {
  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decoder(i);
  
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
  
  // 渲染: 低优先级B → 低优先级A → 高优先级B → 高优先级A
  function renderPlane(base, priority) {
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const e = readNametableEntryLE(base, tx, ty);
        if (e.word === 0 || e.priority !== priority) continue;
        const tp = tileCache[e.tileIdx] || tileCache[0];
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const srcX = e.hflip ? (7 - px) : px;
            const srcY = e.vflip ? (7 - py) : py;
            const ci = tp[srcY * 8 + srcX];
            if (ci !== 0) {
              const c = palette[PAL_OFFSETS[e.palette] + ci];
              const di = ((ty * 8 + py) * DISPLAY_W + (tx * 8 + px)) * 4;
              data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b;
            }
          }
        }
      }
    }
  }
  
  renderPlane(PLANE_B_BASE, 0);
  renderPlane(PLANE_A_BASE, 0);
  renderPlane(PLANE_B_BASE, 1);
  renderPlane(PLANE_A_BASE, 1);
  
  ctx.putImageData(imgData, 0, 0);
  
  // 计算标题区域平均颜色
  const titleData = ctx.getImageData(80, 48, 128, 32);
  const td = titleData.data;
  let sumR = 0, sumG = 0, sumB = 0;
  for (let i = 0; i < td.length; i += 4) {
    sumR += td[i]; sumG += td[i+1]; sumB += td[i+2];
  }
  const count = td.length / 4;
  console.log(`${label} - 标题区域平均: rgb(${Math.round(sumR/count)},${Math.round(sumG/count)},${Math.round(sumB/count)})`);
  
  return canvas;
}

const canvasRow = renderWithTileDecoder(decodeTileRowMajor, '行主序');
const canvasPlane = renderWithTileDecoder(decodeTilePlaneMajor, '平面主序');

// 创建对比图
const compareCanvas = createCanvas(DISPLAY_W * 3 + 40, DISPLAY_H + 60);
const cctx = compareCanvas.getContext('2d');
cctx.fillStyle = '#000';
cctx.fillRect(0, 0, compareCanvas.width, compareCanvas.height);
cctx.fillStyle = '#0f0';
cctx.font = '12px monospace';
cctx.fillText('行主序(4B/行) | 平面主序(8B/平面) | 模拟器截图', 10, 20);

cctx.drawImage(canvasRow, 10, 40);
cctx.drawImage(canvasPlane, DISPLAY_W + 20, 40);

// 截图
const scCanvas = createCanvas(bmpWidth, Math.abs(bmpHeight));
const sctx = scCanvas.getContext('2d');
const scData = sctx.createImageData(bmpWidth, Math.abs(bmpHeight));
for (let y = 0; y < Math.abs(bmpHeight); y++) {
  for (let x = 0; x < bmpWidth; x++) {
    const c = getScreenshotPixel(x, y);
    const di = (y * bmpWidth + x) * 4;
    scData.data[di] = c.r;
    scData.data[di + 1] = c.g;
    scData.data[di + 2] = c.b;
    scData.data[di + 3] = 255;
  }
}
sctx.putImageData(scData, 0, 0);
cctx.drawImage(scCanvas, DISPLAY_W * 2 + 30, 40);

writeFileSync(join(DATA_DIR, 'output/tile-format-compare.png'), compareCanvas.toBuffer('image/png'));
console.log('');
console.log('对比图已保存: tile-format-compare.png');

// === 额外检查: VRAM中0xE000区域的数据模式 ===
console.log('');
console.log('=== VRAM Plane B (0xE000) 数据模式检查 ===');
console.log('');

// 检查是否所有Plane B条目都是连续的tile索引
let prevTile = -1;
let isSequential = true;
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntryLE(PLANE_B_BASE, tx, ty);
    if (e.word === 0) continue;
    if (e.tileIdx === 472) continue; // 跳过空tile
    if (prevTile !== -1 && e.tileIdx !== prevTile + 1 && e.tileIdx !== prevTile - 1) {
      // 不连续，但这可能是正常的
    }
    prevTile = e.tileIdx;
  }
}

// 统计所有tile索引
const tileIndices = new Set();
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntryLE(PLANE_B_BASE, tx, ty);
    if (e.word === 0) continue;
    tileIndices.add(e.tileIdx);
  }
}
console.log(`Plane B 使用的不同tile数量: ${tileIndices.size}`);
console.log(`Tile索引范围: ${Math.min(...tileIndices)} - ${Math.max(...tileIndices)}`);

// 检查空tile (472) 出现的频率
let emptyTileCount = 0;
for (const idx of tileIndices) {
  const tile = decodeTileRowMajor(idx);
  let allZero = true;
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) { allZero = false; break; }
  }
  if (allZero) emptyTileCount++;
}
console.log(`全空tile数量: ${emptyTileCount}`);
