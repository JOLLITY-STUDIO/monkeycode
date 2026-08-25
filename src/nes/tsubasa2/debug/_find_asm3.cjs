const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'src', 'asm');
const pats = ['9FA8', '9145', '9156', '974A', '975B', '94C1', '91F3', '9F69'];
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
          if (l.includes('JSR $' + pat) || l.includes('JMP $' + pat) || l.includes('JSR $' + pat) || l.includes('$' + pat + ':') || l.includes('; $' + pat)) {
            out.push(`${path.relative(ROOT, p)}:${i + 1}: ${l.trim()}`);
            break;
          }
        }
      });
    }
  }
}
walk(ROOT);
fs.writeFileSync(path.join(__dirname, '_asm_hits3.txt'), out.join('\n'));
console.log('hits:', out.length);
