// 渲染 char-map.ts 中所有双 tile 字符 ($A0-$D1) 为 16x8 ASCII art
// 双 tile = hiTile (左 8x8) + loTile (右 8x8), 均从 chr-bank-00.ts 读取
'use strict';
const fs = require('fs');
const path = require('path');

// 读 chr-bank-00
const chrSrc = fs.readFileSync(path.join(__dirname, '../src/game/data/chr/chr-bank-00.ts'), 'utf-8');
const m = chrSrc.match(/=\s*\[([\s\S]*?)\]/);
const chr = m[1].split(',').map(s => s.trim()).filter(s => /^0x/.test(s)).map(s => parseInt(s, 16));
console.error('chr-bank-00 length:', chr.length, '(expect 8192)');

// 读 char-map.ts 的 CHAR_MAP_DOUBLE
const cmSrc = fs.readFileSync(path.join(__dirname, '../src/game/service/bank00/char-map.ts'), 'utf-8');
const dblMatch = cmSrc.match(/CHAR_MAP_DOUBLE[\s\S]*?=\s*\{([\s\S]*?)\};/);
const dblBlock = dblMatch[1];
const entries = [];
const re = /0x([0-9A-Fa-f]{2})\s*:\s*\{\s*hiTile:\s*(0x[0-9A-Fa-f]+)\s*,\s*loTile:\s*(0x[0-9A-Fa-f]+)\s*,\s*char:\s*'([^']*)'\s*\}/g;
let mm;
while ((mm = re.exec(dblBlock)) !== null) {
  entries.push({
    code: parseInt(mm[1], 16),
    hiTile: parseInt(mm[2], 16),
    loTile: parseInt(mm[3], 16),
    char: mm[4],
  });
}
console.error('双 tile 条目数:', entries.length);

// 渲染单个 8x8 tile
function renderTile(tileIdx) {
  if (tileIdx < 0 || tileIdx >= 256) return ['(越界)'.padEnd(8)];
  const off = tileIdx * 16; // 每 tile 16 字节 (8 行 × 2 plane)
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[off + y] || 0;       // plane 0
    const p1 = chr[off + 8 + y] || 0;   // plane 1
    let row = '';
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const v0 = (p0 >> bit) & 1;
      const v1 = (p1 >> bit) & 1;
      const c = (v1 << 1) | v0;
      row += c === 0 ? ' ' : c === 1 ? '.' : c === 2 ? ':' : '#';
    }
    rows.push(row);
  }
  return rows;
}

// 渲染双 tile (左 hiTile + 右 loTile)
function renderDouble(hiTile, loTile) {
  const left = renderTile(hiTile);
  const right = renderTile(loTile);
  const rows = [];
  for (let y = 0; y < 8; y++) {
    rows.push(left[y] + right[y]);
  }
  return rows;
}

// 输出所有双 tile 字符
let out = '';
for (const e of entries) {
  out += `=== 0x${e.code.toString(16).toUpperCase().padStart(2, '0')} (hiTile=0x${e.hiTile.toString(16).padStart(2,'0')} loTile=0x${e.loTile.toString(16).padStart(2,'0')}) char='${e.char}' ===\n`;
  const rows = renderDouble(e.hiTile, e.loTile);
  for (const r of rows) {
    out += '| ' + r + ' |\n';
  }
  out += '\n';
}

const outPath = path.join(__dirname, '_dbl_tile_render.txt');
fs.writeFileSync(outPath, out, 'utf-8');
console.error('写入', outPath);
