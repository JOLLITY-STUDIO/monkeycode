// _tmp_grep_pt.cjs — 找 ptTile 填充位置 (CHR → pattern)
'use strict';
const fs = require('fs');
const path = require('path');
function walk(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.ts')) out.push(p);
  }
  return out;
}
const files = walk('src/core').filter(f => !f.includes('_out'));
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    if (/ptTile|setPattern|loadChr|loadCHR|setTile|\.tile\[|chrROM|chrRom|getChr|setChr|updateChr/i.test(l)) {
      hits.push(`${i + 1}: ${l.trim().slice(0, 130)}`);
    }
  });
  if (hits.length) {
    console.log(`\n===== ${f} (${hits.length}) =====`);
    hits.slice(0, 40).forEach(h => console.log(h));
  }
}
