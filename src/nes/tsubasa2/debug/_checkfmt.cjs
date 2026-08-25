// 检查 f6 帧 raw 行的 bank:pc 格式分布
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split(/\r?\n/);
const pats = new Map();
let shown = 0;
for (const l of t) {
  if (!/^f6\s/.test(l)) continue;
  const m = l.match(/\s+\$([0-9A-F]+):([0-9A-F]{4}):/);
  if (!m) { if (shown < 5) { console.log('NO-MATCH:', JSON.stringify(l.slice(0, 130))); shown++; } continue; }
  const key = '$' + m[1] + ':';
  pats.set(key, (pats.get(key) || 0) + 1);
}
console.log('bank patterns in f6:', [...pats.entries()].sort((a, b) => b[1] - a[1]));
