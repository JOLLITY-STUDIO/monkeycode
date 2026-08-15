const fs = require('fs');
const path = require('path');
const root = 'tsubasa2-h5-src';
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory() && f !== 'node_modules') {
      walk(p);
    } else if (f.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      const m = t.match(/new (BootService|DataQueryService|Bank00Service|Bank02Service)\s*\(/g);
      if (m) console.log(p, '=>', m.join(', '));
    }
  }
}
walk(root);
