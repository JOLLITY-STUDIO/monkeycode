const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const pattern = new RegExp(args[0]);
const dir = args[1] || 'src';
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    if (f.name === 'node_modules' || f.name === 'dist' || f.name === 'dist-cjs' || f.name === 'dist-cjs2') continue;
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|js)$/.test(f.name)) {
      const c = fs.readFileSync(p, 'utf8');
      if (pattern.test(c)) console.log(p);
    }
  }
}
walk(dir);
