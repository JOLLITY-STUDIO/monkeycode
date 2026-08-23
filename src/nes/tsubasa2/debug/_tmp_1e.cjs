const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
function walk(d) {
  let out = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (f.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk(root);
let count = 0;
files.forEach((p) => {
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const t = l.trim();
    if (/\$001E|\$001e/.test(t)) {
      const rel = p.replace(root + path.sep, '').replace(/\\/g, '/');
      console.log(rel + ':' + (i + 1) + ': ' + t.slice(0, 120));
      count++;
    }
  });
});
console.log('TOTAL:', count);
