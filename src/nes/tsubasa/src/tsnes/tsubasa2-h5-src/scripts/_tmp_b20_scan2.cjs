// 打印全部 bank 在 offset 0x21B4 / 0x2C47 的 u16 值
const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/';
function loadBank(i) {
  const text = fs.readFileSync(dir + 'prg-bank-' + String(i).padStart(2, '0') + '.ts', 'utf8');
  const m = text.match(/\[([\s\S]*?)\];/);
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let hit;
  while ((hit = re.exec(m[1])) !== null) bytes.push(parseInt(hit[1], 16));
  return bytes;
}
const LO = 0x21B4, HI = 0x2C47;
const rows = [];
for (let i = 0; i < 32; i++) {
  const b = loadBank(i);
  const u16 = (off) => b[off] | (b[off + 1] << 8);
  rows.push(String(i).padStart(2, '0') + ': ' + u16(LO).toString(16).padStart(4, '0') + ' | ' + u16(HI).toString(16).padStart(4, '0'));
}
console.log(rows.join('\n'));
