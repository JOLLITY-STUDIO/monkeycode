const fs = require('fs');
const txt = fs.readFileSync('rom-data/prg-bank-24.ts', 'utf8');
const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
const arr = m[1].split(',').map((s) => {
  const v = parseInt(s.trim(), 16);
  return isNaN(v) ? 0xea : v;
});
// dump $8A12-$8A28
for (let a = 0x8a12; a <= 0x8a28; a++) {
  const v = arr[a - 0x8000];
  console.log('$' + a.toString(16).toUpperCase() + ': 0x' + v.toString(16).toUpperCase().padStart(2, '0'));
}
// 也 dump $89B4-$89C0
console.log('---');
for (let a = 0x89b4; a <= 0x89c0; a++) {
  const v = arr[a - 0x8000];
  console.log('$' + a.toString(16).toUpperCase() + ': 0x' + v.toString(16).toUpperCase().padStart(2, '0'));
}
