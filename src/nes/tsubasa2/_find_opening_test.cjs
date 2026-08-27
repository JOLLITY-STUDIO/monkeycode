const fs = require('fs');
const path = require('path');
function walk(d, cb) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', 'dist-cjs', 'dist-cjs2', '.git', 'dist'].includes(e.name)) continue;
      walk(p, cb);
    } else if (/\.(cjs|ts)$/.test(e.name)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/OpeningScene/.test(t) && /HeadlessRuntime|startFrame/.test(t)) cb(p);
    }
  }
}
walk('scripts', (p) => console.log('SCRIPTS:', p));
walk('test', (p) => console.log('TEST:', p));
walk('src', (p) => console.log('SRC:', p));
