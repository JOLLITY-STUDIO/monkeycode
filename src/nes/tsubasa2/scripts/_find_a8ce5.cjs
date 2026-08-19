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
      // find address range
      const first = lines.find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
      const last = [...lines].reverse().find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
      const hasA8CE = lines.some(l => l.includes('A8CE'));
      if (first || hasA8CE) {
        out.push(p.replace(process.cwd() + '\\', '') + ' | ' + (first ? first.trim().slice(0, 60) : '?') + ' .. ' + (last ? last.trim().slice(0, 60) : '?') + ' | A8CE=' + hasA8CE);
      }
    }
  }
}
walk(root);
console.log(out.join('\n'));
