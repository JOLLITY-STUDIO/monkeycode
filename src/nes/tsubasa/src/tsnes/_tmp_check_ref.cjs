const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src';
const hits = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      if (/data\/scene\/textscript\/script-vm/.test(c)) hits.push(p);
    }
  }
}
walk(root);
console.log(hits.length ? hits.join('\n') : 'no stale references');
