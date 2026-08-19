const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src');
let out = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts')) {
      const s = fs.readFileSync(p, 'utf8').split('\n');
      s.forEach((l, i) => {
        if (/ram_0200|ram_02/.test(l)) {
          out.push(p.replace(process.cwd() + '\\', '') + ':' + (i + 1) + ': ' + l.trim().slice(0, 100));
        }
      });
    }
  }
}
walk(root);
console.log(out.slice(0, 40).join('\n'));
