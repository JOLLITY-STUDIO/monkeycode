// temp: find all ram_/temp_/ppu keys used across src
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
const keys = new Set();
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      const re = /['"`]([a-z_][a-zA-Z0-9_]*?(?:ram|ppu|temp)[a-zA-Z0-9_]*?)['"`]/g;
      let m;
      while ((m = re.exec(c))) {
        const k = m[1];
        if (/^(ram_|ppu|temp_)/.test(k)) keys.add(k);
      }
      // also template literals with ${...}
      const re2 = /`(ram_|temp_)[^`]*\$\{[^`]*\}[^`]*`/g;
      while ((m = re2.exec(c))) keys.add(m[0].slice(0, 60));
    }
  }
}
walk(root);
const arr = [...keys].sort();
console.log(arr.length + ' keys');
for (const k of arr) console.log(k);
