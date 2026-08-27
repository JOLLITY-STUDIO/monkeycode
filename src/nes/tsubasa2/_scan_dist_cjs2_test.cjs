const fs = require('fs');
const path = require('path');
const root = process.cwd();
const dirs = ['src', 'pages', 'app.ts', 'index.d.ts'];
const out = [];
function walk(p) {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (p.includes('node_modules')) return;
    for (const e of fs.readdirSync(p)) walk(path.join(p, e));
  } else if (/\.(ts|js|json|wxml)$/.test(p)) {
    const txt = fs.readFileSync(p, 'utf8');
    const lines = txt.split(/\r?\n/);
    lines.forEach((ln, i) => {
      if (ln.includes('dist-cjs2-test')) {
        out.push(`${p}:${i + 1}: ${ln.trim()}`);
      }
    });
  }
}
for (const d of dirs) {
  const p = path.join(root, d);
  if (fs.existsSync(p)) walk(p);
}
console.log(out.length ? out.join('\n') : '(none)');
