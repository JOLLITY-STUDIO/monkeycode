const fs = require('fs');
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'output') continue;
      walk(p);
    } else if (/\.(cjs|ts|js)$/.test(e.name)) {
      const s = fs.readFileSync(p, 'utf8');
      if (/_diff_710|diff_710/.test(s)) console.log(p);
    }
  }
}
walk('scripts');
walk('src');
