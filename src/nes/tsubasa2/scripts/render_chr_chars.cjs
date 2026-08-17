/**
 * CHR tile 字符渲染器 — 渲染指定 CHR bank 中的 tile 为 ASCII art
 *
 * 用途: 识别脚本中文本字节对应的字符外观, 建立字符映射表
 *
 * NES CHR tile 格式:
 *   - 每个 tile 16 字节 (8 字节 plane0 + 8 字节 plane1)
 *   - 8x8 像素
 *   - 像素值 = (plane0_bit << 1) | plane1_bit  (0=透明, 1-3=颜色)
 *
 * 用法: node scripts/render_chr_chars.cjs [bankId] [startTile] [count]
 *   bankId: CHR bank 编号 (0-15), 默认 0
 *   startTile: 起始 tile 索引 (0-255), 默认 0
 *   count: 渲染 tile 数量, 默认 256
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ── 加载 CHR bank ──
function loadChrBank(bankId) {
  const id = bankId.toString().padStart(2, '0');
  const p = path.resolve(__dirname, `../../rom-data/chr-bank-${id}.ts`);
  const src = fs.readFileSync(p, 'utf-8');
  const m = src.match(/const CHR_BANK_\d+[\s\S]*?=\s*\[([\s\S]*?)\]/);
  if (!m) throw new Error(`无法解析 CHR bank ${id}`);
  return m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
}

// ── 渲染单个 tile 为 ASCII art ──
function renderTile(chrData, tileIdx) {
  const base = tileIdx * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const plane0 = chrData[base + y] || 0;
    const plane1 = chrData[base + 8 + y] || 0;
    let row = '';
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (plane0 >> bit) & 1;
      const p1 = (plane1 >> bit) & 1;
      const pix = (p0 << 1) | p1;
      // 0=空, 1=░, 2=▒, 3=█
      row += [' ', '\u2591', '\u2592', '\u2588'][pix];
    }
    rows.push(row);
  }
  return rows;
}

// ── 主程序 ──
const bankId = parseInt(process.argv[2] || '0', 10);
const startTile = parseInt(process.argv[3] || '0', 10);
const count = parseInt(process.argv[4] || '256', 10);

const chrData = loadChrBank(bankId);
console.log(`═══ CHR Bank ${bankId} — Tile ${startTile}-${startTile + count - 1} ═══`);
console.log(`(每 tile 8x8, 字符 $00-$D7 映射)`);
console.log('');

// 渲染 tile, 每行 8 个 tile
const tilesPerRow = 8;
for (let i = 0; i < count; i += tilesPerRow) {
  const batch = [];
  for (let j = 0; j < tilesPerRow && i + j < count; j++) {
    const tileIdx = startTile + i + j;
    batch.push({ tileIdx, rows: renderTile(chrData, tileIdx) });
  }
  if (batch.length === 0) break;

  // 输出 tile 索引行
  const headerLine = batch.map(t => {
    const hex = t.tileIdx.toString(16).padStart(2, '0').toUpperCase();
    return `[${hex}]    `;
  }).join(' ');
  console.log(headerLine);

  // 输出 8 行像素
  for (let y = 0; y < 8; y++) {
    const line = batch.map(t => t.rows[y]).join('  ');
    console.log(line);
  }
  console.log('');
}
