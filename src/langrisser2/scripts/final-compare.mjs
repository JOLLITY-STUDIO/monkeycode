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
const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;

// === 三种Tile解码方式 ===
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
    // 字节交换: [0,1,2,3] → [1,0,3,2]
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

function renderWithDecoder(decoder, label) {
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
  
  // 计算平均颜色差异
  let totalDiff = 0, count = 0;
  let titleDiff = 0, titleCount = 0;
  
  for (let y = 0; y < DISPLAY_H; y++) {
    for (let x = 0; x < DISPLAY_W; x++) {
      const rd = ctx.getImageData(x, y, 1, 1).data;
      const sc = getScreenshotPixel(x, y);
      const diff = Math.abs(rd[0] - sc.r) + Math.abs(rd[1] - sc.g) + Math.abs(rd[2] - sc.b);
      totalDiff += diff;
      count++;
      
      // 标题区域
      if (x >= 32 && x < 160 && y >= 48 && y < 112) {
        titleDiff += diff;
        titleCount++;
      }
    }
  }
  
  console.log(`${label}:`);
  console.log(`  全屏平均差异: ${(totalDiff/count).toFixed(1)}`);
  console.log(`  标题区域平均差异: ${(titleDiff/titleCount).toFixed(1)}`);
  
  return canvas;
}

console.log('=== 三种Tile解码方式对比 ===');
console.log('');

const canvas1 = renderWithDecoder(decodeTileRowMajor, '行主序');
const canvas2 = renderWithDecoder(decodeTilePlaneMajor, '平面主序');
const canvas3 = renderWithDecoder(decodeTileRowMajorSwapped, '行主序+字节交换');

// 创建4列对比图: 行主序 | 平面主序 | 行主序+交换 | 截图
const compareCanvas = createCanvas(DISPLAY_W * 4 + 50, DISPLAY_H + 60);
const cctx = compareCanvas.getContext('2d');
cctx.fillStyle = '#000';
cctx.fillRect(0, 0, compareCanvas.width, compareCanvas.height);
cctx.fillStyle = '#0f0';
cctx.font = '12px monospace';
cctx.fillText('行主序 | 平面主序 | 行主序+字节交换 | 模拟器截图', 10, 20);

cctx.drawImage(canvas1, 10, 40);
cctx.drawImage(canvas2, DISPLAY_W + 20, 40);
cctx.drawImage(canvas3, DISPLAY_W * 2 + 30, 40);

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
cctx.drawImage(scCanvas, DISPLAY_W * 3 + 40, 40);

writeFileSync(join(DATA_DIR, 'output/tile-format-full-compare.png'), compareCanvas.toBuffer('image/png'));
console.log('');
console.log('对比图: tile-format-full-compare.png');

// === 额外验证: 检查VRAM是否byte-swapped ===
console.log('');
console.log('=== VRAM字节序验证 ===');
console.log('');

// 检查Plane A nametable条目
const addr = PLANE_A_BASE + (8 * 64 + 6) * 2; // 位置(6,8)
const b0 = vram[addr];
const b1 = vram[addr + 1];

console.log(`Plane A nametable (6,8) at 0x${addr.toString(16)}:`);
console.log(`  字节: 0x${b0.toString(16).padStart(2,'0')} 0x${b1.toString(16).padStart(2,'0')}`);
console.log(`  小端序: word=0x${(((b1 << 8) | b0)).toString(16).padStart(4,'0')}`);
console.log(`  大端序: word=0x${(((b0 << 8) | b1)).toString(16).padStart(4,'0')}`);

const wordLE = (b1 << 8) | b0;
const wordBE = (b0 << 8) | b1;

console.log(`  小端序: tile=${wordLE & 0x7FF}, pal=${(wordLE >> 13) & 3}, pri=${(wordLE >> 15) & 1}`);
console.log(`  大端序: tile=${wordBE & 0x7FF}, pal=${(wordBE >> 13) & 3}, pri=${(wordBE >> 15) & 1}`);

// Plane A应该有高优先级条目 (pri=1)
// 小端序: pri = (0x69d8 >> 15) & 1 = 0 (低优先级) ← 这不对,Plane A应该是高优先级
// 大端序: pri = (0xd869 >> 15) & 1 = 1 (高优先级) ← 这才对!

console.log('');
console.log('关键推理:');
console.log('  Plane A 应该是高优先级 (标题文字在上层)');
console.log('  Plane B 应该是低优先级 (背景图案在下层)');
console.log('');

// 重新检查所有Plane A条目的优先级
let lePriHigh = 0, lePriLow = 0;
let bePriHigh = 0, bePriLow = 0;
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const a = PLANE_A_BASE + (ty * 64 + tx) * 2;
    const lo = vram[a], hi = vram[a + 1];
    const wLE = (hi << 8) | lo;
    const wBE = (lo << 8) | hi;
    if (wLE !== 0) {
      if ((wLE >> 15) & 1) lePriHigh++; else lePriLow++;
    }
    if (wBE !== 0) {
      if ((wBE >> 15) & 1) bePriHigh++; else bePriLow++;
    }
  }
}

console.log(`Plane A 小端序: 高优先级=${lePriHigh}, 低优先级=${lePriLow}`);
console.log(`Plane A 大端序: 高优先级=${bePriHigh}, 低优先级=${bePriLow}`);

// 同样检查Plane B
let lePriHighB = 0, lePriLowB = 0;
let bePriHighB = 0, bePriLowB = 0;
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const a = PLANE_B_BASE + (ty * 64 + tx) * 2;
    const lo = vram[a], hi = vram[a + 1];
    const wLE = (hi << 8) | lo;
    const wBE = (lo << 8) | hi;
    if (wLE !== 0) {
      if ((wLE >> 15) & 1) lePriHighB++; else lePriLowB++;
    }
    if (wBE !== 0) {
      if ((wBE >> 15) & 1) bePriHighB++; else bePriLowB++;
    }
  }
}

console.log(`Plane B 小端序: 高优先级=${lePriHighB}, 低优先级=${lePriLowB}`);
console.log(`Plane B 大端序: 高优先级=${bePriHighB}, 低优先级=${bePriLowB}`);

console.log('');
if (lePriHigh > lePriLow && lePriLowB > lePriHighB) {
  console.log('✅ 小端序正确: Plane A高优先级, Plane B低优先级');
} else if (bePriHigh > bePriLow && bePriLowB > bePriHighB) {
  console.log('✅ 大端序正确: Plane A高优先级, Plane B低优先级');
} else {
  console.log('⚠️ 无法确定字节序');
}
