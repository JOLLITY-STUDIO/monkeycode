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
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  const lines = txt.split('\n');
  lines.forEach((ln, i) => {
    if (/ram_0020|ppuctrl/.test(ln)) console.log(`${f}:${i + 1}: ${ln.trim().slice(0, 100)}`);
  });
}
