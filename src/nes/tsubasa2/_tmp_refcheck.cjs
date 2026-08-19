const fs = require('fs');
const path = require('path');
function walk(d) {
  let r = [];
  if (!fs.existsSync(d)) return r;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) r = r.concat(walk(p));
    else if (f.endsWith('.ts')) r.push(p);
  }
  return r;
}
for (const dir of ['src', 'pages', 'test']) {
  for (const p of walk(dir)) {
    const t = fs.readFileSync(p, 'utf8');
    if (t.includes('core/utils') || t.includes('./utils') && dir === 'src/core') {
      for (const l of t.split('\n')) {
        if (l.includes("core/utils") || (l.includes("from './utils'") && p.startsWith('src/core'))) {
          console.log(p, '=>', l.trim());
        }
      }
    }
  }
}
console.log('--- done ---');
