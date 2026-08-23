const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
const files = [];
function walk(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.s$/.test(e.name)) files.push(p);
  }
}
walk(root);
let hits = 0;
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/STA\s+\$00ED|STA\s+\$ED|STX\s+\$00ED|STY\s+\$00ED/.test(l) || /STA\s+ram_00ED/i.test(l)) {
      console.log('--- ' + f + ':' + (i + 1));
      // print surrounding 3 lines for context
      for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
        console.log('  ' + (j + 1) + ': ' + lines[j].trim().slice(0, 100));
      }
      hits++;
    }
  });
}
console.log('total STA $00ED sites:', hits);
