const fs = require('fs');
const path = require('path');
const p16 = path.resolve(__dirname, '../../rom-data/prg-bank-16.ts');
const t = fs.readFileSync(p16, 'utf8');
const m = t.match(/\[([\s\S]*?)\];/);
const bytes = m[1].split(',').map((s) => parseInt(s.trim(), 16));
function dump(lo, hi, label) {
  const row = [];
  for (let a = lo; a <= hi; a++) row.push('$' + a.toString(16).toUpperCase() + '=' + '0x' + bytes[a - 0x8000].toString(16).padStart(2, '0'));
  console.log(label, row.join(' '));
}
dump(0x83D6, 0x83E3, '83D6-83E3:');
dump(0x88F4, 0x8930, '88F4-8930 (tableG):');
dump(0x89BF, 0x8A3E, '89BF-8A3E (tableH, 64):');
dump(0x8ABF, 0x8B3E, '8ABF-8B3E (tableI, 64):');
