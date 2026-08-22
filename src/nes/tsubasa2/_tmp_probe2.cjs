const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (!/node_modules|output|_build/.test(p)) walk(p);
    } else if (/\.ts$/.test(p) && /src[\\/](game|core)/.test(p)) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        if (/ram_0020|'0020'|0x0020/.test(l) && !/ram_0021/.test(l)) {
          console.log(p.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
        }
      });
    }
  }
}
walk('src');
