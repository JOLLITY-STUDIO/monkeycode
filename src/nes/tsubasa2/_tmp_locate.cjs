const fs = require('fs');
const lines = fs.readFileSync('asm/bank00/_full.s', 'utf8').split(/\r?\n/);
const out = [];
lines.forEach((l, i) => {
  if (i > 3600 && i < 3780) out.push((i + 1) + ': ' + l.slice(0, 100));
});
fs.writeFileSync('_tmp_locate_out.txt', out.join('\n') + '\n');
console.log('matched=' + out.length);
