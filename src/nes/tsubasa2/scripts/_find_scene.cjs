const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((l, i) => {
        if (l.includes('$A4C0') || l.includes('$A559') || l.includes('$A491') || l.includes('$A57B') || l.includes('$A581')) {
          console.log(p + ':' + (i + 1) + ': ' + l.trim());
        }
      });
    }
  }
}
walk('src/asm');
