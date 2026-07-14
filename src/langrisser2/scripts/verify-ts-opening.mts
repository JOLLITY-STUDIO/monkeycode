/**
 * 验证 TypeScript 版 OpeningAnimation 渲染
 *
 * 使用 OpeningAnimationData.ts 的数据 + VDP 渲染管线
 * 渲染两帧开场动画到 PPM 文件
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { VDP } from '../game/hw/vdp/vdp.js';
import { renderFrame } from '../game/hw/vdp/renderer.js';
import { OpeningAnimation } from '../game/scenes/OpeningAnimation.js';
import {
  OPENING_FRAME_COUNT,
  OPENING_DISPLAY_WIDTH,
  OPENING_DISPLAY_HEIGHT,
} from '../game/data/OpeningAnimationData.js';

console.log('=== 验证 OpeningAnimation (TS) ===\n');

// ============================================================
// 初始化 VDP 和 OpeningAnimation
// ============================================================
const vdp = new VDP();
vdp.reset();

const opening = new OpeningAnimation(vdp, { frameInterval: 60 });
opening.init();

console.log(`\n画面尺寸: ${OPENING_DISPLAY_WIDTH}×${OPENING_DISPLAY_HEIGHT}`);
console.log(`VDP 宽度: ${vdp.width}, 高度: ${vdp.height}`);
console.log(`Plane A 基址: 0x${vdp.planeABaseAddr.toString(16)}`);
console.log(`Sprite 表基址: 0x${vdp.spriteTableAddr.toString(16)}`);

// ============================================================
// 渲染每一帧
// ============================================================
const OUT_DIR = path.join(__dirname, '../20260713/output');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const width = OPENING_DISPLAY_WIDTH;
const height = OPENING_DISPLAY_HEIGHT;

for (let frameIdx = 0; frameIdx < OPENING_FRAME_COUNT; frameIdx++) {
  console.log(`\n=== 渲染帧 ${frameIdx + 1}/${OPENING_FRAME_COUNT} ===`);
  opening.seekTo(frameIdx);

  const output = new Uint8Array(width * height * 4);
  renderFrame(vdp, output);

  // 统计
  let nonBlack = 0;
  const colorStats = new Map();
  for (let i = 0; i < width * height; i++) {
    const r = output[i * 4];
    const g = output[i * 4 + 1];
    const b = output[i * 4 + 2];
    if (r > 0 || g > 0 || b > 0) nonBlack++;
    const key = `${r},${g},${b}`;
    colorStats.set(key, (colorStats.get(key) || 0) + 1);
  }

  console.log(`  非黑像素: ${nonBlack}/${width * height} (${(nonBlack / (width * height) * 100).toFixed(1)}%)`);
  console.log(`  唯一颜色数: ${colorStats.size}`);
  console.log(`  前 5 颜色:`);
  const sorted = Array.from(colorStats.entries()).sort((a, b) => b[1] - a[1]);
  for (const [color, count] of sorted.slice(0, 5)) {
    console.log(`    rgb(${color}): ${count} 像素`);
  }

  // 保存 PPM
  const header = `P6\n${width} ${height}\n255\n`;
  const headerBuf = Buffer.from(header, 'ascii');
  const rgbData = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    rgbData[i * 3] = output[i * 4];
    rgbData[i * 3 + 1] = output[i * 4 + 1];
    rgbData[i * 3 + 2] = output[i * 4 + 2];
  }
  const outPath = path.join(OUT_DIR, `opening-ts-frame${frameIdx + 1}.ppm`);
  fs.writeFileSync(outPath, Buffer.concat([headerBuf, rgbData]));
  console.log(`  保存: ${outPath}`);
}

console.log('\n=== 完成 ===');
