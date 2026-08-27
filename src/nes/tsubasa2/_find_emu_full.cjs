const fs = require('fs');
const roots = ['.', 'scripts'];
const pats = /emu.full|emu-full|frame-0|dump.*frame|_gen.*frame/i;
const hits = [];
function walk(d, depth) {
  if (depth > 2) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('node_modules') || e.name.startsWith('dist') || e.name.startsWith('output')) continue;
    const p = d + '/' + e.name;
    if (e.isDirectory()) walk(p, depth + 1);
    else if (/\.(cjs|ts|js|py)$/.test(e.name)) {
      try {
        const c = fs.readFileSync(p, 'utf8');
        if (pats.test(c) && /screen\.png|nt\.json|frame-0|dumpFrame|snapshot/i.test(c)) hits.push(p);
      } catch (err) {}
    }
  }
}
for (const r of roots) if (fs.existsSync(r)) walk(r, 0);
console.log(hits.join('\n') || 'none');
