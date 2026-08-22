/**
 * chr_render.cjs — 把 CHR tile 并排渲染成点阵文本 (v2)
 * 用法: node debug/chr_render.cjs <tileHex,...>   如 node debug/chr_render.cjs 28,29,2c,2d,38
 */
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const chr = rom.slice(16 + 0x40000, 16 + 0x40000 + 0x20000);

// 参数可以是多组, 用 ';' 分组 (每组一行)
const groups = process.argv.slice(2).join(' ').split(';').filter(Boolean);

function renderTile(tile) {
  const off = tile * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[off + y], p1 = chr[off + y + 8];
    let row = '';
    for (let x = 7; x >= 0; x--) {
      const bit = ((p1 >> x) & 1) * 2 + ((p0 >> x) & 1);
      row += bit === 3 ? '#' : bit === 2 ? '+' : bit === 1 ? '.' : ' ';
    }
    rows.push(row);
  }
  return rows;
}

for (const g of groups) {
  const tiles = g.split(',').map(t => t.trim()).filter(Boolean).map(t => parseInt(t, 16));
  if (!tiles.length) continue;
  console.log('\n=== ' + tiles.map(t => '$' + t.toString(16).padStart(2, '0')).join(' ') + ' ===');
  const rendered = tiles.map(t => renderTile(t));
  // 头部: tile id
  console.log('       ' + tiles.map(t => ' $' + t.toString(16).padStart(2, '0') + ' ').join(''));
  for (let y = 0; y < 8; y++) {
    let line = '';
    for (const r of rendered) line += '|' + r[y] + '|';
    console.log(line);
  }
}
