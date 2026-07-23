/**
 * CHR Tile 可视化渲染 & 导出工具
 *
 * 用法：
 *   # 终端 ASCII 预览 (默认)
 *   node tools/render_chr_tiles.mjs src/tsnes/tsubasa-code/chr_banks/bank_0_8k.ts
 *   node tools/render_chr_tiles.mjs src/tsnes/tsubasa-code/chr_banks/bank_0_8k.ts 0 10
 *
 *   # 导出 PNG 精灵表
 *   node tools/render_chr_tiles.mjs src/tsnes/tsubasa-code/chr_banks/bank_0_8k.ts --png
 *   node tools/render_chr_tiles.mjs src/tsnes/tsubasa-code/chr_banks/bank_0_8k.ts --png --scale 4
 *
 *   # 导出结构化 JSON
 *   node tools/render_chr_tiles.mjs src/tsnes/tsubasa-code/chr_banks/bank_0_8k.ts --json
 *   node tools/render_chr_tiles.mjs src/tsnes/tsubasa-code/chr_banks/bank_0_8k.ts 0 10 --json
 */

import { writeFileSync } from 'fs';
import { resolve, basename } from 'path';
import { loadBank } from './tile_codec.mjs';
import { encodePNG } from './png_encoder.mjs';

// ── 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);

let filePath = '';
let startIdx = 0;
let endIdx = undefined;
let exportPNG = false;
let exportJSON = false;
let scale = 4;

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--png')           { exportPNG = true; }
  else if (a === '--json')     { exportJSON = true; }
  else if (a === '--scale')    { scale = parseInt(args[++i], 10) || 4; }
  else if (!filePath)          { filePath = a; }
  else if (startIdx === 0 && endIdx === undefined && !isNaN(a)) {
    const n = parseInt(a, 10);
    if (startIdx === 0 && i === args.indexOf(a) && args.indexOf(a) === args.findIndex(x => !isNaN(x))) {
      // first numeric arg = start
      startIdx = n;
    } else {
      endIdx = n;
    }
  }
}

// re-parse numeric args properly
const numericArgs = args.filter(a => !a.startsWith('--') && a !== filePath).map(Number).filter(n => !isNaN(n));
if (numericArgs.length > 0) startIdx = numericArgs[0];
if (numericArgs.length > 1) endIdx   = numericArgs[1];

if (!filePath) {
  console.log('用法: node tools/render_chr_tiles.mjs <bank.ts> [startTile] [endTile] [--png] [--json] [--scale N]');
  process.exit(1);
}

filePath = resolve(filePath);

// ── 加载 & 解码 ──────────────────────────────────────────
const { bytes, tiles } = loadBank(filePath);

// 范围: 导出模式默认全部, 预览模式默认仅第 0 个
const userSpecifiedRange = endIdx !== undefined;
let tileToRender;
if (userSpecifiedRange) {
  tileToRender = tiles.slice(startIdx, endIdx + 1);
} else if (exportPNG || exportJSON) {
  tileToRender = tiles; // 导出全部
} else {
  tileToRender = [tiles[startIdx]]; // 预览首个
}

console.log(`文件: ${filePath}`);
console.log(`总 tile 数: ${tiles.length} (共 ${bytes.length} 字节)\n`);

// ── JSON 导出 ────────────────────────────────────────────
if (exportJSON) {
  const outPath = filePath.replace(/\.ts$/, '_tiles.json');
  const output = tileToRender.map(t => ({
    index:  t.index,
    bp0:    t.bp0.map(b => `0x${b.toString(16).padStart(2, '0')}`),
    bp1:    t.bp1.map(b => `0x${b.toString(16).padStart(2, '0')}`),
    pixels: t.pixels,
    ascii:  t.ascii,
  }));
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`JSON 已导出: ${outPath}`);
}

// ── PNG 精灵表导出 ───────────────────────────────────────
if (exportPNG) {
  const TILE_W = 8, TILE_H = 8;
  const COLS = 32; // 每行 32 个 tile
  const n = tileToRender.length;
  const rows = Math.ceil(n / COLS);

  const imgW = COLS * TILE_W * scale;
  const imgH = rows * TILE_H * scale;

  // 4 色灰度调色板: 0=黑 1=暗灰 2=浅灰 3=白
  const palette = [
    [0,   0,   0  ],
    [85,  85,  85 ],
    [170, 170, 170],
    [255, 255, 255],
  ];

  const indices = new Uint8Array(imgW * imgH);
  indices.fill(0);

  for (let i = 0; i < n; i++) {
    const tile = tileToRender[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    for (let y = 0; y < TILE_H; y++) {
      for (let x = 0; x < TILE_W; x++) {
        const color = tile.pixels[y][x];
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const py = row * TILE_H * scale + y * scale + dy;
            const px = col * TILE_W * scale + x * scale + dx;
            indices[py * imgW + px] = color;
          }
        }
      }
    }
  }

  const outPath = filePath.replace(/\.ts$/, '_sprites.png');
  const pngBuf = encodePNG(imgW, imgH, palette, indices);
  writeFileSync(outPath, pngBuf);
  console.log(`PNG 精灵表已导出: ${outPath}  (${imgW}×${imgH}, ${scale}x 缩放)`);
}

// ── 终端 ASCII 预览 ──────────────────────────────────────
if (!exportPNG && !exportJSON) {
  for (const tile of tileToRender) {
    const bp0Hex = tile.bp0.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ');
    const bp1Hex = tile.bp1.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ');
    console.log(`─── Tile ${tile.index} ────────────────────────────────────────`);
    console.log(`  bp0: [${bp0Hex}]`);
    console.log(`  bp1: [${bp1Hex}]`);
    console.log();
    for (const row of tile.ascii) {
      console.log(`  │${row}│`);
    }
    console.log();
  }
}
