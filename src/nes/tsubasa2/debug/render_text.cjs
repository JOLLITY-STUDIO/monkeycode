/**
 * render_text.cjs — 渲染 NT0 指定区域为放大 ASCII (2x2 每 tile)
 * 用法: node debug/render_text.cjs <rowStart> <rowEnd> <colStart> <colEnd>
 */
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const chr = rom.slice(16 + 0x40000, 16 + 0x40000 + 0x20000);

// 从 nt.log 重建帧 0 NT
const lines = fs.readFileSync('debug/trace/nt.log', 'utf8').split('\n');
const re = /\[NT_WRITE\] i\d+ .*?STA \$2007 = #\$([0-9A-F]+) @ \$([0-9A-F]+) \(NT0/;
const nt = new Uint8Array(960).fill(0);
let first = true;
for (const l of lines) {
  const m = re.exec(l);
  re.lastIndex = 0;
  if (!m) continue;
  const addr = parseInt(m[2], 16);
  const tile = parseInt(m[1], 16);
  const idx = addr - 0x2000;
  if (idx < 0 || idx >= 960) continue;
  if (addr === 0x2000) {
    if (!first) break; // 只取第一批 (帧 0)
    first = false;
  }
  nt[idx] = tile;
}

const r0 = parseInt(process.argv[2] || '10', 10);
const r1 = parseInt(process.argv[3] || '18', 10);
const c0 = parseInt(process.argv[4] || '8', 10);
const c1 = parseInt(process.argv[5] || '24', 10);

function tileRows(tile) {
  const off = tile * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[off + y], p1 = chr[off + y + 8];
    let row = '';
    for (let x = 7; x >= 0; x--) {
      const bit = ((p1 >> x) & 1) * 2 + ((p0 >> x) & 1);
      row += bit ? '#' : ' ';
    }
    rows.push(row);
  }
  return rows;
}

console.log(`NT0 区域 row ${r0}-${r1}, col ${c0}-${c1} (每 tile 2x2 放大)`);
// tile 编号头
let header = '     ';
for (let c = c0; c <= c1; c++) header += ' $' + nt[r0 * 32 + c].toString(16).padStart(2, '0');
console.log(header);
for (let row = r0; row <= r1; row++) {
  const tiles = [];
  for (let c = c0; c <= c1; c++) tiles.push(nt[row * 32 + c]);
  const rendered = tiles.map(t => tileRows(t));
  for (let dy = 0; dy < 8; dy++) {
    let line = String(row).padStart(2, '0') + 'r' + dy + ' ';
    for (const r of rendered) line += r[dy];
    console.log(line);
  }
  console.log('');
}
