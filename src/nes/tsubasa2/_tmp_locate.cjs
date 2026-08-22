const fs = require('fs');
const f = 'asm/bank00/_full.s';
const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
const out = [];
lines.forEach((l, i) => {
  if (/801E|82EC|9085|9131|9148|94C1|9F69/.test(l)) {
    out.push((i + 1) + ': ' + l.slice(0, 90));
  }
});
fs.writeFileSync('_tmp_locate_out.txt', out.slice(0, 120).join('\n') + '\n');
console.log('done, matched ' + out.length);
