const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules') continue;
      walk(p);
    } else if (/\.(ts|js|cjs|json)$/i.test(f)) {
      let c = '';
      try { c = fs.readFileSync(p, 'utf8'); } catch (e) { continue; }
      if (c.length < 600000) {
        const lines = c.split(/\r?\n/);
        lines.forEach((l, i) => {
          if (/\.load\(|loadRom|\.nes['"]|rom\.load/i.test(l) && !/mapper/i.test(l)) {
            console.log(p + ':' + (i + 1) + ': ' + l.trim().slice(0, 160));
          }
        });
      }
    }
  }
}
walk('scripts');
walk('test');
walk('src/game/runtime');
console.log('---done---');
