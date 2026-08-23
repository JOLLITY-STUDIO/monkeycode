const fs = require('fs');
const path = require('path');
const root = 'src/asm';
function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (f.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk(root);
const pats = ['$8486', '$A491', '$A200', '$C400', '$CEFE', '$9B91', '$8895', '$9FA8', '$890C', '$8920', '$9A35', '$88FB', '$98A0', '$9B7F'];
for (const p of pats) {
  console.log('===== PATTERN ' + p + ' =====');
  for (const f of files) {
    const c = fs.readFileSync(f, 'utf8');
    const lines = c.split(/\r?\n/);
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(p)) hits.push((i + 1) + ': ' + lines[i].trim());
    }
    if (hits.length) {
      console.log('-- ' + f + ' (' + hits.length + ')');
      hits.slice(0, 12).forEach(h => console.log('   ' + h));
    }
  }
}
