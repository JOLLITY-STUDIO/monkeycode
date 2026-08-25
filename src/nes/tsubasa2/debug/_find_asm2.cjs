const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'src', 'asm');
const pats = ['91BF', '91E1', '91C8', '0468,', '046A,', '9AA2', '9A7E'];
const out = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        for (const pat of pats) {
          if (l.toLowerCase().includes(pat.toLowerCase())) {
            out.push(`${path.relative(ROOT, p)}:${i + 1}: ${l.trim()}`);
            break;
          }
        }
      });
    }
  }
}
walk(ROOT);
fs.writeFileSync(path.join(__dirname, '_asm_hits.txt'), out.join('\n'));
console.log('hits:', out.length);
