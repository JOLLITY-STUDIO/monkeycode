const fs = require('fs');
const path = require('path');
function walk(d, cb) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', 'dist-cjs', 'dist-cjs2', '.git', 'dist', 'output', 'docs'].includes(e.name)) continue;
      walk(p, cb);
    } else if (/\.(ts|js|json|wxml)$/.test(e.name)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/dist-cjs|dist-cjs2|require\(['"].\/dist|from ['"].\/dist/.test(t)) {
        cb(p, t);
      }
    }
  }
}
walk('.', (p, t) => {
  const lines = t.split('\n');
  lines.forEach((l, i) => {
    if (/dist-cjs|from ['"].\/dist|require\(['"].\/dist/.test(l)) console.log(p + ':' + (i + 1) + ': ' + l.trim());
  });
});
