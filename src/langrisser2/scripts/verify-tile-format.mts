/**
 * 从截图中提取 tile，和 VRAM 中的 tile 对比，找到正确的解码格式
 *
 * 方法:
 * 1. 从截图中取标题区域的像素
 * 2. 把截图切成 8x8 的 tile
 * 3. 用不同的解码格式从 VRAM 生成 tile
 * 4. 对比每个截图 tile 和 VRAM tile 的相似度
 * 5. 哪种格式匹配度最高，哪种就是对的
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, loadImage } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const vram = new Uint8Array(
  readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'))
);

const SCREENSHOT_PATH = resolve(ROOT, 'screenshots/Langrisser II (Japan)_034.bmp');

// 加载截图 (手动解析 BMP)
const bmpBuf = readFileSync(SCREENSHOT_PATH);

function parseBMP(buffer: Buffer): { width: number; height: number; data: Uint8Array } {
  // BMP 信息头
  const width = buffer.readInt32LE(0x12);
  const height = buffer.readInt32LE(0x16);
  const bpp = buffer.readUInt16LE(0x1C); // 位深度
  const dataOffset = buffer.readUInt32LE(0x0A);
  const absHeight = Math.abs(height);

  const data = new Uint8Array(width * absHeight * 4);

  if (bpp === 24) {
    // 24-bit BGR, 行对齐到 4 字节
    const rowSize = Math.ceil((width * 3) / 4) * 4;
    for (let y = 0; y < absHeight; y++) {
      const srcY = height > 0 ? (absHeight - 1 - y) : y; // BMP 是倒的
      const srcOffset = dataOffset + srcY * rowSize;
      const dstOffset = y * width * 4;
      for (let x = 0; x < width; x++) {
        const s = srcOffset + x * 3;
        const d = dstOffset + x * 4;
        data[d] = buffer[s + 2];     // R
        data[d + 1] = buffer[s + 1]; // G
        data[d + 2] = buffer[s];     // B
        data[d + 3] = 255;
      }
    }
  } else if (bpp === 8) {
    // 8-bit 索引色
    const paletteOffset = 0x0E + buffer.readUInt32LE(0x0E);
    const colors = buffer.readUInt32LE(0x2E);
    const palette: number[][] = [];
    for (let i = 0; i < colors; i++) {
      const off = paletteOffset + i * 4;
      palette.push([buffer[off + 2], buffer[off + 1], buffer[off], 255]);
    }
    const rowSize = Math.ceil(width / 4) * 4;
    for (let y = 0; y < absHeight; y++) {
      const srcY = height > 0 ? (absHeight - 1 - y) : y;
      const srcOffset = dataOffset + srcY * rowSize;
      const dstOffset = y * width * 4;
      for (let x = 0; x < width; x++) {
        const idx = buffer[srcOffset + x];
        const c = palette[idx] || [0, 0, 0, 255];
        const d = dstOffset + x * 4;
        data[d] = c[0];
        data[d + 1] = c[1];
        data[d + 2] = c[2];
        data[d + 3] = 255;
      }
    }
  }

  return { width, height: absHeight, data };
}

const { width: W, height: H, data: screenshotData } = parseBMP(bmpBuf);
console.log(`截图尺寸: ${W} x ${H}`);

// 把截图转成 4bpp 的 tile 数据（通过颜色量化到最近的调色板颜色）
// 先取标题区域 (大约 y=40 到 y=160)
const TITLE_Y0 = 30;
const TITLE_Y1 = 160;
const TITLE_X0 = 20;
const TITLE_X1 = 300;

console.log(`标题区域: (${TITLE_X0},${TITLE_Y0}) - (${TITLE_X1},${TITLE_Y1})`);

// 提取标题区域的像素，转成 1-bit 掩码（只看是不是背景色）
// 背景色大约是 rgb(0, 0, 72)
function isBg(r: number, g: number, b: number): boolean {
  return r < 30 && g < 30 && b > 40;
}

// 获取截图中指定位置的 8x8 tile 的 1-bit 掩码
function getScreenshotTileMask(tx: number, ty: number): Uint8Array {
  const mask = new Uint8Array(64);
  const startX = tx * 8;
  const startY = ty * 8;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const sx = startX + x;
      const sy = startY + y;
      if (sx < 0 || sx >= W || sy < 0 || sy >= H) {
        mask[y * 8 + x] = 0;
        continue;
      }
      const idx = (sy * W + sx) * 4;
      const r = screenshotData[idx];
      const g = screenshotData[idx + 1];
      const b = screenshotData[idx + 2];
      mask[y * 8 + x] = isBg(r, g, b) ? 0 : 1;
    }
  }
  return mask;
}

// 各种解码格式的函数
type Decoder = (idx: number) => Uint8Array;

// 格式 1: 行主序, bit7=x0 (当前)
function decRowMajor(tileIdx: number): Uint8Array {
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

// 格式 2: 列主序 (转置 - 每列 4 字节，bit7=y0)
function decColMajor(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let x = 0; x < 8; x++) {
    const colOffset = offset + x * 4;
    const p0 = vram[colOffset];
    const p1 = vram[colOffset + 1];
    const p2 = vram[colOffset + 2];
    const p3 = vram[colOffset + 3];
    for (let y = 0; y < 8; y++) {
      const bit = 7 - y; // bit7 = 第0行 (最上)
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

// 格式 3: 平面主序 (8+8+8+8 bytes per plane)
function decPlaneMajor(tileIdx: number): Uint8Array {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + 8 + y];
    const p2 = vram[offset + 16 + y];
    const p3 = vram[offset + 24 + y];
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

// 格式 4: 行主序 + bit0=x0 (水平翻转)
function decRowMajorFlipH(tileIdx: number): Uint8Array {
  const pixels = decRowMajor(tileIdx);
  const out = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      out[y * 8 + x] = pixels[y * 8 + (7 - x)];
    }
  }
  return out;
}

// 格式 5: 列主序 + bit0=y0 (垂直翻转)
function decColMajorFlipV(tileIdx: number): Uint8Array {
  const pixels = decColMajor(tileIdx);
  const out = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      out[y * 8 + x] = pixels[(7 - y) * 8 + x];
    }
  }
  return out;
}

// 比较两个 tile 的 1-bit 掩码，返回匹配的像素数
function compareMask(a: Uint8Array, b: Uint8Array): number {
  let match = 0;
  for (let i = 0; i < 64; i++) {
    const aBit = a[i] !== 0 ? 1 : 0;
    const bBit = b[i] !== 0 ? 1 : 0;
    if (aBit === bBit) match++;
  }
  return match;
}

// 在 VRAM 中找到最匹配的 tile
function findBestMatch(screenshotTile: Uint8Array, decoder: Decoder): { idx: number; match: number } {
  let bestIdx = 0;
  let bestMatch = 0;
  for (let i = 0; i < 700; i++) { // 只看前 700 个 tile (标题用的 tile 范围)
    const vramTile = decoder(i);
    const m = compareMask(screenshotTile, vramTile);
    if (m > bestMatch) {
      bestMatch = m;
      bestIdx = i;
    }
  }
  return { idx: bestIdx, match: bestMatch };
}

// 测试各种格式
const formats: [string, Decoder][] = [
  ['行主序 (当前)', decRowMajor],
  ['列主序 (转置)', decColMajor],
  ['平面主序', decPlaneMajor],
  ['行主序+水平翻转', decRowMajorFlipH],
  ['列主序+垂直翻转', decColMajorFlipV],
];

console.log('\n=== Tile 匹配测试 (标题区域前 6x4=24 个 tile) ===');

const TILES_X = 20; // 测试 20 列 tile
const TILES_Y = 8;  // 测试 8 行 tile
const START_TX = Math.floor(TITLE_X0 / 8);
const START_TY = Math.floor(TITLE_Y0 / 8);

for (const [name, decoder] of formats) {
  let totalMatch = 0;
  let totalPixels = 0;
  let perfectTiles = 0;
  let tileCount = 0;

  for (let ty = 0; ty < TILES_Y; ty++) {
    for (let tx = 0; tx < TILES_X; tx++) {
      const screenTx = START_TX + tx;
      const screenTy = START_TY + ty;
      const mask = getScreenshotTileMask(screenTx, screenTy);

      // 跳过大部分是背景的 tile
      let nzCount = 0;
      mask.forEach(v => { if (v) nzCount++; });
      if (nzCount < 5) continue;

      const { idx, match } = findBestMatch(mask, decoder);
      totalMatch += match;
      totalPixels += 64;
      tileCount++;
      if (match === 64) perfectTiles++;
    }
  }

  const rate = totalPixels > 0 ? (totalMatch / totalPixels * 100).toFixed(1) : '0';
  console.log(`${name}: ${rate}% 匹配 (${tileCount} 个 tile, 其中 ${perfectTiles} 个完美匹配)`);
}

// ========================================
// 可视化对比：用最佳格式渲染完整 Plane A
// ========================================
console.log('\n=== 生成对比图 ===');

const PLANE_A_BASE = 0xC000;
function readNtEntry(base: number, tx: number, ty: number) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return { tileIdx: word & 0x7FF };
}

function renderWithDecoder(decoder: Decoder): Uint8Array {
  const w = 320, h = 224;
  const data = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    data[i * 4 + 2] = 72;
    data[i * 4 + 3] = 255;
  }
  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNtEntry(PLANE_A_BASE, tx, ty);
      if (e.tileIdx === 0) continue;
      const pixels = decoder(e.tileIdx);
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const v = pixels[py * 8 + px];
          if (v !== 0) {
            const dx = tx * 8 + px;
            const dy = ty * 8 + py;
            const di = (dy * w + dx) * 4;
            data[di] = 255;
            data[di + 1] = 200;
            data[di + 2] = 0;
            data[di + 3] = 255;
          }
        }
      }
    }
  }
  return data;
}

const compW = 320 * 2 + 30;
const compH = 224 + 40;
const compCanvas = createCanvas(compW, compH);
const compCtx = compCanvas.getContext('2d');
compCtx.fillStyle = '#111';
compCtx.fillRect(0, 0, compW, compH);

// 左边: 截图的 1-bit 版本
const screenshot1bit = compCtx.createImageData(W, H);
for (let i = 0; i < W * H; i++) {
  const r = screenshotData[i * 4];
  const g = screenshotData[i * 4 + 1];
  const b = screenshotData[i * 4 + 2];
  if (isBg(r, g, b)) {
    screenshot1bit.data[i * 4] = 0;
    screenshot1bit.data[i * 4 + 1] = 0;
    screenshot1bit.data[i * 4 + 2] = 72;
  } else {
    screenshot1bit.data[i * 4] = 255;
    screenshot1bit.data[i * 4 + 1] = 200;
    screenshot1bit.data[i * 4 + 2] = 0;
  }
  screenshot1bit.data[i * 4 + 3] = 255;
}
compCtx.putImageData(screenshot1bit, 10, 20);
compCtx.fillStyle = 'white';
compCtx.font = '12px sans-serif';
compCtx.fillText('截图 (1-bit)', 10, 15);

// 右边: 列主序渲染
const colMajorData = renderWithDecoder(decColMajor);
const colMajorImg = compCtx.createImageData(320, 224);
colMajorImg.data.set(colMajorData);
compCtx.putImageData(colMajorImg, 340, 20);
compCtx.fillText('列主序渲染 (Plane A)', 340, 15);

const outPath = resolve(OUT_DIR, 'screenshot-vs-colmajor.png');
writeFileSync(outPath, compCanvas.toBuffer('image/png'));
console.log(`对比图保存到: ${outPath}`);
