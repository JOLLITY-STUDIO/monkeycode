const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
function walk(d) {
  let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ts$/.test(e.name)) {
      const c = fs.readFileSync(p, 'utf8');
      if (/SCRIPT_BANK_03_BYTES/.test(c)) console.log('BYTES in:', p);
    }
  }
}
walk(root);
console.log('scan done');
