const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), '_tmp_bzk_out');
const dirs = fs.readdirSync(root).filter(d => d.startsWith('bank_'));
for (const d of dirs) {
  const dir = path.join(root, d);
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    lines.forEach((l, i) => {
      if (/:[A-F0-9]{2}A8CE:/.test(l) || /:A8CE:/.test(l)) {
        console.log(d + '/' + f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
      }
    });
  }
}
console.log('---done---');
