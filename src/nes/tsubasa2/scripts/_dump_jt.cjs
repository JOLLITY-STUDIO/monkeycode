// 临时：dump $92D5-$9308 跳转表与 $9425-$9435
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/rom/prg-bank-00.ts', 'utf8');
const h = s.match(/0x[0-9a-fA-F]{2}/g).map((x) => parseInt(x, 16));
let o = '';
for (const [start, end] of [[0x92d5, 0x9308], [0x9425, 0x9438]]) {
  o += '\n==== $' + start.toString(16).toUpperCase() + '-$' + end.toString(16).toUpperCase() + ' ====';
  for (let a = start; a <= end; a++) {
    if (((a - start) & 0xf) === 0) o += '\n$' + a.toString(16).toUpperCase() + ': ';
    o += h[a - 0x8000].toString(16).padStart(2, '0') + ' ';
  }
}
console.log(o);
// 跳转表项（$92E5 起，小端）
o = '\njt:';
for (let k = 0; k <= 15; k++) {
  const lo = h[0x92e5 - 0x8000 + k * 2];
  const hi = h[0x92e6 - 0x8000 + k * 2];
  o += ' k' + k + '=$' + (hi.toString(16).padStart(2, '0') + lo.toString(16).padStart(2, '0')).toUpperCase();
}
console.log(o);
