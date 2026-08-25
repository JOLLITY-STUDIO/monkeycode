const fs = require('fs');
const dir = 'docs/roms/opening-all';
const p = fs.readdirSync(dir).find(n => n.endsWith('.log'));
const lines = fs.readFileSync(dir + '/' + p, 'utf8').split(/\r?\n/);
let n = 0;
const first = [];
for (const l of lines) {
  if (/\$ED\b/.test(l)) { n++; if (first.length < 25) first.push(l); }
}
console.log('含 $ED 行数', n);
for (const l of first) console.log(l.slice(0, 130));
