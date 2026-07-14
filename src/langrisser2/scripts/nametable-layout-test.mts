/**
 * 测试 nametable 的各种排列方式
 * 看看是不是行列搞反了，或者读取顺序不对
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

function decodeTile(tileIdx: number): Uint8Array {
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

function readNtWord(addr: number): number {
  const lo = vram[addr & 0xFFFF];
  const hi = vram[(addr + 1) & 0xFFFF];
  return (hi << 8) | lo;
}

// 不同的渲染方式
type Renderer = () => Uint8Array;

const W = 320, H = 224;

function makeOutput(): Uint8Array {
  const data = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    data[i * 4 + 2] = 72;
    data[i * 4 + 3] = 255;
  }
  return data;
}

function drawTile(data: Uint8Array, dx: number, dy: number, pixels: Uint8Array, hFlip: boolean, vFlip: boolean) {
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const sx = hFlip ? 7 - px : px;
      const sy = vFlip ? 7 - py : py;
      const v = pixels[sy * 8 + sx];
      if (v !== 0 && dx + px >= 0 && dx + px < W && dy + py >= 0 && dy + py < H) {
        const di = ((dy + py) * W + (dx + px)) * 4;
        data[di] = 255;
        data[di + 1] = 200;
        data[di + 2] = 50;
        data[di + 3] = 255;
      }
    }
  }
}

const BASE = 0xC000;

const tests: { name: string; render: Renderer }[] = [];

// 1. 标准: 行 64 tile, 取前 40 列
tests.push({
  name: '标准 (64列x32行, 取40x28)',
  render: () => {
    const data = makeOutput();
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        const word = readNtWord(BASE + (ty * 64 + tx) * 2);
        const tileIdx = word & 0x7FF;
        const hFlip = !!(word & 0x1000);
        const vFlip = !!(word & 0x0800);
        if (tileIdx === 0) continue;
        const pixels = decodeTile(tileIdx);
        drawTile(data, tx * 8, ty * 8, pixels, hFlip, vFlip);
      }
    }
    return data;
  }
});

// 2. 行主序但 stride 是 32 不是 64
tests.push({
  name: 'stride=32 (H32模式)',
  render: () => {
    const data = makeOutput();
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        const word = readNtWord(BASE + (ty * 32 + tx) * 2);
        const tileIdx = word & 0x7FF;
        if (tileIdx === 0) continue;
        const pixels = decodeTile(tileIdx);
        drawTile(data, tx * 8, ty * 8, pixels, false, false);
      }
    }
    return data;
  }
});

// 3. 行列转置: nametable 按列存储 (x 是行, y 是列)
tests.push({
  name: 'nametable行列转置',
  render: () => {
    const data = makeOutput();
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        // 用 tx 做行, ty 做列
        const word = readNtWord(BASE + (tx * 64 + ty) * 2);
        const tileIdx = word & 0x7FF;
        if (tileIdx === 0) continue;
        const pixels = decodeTile(tileIdx);
        drawTile(data, tx * 8, ty * 8, pixels, false, false);
      }
    }
    return data;
  }
});

// 4. 每个 tile 旋转 90 度 (顺时针)
tests.push({
  name: '每个tile顺时针转90度',
  render: () => {
    const data = makeOutput();
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        const word = readNtWord(BASE + (ty * 64 + tx) * 2);
        const tileIdx = word & 0x7FF;
        if (tileIdx === 0) continue;
        const orig = decodeTile(tileIdx);
        // 顺时针旋转 90 度
        const rotated = new Uint8Array(64);
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            rotated[x * 8 + (7 - y)] = orig[y * 8 + x];
          }
        }
        drawTile(data, tx * 8, ty * 8, rotated, false, false);
      }
    }
    return data;
  }
});

// 5. 每个 tile 逆时针转 90 度
tests.push({
  name: '每个tile逆时针转90度',
  render: () => {
    const data = makeOutput();
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        const word = readNtWord(BASE + (ty * 64 + tx) * 2);
        const tileIdx = word & 0x7FF;
        if (tileIdx === 0) continue;
        const orig = decodeTile(tileIdx);
        const rotated = new Uint8Array(64);
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            rotated[(7 - x) * 8 + y] = orig[y * 8 + x];
          }
        }
        drawTile(data, tx * 8, ty * 8, rotated, false, false);
      }
    }
    return data;
  }
});

// 6. 整个 Plane 旋转 90 度 (重排 tile)
tests.push({
  name: '整个Plane旋转90度(tile重排)',
  render: () => {
    const data = makeOutput();
    // 假设 plane 是 64x32 tile，旋转后变成 32x64
    // 取中间 28 行显示
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        // 旋转后的位置对应原位置
        const origTy = tx;
        const origTx = 63 - ty;
        if (origTy >= 32 || origTx < 0 || origTx >= 64) continue;
        const word = readNtWord(BASE + (origTy * 64 + origTx) * 2);
        const tileIdx = word & 0x7FF;
        if (tileIdx === 0) continue;
        const pixels = decodeTile(tileIdx);
        drawTile(data, tx * 8, ty * 8, pixels, false, false);
      }
    }
    return data;
  }
});

// 7. tile 内部是列主序 (每列 4 字节, 8 列)
tests.push({
  name: 'tile列主序(每列4字节)',
  render: () => {
    const data = makeOutput();
    for (let ty = 0; ty < 28; ty++) {
      for (let tx = 0; tx < 40; tx++) {
        const word = readNtWord(BASE + (ty * 64 + tx) * 2);
        const tileIdx = word & 0x7FF;
        if (tileIdx === 0) continue;
        // 列主序解码
        const offset = tileIdx * 32;
        const pixels = new Uint8Array(64);
        for (let col = 0; col < 8; col++) {
          const colOff = offset + col * 4;
          const p0 = vram[colOff];
          const p1 = vram[colOff + 1];
          const p2 = vram[colOff + 2];
          const p3 = vram[colOff + 3];
          for (let row = 0; row < 8; row++) {
            const bit = 7 - row;
            const b0 = (p0 >> bit) & 1;
            const b1 = (p1 >> bit) & 1;
            const b2 = (p2 >> bit) & 1;
            const b3 = (p3 >> bit) & 1;
            pixels[row * 8 + col] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
          }
        }
        drawTile(data, tx * 8, ty * 8, pixels, false, false);
      }
    }
    return data;
  }
});

console.log(`共 ${tests.length} 种渲染方式`);

// 画对比图 (3 列)
const COLS = 3;
const thumbW = W;
const thumbH = H;
const gap = 10;
const rows = Math.ceil(tests.length / COLS);

const canvas = createCanvas(COLS * thumbW + (COLS + 1) * gap, rows * (thumbH + 20) + gap);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < tests.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = gap + col * (thumbW + gap);
  const y = gap + row * (thumbH + 20);

  const data = tests[i].render();
  const imgData = ctx.createImageData(thumbW, thumbH);
  imgData.data.set(data);
  ctx.putImageData(imgData, x, y + 15);

  ctx.fillStyle = 'white';
  ctx.font = '12px sans-serif';
  ctx.fillText(tests[i].name, x, y + 10);
}

const outPath = resolve(OUT_DIR, 'nametable-layout-test.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`对比图: ${outPath}`);
