const f = require('fs');
const path = require('path');
const out = [];
function walk(d) {
  for (const e of f.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && !p.includes('node_modules')) walk(p);
    else if (e.name.endsWith('.ts') || e.name.endsWith('.cjs')) {
      const c = f.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (/0x0044|0044(?=\b)|\\$0044|\$0044|ram_0044|'0044'|"0044"/.test(lines[i])) {
          out.push(p.replace('src/', '') + ':' + (i+1) + ': ' + lines[i].trim().substring(0, 140));
        }
      }
    }
  }
}
walk('src');
out.sort();
console.log('Hits:', out.length);
out.forEach(l => console.log(l));
