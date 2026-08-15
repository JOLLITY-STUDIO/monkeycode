const fs = require('fs');
const t = fs.readFileSync('tsubasa2-h5-src/src/game/bank30_init.service.ts', 'utf8');
const lines = t.split('\n');
const out = [];
lines.forEach((ln, i) => {
  if (/cb99|C509|0xcb99|c50[0-9a-f]/i.test(ln)) {
    out.push((i + 1) + ':' + ln);
  }
});
fs.writeFileSync('_grep_c509.txt', out.join('\n'), 'utf8');
console.log('lines:', out.length);
