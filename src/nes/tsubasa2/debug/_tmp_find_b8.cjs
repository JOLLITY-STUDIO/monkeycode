const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
function walk(d) {
  let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.s$/.test(e.name)) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((l, i) => {
        if (/#\$B8\b/.test(l) || /#\$BA\b/.test(l)) {
          console.log(p.replace(dir, 'asm') + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
        }
      });
    }
  }
}
walk(dir);
console.log('scan done');
