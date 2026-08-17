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
const pats = [/ram_0[0-9a-fA-F]{3}/g, /ram_00[0-9a-fA-F]{2}/g];
const count = new Map();
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  for (const re of pats) {
    let m;
    while ((m = re.exec(txt)) !== null) {
      const k = m[0];
      count.set(k, (count.get(k) || 0) + 1);
    }
  }
}
const sorted = [...count.entries()].sort((a, b) => a[0].localeCompare(b[0]));
for (const [k, c] of sorted) console.log(`${k}\t${c}`);
