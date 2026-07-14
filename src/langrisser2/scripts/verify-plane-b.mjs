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

console.log('=== Plane B 渲染验证 ===');
console.log('');

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

function decodeTile(tileIdx) {
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

const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) {
  tileCache[i] = decodeTile(i);
}

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
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
    word
  };
}

const PAL_OFFSETS = [0, 16, 32, 48];

function renderPlaneToCanvas(base) {
  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0; data[i+1] = 0; data[i+2] = 0; data[i+3] = 0;
  }

  let entryCount = 0;
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word === 0) continue;
      entryCount++;
      const tp = tileCache[e.tileIdx] || tileCache[0];
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
  ctx.putImageData(imgData, 0, 0);
  return { canvas, entryCount };
}

console.log('VDP寄存器配置 (来自 execution-trace.md):');
console.log('  R2 = 0x30 → Plane A = (0x30 & 0x38) << 10 = 0xC000');
console.log('  R4 = 0x07 → Plane B = (0x07 & 0x07) << 13 = 0xE000');
console.log('');

const testAddresses = [
  { name: 'Plane A (R2=0x30)', addr: 0xC000 },
  { name: 'Plane B (R4=0x07)', addr: 0xE000 },
  { name: '错误地址 0x4000', addr: 0x4000 },
  { name: '错误地址 0xC000(当前PlaneB)', addr: 0xC000 },
];

const combinedCanvas = createCanvas(DISPLAY_W * 2, DISPLAY_H * 2);
const cctx = combinedCanvas.getContext('2d');
cctx.fillStyle = '#000';
cctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

let idx = 0;
for (const test of testAddresses) {
  const { canvas, entryCount } = renderPlaneToCanvas(test.addr);
  const x = (idx % 2) * DISPLAY_W;
  const y = Math.floor(idx / 2) * DISPLAY_H;
  cctx.drawImage(canvas, x, y);
  
  cctx.fillStyle = '#0f0';
  cctx.font = '12px monospace';
  cctx.fillText(`${test.name}: 0x${test.addr.toString(16).toUpperCase()}`, x + 5, y + 15);
  cctx.fillText(`非空条目: ${entryCount}`, x + 5, y + 30);
  console.log(`${test.name}: addr=0x${test.addr.toString(16).toUpperCase()}, 非空条目=${entryCount}`);
  
  idx++;
}

const OUT_PATH = join(DATA_DIR, 'output/plane-b-verify.png');
writeFileSync(OUT_PATH, combinedCanvas.toBuffer('image/png'));
console.log(`\n输出: ${OUT_PATH}`);

console.log('');
console.log('=== 深入分析: Plane B (0xE000) 的nametable内容 ===');
const planeBAddr = 0xE000;
let paletteStats = [0, 0, 0, 0];
let tileRange = { min: 2047, max: 0 };
for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const e = readNametableEntry(planeBAddr, tx, ty);
    if (e.word === 0) continue;
    paletteStats[e.palette]++;
    if (e.tileIdx < tileRange.min) tileRange.min = e.tileIdx;
    if (e.tileIdx > tileRange.max) tileRange.max = e.tileIdx;
  }
}
console.log(`调色板使用: pal0=${paletteStats[0]}, pal1=${paletteStats[1]}, pal2=${paletteStats[2]}, pal3=${paletteStats[3]}`);
console.log(`Tile索引范围: ${tileRange.min}-${tileRange.max}`);

console.log('');
console.log('=== 对比模拟器截图 ===');
const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const width = bmpBuf.readInt32LE(18);
const height = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((width * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = height > 0 ? (height - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return { r: bmpBuf[srcOff + 2], g: bmpBuf[srcOff + 1], b: bmpBuf[srcOff + 0] };
}

const centerX = 160, centerY = 112;
console.log(`截图中心区域 (${centerX},${centerY}):`);
const centerPixel = getScreenshotPixel(centerX, centerY);
console.log(`  rgb(${centerPixel.r},${centerPixel.g},${centerPixel.b})`);

const titleArea = [];
for (let py = 0; py < 32; py++) {
  for (let px = 0; px < 64; px++) {
    const c = getScreenshotPixel(80 + px, 40 + py);
    if (c.r + c.g + c.b > 10) titleArea.push(c);
  }
}
if (titleArea.length > 0) {
  const avgR = Math.round(titleArea.reduce((a,b)=>a+b.r,0)/titleArea.length);
  const avgG = Math.round(titleArea.reduce((a,b)=>a+b.g,0)/titleArea.length);
  const avgB = Math.round(titleArea.reduce((a,b)=>a+b.b,0)/titleArea.length);
  console.log(`标题区域平均颜色: rgb(${avgR},${avgG},${avgB})`);
}

console.log('');
console.log('=== CRAM调色板预览 ===');
for (let pal = 0; pal < 4; pal++) {
  process.stdout.write(`调色板${pal} [${pal * 16}-${pal * 16 + 15}]: `);
  for (let i = 0; i < 16; i++) {
    const c = palette[pal * 16 + i];
    process.stdout.write(`rgb(${c.r},${c.g},${c.b}) `);
  }
  console.log('');
}
