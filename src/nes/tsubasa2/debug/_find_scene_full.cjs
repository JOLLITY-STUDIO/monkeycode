const fs = require('fs');
const t = fs.readFileSync('src/asm/bank02/_full.s', 'utf8');
const lines = t.split('\n');
const keys = ['A4C0', 'A559', 'A491', 'A7FA', 'A650', 'A69C', 'A77A'];
lines.forEach((l, i) => {
  if (keys.some(k => l.includes(k))) console.log(i + 1, l.slice(0, 150));
});
