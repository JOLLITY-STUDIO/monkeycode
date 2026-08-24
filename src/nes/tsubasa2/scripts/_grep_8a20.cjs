// 找 $8A20 周围内容
const fs = require('fs');
const path = require('path');
const t = fs.readFileSync(path.join(__dirname, '..', 'src', 'asm', 'bank02', 'data_tables.s'), 'utf8');
const ls = t.split(/\r?\n/);
for (let i = 0; i < ls.length; i++) {
  if (ls[i].includes('8A20') || ls[i].includes('8A1F') || ls[i].includes('8A1E')) {
    console.log('data_tables.s:' + (i + 1) + ': ' + ls[i]);
  }
}
console.log('---');
const t2 = fs.readFileSync(path.join(__dirname, '..', 'src', 'asm', 'bank02', '_full.s'), 'utf8');
const ls2 = t2.split(/\r?\n/);
for (let i = 0; i < ls2.length; i++) {
  const line = ls2[i];
  const m = line.match(/\$8A([12][0-9A-F])/i);
  if (m) console.log('_full.s:' + (i + 1) + ': ' + line.trim());
}
