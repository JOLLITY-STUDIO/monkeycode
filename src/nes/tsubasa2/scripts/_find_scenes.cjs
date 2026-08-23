const fs = require('fs');
const path = require('path');
const out = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const txt = fs.readFileSync(p, 'utf8');
      if (/extends SceneController/.test(txt)) out.push(p + '  →  ' + (txt.match(/class (\w+)/) || [])[1]);
    }
  }
}
walk('src/game');
console.log(out.join('\n'));
