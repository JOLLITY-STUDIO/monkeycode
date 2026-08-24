const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm';
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const c = fs.readFileSync(p, 'utf8');
      const ls = c.split(/\r?\n/);
      ls.forEach((l, i) => {
        if (l.includes('$0700') && (l.includes('A9') || l.includes('LDA #') || l.includes('LDX #') || l.includes('STA $0700'))) {
          const t = l.trim();
          if (t.length < 90) {
            console.log(p + ':' + (i + 1) + ': ' + t);
          }
        }
      });
    }
  }
})(dir);
