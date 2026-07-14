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

// 背景色 rgb(0,0,72) - 允许一定容差
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

// 三种 tile 解码方式
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

function decodeTileRowMajorSwapped(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset + 1];
    const p1 = vram[rowOffset];
    const p2 = vram[rowOffset + 3];
    const p3 = vram[rowOffset + 2];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

// 渲染透明度图: 1=非透明(有tile), 0=透明(背景)
function renderTransparency(decoder) {
  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decoder(i);
  
  const transparency = new Uint8Array(DISPLAY_W * DISPLAY_H);
  
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
              const dx = tx * 8 + px;
              const dy = ty * 8 + py;
              if (dx < DISPLAY_W && dy < DISPLAY_H) {
                transparency[dy * DISPLAY_W + dx] = 1;
              }
            }
          }
        }
      }
    }
  }
  
  renderPlane(PLANE_B_BASE);
  renderPlane(PLANE_A_BASE);
  
  return transparency;
}

// 截图的透明度图
const screenshotTransparency = new Uint8Array(DISPLAY_W * DISPLAY_H);
for (let y = 0; y < DISPLAY_H; y++) {
  for (let x = 0; x < DISPLAY_W; x++) {
    const c = getScreenshotPixel(x, y);
    screenshotTransparency[y * DISPLAY_W + x] = isBackground(c) ? 0 : 1;
  }
}

console.log('=== 透明度模式对比 (不受调色板影响) ===');
console.log('');

const decoders = [
  { name: '行主序', fn: decodeTileRowMajor },
  { name: '平面主序', fn: decodeTilePlaneMajor },
  { name: '行主序+字节交换', fn: decodeTileRowMajorSwapped },
];

let bestMatch = 0;
let bestDecoder = '';

for (const { name, fn } of decoders) {
  const rendered = renderTransparency(fn);
  
  let match = 0;
  let mismatch = 0;
  let bgMatch = 0;
  let fgMatch = 0;
  let bgTotal = 0;
  let fgTotal = 0;
  
  for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
    const rendered_t = rendered[i];
    const screenshot_t = screenshotTransparency[i];
    
    if (rendered_t === screenshot_t) {
      match++;
      if (screenshot_t === 0) bgMatch++;
      else fgMatch++;
    } else {
      mismatch++;
    }
    
    if (screenshot_t === 0) bgTotal++;
    else fgTotal++;
  }
  
  const total = DISPLAY_W * DISPLAY_H;
  const matchRate = (match / total * 100).toFixed(1);
  
  console.log(`${name}:`);
  console.log(`  总匹配率: ${matchRate}% (${match}/${total})`);
  console.log(`  背景匹配: ${bgMatch}/${bgTotal} (${(bgMatch/bgTotal*100).toFixed(1)}%)`);
  console.log(`  前景匹配: ${fgMatch}/${fgTotal} (${(fgMatch/fgTotal*100).toFixed(1)}%)`);
  console.log(`  误判: 渲染透明但截图非透明=${mismatch - (fgTotal - fgMatch)} / 渲染非透明但截图透明=${fgTotal - fgMatch}`);
  console.log('');
  
  if (match > bestMatch) {
    bestMatch = match;
    bestDecoder = name;
  }
}

console.log(`✅ 最佳解码方式: ${bestDecoder} (${(bestMatch/(DISPLAY_W*DISPLAY_H)*100).toFixed(1)}%)`);

// 生成可视化对比图
const visCanvas = createCanvas(DISPLAY_W * 4 + 50, DISPLAY_H + 60);
const vctx = visCanvas.getContext('2d');
vctx.fillStyle = '#000';
vctx.fillRect(0, 0, visCanvas.width, visCanvas.height);
vctx.fillStyle = '#0f0';
vctx.font = '12px monospace';
vctx.fillText('截图透明度 | 行主序 | 平面主序 | 行主序+交换', 10, 20);

// 截图透明度
const scImg = vctx.createImageData(DISPLAY_W, DISPLAY_H);
for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
  const t = screenshotTransparency[i];
  scImg.data[i * 4] = t ? 255 : 0;
  scImg.data[i * 4 + 1] = t ? 255 : 0;
  scImg.data[i * 4 + 2] = t ? 255 : 0;
  scImg.data[i * 4 + 3] = 255;
}
vctx.putImageData(scImg, 10, 40);

// 三种解码方式
for (let d = 0; d < 3; d++) {
  const rendered = renderTransparency(decoders[d].fn);
  const img = vctx.createImageData(DISPLAY_W, DISPLAY_H);
  for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
    const t = rendered[i];
    const sc = screenshotTransparency[i];
    // 绿色=匹配, 红色=不匹配
    if (t === sc) {
      img.data[i * 4] = t ? 255 : 0;
      img.data[i * 4 + 1] = t ? 255 : 0;
      img.data[i * 4 + 2] = 0;
    } else {
      img.data[i * 4] = 255;
      img.data[i * 4 + 1] = 0;
      img.data[i * 4 + 2] = 0;
    }
    img.data[i * 4 + 3] = 255;
  }
  vctx.putImageData(img, 10 + (d + 1) * (DISPLAY_W + 10), 40);
}

const OUT_PATH = join(DATA_DIR, 'output/transparency-compare.png');
writeFileSync(OUT_PATH, visCanvas.toBuffer('image/png'));
console.log(`\n可视化对比图: ${OUT_PATH}`);

// 检查 CRAM dump 第二半 (entries 64-127)
console.log('\n=== CRAM dump 完整检查 ===');
console.log(`CRAM 大小: ${cram.length} 字节 = ${cram.length/2} 个 word`);
console.log('\n第二半 (entries 64-127):');
for (let pal = 4; pal < 8; pal++) {
  console.log(`\n调色板 ${pal} (CRAM[${pal*16}-${pal*16+15}]):`);
  for (let i = 0; i < 16; i++) {
    const idx = pal * 16 + i;
    const word = (cram[idx * 2 + 1] << 8) | cram[idx * 2];
    const r = (word & 0x07) * 36;
    const g = ((word >> 3) & 0x07) * 36;
    const b = ((word >> 6) & 0x07) * 36;
    console.log(`  [${i}] word=0x${word.toString(16).padStart(4,'0')} → rgb(${r}, ${g}, ${b})`);
  }
}

// 检查第一半和第二半是否相同
let same = true;
for (let i = 0; i < 128; i++) {
  if (cram[i] !== cram[i + 128]) {
    same = false;
    break;
  }
}
console.log(`\n前128字节和后128字节${same ? '相同' : '不同'}`);

// 搜索 CRAM 中的特定颜色
console.log('\n=== 搜索截图中的关键颜色 ===');
const targetColors = [
  { name: 'rgb(36,0,0)', targetWord: 0x0001 },   // R=1
  { name: 'rgb(108,0,0)', targetWord: 0x0003 },   // R=3
  { name: 'rgb(216,216,216)', targetWord: 0x01B6 }, // R=G=B=6
  { name: 'rgb(252,252,252)', targetWord: 0x01FF }, // R=G=B=7
];

for (const { name, targetWord } of targetColors) {
  let found = false;
  for (let i = 0; i < 128; i++) {
    const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
    if (word === targetWord) {
      console.log(`${name}: 找到在 CRAM[${i}]`);
      found = true;
      break;
    }
  }
  if (!found) {
    console.log(`${name}: 未找到 (target word=0x${targetWord.toString(16)})`);
  }
}
