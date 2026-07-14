/**
 * 验证 title-rom-render.png 的渲染结果
 * 统计颜色分布、检查背景色覆盖率
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PNG_PATH = path.join(__dirname, '../20260713/output/title-rom-render.png');

const imgBuffer = fs.readFileSync(PNG_PATH);
const img = await loadImage(imgBuffer);
const canvas = createCanvas(img.width, img.height);
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

const W = canvas.width;
const H = canvas.height;
console.log(`图像尺寸: ${W}×${H}`);
console.log(`总像素: ${W * H}`);

// 颜色直方图
const colorMap = new Map();
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const key = `${r},${g},${b}`;
  colorMap.set(key, (colorMap.get(key) || 0) + 1);
}

console.log(`\n不同颜色数: ${colorMap.size}`);

// 排序显示前20种颜色
const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
console.log('\n前20种颜色:');
for (let i = 0; i < Math.min(20, sorted.length); i++) {
  const [color, count] = sorted[i];
  const pct = (count / (W * H) * 100).toFixed(2);
  console.log(`  rgb(${color}): ${count} (${pct}%)`);
}

// 背景色检查
const bgColor = '0,0,72';
const bgCount = colorMap.get(bgColor) || 0;
console.log(`\n背景色 rgb(0,0,72) 覆盖率: ${(bgCount / (W * H) * 100).toFixed(2)}%`);

// 检查特定区域 (标题文字应该位于画面中央偏上)
console.log('\n=== 区域采样 ===');
// 标题文字区域 (大约在 y=40-80)
const sampleAreas = [
  { name: '左上', x: 0, y: 0, w: 80, h: 28 },
  { name: '右上', x: 240, y: 0, w: 80, h: 28 },
  { name: '标题中部', x: 80, y: 40, w: 160, h: 40 },
  { name: '中央', x: 80, y: 100, w: 160, h: 40 },
  { name: '左下', x: 0, y: 196, w: 80, h: 28 },
  { name: '右下', x: 240, y: 196, w: 80, h: 28 },
];

for (const area of sampleAreas) {
  const counts = new Map();
  for (let y = area.y; y < area.y + area.h && y < H; y++) {
    for (let x = area.x; x < area.x + area.w && x < W; x++) {
      const idx = (y * W + x) * 4;
      const key = `${data[idx]},${data[idx + 1]},${data[idx + 2]}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(`\n${area.name} (${area.x},${area.y}) ${area.w}×${area.h}:`);
  for (const [color, count] of sorted) {
    console.log(`  rgb(${color}): ${count}`);
  }
}

// 保存 ASCII art (更大尺寸, 120×42)
console.log('\n=== 渲染结果 ASCII art (120×42) ===');
const ASCII_CHARS = ' .:-=+*#%@';
const asciiW = 120;
const asciiH = 42;
for (let y = 0; y < asciiH; y++) {
  let line = '';
  for (let x = 0; x < asciiW; x++) {
    const px = Math.floor(x * W / asciiW);
    const py = Math.floor(y * H / asciiH);
    const idx = (py * W + px) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const brightness = (r + g + b) / 3;
    const charIdx = Math.floor(brightness / 256 * ASCII_CHARS.length);
    line += ASCII_CHARS[Math.min(charIdx, ASCII_CHARS.length - 1)];
  }
  console.log(line);
}

// 检查是否单色画面 (只有背景色)
const onlyBg = colorMap.size === 1 && colorMap.has(bgColor);
console.log(`\n单色画面(仅背景色): ${onlyBg}`);
console.log(`颜色丰富度: ${colorMap.size > 10 ? '丰富' : colorMap.size > 3 ? '中等' : '稀少'}`);
