import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);

const bmpWidth = bmpBuf.readInt32LE(18);
const bmpHeight = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((bmpWidth * 3 + 3) >> 2) * 4;

console.log(`截图: ${bmpWidth}x${Math.abs(bmpHeight)}, dataOffset=0x${dataOffset.toString(16)}`);

function getPixel(sx, sy) {
  const srcY = bmpHeight > 0 ? (bmpHeight - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return { r: bmpBuf[srcOff + 2], g: bmpBuf[srcOff + 1], b: bmpBuf[srcOff + 0] };
}

// 1. ASCII art 显示截图（降采样到 80x28）
console.log('\n=== 截图 ASCII art (降采样 80x28) ===');
const CHAR_W = 80, CHAR_H = 28;
const stepX = Math.floor(bmpWidth / CHAR_W);
const stepY = Math.floor(Math.abs(bmpHeight) / CHAR_H);

for (let cy = 0; cy < CHAR_H; cy++) {
  let line = '';
  for (let cx = 0; cx < CHAR_W; cx++) {
    const sx = cx * stepX;
    const sy = cy * stepY;
    const c = getPixel(sx, sy);
    // 亮度映射
    const lum = (c.r + c.g + c.b) / 3;
    if (lum < 30) line += ' ';
    else if (lum < 80) line += '.';
    else if (lum < 130) line += ':';
    else if (lum < 180) line += 'o';
    else if (lum < 220) line += 'O';
    else line += '#';
  }
  console.log(line);
}

// 2. 检查截图是否有边框模式
console.log('\n=== 截图边框检查 (查看是否有左右边框) ===');
// 检查左边的 X=0-128 和右边的 X=192-320 区域
let leftNonBg = 0, rightNonBg = 0, centerNonBg = 0;
let totalLeft = 0, totalRight = 0, totalCenter = 0;
function isBg(c) {
  return Math.abs(c.r - 0) <= 5 && Math.abs(c.g - 0) <= 5 && Math.abs(c.b - 72) <= 10;
}
for (let y = 0; y < 224; y++) {
  for (let x = 0; x < 320; x++) {
    const c = getPixel(x, y);
    const isBgC = isBg(c);
    if (x < 128) {
      totalLeft++;
      if (!isBgC) leftNonBg++;
    } else if (x < 192) {
      totalCenter++;
      if (!isBgC) centerNonBg++;
    } else {
      totalRight++;
      if (!isBgC) rightNonBg++;
    }
  }
}
console.log(`左侧 (X0-127): ${leftNonBg}/${totalLeft} 非背景 (${(leftNonBg/totalLeft*100).toFixed(1)}%)`);
console.log(`中间 (X128-191): ${centerNonBg}/${totalCenter} 非背景 (${(centerNonBg/totalCenter*100).toFixed(1)}%)`);
console.log(`右侧 (X192-319): ${rightNonBg}/${totalRight} 非背景 (${(rightNonBg/totalRight*100).toFixed(1)}%)`);

// 3. 列出截图中的主要颜色
console.log('\n=== 截图主要颜色统计 ===');
const colorMap = new Map();
for (let y = 0; y < 224; y++) {
  for (let x = 0; x < 320; x++) {
    const c = getPixel(x, y);
    // 量化到 36 的倍数
    const key = `${Math.round(c.r/36)*36},${Math.round(c.g/36)*36},${Math.round(c.b/36)*36}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
}
const sorted = Array.from(colorMap.entries()).sort((a,b) => b[1] - a[1]);
console.log('前15种主要颜色:');
for (const [color, count] of sorted.slice(0, 15)) {
  console.log(`  rgb(${color}): ${count} 像素 (${(count/(320*224)*100).toFixed(1)}%)`);
}

// 4. 检查截图中心区域是否包含文字
console.log('\n=== 截图中心区域分析 (160, 80-160) ===');
const centerPixels = [];
for (let y = 80; y < 160; y++) {
  for (let x = 120; x < 200; x++) {
    const c = getPixel(x, y);
    if (!isBg(c)) centerPixels.push({ x, y, c });
  }
}
console.log(`中心区域非背景像素: ${centerPixels.length}`);
if (centerPixels.length > 0) {
  // 显示前10个
  console.log('前10个非背景像素:');
  for (const p of centerPixels.slice(0, 10)) {
    console.log(`  (${p.x},${p.y}): rgb(${p.c.r},${p.c.g},${p.c.b})`);
  }
}

// 5. 列出截图文件名包含的信息
console.log('\n=== 截图文件信息 ===');
console.log('文件: Langrisser II (Japan)_034.bmp');
console.log('推测: 这是模拟器抓取的第34帧，可能是游戏启动后的某一帧');
console.log('检查其他截图...');
