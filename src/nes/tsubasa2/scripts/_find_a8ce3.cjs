const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), '_tmp_bzk_out');
let out = [];
function walk(dir) {
  let items = [];
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of items) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.asm')) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((l, i) => {
        if (/:A8CE:/.test(l)) {
          out.push(p.replace(process.cwd() + '\\', '') + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
        }
      });
    }
  }
}
walk(root);
console.log(out.join('\n') || '(no :A8CE: definition)');
