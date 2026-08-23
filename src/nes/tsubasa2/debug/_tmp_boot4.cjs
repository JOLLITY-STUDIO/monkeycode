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
// Find bank30 code_main.s and print $C800-$C8FF range (around $C821)
for (const p of files) {
  if (!p.includes('bank30') || !p.includes('code_main')) continue;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  let started = false;
  ls.forEach((l, i) => {
    const m = l.match(/\$C8([0-5][0-9A-F])\b/);
    if (m) started = true;
    if (started) {
      console.log('C' + (i + 1) + ': ' + l.trim().slice(0, 115));
    }
  });
}
