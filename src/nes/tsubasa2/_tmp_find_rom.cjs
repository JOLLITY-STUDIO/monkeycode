const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const found = [];
function walk(d, depth) {
  if (depth > 5) return;
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== '.git') walk(f, depth + 1);
    } else if (/\.(nes|prg)$/i.test(e.name)) {
      const st = fs.statSync(f);
      found.push(`${f} (${st.size})`);
    }
  }
}
walk(root, 0);
console.log(found.join('\n'));
