/**
 * 验证 TypeScript 版 TitleScreen 渲染
 *
 * 使用真实 ROM 数据 + VRAM dump nametable 渲染标题画面
 * 对比纯 JS 版 render-title-ascii.mjs 的输出
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TS 模块加载 (使用 tsx 运行)
import { VDP } from '../game/hw/vdp/vdp.js';
import { ArrayBufferRomReader } from '../game/hw/resource.js';
import { renderFrame } from '../game/hw/vdp/renderer.js';
import {
  TitleScreen,
  extractNametableFromVRAMDump,
} from '../game/scenes/TitleScreen.js';

// ============================================================
// 加载数据
// ============================================================

const ROM_PATH = path.join(
  __dirname,
  '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin',
);
const VRAM_PATH = path.join(
  __dirname,
  '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram',
);

console.log('=== 加载数据 ===');
const romData = fs.readFileSync(ROM_PATH);
const vramDump = fs.readFileSync(VRAM_PATH);
console.log(`ROM: ${romData.length}B`);
console.log(`VRAM dump: ${vramDump.length}B`);

// ============================================================
// 初始化 VDP 和 TitleScreen
// ============================================================

console.log('\n=== 初始化 TitleScreen (TS) ===');
const vdp = new VDP();
vdp.reset();

const rom = new ArrayBufferRomReader(romData);
const nametableData = extractNametableFromVRAMDump(vramDump);
console.log(`Nametable 数据: ${nametableData.length}B (从 VRAM dump 0xC000 提取)`);

const title = new TitleScreen(vdp, rom, { nametableData });
await title.init();

// ============================================================
// 渲染
// ============================================================

console.log('\n=== 渲染 ===');
const width = vdp.width; // 320
const height = vdp.height; // 224
console.log(`画面尺寸: ${width}×${height}`);

const output = new Uint8Array(width * height * 4);
renderFrame(vdp, output);

// ============================================================
// 验证渲染结果
// ============================================================

console.log('\n=== 验证渲染结果 ===');

// 颜色统计
const colorMap = new Map();
for (let i = 0; i < output.length; i += 4) {
  const r = output[i];
  const g = output[i + 1];
  const b = output[i + 2];
  const key = `${r},${g},${b}`;
  colorMap.set(key, (colorMap.get(key) || 0) + 1);
}

console.log(`不同颜色数: ${colorMap.size}`);

const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
console.log('\n前 10 种颜色:');
for (let i = 0; i < Math.min(10, sorted.length); i++) {
  const [color, count] = sorted[i];
  const pct = (count / (width * height) * 100).toFixed(2);
  console.log(`  rgb(${color}): ${count} (${pct}%)`);
}

// 背景色检查
const bgCount = colorMap.get('0,0,72') || 0;
console.log(`\n背景色 rgb(0,0,72) 覆盖率: ${(bgCount / (width * height) * 100).toFixed(2)}%`);

// ============================================================
// 保存 PNG
// ============================================================

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(width, height);
for (let i = 0; i < output.length; i++) {
  imageData.data[i] = output[i];
}
ctx.putImageData(imageData, 0, 0);

const outputPath = path.join(
  __dirname,
  '../20260713/output/title-ts-render.png',
);
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`\n保存: ${outputPath}`);

// ============================================================
// ASCII art (120×42)
// ============================================================

console.log('\n=== ASCII art (120×42) ===');
const ASCII_CHARS = ' .:-=+*#%@';
const asciiW = 120;
const asciiH = 42;
for (let y = 0; y < asciiH; y++) {
  let line = '';
  for (let x = 0; x < asciiW; x++) {
    const px = Math.floor(x * width / asciiW);
    const py = Math.floor(y * height / asciiH);
    const idx = (py * width + px) * 4;
    const r = output[idx];
    const g = output[idx + 1];
    const b = output[idx + 2];
    const brightness = (r + g + b) / 3;
    const charIdx = Math.floor(brightness / 256 * ASCII_CHARS.length);
    line += ASCII_CHARS[Math.min(charIdx, ASCII_CHARS.length - 1)];
  }
  console.log(line);
}

console.log('\n=== 验证完成 ===');
