const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'tsubasa2-h5-src', 'src');
function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) { out.push(...walk(p)); }
    else if (/.ts$/.test(f)) out.push(p);
  }
  return out;
}
const files = walk(root);
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  if (/new (Bank00|Bank02|Bank30)Service/.test(src)) {
    const lines = src.split(/\r?\n/);
    lines.forEach((l, i) => { if (/new (Bank00|Bank02|Bank30)Service/.test(l)) {
      console.log(f.replace(root, ''), i + 1, ':', l.trim());
      for (let k = i + 1; k < Math.min(i + 6, lines.length); k++) console.log('   ', lines[k]);
    }});
  }
}
