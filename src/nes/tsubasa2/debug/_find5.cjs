const fs = require('fs');
const path = require('path');
const dir = 'src/asm';
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const raw = fs.readFileSync(p, 'utf8');
      const lines = raw.split(/\r\n|\r|\n/);
      lines.forEach((l, i) => {
        if (/8920|8E|8AF7|9F69|AA06/.test(l) && /\$/.test(l)) {
          console.log(p.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim());
        }
      });
    }
  }
}
walk(dir);
