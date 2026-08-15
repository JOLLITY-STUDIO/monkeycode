const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src';
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk(root, files);
const pats = ['ram_062A', 'ram_002C', 'ram_002D', 'ram_05F3', 'ram_05F4', 'ram_05F5', 'ram_00E2', 'ram_05E3'];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const p of pats) {
      if (l.includes(p)) {
        console.log(f.replace(root, '') + ':' + (i + 1) + ': ' + l.trim());
        break;
      }
    }
  });
}
