const fs = require('fs');
const path = require('path');
const root = __dirname + '/../src/game';
const coreImports = {};
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!/\.ts$/.test(f)) continue;
    const c = fs.readFileSync(p, 'utf8');
    for (const m of c.matchAll(/from\s+['"](\.[^'"]*)['"]/g)) {
      const t = m[1];
      if (t.includes('core')) {
        coreImports[t] = (coreImports[t] || 0) + 1;
        console.log(p.replace(root, '.') + ' -> ' + t);
      }
    }
  }
}
walk(root);
console.log('\nUNIQUE core imports:', Object.keys(coreImports).length);
for (const k of Object.keys(coreImports)) console.log(' ', k, 'x' + coreImports[k]);
