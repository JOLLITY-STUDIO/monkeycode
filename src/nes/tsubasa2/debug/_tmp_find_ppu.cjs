const fs = require('fs');
const path = require('path');
const root = __dirname + '/../src/core';
const out = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!/\.(ts|d\.ts)$/.test(f)) continue;
    const c = fs.readFileSync(p, 'utf8');
    const lines = c.split('\n');
    lines.forEach((l, i) => {
      if (/(class|interface|type|const|function)\s+PPU\b/.test(l)) out.push(p + ':' + (i + 1) + ': ' + l.trim());
    });
  }
}
walk(root);
console.log(out.join('\n') || 'no PPU decls');
// also check ppu.d.ts / ppu.ts existence
for (const f of fs.readdirSync(root)) console.log('dir:', f);
