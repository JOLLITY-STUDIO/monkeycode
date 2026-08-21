const fs = require('fs');
const path = require('path');

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      if (f === 'node_modules' || f === '.git') return;
      walk(p);
    } else if (f.endsWith('.ts')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        if (/OpeningSceneController|new Opening|_opening|\.initBoot|setOpening/.test(l) && !/^\s*[*/]/.test(l)) {
          console.log(p.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim());
        }
      });
    }
  }
}

walk('src');
