/**
 * 高质量渲染 Plane A，验证 tile 解码正确
 * 放大显示标题区域，观察文字细节
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const vram = new Uint8Array(
  readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'))
);
const cram = new Uint8Array(
  readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram'))
);

const BASE = 0xC000;

function read16(addr: number): number {
  return (vram[(addr + 1) & 0xFFFF] << 8) | vram[addr & 0xFFFF];
}

function readCRAM(idx: number): number {
  const off = (idx & 0x3F) * 2;
  return (cram[off + 1] << 8) | cram[off];
}

function cramToRGB(val: number): [number, number, number] {
  const r = (val & 0x07) * 36;
  const g = ((val >> 3) & 0x07) * 36;
  const b = ((val >> 6) & 0x07) * 36;
  return [r, g, b];
}

// 生成调色板
const palette: [number, number, number][] = [];
for (let i = 0; i < 64; i++) {
  palette.push(cramToRGB(readCRAM(i)));
}

// 行主序解码 tile，返回 4bpp 像素值
// Genesis VDP tile format: 每行 4 字节，顺序为 D0, D2, D1, D3
// 颜色索引 = D0 | (D1 << 1) | (D2 << 2) | (D3 << 3)
function decodeTile(tileIdx: number): Uint8Array {
  const pixels = new Uint8Array(64);
  const offset = tileIdx * 32;
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    const d0 = vram[rowOff];       // byte 0 = D0 (bit 0)
    const d2 = vram[rowOff + 1];   // byte 1 = D2 (bit 2)
    const d1 = vram[rowOff + 2];   // byte 2 = D1 (bit 1)
    const d3 = vram[rowOff + 3];   // byte 3 = D3 (bit 3)
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (d0 >> bit) & 1;
      const b1 = (d1 >> bit) & 1;
      const b2 = (d2 >> bit) & 1;
      const b3 = (d3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

// 渲染整个 Plane A (320x224)
const W = 320, H = 224;
const imgData = new Uint8Array(W * H * 4);

// 背景色 (palette 0 color 0)
const bgColor = palette[0];
for (let i = 0; i < W * H; i++) {
  imgData[i * 4] = bgColor[0];
  imgData[i * 4 + 1] = bgColor[1];
  imgData[i * 4 + 2] = bgColor[2];
  imgData[i * 4 + 3] = 255;
}

for (let ty = 0; ty < 28; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const word = read16(BASE + (ty * 64 + tx) * 2);
    const tileIdx = word & 0x7FF;
    const hFlip = !!(word & 0x1000);
    const vFlip = !!(word & 0x0800);
    const pal = (word >> 13) & 3;
    if (tileIdx === 0) continue;
    
    const pixels = decodeTile(tileIdx);
    const palBase = pal * 16;
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const sx = hFlip ? 7 - px : px;
        const sy = vFlip ? 7 - py : py;
        const v = pixels[sy * 8 + sx];
        if (v !== 0) {
          const [r, g, b] = palette[palBase + v];
          const di = ((ty * 8 + py) * W + (tx * 8 + px)) * 4;
          imgData[di] = r;
          imgData[di + 1] = g;
          imgData[di + 2] = b;
        }
      }
    }
  }
}

// 1:1 输出
const canvas1 = createCanvas(W, H);
const ctx1 = canvas1.getContext('2d');
const id1 = ctx1.createImageData(W, H);
id1.data.set(imgData);
ctx1.putImageData(id1, 0, 0);
writeFileSync(resolve(OUT_DIR, 'plane-a-hq.png'), canvas1.toBuffer('image/png'));
console.log('1:1 渲染: plane-a-hq.png');

// 2x 放大
const canvas2 = createCanvas(W * 2, H * 2);
const ctx2 = canvas2.getContext('2d');
ctx2.imageSmoothingEnabled = false;
ctx2.drawImage(canvas1, 0, 0, W * 2, H * 2);
writeFileSync(resolve(OUT_DIR, 'plane-a-hq-2x.png'), canvas2.toBuffer('image/png'));
console.log('2x 放大: plane-a-hq-2x.png');

// 裁剪标题区域并 4x 放大
const titleY = 56, titleH = 96;
const titleCanvas = createCanvas(W * 4, titleH * 4);
const tctx = titleCanvas.getContext('2d');
tctx.imageSmoothingEnabled = false;
tctx.drawImage(canvas1, 0, titleY, W, titleH, 0, 0, W * 4, titleH * 4);
writeFileSync(resolve(OUT_DIR, 'plane-a-title-4x.png'), titleCanvas.toBuffer('image/png'));
console.log('标题区域 4x: plane-a-title-4x.png');

// 统计使用了哪些调色板
const palUsed = new Set<number>();
for (let ty = 0; ty < 28; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const word = read16(BASE + (ty * 64 + tx) * 2);
    const tileIdx = word & 0x7FF;
    if (tileIdx === 0) continue;
    palUsed.add((word >> 13) & 3);
  }
}
console.log(`\n使用的调色板: ${[...palUsed].sort().join(', ')}`);

// 打印每个调色板的颜色
for (const p of [...palUsed].sort()) {
  console.log(`\nPalette ${p}:`);
  for (let i = 0; i < 16; i++) {
    const [r, g, b] = palette[p * 16 + i];
    console.log(`  color ${i}: rgb(${r},${g},${b})  #${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
  }
}
