import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
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

const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) tileCache[i] = decodeTilePlaneMajor(i);

// 截图透明度
const screenshotTransparency = new Uint8Array(DISPLAY_W * DISPLAY_H);
for (let y = 0; y < DISPLAY_H; y++) {
  for (let x = 0; x < DISPLAY_W; x++) {
    const c = getScreenshotPixel(x, y);
    screenshotTransparency[y * DISPLAY_W + x] = isBackground(c) ? 0 : 1;
  }
}

console.log('=== Plane A vs Plane B 单独贡献分析 ===\n');

function renderPlaneTransparency(base) {
  const t = new Uint8Array(DISPLAY_W * DISPLAY_H);
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
            const dx = tx * 8 + px;
            const dy = ty * 8 + py;
            if (dx < DISPLAY_W && dy < DISPLAY_H) {
              t[dy * DISPLAY_W + dx] = 1;
            }
          }
        }
      }
    }
  }
  return t;
}

const planeA = renderPlaneTransparency(PLANE_A_BASE);
const planeB = renderPlaneTransparency(PLANE_B_BASE);

// 合并
const merged = new Uint8Array(DISPLAY_W * DISPLAY_H);
for (let i = 0; i < merged.length; i++) {
  merged[i] = (planeA[i] || planeB[i]) ? 1 : 0;
}

function stats(name, arr) {
  let match = 0, mismatch = 0;
  let renderedOnly = 0, screenshotOnly = 0;
  let totalFg = 0;
  for (let i = 0; i < arr.length; i++) {
    const r = arr[i];
    const s = screenshotTransparency[i];
    if (r === s) match++;
    else mismatch++;
    if (r === 1 && s === 0) renderedOnly++;
    if (r === 0 && s === 1) { screenshotOnly++; totalFg++; }
    if (s === 1) totalFg++;
  }
  const total = arr.length;
  console.log(`${name}:`);
  console.log(`  匹配率: ${(match/total*100).toFixed(1)}% (${match}/${total})`);
  console.log(`  渲染非透明=${arr.reduce((a,b)=>a+b,0)}, 截图非透明=${totalFg}`);
  console.log(`  仅渲染有(误): ${renderedOnly}, 仅截图有(漏): ${screenshotOnly}`);
  console.log('');
  return { match, mismatch, renderedOnly, screenshotOnly };
}

stats('Plane A 单独', planeA);
stats('Plane B 单独', planeB);
stats('Plane A + B 合并', merged);

// 区域分析
console.log('=== 区域分析 (Plane A+B 合并) ===\n');
const regions = [
  { name: '左上', x: 0, y: 0, w: 160, h: 112 },
  { name: '右上', x: 160, y: 0, w: 160, h: 112 },
  { name: '左下', x: 0, y: 112, w: 160, h: 112 },
  { name: '右下', x: 160, y: 112, w: 160, h: 112 },
  { name: '标题区', x: 32, y: 48, w: 256, h: 64 },
];

for (const r of regions) {
  let match = 0, total = 0;
  let renderedFg = 0, screenshotFg = 0;
  for (let y = r.y; y < r.y + r.h; y++) {
    for (let x = r.x; x < r.x + r.w; x++) {
      const idx = y * DISPLAY_W + x;
      if (merged[idx] === screenshotTransparency[idx]) match++;
      if (merged[idx]) renderedFg++;
      if (screenshotTransparency[idx]) screenshotFg++;
      total++;
    }
  }
  console.log(`${r.name} (${r.w}x${r.h}): 匹配率 ${(match/total*100).toFixed(1)}%, 渲染前景=${renderedFg}, 截图前景=${screenshotFg}`);
}

// 检查 Plane A 和 Plane B 的nametable内容分布
console.log('\n=== Plane A nametable 分布 ===');
let aPalStats = [0,0,0,0], aPriStats = [0,0];
let aTileRange = { min: 2047, max: 0 };
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_A_BASE, tx, ty);
    if (e.word === 0) continue;
    aPalStats[e.palette]++;
    aPriStats[e.priority]++;
    if (e.tileIdx < aTileRange.min) aTileRange.min = e.tileIdx;
    if (e.tileIdx > aTileRange.max) aTileRange.max = e.tileIdx;
  }
}
console.log(`  调色板: pal0=${aPalStats[0]}, pal1=${aPalStats[1]}, pal2=${aPalStats[2]}, pal3=${aPalStats[3]}`);
console.log(`  优先级: 低=${aPriStats[0]}, 高=${aPriStats[1]}`);
console.log(`  Tile: ${aTileRange.min}-${aTileRange.max}`);

console.log('\n=== Plane B nametable 分布 ===');
let bPalStats = [0,0,0,0], bPriStats = [0,0];
let bTileRange = { min: 2047, max: 0 };
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (e.word === 0) continue;
    bPalStats[e.palette]++;
    bPriStats[e.priority]++;
    if (e.tileIdx < bTileRange.min) bTileRange.min = e.tileIdx;
    if (e.tileIdx > bTileRange.max) bTileRange.max = e.tileIdx;
  }
}
console.log(`  调色板: pal0=${bPalStats[0]}, pal1=${bPalStats[1]}, pal2=${bPalStats[2]}, pal3=${bPalStats[3]}`);
console.log(`  优先级: 低=${bPriStats[0]}, 高=${bPriStats[1]}`);
console.log(`  Tile: ${bTileRange.min}-${bTileRange.max}`);

// 检查VRAM dump起始位置的内容
console.log('\n=== VRAM dump 起始位置验证 ===');
console.log(`VRAM 总大小: ${vram.length} 字节 = 0x${vram.length.toString(16)}`);
console.log(`Plane A @ 0xC000: 字节 0x${vram[0xC000].toString(16).padStart(2,'0')} 0x${vram[0xC001].toString(16).padStart(2,'0')}`);
console.log(`Plane B @ 0xE000: 字节 0x${vram[0xE000].toString(16).padStart(2,'0')} 0x${vram[0xE001].toString(16).padStart(2,'0')}`);

// 检查 nametable 是否是空的全0
console.log('\n=== 检查各区域非空字节数 ===');
function countNonZero(start, end) {
  let c = 0;
  for (let i = start; i < end; i++) if (vram[i] !== 0) c++;
  return c;
}
console.log(`Plane A区 (0xC000-0xFFFF): ${countNonZero(0xC000, 0x10000)} 非零字节`);
console.log(`Plane B区 (0xE000-0xFFFF): ${countNonZero(0xE000, 0x10000)} 非零字节`);

// 重要：检查VRAM是否真的有 0xE000 之上的内容
console.log('\n=== 检查 VRAM dump 实际有效范围 ===');
let lastNonZero = 0;
for (let i = vram.length - 1; i >= 0; i--) {
  if (vram[i] !== 0) {
    lastNonZero = i;
    break;
  }
}
console.log(`VRAM 最后非零字节偏移: 0x${lastNonZero.toString(16)} (共 ${(lastNonZero+1).toString(16)} 字节)`);
