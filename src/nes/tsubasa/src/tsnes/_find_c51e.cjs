const fs = require('fs');
const path = require('path');
const root = 'tsubasa2-h5-src/src';
const walk = (d) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      const lines = t.split('\n');
      lines.forEach((l, i) => {
        if (/C51E|\$c51e|div10|ram_007[124]/.test(l)) console.log(p + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
      });
    }
  }
};
walk(root);
