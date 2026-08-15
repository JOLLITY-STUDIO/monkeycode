const fs = require('fs');
const path = require('path');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src';
const PAT = /C50C|C515|C527|C536|C539/g;
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) files.push(p);
  }
})(ROOT);
let hit = 0;
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (PAT.test(l)) {
      hit++;
      console.log(f.replace(ROOT, '.').replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
console.log('total hits:', hit);
