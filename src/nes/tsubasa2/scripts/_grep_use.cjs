const fs = require('fs');
const path = require('path');
const root = 'src';
const out = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.codebuddy')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      if (t.includes('TileRenderService')) out.push(p + ': ' + t.split('\n').filter(l => l.includes('TileRenderService')).join(' | '));
    }
  }
}
walk(root);
console.log(out.join('\n') || 'NO MATCH');
