const fs = require('fs');
const lines = fs.readFileSync(__dirname + '/../_tsc_check.txt', 'utf8').split('\n');
let n = 0;
for (const l of lines) {
  if (l.includes('src/core/ppu/index.ts')) {
    if (n < 40) console.log(l);
    n++;
  }
}
console.log('ppu total:', n);
