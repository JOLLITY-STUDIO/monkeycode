const fs = require('fs');
const path = require('path');
const roots = ['src/game'];
const out = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const txt = fs.readFileSync(p, 'utf8');
      if (txt.includes('RenderingPrimitivesService')) out.push(p);
    }
  }
}
walk('src/game');
console.log(out.join('\n'));
