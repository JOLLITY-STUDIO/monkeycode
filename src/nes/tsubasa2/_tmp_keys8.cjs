const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
const files = walk(root, []);
const re = /'ram_0[0-9a-fA-F]{3}'/g;
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  let m;
  const found = new Set();
  while ((m = re.exec(txt)) !== null) found.add(m[0]);
  if (found.size) {
    const sorted = [...found].sort();
    const letters = sorted.filter(k => /[a-fA-F]/.test(k));
    if (letters.length) console.log(`${path.basename(f)}: ${letters.join(' ')}`);
  }
}
