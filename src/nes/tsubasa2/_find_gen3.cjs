const fs = require('fs');
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) {
      if (['node_modules', 'dist', 'dist-cjs', 'dist-cjs2', '.git', 'output'].includes(e.name)) continue;
      walk(p, out);
    } else if (/\.(cjs|js|ts|mjs)$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk('.', files);
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  if (t.includes('scrollEnd') || (t.includes('state.json') && t.includes('cntVT'))) {
    console.log(f);
  }
}
