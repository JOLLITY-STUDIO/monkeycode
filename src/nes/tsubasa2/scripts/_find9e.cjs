const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'asm');
function walk(d, out) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.s')) out.push(p);
  }
}
const files = [];
walk(root, files);
for (const p of files) {
  const c = fs.readFileSync(p, 'utf8').split('\n');
  c.forEach((l, i) => {
    const t = l.trim();
    if (/\$009E|\$009F|\$00A0|\$00A1/.test(t)) {
      console.log(p.replace(root, '') + ':' + (i + 1) + ': ' + t);
    }
  });
}
