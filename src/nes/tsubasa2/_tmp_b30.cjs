// temp: find $C557 / $C400 related code across src
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
function walk(d, out) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(f)) out.push(p);
  }
  return out;
}
const files = walk(root, []);
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/C557|C400|0x?C557|0x?C400|sceneController|sceneCtrl/i.test(l)) {
      console.log(f.split('tsubasa2')[1] + ':' + (i + 1) + ': ' + l.trim().slice(0, 130));
    }
  });
}
