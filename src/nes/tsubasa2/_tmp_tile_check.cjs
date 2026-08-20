// 临时: 检查 tile 0xB1/0xF6 图案
const fs = require('fs');
const m = fs.readFileSync('src/game/data/ppu/tile/chr/chr-bank-07.ts', 'utf8').match(/=\s*\[([\s\S]*)\]/);
const b = m[1].match(/0x[0-9A-Fa-f]+|\b\d+\b/g).map(Number);
for (const t of [0xB1, 0xF6, 0xA0, 0xA1, 0xA2]) {
  const off = t * 16;
  if (off + 16 > b.length) { console.log('tile $' + t.toString(16) + ' 越界'); continue; }
  console.log('--- tile $' + t.toString(16).toUpperCase() + ' ---');
  for (let r = 0; r < 8; r++) {
    const p0 = b[off + r], p1 = b[off + r + 8];
    let s = '';
    for (let c = 0; c < 8; c++) {
      const mk = 0x80 >> c;
      const ci = ((p1 & mk) ? 2 : 0) | ((p0 & mk) ? 1 : 0);
      s += ci === 0 ? '.' : (ci === 1 ? ':' : (ci === 2 ? 'o' : '#'));
    }
    console.log(s);
  }
}
