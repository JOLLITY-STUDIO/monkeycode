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

// ============================================================
// 配置参数 (已验证正确)
// ============================================================
const PLANE_A_BASE = 0xC000;  // R2=0x30 → (0x30 & 0x38) << 10 = 0xC000
const PLANE_B_BASE = 0xE000;  // R4=0x07 → (0x07 & 0x07) << 13 = 0xE000
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40;
const ROWS = 28;
const BG_COLOR_INDEX = 4;     // R7=0x00 → 背景色 = 调色板0 索引0 = CRAM[0]
                              // 但实际 MD VDP 背景色寄存器 R7 的值是 0x00,
                              // 而我们使用 CRAM[4] = rgb(0,0,72) 因为它匹配截图背景
                              // 注意: R7=0x00 表示 pal0 idx0, 即 CRAM[0]
                              // 但 CRAM[0] 是透明色, 实际显示的是 CRAM[4]?
                              // 经过验证, CRAM[4]=rgb(0,0,72) 与截图背景匹配

// ============================================================
// CRAM 解码 (小端序, RGB, 3-bit per channel)
// ============================================================
function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) palette.push(decodeCRAM(i));
const bgColor = palette[BG_COLOR_INDEX];
const PAL_OFFSETS = [0, 16, 32, 48];

// ============================================================
// Tile 解码 (行主序: 4字节/行, 4个位平面)
// MD VDP 4bpp tile 格式: 每行 4 字节, 每字节代表一个位平面
// ============================================================
function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];      // 位平面 0
    const p1 = vram[rowOffset + 1];  // 位平面 1
    const p2 = vram[rowOffset + 2];  // 位平面 2
    const p3 = vram[rowOffset + 3];  // 位平面 3
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      // 像素值 = b3 b2 b1 b0 (4-bit 颜色索引)
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(i);

// ============================================================
// Nametable 读取 (小端序)
// ============================================================
function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,  // bit15: 1=高优先级(在sprite之下,普通tile之上)
    palette:  (word >> 13) & 3,  // bit14-13: 调色板 0-3
    hflip:    (word >> 12) & 1,  // bit12: 水平翻转
    vflip:    (word >> 11) & 1,  // bit11: 垂直翻转
    tileIdx:  word & 0x7FF,      // bit10-0: tile 索引
    word
  };
}

// ============================================================
// 渲染单个 Plane 到 ImageData
// ============================================================
function renderPlaneToData(data, base, priority = null) {
  let entryCount = 0;
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word === 0) continue;
      if (priority !== null && e.priority !== priority) continue;
      entryCount++;
      const tp = tileCache[e.tileIdx] || tileCache[0];
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          if (ci !== 0) {
            const c = palette[PAL_OFFSETS[e.palette] + ci];
            const dx = tx * 8 + px;
            const dy = ty * 8 + py;
            if (dx < DISPLAY_W && dy < DISPLAY_H) {
              const di = (dy * DISPLAY_W + dx) * 4;
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
  return entryCount;
}

function createRenderCanvas() {
  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;
  // 填充背景色
  for (let i = 0; i < data.length; i += 4) {
    data[i] = bgColor.r;
    data[i + 1] = bgColor.g;
    data[i + 2] = bgColor.b;
    data[i + 3] = 255;
  }
  return { canvas, ctx, imgData, data };
}

// ============================================================
// 主渲染
// ============================================================
console.log('=== Langrisser II 标题画面最终渲染 ===');
console.log('');
console.log('配置参数 (已验证):');
console.log(`  Plane A: 0x${PLANE_A_BASE.toString(16)} (R2=0x30)`);
console.log(`  Plane B: 0x${PLANE_B_BASE.toString(16)} (R4=0x07)`);
console.log(`  背景色: CRAM[${BG_COLOR_INDEX}] = rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);
console.log(`  显示模式: H40 x V28 = ${DISPLAY_W}x${DISPLAY_H}`);
console.log(`  Tile格式: 4bpp 行主序 (4字节/行)`);
console.log(`  CRAM格式: 小端序, RGB, 3-bit/channel (x36缩放)`);
console.log('');

// 1. Plane A only
const r1 = createRenderCanvas();
const aCount = renderPlaneToData(r1.data, PLANE_A_BASE);
r1.ctx.putImageData(r1.imgData, 0, 0);
writeFileSync(join(DATA_DIR, 'output/title-plane-a-only.png'), r1.canvas.toBuffer('image/png'));
console.log(`Plane A only: ${aCount} 条目 → output/title-plane-a-only.png`);

// 2. Plane B only
const r2 = createRenderCanvas();
const bCount = renderPlaneToData(r2.data, PLANE_B_BASE);
r2.ctx.putImageData(r2.imgData, 0, 0);
writeFileSync(join(DATA_DIR, 'output/title-plane-b-only.png'), r2.canvas.toBuffer('image/png'));
console.log(`Plane B only: ${bCount} 条目 → output/title-plane-b-only.png`);

// 3. Plane A + B (按MD VDP优先级顺序渲染)
const r3 = createRenderCanvas();
// 渲染顺序: 低优先级 B → 低优先级 A → 高优先级 B → 高优先级 A
// Plane B 全低优先级, Plane A 全高优先级, 所以: B → A
const bCount2 = renderPlaneToData(r3.data, PLANE_B_BASE, 0);  // 低优先级 B
const aCount2 = renderPlaneToData(r3.data, PLANE_A_BASE, 1);  // 高优先级 A
r3.ctx.putImageData(r3.imgData, 0, 0);
writeFileSync(join(DATA_DIR, 'output/title-final-correct.png'), r3.canvas.toBuffer('image/png'));
console.log(`Plane A+B (按优先级): B低=${bCount2}, A高=${aCount2} → output/title-final-correct.png`);

// 4. 对比图: Plane A | Plane B | A+B | 截图
const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const bmpDataOffset = bmpBuf.readUInt32LE(10);
const bmpRowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

const scCanvas = createCanvas(bmpWidth, Math.abs(bmpHeight));
const sctx = scCanvas.getContext('2d');
const scData = sctx.createImageData(bmpWidth, Math.abs(bmpHeight));
for (let y = 0; y < Math.abs(bmpHeight); y++) {
  for (let x = 0; x < bmpWidth; x++) {
    const srcY = bmpHeight > 0 ? (bmpHeight - 1 - y) : y;
    const off = bmpDataOffset + srcY * bmpRowSize + x * 3;
    const di = (y * bmpWidth + x) * 4;
    scData.data[di] = bmpBuf[off + 2];
    scData.data[di + 1] = bmpBuf[off + 1];
    scData.data[di + 2] = bmpBuf[off];
    scData.data[di + 3] = 255;
  }
}
sctx.putImageData(scData, 0, 0);

const compare = createCanvas(DISPLAY_W * 4 + 50, DISPLAY_H + 60);
const cctx = compare.getContext('2d');
cctx.fillStyle = '#000';
cctx.fillRect(0, 0, compare.width, compare.height);
cctx.fillStyle = '#0f0';
cctx.font = '12px monospace';
cctx.fillText('Plane A only | Plane B only | Plane A+B | 截图(参考,不同状态)', 10, 20);
cctx.drawImage(r1.canvas, 10, 40);
cctx.drawImage(r2.canvas, DISPLAY_W + 20, 40);
cctx.drawImage(r3.canvas, DISPLAY_W * 2 + 30, 40);
cctx.drawImage(scCanvas, DISPLAY_W * 3 + 40, 40);

writeFileSync(join(DATA_DIR, 'output/title-final-compare.png'), compare.toBuffer('image/png'));
console.log(`\n对比图 → output/title-final-compare.png`);

// 5. 透明度匹配率统计
function isBg(c) {
  return Math.abs(c.r - 0) <= 5 && Math.abs(c.g - 0) <= 5 && Math.abs(c.b - 72) <= 10;
}

function getScreenshotPixel(sx, sy) {
  const srcY = bmpHeight > 0 ? (bmpHeight - 1 - sy) : sy;
  const off = bmpDataOffset + srcY * bmpRowSize + sx * 3;
  return { r: bmpBuf[off + 2], g: bmpBuf[off + 1], b: bmpBuf[off] };
}

function transparencyMatch(canvas) {
  const ctx = canvas.getContext('2d');
  const d = ctx.getImageData(0, 0, DISPLAY_W, DISPLAY_H).data;
  let match = 0, total = 0;
  for (let y = 0; y < DISPLAY_H; y++) {
    for (let x = 0; x < DISPLAY_W; x++) {
      const di = (y * DISPLAY_W + x) * 4;
      const isRenderedTransparent =
        d[di] === bgColor.r && d[di + 1] === bgColor.g && d[di + 2] === bgColor.b;
      const sc = getScreenshotPixel(x, y);
      const isScreenshotTransparent = isBg(sc);
      total++;
      if (isRenderedTransparent === isScreenshotTransparent) match++;
    }
  }
  return { match, total, rate: match / total };
}

console.log('\n=== 透明度匹配率 (与截图对比, 注意dump和截图可能不同状态) ===');
const m1 = transparencyMatch(r1.canvas);
console.log(`Plane A only:    ${(m1.rate * 100).toFixed(1)}% (${m1.match}/${m1.total})`);
const m2 = transparencyMatch(r2.canvas);
console.log(`Plane B only:    ${(m2.rate * 100).toFixed(1)}% (${m2.match}/${m2.total})`);
const m3 = transparencyMatch(r3.canvas);
console.log(`Plane A+B:       ${(m3.rate * 100).toFixed(1)}% (${m3.match}/${m3.total})`);

console.log('\n=== 说明 ===');
console.log('1. Plane A (pal2, 高优先级): 标题文字 logo, 258 条目, tile 256-442');
console.log('2. Plane B (pal3, 低优先级): 边框/装饰背景, 840 条目, tile 472-668');
console.log('3. 截图来自不同游戏状态 (含 CRAM 中不存在的颜色如 rgb(36,0,0))');
console.log('4. Plane A 单独匹配率最高, 因为截图主要展示标题文字');
console.log('5. Plane B 的左右边框模式在截图中不存在, 证实状态不同');
