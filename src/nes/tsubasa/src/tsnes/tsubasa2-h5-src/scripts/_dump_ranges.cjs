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
dump(0x8990, 0x89B6, '8990-89B6:');
dump(0x8170, 0x8206, '8170-8206 (tableB?):');
dump(0x82FE, 0x832D, '82FE-832D (tableD?):');
dump(0x838B, 0x83B6, '838B-83B6:');
dump(0x886A, 0x88F4, '886A-88F4 (tablesF/G):');
dump(0x80AF, 0x80CE, '80AF-80CE (tableA):');
