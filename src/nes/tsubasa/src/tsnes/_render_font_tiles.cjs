/**
 * 从 chr-bank-00.ts 渲染文本 tiles 为 BMP 图片
 * 同时输出 tile ID → 字符 的 ASCII 可视化映射表
 *
 * 用法: node _render_font_tiles.cjs
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════
// 读取 CHR BANK 00 数据
// ═══════════════════════════════════════════
const chrRaw = fs.readFileSync(
  path.join(__dirname, 'rom-data', 'chr-bank-00.ts'),
  'utf-8'
);
// 提取数组内容
const match = chrRaw.match(/\[\s*([\s\S]*?)\s*\];/);
if (!match) throw new Error('无法解析 chr-bank-00.ts');
const arrStr = match[1];
const CHR_BANK_00 = arrStr
  .split(',')
  .map(s => parseInt(s.trim(), 16) || 0)
  .filter(b => !isNaN(b));

// 确保是 8192 bytes (512 tiles × 16 bytes)
if (CHR_BANK_00.length > 8192) CHR_BANK_00.length = 8192;

console.log(`CHR BANK 00: ${CHR_BANK_00.length} bytes (${CHR_BANK_00.length / 16} tiles)`);

// ═══════════════════════════════════════════
// 读取 BANK 03 数据
// ═══════════════════════════════════════════
const bank03Raw = fs.readFileSync(
  path.join(__dirname, 'game-engine', 'native-game', 'tsubasa', 'banks', 'prg', 'bank-03-data-only.ts'),
  'utf-8'
);
const match2 = bank03Raw.match(/readonly\s+number\[\]\s*=\s*\[\s*([\s\S]*?)\s*\];/);
if (!match2) throw new Error('无法解析 bank-03-data-only.ts');
const arrStr2 = match2[1];
const BANK_03 = arrStr2
  .split(',')
  .map(s => parseInt(s.trim(), 16) || 0)
  .filter(b => !isNaN(b));

console.log(`BANK 03: ${BANK_03.length} bytes`);

// ═══════════════════════════════════════════
// 文本 tile 范围（来自 tile-text-map.ts）
// ═══════════════════════════════════════════
const FONT_RANGE = { min: 0x50, max: 0xE3 };

// 过滤掉已知控制码（对话脚本的控制字节）
const CONTROL_CODES = new Set([
  0x00, 0xFF, // 终止/填充
  // 脚本控制码
  0xDB, 0xDC, 0xDD, 0xDE, 0xDF, // 页面/章节控制
  0xE1, 0xE2, 0xE3, 0xE4, // 布局/位置
  0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xEE, 0xEF, // 扩展控制
  0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8,
  0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE,
]);

// 提取 bank-03 中在字体 tile 范围内的唯一 tile ID
const textTiles = new Set();
for (const b of BANK_03) {
  if (b >= FONT_RANGE.min && b <= FONT_RANGE.max && !CONTROL_CODES.has(b)) {
    textTiles.add(b);
  }
}

console.log(`\n文本 tile 范围: 0x${FONT_RANGE.min.toString(16)} - 0x${FONT_RANGE.max.toString(16)}`);
console.log(`Bank 03 中用到的文本 tiles: ${textTiles.size} 个`);
console.log(`Tile IDs: ${[...textTiles].sort((a, b) => a - b).map(t => '0x' + t.toString(16).padStart(2, '0')).join(', ')}`);

// ═══════════════════════════════════════════
// 渲染 tile 为 8x8 位图
// ═══════════════════════════════════════════
function renderTile(tileId) {
  const offset = tileId * 16;
  const pixels = [];
  for (let row = 0; row < 8; row++) {
    // NES 2bpp: first plane byte = low bit, second plane byte = high bit
    const plane0 = CHR_BANK_00[offset + row];
    const plane1 = CHR_BANK_00[offset + 8 + row];
    const rowPixels = [];
    for (let col = 0; col < 8; col++) {
      const mask = 0x80 >> col;
      const bit0 = (plane0 & mask) ? 1 : 0;
      const bit1 = (plane1 & mask) ? 2 : 0;
      const colorIdx = bit0 | bit1;
      // 0=透明, 1=灰, 2=浅灰, 3=白
      rowPixels.push(colorIdx);
    }
    pixels.push(rowPixels);
  }
  return pixels;
}

// ═══════════════════════════════════════════
// 创建 BMP 文件
// ═══════════════════════════════════════════
function createBMP(pixels, width, height, scale = 4) {
  const sw = width * scale;
  const sh = height * scale;
  const rowSize = Math.ceil(sw * 3 / 4) * 4; // 4-byte aligned
  const pixelDataSize = rowSize * sh;
  const fileSize = 54 + pixelDataSize;

  const buf = Buffer.alloc(fileSize, 0);

  // BMP file header (14 bytes)
  buf.write('BM', 0);                    // signature
  buf.writeUInt32LE(fileSize, 2);       // file size
  buf.writeUInt32LE(0, 6);              // reserved
  buf.writeUInt32LE(54, 10);            // pixel data offset

  // DIB header (40 bytes)
  buf.writeUInt32LE(40, 14);            // header size
  buf.writeInt32LE(sw, 18);             // width
  buf.writeInt32LE(-sh, 22);            // height (negative = top-down)
  buf.writeUInt16LE(1, 26);             // planes
  buf.writeUInt16LE(24, 28);            // bits per pixel
  buf.writeUInt32LE(0, 30);             // compression
  buf.writeUInt32LE(pixelDataSize, 34); // pixel data size
  buf.writeInt32LE(0, 38);              // h-res
  buf.writeInt32LE(0, 42);              // v-res
  buf.writeUInt32LE(0, 46);             // colors
  buf.writeUInt32LE(0, 50);             // important colors

  // Pixel data
  const palette = [
    [0, 0, 0],       // 0: 透明/黑
    [100, 100, 100], // 1: 灰色
    [180, 180, 180], // 2: 浅灰
    [255, 255, 255], // 3: 白色
  ];

  for (let y = 0; y < sh; y++) {
    const srcY = Math.floor(y / scale);
    const row = pixels[srcY];
    const rowOffset = 54 + y * rowSize;
    for (let x = 0; x < sw; x++) {
      const srcX = Math.floor(x / scale);
      const color = palette[row[srcX]];
      const pxOffset = rowOffset + x * 3;
      buf[pxOffset] = color[2];     // B
      buf[pxOffset + 1] = color[1]; // G
      buf[pxOffset + 2] = color[0]; // R
    }
  }

  return buf;
}

// ═══════════════════════════════════════════
// 渲染 ASCII 艺术预览
// ═══════════════════════════════════════════
function renderAscii(pixels) {
  const chars = ['·', '░', '▒', '█'];
  return pixels.map(row =>
    row.map(c => chars[c]).join('')
  ).join('\n');
}

// ═══════════════════════════════════════════
// 生成 tiles 精灵图（大图）
// ═══════════════════════════════════════════
const sortedTiles = [...textTiles].sort((a, b) => a - b);
const COLS = 16;
const ROWS = Math.ceil(sortedTiles.length / COLS);
const TILE_W = 8;
const TILE_H = 8;
const GAP = 1;

const sheetW = COLS * TILE_W + (COLS + 1) * GAP;
const sheetH = ROWS * TILE_H + (ROWS + 1) * GAP;

// 创建大图像素
const sheetPixels = [];
for (let y = 0; y < sheetH; y++) {
  sheetPixels.push(new Array(sheetW).fill(1)); // 灰色背景
}

for (let i = 0; i < sortedTiles.length; i++) {
  const tileId = sortedTiles[i];
  const tileCol = i % COLS;
  const tileRow = Math.floor(i / COLS);
  const baseX = tileCol * TILE_W + (tileCol + 1) * GAP;
  const baseY = tileRow * TILE_H + (tileRow + 1) * GAP;

  const tile = renderTile(tileId);
  for (let y = 0; y < TILE_H; y++) {
    for (let x = 0; x < TILE_W; x++) {
      sheetPixels[baseY + y][baseX + x] = tile[y][x];
    }
  }
}

// 输出 BMP
const outDir = path.join(__dirname, 'temp', 'font_tiles');
fs.mkdirSync(outDir, { recursive: true });

// 精灵图
const sheetBmp = createBMP(sheetPixels, sheetW, sheetH, 4);
fs.writeFileSync(path.join(outDir, 'font_sheet.bmp'), sheetBmp);
console.log(`\n精灵图已保存: temp/font_tiles/font_sheet.bmp`);

// 单独 tile
for (const tileId of sortedTiles) {
  const tile = renderTile(tileId);
  const bmp = createBMP(tile, TILE_W, TILE_H, 4);
  const fname = `tile_0x${tileId.toString(16).toUpperCase().padStart(2, '0')}.bmp`;
  fs.writeFileSync(path.join(outDir, fname), bmp);
}

// ═══════════════════════════════════════════
// 生成 ASCII 映射表
// ═══════════════════════════════════════════
let asciiReport = '# 字体 Tile 映射表\n\n';
asciiReport += `范围: 0x${FONT_RANGE.min.toString(16)} - 0x${FONT_RANGE.max.toString(16)}\n`;
asciiReport += `Bank 03 中使用到的文本 tile 数量: ${textTiles.size}\n\n`;
asciiReport += '## ASCII 预览\n\n';
asciiReport += '```\n';

for (const tileId of sortedTiles) {
  const tile = renderTile(tileId);
  asciiReport += `--- Tile 0x${tileId.toString(16).toUpperCase().padStart(2, '0')} (${tileId}) ---\n`;
  asciiReport += renderAscii(tile) + '\n\n';
}
asciiReport += '```\n\n';

// 同时也输出所有 tile 在字体范围内的频次统计
asciiReport += '## Tile 频次统计（Bank 03 中）\n\n';
const freq = {};
for (const b of BANK_03) {
  if (b >= FONT_RANGE.min && b <= FONT_RANGE.max && !CONTROL_CODES.has(b)) {
    freq[b] = (freq[b] || 0) + 1;
  }
}
asciiReport += '| Tile ID | 出现次数 |\n';
asciiReport += '|---------|----------|\n';
for (const tileId of sortedTiles) {
  asciiReport += `| 0x${tileId.toString(16).toUpperCase().padStart(2, '0')} (${tileId}) | ${freq[tileId]} |\n`;
}

const reportPath = path.join(outDir, 'tile_map.txt');
fs.writeFileSync(reportPath, asciiReport);
console.log(`映射报告已保存: temp/font_tiles/tile_map.txt`);

// ═══════════════════════════════════════════
// 尝试解码 bank-03 对话内容
// ═══════════════════════════════════════════
console.log('\n═══════════════════════════════');
console.log('Bank 03 文本流解码（仅显示 font tile 序列段）:');
console.log('═══════════════════════════════\n');

let buf = [];
let segmentNum = 0;

function flushBuf() {
  if (buf.length >= 2) {
    segmentNum++;
    // 显示原始 hex
    const hex = buf.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
    // 显示 tile ID
    const tl = buf.map(b => `[${b.toString(16).toUpperCase().padStart(2, '0')}]`).join('');
    console.log(` 段${segmentNum} (${buf.length}t): ${hex}`);
  }
  buf = [];
}

for (let i = 0; i < BANK_03.length; i++) {
  const b = BANK_03[i];
  if (b >= FONT_RANGE.min && b <= FONT_RANGE.max) {
    buf.push(b);
  } else {
    flushBuf();
  }
}
flushBuf();

console.log('\n所有文件已输出到 temp/font_tiles/ 目录');
