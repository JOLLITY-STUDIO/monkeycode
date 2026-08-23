const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.s'));
let count = 0;
files.forEach((f) => {
  const p = dir + '/' + f;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    // any line containing 001E (case insensitive)
    if (/\$001E|\$001e/i.test(l) || /00 1e|001E/i.test(l)) {
      const t = l.trim();
      console.log(f + ':' + (i + 1) + ': ' + t.slice(0, 120));
      count++;
    }
  });
});
console.log('TOTAL:', count);
