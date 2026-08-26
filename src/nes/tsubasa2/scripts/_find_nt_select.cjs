const fs = require('fs');
const path = require('path');
const root = 'src';
const hits = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p); }
    else if (e.name.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      if (/curNt|ntable1|renderBgScanline|selectNt|nameTable\[/.test(t)) hits.push(p);
    }
  }
}
walk(root);
console.log(hits.join('\n'));
