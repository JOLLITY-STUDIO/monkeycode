const fs = require('fs');
const txt = fs.readFileSync('rom-data/prg-bank-28.ts', 'utf8');
const m = txt.match(/\[([\s\S]*?)\]/);
const arr = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('bank28 len', arr.length);
function dump(cpu, n, label) {
  const off = cpu - 0x8000;
  const bytes = arr.slice(off, off + n);
  console.log(label, '$' + cpu.toString(16), '->', bytes.map(b => b.toString(16).padStart(2, '0')).join(' '));
}
dump(0x818e, 16, 'TBL_818E');
dump(0x8199, 4, 'TBL_8199');
dump(0x819a, 4, 'TBL_819A');
dump(0x9e4e, 64, 'TBL_9E4E');
dump(0x80f0, 40, 'CODE_80F0');
