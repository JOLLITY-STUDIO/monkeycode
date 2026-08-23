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
  if (!p.includes('bank30') || !p.includes('code_sub')) continue;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  let started = false;
  ls.forEach((l, i) => {
    const t = l.trim();
    const m = t.match(/; \$C4[0-9A-F]{2}$|; \$C40[0-9A-F]|; \$C4[1-9A-F][0-9A-F]/);
    if (m) started = true;
    if (started && /; \$/.test(t)) {
      console.log((i + 1) + ': ' + t.slice(0, 115));
    }
    if (started && (i + 1) > 205) started = false;
  });
}
