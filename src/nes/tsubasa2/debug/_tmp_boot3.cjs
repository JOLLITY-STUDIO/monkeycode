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
  if (!p.includes('bank30') || !p.includes('code_main')) continue;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  // print lines with addr $C500-$C550 and $C64E-$C680
  ls.forEach((l, i) => {
    const m = l.match(/\$C5([0-4][0-9A-F])\b/);
    const m2 = l.match(/\$C64[E-F]\b|\$C65[0-9A-F]\b|\$C66[0-9A-F]\b/);
    if (m || m2) {
      console.log('bank30/code_main.s:' + (i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
}
