const fs = require('fs');
const src = fs.readFileSync('src/game/prg/data/rom/prg-bank-00.ts', 'utf8');
const hex = src.match(/0x[0-9a-fA-F]{2}/g).map(h => parseInt(h, 16));
// bank 0 maps $8000-$9FFF → offset = addr - 0x8000
function dump(lo, hi) {
  let out = '';
  for (let a = lo; a <= hi; a++) {
    if ((a & 15) === 0) out += '\n' + '$' + a.toString(16).toUpperCase() + ': ';
    out += hex[a - 0x8000].toString(16).padStart(2, '0') + ' ';
  }
  console.log(out);
}
dump(0x9480, 0x94c0);
