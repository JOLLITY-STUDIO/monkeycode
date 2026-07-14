/**
 * 重新分析: 背景色应该对应调色板0颜色0
 * 
 * R7=0x00 → 背景色 = 调色板0颜色0
 * 截图背景 = rgb(0,0,72)
 * 
 * 所以 CRAM[0] 应该产生 rgb(0,0,72), 不是 rgb(0,0,0)
 * 
 * CRAM[0] 字节: [0x00, 0x04]
 * 标准 LE word: 0x0400
 * 
 * 问题: 如何从 0x0400 得到 rgb(0,0,72)?
 * 
 * 72 = 2 × 36, 所以 B=2
 * rgb(0,0,72) = { R=0, G=0, B=2 }
 * BGR 9-bit: 010 000 000 = 0x040
 * 
 * 0x0400 → 如何提取 0x040?
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));

// ============================================================
// 测试不同的 CRAM 位域排列
// ============================================================
console.log('=== 测试 CRAM 位域排列 ===');

// 当前标准: word = (cram[i*2+1] << 8) | cram[i*2]
// BGR: R=bit2-0, G=bit5-3, B=bit8-6

// 方式1: 交换高低字节 + 标准位域
function decode1(i) {
  const hi = cram[i * 2];      // 原低字节变高字节
  const lo = cram[i * 2 + 1];  // 原高字节变低字节
  const word = (hi << 8) | lo;
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

// 方式2: 标准字节序, 但位域不同
function decode2(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  // 假设: R=bit5-3, G=bit8-6, B=bit2-0 (旋转)
  return {
    r: ((word >> 3) & 7) * 36,
    g: ((word >> 6) & 7) * 36,
    b: ((word >> 0) & 7) * 36,
  };
}

// 方式3: 标准字节序, RGB而非BGR
function decode3(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 6) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 0) & 7) * 36,
  };
}

// 方式4: 只用低字节, 每字节存一个颜色 (64色 × 1字节)
// 这样 CRAM 前64字节是颜色数据
function decode4(i) {
  const byte = cram[i];
  return {
    r: ((byte >> 0) & 7) * 36,
    g: ((byte >> 3) & 7) * 36,
    b: ((byte >> 6) & 1) * 36,  // 只有1位B
  };
}

// 方式5: 重新排列位
// CRAM[0] = 0x00 = 00000000
// CRAM[1] = 0x04 = 00000100
// 假设: B在低字节, G在高字节低3位, R在高字节高3位
function decode5(i) {
  const lo = cram[i * 2];   // B2 B1 B0 X X X X X
  const hi = cram[i * 2 + 1]; // R2 R1 R0 G2 G1 G0 X X
  return {
    r: ((hi >> 5) & 7) * 36,
    g: ((hi >> 2) & 7) * 36,
    b: (lo & 7) * 36,
  };
}

// 方式6: Gens 内部格式 - 每色16位 = { 7位填充 | B2 B1 B0 G2 G1 G0 R2 R1 }
// 其中 R0 在另一个位置
function decode6(i) {
  const lo = cram[i * 2];   // B2 B1 B0 G2 G1 G0 R2 R1
  const hi = cram[i * 2 + 1]; // R0 + 7位填充
  const r2r1 = lo & 3;
  const r0 = hi & 1;
  return {
    r: ((r2r1 << 1) | r0) * 36,
    g: ((lo >> 2) & 7) * 36,
    b: ((lo >> 5) & 7) * 36,
  };
}

// ============================================================
// 测试 pal0[0] 是否能产生 rgb(0,0,72)
// ============================================================
const decoders = [
  { name: '方式1: 交换字节+BGR', fn: decode1 },
  { name: '方式2: LE+旋转位域', fn: decode2 },
  { name: '方式3: LE+RGB', fn: decode3 },
  { name: '方式4: 单字节', fn: decode4 },
  { name: '方式5: B在低字节', fn: decode5 },
  { name: '方式6: Gens内部', fn: decode6 },
];

console.log('\n=== pal0[0] 测试 ===');
console.log(`CRAM[0] 字节: [0x${cram[0].toString(16).padStart(2,'0')}, 0x${cram[1].toString(16).padStart(2,'0')}]`);

for (const { name, fn } of decoders) {
  const c = fn(0);
  const match = c.b === 72 && c.r === 0 && c.g === 0;
  console.log(`${name}: rgb(${c.r},${c.g},${c.b}) ${match ? '✓ 匹配!' : ''}`);
}

// ============================================================
// 测试 pal2[1] (标题文字应该是红色)
// ============================================================
console.log('\n=== pal2[1] 测试 (应该是红色) ===');
console.log(`CRAM[33] 字节: [0x${cram[66].toString(16).padStart(2,'0')}, 0x${cram[67].toString(16).padStart(2,'0')}]`);

for (const { name, fn } of decoders) {
  const c = fn(33);
  const isRed = c.r > 0 && c.g === 0 && c.b === 0;
  console.log(`${name}: rgb(${c.r},${c.g},${c.b}) ${isRed ? '✓ 红色!' : ''}`);
}

// ============================================================
// 方式6 似乎有希望! 让我详细测试
// ============================================================
console.log('\n=== 方式6 详细测试 ===');
console.log('调色板0:');
for (let i = 0; i < 16; i++) {
  const c = decode6(i);
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
}
console.log('调色板2:');
for (let i = 32; i < 48; i++) {
  const c = decode6(i);
  console.log(`  [${i-32}] rgb(${c.r},${c.g},${c.b})`);
}

// ============================================================
// 用方式6渲染并对比
// ============================================================
function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[rowOff + 0] >> bit) & 1;
      const p1 = (vram[rowOff + 1] >> bit) & 1;
      const p2 = (vram[rowOff + 2] >> bit) & 1;
      const p3 = (vram[rowOff + 3] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

function readNametableEntry(tx, ty) {
  const addr = 0xC000 + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    palette: (word >> 13) & 3,
    hflip:   (word >> 12) & 1,
    vflip:   (word >> 11) & 1,
    tileIdx: word & 0x7FF,
  };
}

function renderPlane(colorFn) {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(i);

  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(tx, ty);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      const palBase = e.palette * 16;
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = colorFn(palBase + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// 生成对比图
const pal6 = [];
for (let i = 0; i < 64; i++) pal6.push(decode6(i));

const c6 = renderPlane(i => pal6[i]);

const out = createCanvas(320 * 2 + 20, 224 + 30);
const octx = out.getContext('2d');
octx.fillStyle = '#000';
octx.fillRect(0, 0, out.width, out.height);
octx.font = '12px monospace';

// 方式6
octx.drawImage(c6, 0, 25);
octx.fillStyle = '#0f0';
octx.fillText('方式6: Gens内部格式', 5, 15);

// 标准方式
const palStd = [];
for (let i = 0; i < 64; i++) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  palStd.push({
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  });
}
const cStd = renderPlane(i => palStd[i]);
octx.drawImage(cStd, 320 + 20, 25);
octx.fillText('标准: LE+BGR', 320 + 25, 15);

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-cram-compare.png');
writeFileSync(OUT_PATH, out.toBuffer('image/png'));
console.log(`\n✅ 输出对比图: ${OUT_PATH}`);
