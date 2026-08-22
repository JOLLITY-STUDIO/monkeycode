const fs = require('fs');
const t = fs.readFileSync('asm/bank00/_full.s', 'utf8').split('\n');
const pats = ['JSR $82A5', 'JSR $8297', 'JSR $821D', '; $82A5', '; $8297', '; $821D'];
const hits = [];
t.forEach((l, i) => {
  for (const p of pats) {
    if (l.includes(p)) hits.push((i + 1) + ': ' + l.trim());
  }
});
console.log(hits.join('\n') || '(none)');
