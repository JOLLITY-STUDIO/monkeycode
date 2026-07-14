/**
 * 验证预提取数据的标题画面渲染
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { VDP } from '../game/hw/vdp/vdp.js';
import { renderFrame } from '../game/hw/vdp/renderer.js';
import { TitleScreen } from '../game/scenes/TitleScreen.js';

console.log('=== 初始化 VDP ===');
const vdp = new VDP();
vdp.reset();

console.log('\n=== 初始化 TitleScreen (使用预提取数据) ===');
const title = new TitleScreen(vdp);
title.init();

console.log('\n=== 渲染 ===');
const width = vdp.width;
const height = vdp.height;
console.log(`画面尺寸: ${width}×${height}`);

const output = new Uint8Array(width * height * 4);
renderFrame(vdp, output);

console.log('\n=== 验证渲染结果 ===');
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

const bgCount = colorMap.get('0,0,72') || 0;
console.log(`\n背景色 rgb(0,0,72) 覆盖率: ${(bgCount / (width * height) * 100).toFixed(2)}%`);

console.log('\n=== 保存 PNG ===');
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(width, height);
for (let i = 0; i < output.length; i++) {
  imageData.data[i] = output[i];
}
ctx.putImageData(imageData, 0, 0);

const outputPath = path.join(__dirname, '../20260713/output/title-preextracted.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`保存: ${outputPath}`);

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
