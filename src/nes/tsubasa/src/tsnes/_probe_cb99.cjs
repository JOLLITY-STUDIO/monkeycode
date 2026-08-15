const fs = require('fs');
const txt = fs.readFileSync('rom-data/prg-bank-30.ts', 'utf8');
const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
const arr = m[1].split(',').map((s) => {
  const v = parseInt(s.trim(), 16);
  return isNaN(v) ? 0xea : v;
});
const off = 0xcb99 - 0xc000;
const bytes = [];
for (let i = 0; i < 28; i++) bytes.push('0x' + arr[off + i].toString(16).toUpperCase().padStart(2, '0'));
console.log('CB99 bytes (' + bytes.length + '):');
console.log(bytes.join(', '));
