// 扫描全部 PRG bank, 找出 $A1B4 / $AC47 表所在的 bank
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
console.log('bank | $A1B4@off | $AC47@off  (u16 little-endian)');
for (let i = 0; i < 32; i++) {
  const b = loadBank(i);
  const u16 = (off) => b[off] | (b[off + 1] << 8);
  const v1 = u16(LO);
  const v2 = u16(HI);
  const ok1 = v1 >= 0x8000 && v1 <= 0xBFFF;
  const ok2 = v2 >= 0x8000 && v2 <= 0xBFFF;
  if (ok1 || ok2) {
    console.log('bank' + String(i).padStart(2, '0') + ' | ' + v1.toString(16).padStart(4, '0') + ' | ' + v2.toString(16).padStart(4, '0'));
  }
}
