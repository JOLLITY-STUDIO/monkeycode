/**
 * 验证 TS VDP 类修复后的渲染效果
 *
 * 用 game/hw/vdp 下的 TS 代码加载 VRAM/CRAM，渲染标题画面
 * 输出到 output/title-ts-vdp.png
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

import { VDP } from '../game/hw/vdp/vdp.js';
import { renderFrame } from '../game/hw/vdp/renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'output');
mkdirSync(OUT_DIR, { recursive: true });

// 加载 dump 数据
const vramRaw = new Uint8Array(readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram')));
const cramRaw = new Uint8Array(readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram')));

// Gens 的 CRAM dump 是 512 字节 (每色 4 字节?) 
// 实际 VDP CRAM 是 128 字节 (64 色 × 2 字节)
// 让我们取前 128 字节 (64 色)
const vram = vramRaw.slice(0, 0x10000); // VRAM 64KB
const cram = cramRaw.slice(0, 128);    // CRAM 128 字节 (64 色)

console.log('VRAM size:', vram.length, 'CRAM size:', cram.length);
console.log('CRAM raw size:', cramRaw.length);

// 创建 VDP 实例并初始化
const vdp = new VDP();

// 加载 VRAM
for (let i = 0; i < vram.length; i++) {
  vdp.writeVRAM(i, vram[i]);
}

// 加载 CRAM (little-endian, 每色 2 字节)
for (let i = 0; i < cram.length; i += 2) {
  const lo = cram[i];
  const hi = cram[i + 1];
  const word = (hi << 8) | lo;
  vdp.writeCRAM(i / 2, word);
}

// 设置 VDP 寄存器 (标题画面配置)
// R0 = 0x14: H interrupt enable, 显示启用
// R1 = 0x64: V interrupt enable, DMA enable, 显示启用, V28 (224行)
// R2 = 0x30: Plane A 基址 = 0xC000
// R4 = 0x07: Plane B 基址 = 0xE000
// R5 = 0x78: Sprite 表基址 (不重要)
// R7 = 0x00: 背景色索引
// R12 = 0x01: H40 模式 (320像素宽)
vdp.regs[0] = 0x14;
vdp.regs[1] = 0x64;  // V28, DMA, VBlank IRQ, 显示启用
vdp.regs[2] = 0x30;  // Plane A = 0xC000
vdp.regs[4] = 0x07;  // Plane B = 0xE000
vdp.regs[5] = 0x78;  // Sprite 表基址
vdp.regs[7] = 0x04;  // 背景色: 调色板0 索引4
vdp.regs[12] = 0x01; // H40 模式 (320像素宽)

// 让我们打印一些调试信息
console.log('=== VDP 配置验证 ===');
console.log('Plane A 基址:', vdp.planeABaseAddr.toString(16));
console.log('Plane B 基址:', vdp.planeBBaseAddr.toString(16));
console.log('Width:', vdp.width, 'Height:', vdp.height);
console.log('背景色索引:', vdp.backgroundColor);
console.log('CRAM[0]:', vdp.readCRAM(0).toString(16));
console.log('CRAM[4]:', vdp.readCRAM(4).toString(16));

// 打印所有 4 个调色板的颜色
import { cramToRGB } from '../game/hw/vdp/vdp.js';
for (let p = 0; p < 4; p++) {
  console.log(`\n--- Palette ${p} ---`);
  let line = '';
  for (let i = 0; i < 16; i++) {
    const idx = p * 16 + i;
    const val = vdp.readCRAM(idx);
    const c = cramToRGB(val);
    line += `c${idx}=${c.r},${c.g},${c.b}  `;
    if ((i + 1) % 4 === 0) { console.log(line); line = ''; }
  }
}

// 验证 nametable 解析
import { parseNameTableEntry } from '../game/hw/vdp/plane.js';

console.log('\n=== Plane A nametable 统计 (0xC000) ===');
let palA0 = 0, palA1 = 0, palA2 = 0, palA3 = 0;
let priA0 = 0, priA1 = 0;
let nonZeroA = 0;
let tileRangeA: [number, number] = [9999, 0];
for (let y = 0; y < 28; y++) {
  for (let x = 0; x < 40; x++) {
    const addr = 0xC000 + (y * 64 + x) * 2;
    const entry = parseNameTableEntry(vram, addr);
    if (entry.tileIndex !== 0) {
      nonZeroA++;
      if (entry.tileIndex < tileRangeA[0]) tileRangeA[0] = entry.tileIndex;
      if (entry.tileIndex > tileRangeA[1]) tileRangeA[1] = entry.tileIndex;
    }
    if (entry.palette === 0) palA0++;
    if (entry.palette === 1) palA1++;
    if (entry.palette === 2) palA2++;
    if (entry.palette === 3) palA3++;
    if (entry.priority === 0) priA0++;
    if (entry.priority === 1) priA1++;
  }
}
console.log('total entries: 1120 (40x28)');
console.log('non-zero entries:', nonZeroA);
console.log('tile index range:', tileRangeA);
console.log('palette (all):', { pal0: palA0, pal1: palA1, pal2: palA2, pal3: palA3 });
console.log('priority (all):', { low: priA0, high: priA1 });

// 统计高优先级且非零的条目
let palHighA = [0, 0, 0, 0];
for (let y = 0; y < 28; y++) {
  for (let x = 0; x < 40; x++) {
    const addr = 0xC000 + (y * 64 + x) * 2;
    const entry = parseNameTableEntry(vram, addr);
    if (entry.priority === 1 && entry.tileIndex !== 0) {
      palHighA[entry.palette]++;
    }
  }
}
console.log('high-priority non-zero palette:', palHighA);

console.log('\n=== Plane B nametable 统计 (0xE000) ===');
let palB0 = 0, palB1 = 0, palB2 = 0, palB3 = 0;
let priB0 = 0, priB1 = 0;
let nonZeroB = 0;
let tileRangeB: [number, number] = [9999, 0];
for (let y = 0; y < 28; y++) {
  for (let x = 0; x < 40; x++) {
    const addr = 0xE000 + (y * 64 + x) * 2;
    const entry = parseNameTableEntry(vram, addr);
    if (entry.tileIndex !== 0) {
      nonZeroB++;
      if (entry.tileIndex < tileRangeB[0]) tileRangeB[0] = entry.tileIndex;
      if (entry.tileIndex > tileRangeB[1]) tileRangeB[1] = entry.tileIndex;
    }
    if (entry.palette === 0) palB0++;
    if (entry.palette === 1) palB1++;
    if (entry.palette === 2) palB2++;
    if (entry.palette === 3) palB3++;
    if (entry.priority === 0) priB0++;
    if (entry.priority === 1) priB1++;
  }
}
console.log('total entries: 1120 (40x28)');
console.log('non-zero entries:', nonZeroB);
console.log('tile index range:', tileRangeB);
console.log('palette (all):', { pal0: palB0, pal1: palB1, pal2: palB2, pal3: palB3 });
console.log('priority (all):', { low: priB0, high: priB1 });

// === Tile 解码对比测试 ===
import { decodeTile, tileAddress } from '../game/hw/vdp/tile.js';

function decodeTileJS(tileIdx: number) {
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

console.log('\n=== Tile 解码一致性测试 ===');
let mismatch = 0;
for (let t = 0; t < 100; t++) {
  const tsResult = new Uint8Array(64);
  decodeTile(vram, tileAddress(t), tsResult, 0);
  const jsResult = decodeTileJS(t);
  for (let i = 0; i < 64; i++) {
    if (tsResult[i] !== jsResult[i]) {
      mismatch++;
      if (mismatch <= 5) {
        console.log(`tile ${t} pixel ${i}: TS=${tsResult[i]} JS=${jsResult[i]}`);
      }
      break;
    }
  }
}
console.log(`Tile 解码不一致数: ${mismatch} / 100`);

// 再测试一个具体的 tile (比如 tile 300, 在 Plane A 使用范围内)
const testTile = 300;
const tsTile = new Uint8Array(64);
decodeTile(vram, tileAddress(testTile), tsTile, 0);
const jsTile = decodeTileJS(testTile);
console.log(`\nTile ${testTile} TS 像素值分布:`);
const tsHist = new Array(16).fill(0);
tsTile.forEach(v => tsHist[v]++);
console.log(tsHist);
console.log(`Tile ${testTile} JS 像素值分布:`);
const jsHist = new Array(16).fill(0);
jsTile.forEach(v => jsHist[v]++);
console.log(jsHist);

// 渲染一帧
const width = vdp.width;
const height = vdp.height;
const output = new Uint8Array(width * height * 4);

console.log('\n=== 开始渲染 ===');
console.log(`分辨率: ${width}x${height}`);

renderFrame(vdp, output, 0, 0, 0, 0);

// 保存为 PNG
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(width, height);
imgData.data.set(output);
ctx.putImageData(imgData, 0, 0);

const outPath = resolve(OUT_DIR, 'title-ts-vdp.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`\n渲染完成，保存到: ${outPath}`);

// 统计非透明像素数
let nonTransparent = 0;
let bgPixel = 0;
for (let i = 0; i < width * height; i++) {
  if (output[i * 4 + 3] > 0) {
    nonTransparent++;
    // 检查是不是背景色 (rgb(0,0,72))
    if (output[i * 4] === 0 && output[i * 4 + 1] === 0 && output[i * 4 + 2] === 72) {
      bgPixel++;
    }
  }
}
console.log(`非透明像素: ${nonTransparent} / ${width * height}`);
console.log(`背景色像素: ${bgPixel}`);
console.log(`活动像素 (非背景): ${nonTransparent - bgPixel}`);
