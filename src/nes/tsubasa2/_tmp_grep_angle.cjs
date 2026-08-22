const fs = require('fs');
const path = require('path');
const roots = ['src', 'docs'];
const pats = ['CDE2', '角度', 'angle', 'C539', 'atan', '象限'];
for (const root of roots) {
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|md)$/.test(p)) {
        const s = fs.readFileSync(p, 'utf8');
        const lines = s.split(/\r?\n/);
        lines.forEach((l, i) => {
          for (const pat of pats) {
            if (l.toLowerCase().includes(pat.toLowerCase())) {
              console.log(`${p}:${i + 1}: ${l.trim()}`);
              break;
            }
          }
        });
      }
    }
  })(root);
}
