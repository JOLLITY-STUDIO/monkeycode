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

// find reset vector handling: search bank31 _full for $FFFC area / JMP $E000 / $FFF0
for (const p of files) {
  if (!p.includes('bank31')) continue;
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const t = l.trim();
    if (/\$FF[EF][0-9A-F]|\$FFF[0-9A-F]|Reset|RESET|JMP \$E0|\$E000/.test(t)) {
      console.log(path.basename(p) + ':' + (i + 1) + ': ' + t.slice(0, 110));
    }
  });
}
