const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'src', 'asm');
const pats = ['9145', '9156', '0568', '$C4B9', '00ED'];
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
          if (l.includes(pat)) { out.push(`${path.relative(ROOT, p)}:${i + 1}: ${l.trim()}`); break; }
        }
      });
    }
  }
}
walk(ROOT);
fs.writeFileSync(path.join(__dirname, '_call_hits.txt'), out.join('\n'));
console.log('hits:', out.length);
