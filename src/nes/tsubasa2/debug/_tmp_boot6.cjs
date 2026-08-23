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
// Print bank30 code_main.s whole file to find $CEFE
for (const p of files) {
  if (!p.includes('bank30') || !p.includes('code_main')) continue;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  console.log('TOTAL LINES:', ls.length);
  ls.forEach((l, i) => {
    const t = l.trim();
    if (/\$CEF[E-F]\b|\$CF0[0-9A-F]\b/.test(t) && /; \$/.test(t)) {
      console.log((i + 1) + ': ' + t.slice(0, 120));
    }
  });
}
