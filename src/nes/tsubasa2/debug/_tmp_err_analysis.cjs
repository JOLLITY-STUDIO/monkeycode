const fs = require('fs');
const lines = fs.readFileSync(__dirname + '/../_tsc_check.txt', 'utf8').split('\n');
const byFile = {};
let total = 0;
for (const l of lines) {
  const m = l.match(/^(.*?)\((\d+),(\d+)\): error/);
  if (!m) continue;
  const f = m[1];
  byFile[f] = (byFile[f] || 0) + 1;
  total++;
}
const entries = Object.entries(byFile).sort((a, b) => b[1] - a[1]);
console.log('TOTAL ERRORS: ' + total);
for (const [f, c] of entries) console.log(String(c).padStart(4) + '  ' + f);
