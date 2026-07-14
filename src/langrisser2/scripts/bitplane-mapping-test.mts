/**
 * 测试所有位平面排列组合，找到正确的 Genesis VDP tile 格式
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

const palette: [number, number, number][] = [];
for (let i = 0; i < 64; i++) {
  palette.push(cramToRGB(readCRAM(i)));
}

// 测试不同的位平面映射
// 每个字节映射到哪个 bit 位置
const mappings: { name: string; bitMap: [number, number, number, number] }[] = [
  { name: '0,1,2,3 (sequential)', bitMap: [0, 1, 2, 3] },
  { name: '0,2,1,3 (standard MD)', bitMap: [0, 2, 1, 3] },
  { name: '3,2,1,0 (reverse)', bitMap: [3, 2, 1, 0] },
  { name: '0,3,1,2', bitMap: [0, 3, 1, 2] },
  { name: '1,0,3,2', bitMap: [1, 0, 3, 2] },
  { name: '0,1,3,2', bitMap: [0, 1, 3, 2] },
  { name: '2,0,1,3', bitMap: [2, 0, 1, 3] },
  { name: '1,2,0,3', bitMap: [1, 2, 0, 3] },
];

function decodeTile(tileIdx: number, bitMap: [number, number, number, number]): Uint8Array {
  const pixels = new Uint8Array(64);
  const offset = tileIdx * 32;
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    const b0 = vram[rowOff];
    const b1 = vram[rowOff + 1];
    const b2 = vram[rowOff + 2];
    const b3 = vram[rowOff + 3];
    const bytes = [b0, b1, b2, b3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      let color = 0;
      for (let i = 0; i < 4; i++) {
        if ((bytes[i] >> bit) & 1) {
          color |= 1 << bitMap[i];
        }
      }
      pixels[y * 8 + x] = color;
    }
  }
  return pixels;
}

const W = 320, H = 224;
const TILE_X0 = 4, TILE_Y0 = 6;
const TILE_W = 32, TILE_H = 10; // 裁剪标题区域

function renderPlane(bitMap: [number, number, number, number]): Uint8Array {
  const data = new Uint8Array(W * H * 4);
  // 背景色
  const bg = palette[0];
  for (let i = 0; i < W * H; i++) {
    data[i * 4] = bg[0];
    data[i * 4 + 1] = bg[1];
    data[i * 4 + 2] = bg[2];
    data[i * 4 + 3] = 255;
  }
  
  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const word = read16(BASE + (ty * 64 + tx) * 2);
      const tileIdx = word & 0x7FF;
      const pal = (word >> 13) & 3;
      if (tileIdx === 0) continue;
      const pixels = decodeTile(tileIdx, bitMap);
      const palBase = pal * 16;
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const v = pixels[py * 8 + px];
          if (v !== 0) {
            const [r, g, b] = palette[palBase + v];
            const di = ((ty * 8 + py) * W + (tx * 8 + px)) * 4;
            data[di] = r;
            data[di + 1] = g;
            data[di + 2] = b;
          }
        }
      }
    }
  }
  return data;
}

const SCALE = 2;
const COLS = 2;
const rows = Math.ceil(mappings.length / COLS);
const canvasW = COLS * W * SCALE + (COLS + 1) * 10;
const canvasH = rows * H * SCALE + rows * 30 + 10;

const canvas = createCanvas(canvasW, canvasH);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, canvasW, canvasH);

for (let i = 0; i < mappings.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = 10 + col * (W * SCALE + 10);
  const y = 10 + row * (H * SCALE + 30);
  
  const data = renderPlane(mappings[i].bitMap);
  const imgData = ctx.createImageData(W, H);
  imgData.data.set(data);
  
  const tmpCanvas = createCanvas(W, H);
  tmpCanvas.getContext('2d').putImageData(imgData, 0, 0);
  
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmpCanvas, x, y + 20, W * SCALE, H * SCALE);
  
  ctx.fillStyle = 'white';
  ctx.font = '12px monospace';
  ctx.fillText(mappings[i].name, x, y + 12);
}

const outPath = resolve(OUT_DIR, 'bitplane-mapping-test.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`位平面排列对比: ${outPath}`);
