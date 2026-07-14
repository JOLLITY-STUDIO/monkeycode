/**
 * 对比截图和渲染输出的尺寸
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, loadImage } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const screenshotPath = resolve(ROOT, 'screenshots/Langrisser II (Japan)_034.bmp');
const renderPath = resolve(ROOT, 'output/title-ts-vdp.png');

// 读取 BMP 文件头获取尺寸
function getBmpSize(buffer: Buffer): { width: number; height: number } {
  // BMP 文件头:
  // 0x00-0x01: "BM"
  // 0x02-0x05: 文件大小
  // 0x0A-0x0D: 像素数据偏移
  // 0x12-0x15: 宽度 (signed int32 LE)
  // 0x16-0x19: 高度 (signed int32 LE)
  const width = buffer.readInt32LE(0x12);
  const height = buffer.readInt32LE(0x16);
  return { width, height: Math.abs(height) };
}

const bmpBuf = readFileSync(screenshotPath);
const bmpSize = getBmpSize(bmpBuf);
console.log('=== 截图尺寸 ===');
console.log(`文件: ${screenshotPath}`);
console.log(`尺寸: ${bmpSize.width} x ${bmpSize.height}`);

// 用 canvas 读取渲染输出
console.log('\n=== 渲染输出尺寸 ===');
const img = await loadImage(renderPath);
console.log(`文件: ${renderPath}`);
console.log(`尺寸: ${img.width} x ${img.height}`);

console.log('\n=== 对比 ===');
console.log(`宽度一致: ${bmpSize.width === img.width}`);
console.log(`高度一致: ${bmpSize.height === img.height}`);
console.log(`当前渲染模式: H40 x V28 = 320 x 224`);

// 如果尺寸不一致，尝试分析可能的模式
if (bmpSize.width !== img.width || bmpSize.height !== img.height) {
  console.log('\n=== 可能的 VDP 模式 ===');
  const modes = [
    { name: 'H32 V28', w: 256, h: 224 },
    { name: 'H32 V30', w: 256, h: 240 },
    { name: 'H40 V28', w: 320, h: 224 },
    { name: 'H40 V30', w: 320, h: 240 },
  ];
  for (const m of modes) {
    if (m.w === bmpSize.width && m.h === bmpSize.height) {
      console.log(`匹配: ${m.name} (${m.w}x${m.h})`);
    }
  }
}
