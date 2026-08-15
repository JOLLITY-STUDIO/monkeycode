/**
 * 批量把所有 CHR bank 和 VROM bank 渲染成 PNG 精灵表
 *
 * 用法: node tools/render_all_banks.mjs [--scale N]
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { decodeAllTiles } from './tile_codec.mjs';
import { encodePNG } from './png_encoder.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
let scale = 4;
const scaleIdx = args.indexOf('--scale');
if (scaleIdx >= 0 && args.length > scaleIdx + 1) {
  scale = parseInt(args[scaleIdx + 1], 10) || 4;
}

// ── 配置 ──────────────────────────────────────────────
const TILE_W = 8, TILE_H = 8;
const COLS = 32; // 每行 32 个 tile (8KB bank = 512 tiles → 16 rows)
const palette = [
  [0,   0,   0  ],
  [85,  85,  85 ],
  [170, 170, 170],
  [255, 255, 255],
];

// ── 从 .ts 文件提取 raw bytes ─────────────────────────
function extractBytesFromTs(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const start = raw.lastIndexOf('[');
  const end = raw.lastIndexOf(']');
  if (start < 0 || end < start) {
    throw new Error(`未找到数组内容: ${filePath}`);
  }
  return raw.slice(start + 1, end)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => parseInt(s, 16));
}

// ── 渲染 tiles → PNG buffer ───────────────────────────
function renderTilesToPNG(bytes, scale) {
  const tiles = decodeAllTiles(bytes);
  const n = tiles.length;
  const rows = Math.ceil(n / COLS);
  const imgW = COLS * TILE_W * scale;
  const imgH = rows * TILE_H * scale;
  const indices = new Uint8Array(imgW * imgH);
  indices.fill(0);

  for (let i = 0; i < n; i++) {
    const tile = tiles[i];
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

  return { png: encodePNG(imgW, imgH, palette, indices), w: imgW, h: imgH, tiles: n };
}

// ── 解析 VROM bank 文件，提取引用信息 ──────────────────
function parseVromBank(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  // import _CHR_BANK_8 from '../chr_banks/bank_8_8k';
  const importMatch = content.match(/import\s+(\w+)\s+from\s+'\.\.\/chr_banks\/bank_(\d+)_8k'/);
  if (!importMatch) throw new Error(`无法解析 import: ${filePath}`);
  const srcBankNum = parseInt(importMatch[2], 10);

  // _CHR_BANK_8.slice(0, 4096)
  const sliceMatch = content.match(/\.slice\((\d+),\s*(\d+)\)/);
  if (!sliceMatch) throw new Error(`无法解析 slice: ${filePath}`);
  const sliceStart = parseInt(sliceMatch[1], 10);
  const sliceEnd = parseInt(sliceMatch[2], 10);

  return { srcBankNum, sliceStart, sliceEnd };
}

// ── 缓存已加载的 CHR bank bytes ────────────────────────
const chrBankCache = {};

function loadChrBank(num) {
  if (!chrBankCache[num]) {
    const filePath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'chr_banks', `bank_${num}_8k.ts`);
    chrBankCache[num] = extractBytesFromTs(filePath);
  }
  return chrBankCache[num];
}

// ═══════════════════════════════════════════════════════
//  渲染 CHR banks (bank_0_8k ~ bank_15_8k)
// ═══════════════════════════════════════════════════════
const chrPngDir = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'chr_banks', 'png');
if (!existsSync(chrPngDir)) mkdirSync(chrPngDir, { recursive: true });

console.log('=== 渲染 CHR Banks (8KB) ===');
for (let i = 0; i <= 15; i++) {
  const filePath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'chr_banks', `bank_${i}_8k.ts`);
  const bytes = extractBytesFromTs(filePath);
  const { png, w, h, tiles: n } = renderTilesToPNG(bytes, scale);
  const outPath = join(chrPngDir, `bank_${i}_8k.png`);
  writeFileSync(outPath, png);
  console.log(`  bank_${i}_8k.png  (${w}×${h}, ${n} tiles, ${scale}x)`);
}

// ═══════════════════════════════════════════════════════
//  渲染 VROM banks (bank_0_4k ~ bank_31_4k)
// ═══════════════════════════════════════════════════════
const vromPngDir = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'vrom_banks', 'png');
if (!existsSync(vromPngDir)) mkdirSync(vromPngDir, { recursive: true });

console.log('\n=== 渲染 VROM Banks (4KB) ===');
for (let i = 0; i <= 31; i++) {
  const vromPath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'vrom_banks', `bank_${i}_4k.ts`);
  const { srcBankNum, sliceStart, sliceEnd } = parseVromBank(vromPath);
  const chrBytes = loadChrBank(srcBankNum);
  const sliceBytes = chrBytes.slice(sliceStart, sliceEnd);
  const { png, w, h, tiles: n } = renderTilesToPNG(sliceBytes, scale);
  const outPath = join(vromPngDir, `bank_${i}_4k.png`);
  writeFileSync(outPath, png);
  console.log(`  bank_${i}_4k.png  (${w}×${h}, ${n} tiles, ${scale}x) ← CHR bank ${srcBankNum}[${sliceStart}:${sliceEnd}]`);
}

console.log(`\n✓ 完成!`);
console.log(`  CHR PNG: ${chrPngDir}`);
console.log(`  VROM PNG: ${vromPngDir}`);
