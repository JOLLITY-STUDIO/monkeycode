// dump f274/f275/f276 完整指令行
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa1045.log'), 'utf8').split('\n');
let out = [];
let cur = null;
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  const f = m ? parseInt(m[1]) : (cur !== null ? cur : -1);
  if (f >= 274 && f <= 276) { if (cur !== f) { out.push(`\n##### frame ${f} start`); cur = f; } out.push(l); }
  if (m && f > 276) break;
}
console.log(out.join('\n'));
