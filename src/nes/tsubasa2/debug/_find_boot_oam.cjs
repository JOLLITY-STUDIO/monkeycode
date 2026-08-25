const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../src');
const hits = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ts$/.test(e.name)) hits.push(p);
  }
}
walk(root);
for (const f of hits) {
  const s = fs.readFileSync(f, 'utf8');
  const lines = s.split('\n');
  lines.forEach((ln, i) => {
    if (/bootOamInit|registerBootRoutines|bootPaletteFn|bootNt3Fn/.test(ln)) {
      console.log(`${f}:${i + 1}: ${ln.trim()}`);
    }
  });
}
