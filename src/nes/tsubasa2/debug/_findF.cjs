const fs = require('fs');
const dir = '.';
function walk(d, depth) {
  if (depth > 3) return;
  for (const f of fs.readdirSync(d)) {
    if (f === 'node_modules' || f === '.git') continue;
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p, depth + 1);
    else if (/\.(ts|cjs|js)$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/emu-reference/.test(t)) console.log(p);
    }
  }
}
walk(dir, 0);
