// 临时: 渲染 chr-bank-07 若干 tile 找球图案
const fs = require('fs');
function loadNums(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/=\s*\[([\s\S]*)\]/);
  if (!m) return null;
  return m[1].match(/0x[0-9A-Fa-f]+|\b\d+\b/g).map(Number);
}
const bank = loadNums('src/game/data/ppu/tile/chr/chr-bank-07.ts');
if (!bank) { console.log('bank7 未找到'); process.exit(0); }
function tileAscii(tileId) {
  const off = tileId * 16;
  if (off + 16 > bank.length) return null;
  const lines = [];
  for (let row = 0; row < 8; row++) {
    const b0 = bank[off + row], b1 = bank[off + row + 8];
    let s = '';
    for (let c = 0; c < 8; c++) {
      const mask = 0x80 >> c;
      const ci = ((b1 & mask) ? 2 : 0) | ((b0 & mask) ? 1 : 0);
      s += ci === 0 ? '.' : (ci === 1 ? ':' : (ci === 2 ? 'o' : '#'));
    }
    lines.push(s);
  }
  return lines;
}
for (let t = 0x58; t <= 0x68; t++) {
  const a = tileAscii(t);
  if (!a) continue;
  console.log('── tile $' + t.toString(16).toUpperCase() + ' ──');
  console.log(a.join('\n'));
}
