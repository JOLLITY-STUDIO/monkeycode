const fs = require('fs');
const path = require('path');
const roots = ['src/asm'];
const targets = ['C64E', 'CEFE', 'C400', 'C64E:'];
const results = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith('.s') || f.endsWith('.txt')) {
      const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
      lines.forEach((s, i) => {
        for (const t of targets) {
          if (s.includes('$' + t) && /;\s*\$/.test(s)) {
            results.push(`${p}:${i + 1}: ${s.trim()}`);
          }
        }
      });
    }
  }
}
walk('src/asm');
console.log(results.slice(0, 80).join('\n'));
console.log('total=' + results.length);
