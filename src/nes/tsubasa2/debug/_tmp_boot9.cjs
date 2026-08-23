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
for (const p of files) {
  if (!p.includes('bank30')) continue;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const t = l.trim();
    if (/; \$C400/.test(t) || /; \$C40[1-9A-F]|; \$C41[0-9A-F]/.test(t)) {
      const rel = p.split('asm' + path.sep)[1];
      console.log(rel + ':' + (i + 1) + ': ' + t.slice(0, 120));
    }
  });
}
