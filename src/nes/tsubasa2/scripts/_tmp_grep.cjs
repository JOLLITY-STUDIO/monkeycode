const fs = require('fs');
const path = require('path');
const root = process.argv[2];
const pattern = new RegExp(process.argv[3], 'i');
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(s|ts|md)$/.test(e.name)) out.push(p);
  }
  return out;
}
const files = walk(root);
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      const s = Math.max(0, i - 3);
      const e = Math.min(lines.length - 1, i + 3);
      console.log(`==== ${f}:${i + 1} ====`);
      for (let j = s; j <= e; j++) console.log(`${j + 1}: ${lines[j]}`);
    }
  }
}
