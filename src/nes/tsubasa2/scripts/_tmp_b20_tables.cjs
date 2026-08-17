const fs = require('fs');
function load(p) {
  const t = fs.readFileSync(p, 'utf8');
  const m = t.match(/\[([\s\S]*?)\];/);
  const re = /0x([0-9A-Fa-f]{2})/g;
  const b = [];
  let h;
  while ((h = re.exec(m[1])) !== null) b.push(parseInt(h[1], 16));
  return b;
}
function dump(bytes, addr, len, label) {
  const off = addr - 0x8000;
  console.log('--- ' + label + ' @$' + addr.toString(16).toUpperCase() + ' (off 0x' + off.toString(16) + ')');
  const rows = [];
  for (let i = 0; i < len; i += 16) {
    const r = [];
    for (let j = 0; j < 16; j++) {
      if (off + i + j < bytes.length) r.push(bytes[off + i + j].toString(16).padStart(2, '0'));
    }
    rows.push('$' + (addr + i).toString(16).toUpperCase() + ': ' + r.join(' '));
  }
  console.log(rows.join('\n'));
}
const b30 = load('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-30.ts');
const b21 = load('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-21.ts');
console.log('b30 count', b30.length, 'b21 count', b21.length);
dump(b30, 0xFBCC, 0x40, 'bank30 $FBCC note table');
dump(b21, 0xA1B4, 0x20, 'bank21 $A1B4');
dump(b21, 0xAC47, 0x20, 'bank21 $AC47');
dump(b21, 0xBA87, 0x20, 'bank21 $BA87');
