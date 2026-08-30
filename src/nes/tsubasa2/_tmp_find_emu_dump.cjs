const fs = require('fs');
function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'output') continue;
      walk(p, out);
    } else if (/\.(ts|cjs|js)$/.test(e.name)) {
      const s = fs.readFileSync(p, 'utf8');
      if (/nt\.json|"nt"|nameTable.*json|tile.*960/.test(s)) out.push(p);
    }
  }
  return out;
}
const out = walk('scripts', []);
out.push(...walk('src', []));
console.log(out.join('\n'));
