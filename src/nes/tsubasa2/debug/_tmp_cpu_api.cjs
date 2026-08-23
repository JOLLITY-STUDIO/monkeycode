const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsnes/src';
function walk(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ts$/.test(e.name)) {
      const c = fs.readFileSync(p, 'utf8');
      if (/class Cpu|emulate\(/.test(c)) {
        console.log('### ' + p);
        const lines = c.split('\n');
        for (let i = 0; i < Math.min(lines.length, 200); i++) {
          if (/class Cpu|emulate\(|step\(|this\.reg|\.pc/.test(lines[i])) console.log((i + 1) + ': ' + lines[i].trim().slice(0, 100));
        }
      }
    }
  }
}
walk(root);
