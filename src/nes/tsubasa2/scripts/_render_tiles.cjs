// 渲染双 tile 假名涉及的所有单 tile (hiTile 0x94/0x95, loTiles) 单独显示
'use strict';
const fs = require('fs');
const path = require('path');
const chrSrc = fs.readFileSync(path.join(__dirname, '../src/game/data/chr/chr-bank-00.ts'), 'utf-8');
const m = chrSrc.match(/=\s*\[([\s\S]*?)\]/);
const chr = m[1].split(',').map(s => s.trim()).filter(s => /^0x/.test(s)).map(s => parseInt(s, 16));

function renderTile(tileIdx) {
  const off = tileIdx * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[off + y] || 0;
    const p1 = chr[off + 8 + y] || 0;
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

let out = '';
const tiles = [0x94, 0x95, 0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F,0x10,0x11,0x12,0x13,0x14,0x1A,0x1B,0x1C,0x1D,0x1E,0x46,0x47,0x48,0x49,0x4A,0x4B,0x4C,0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54,0x5A,0x5B,0x5C,0x5D,0x5E];
for (const t of tiles) {
  out += `=== tile 0x${t.toString(16).toUpperCase()} ===\n`;
  for (const r of renderTile(t)) out += '|' + r + '|\n';
  out += '\n';
}
fs.writeFileSync(path.join(__dirname, '_tiles.txt'), out, 'utf-8');
console.log('done');
