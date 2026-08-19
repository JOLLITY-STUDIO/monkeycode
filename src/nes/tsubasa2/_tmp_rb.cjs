const fs = require('fs');
const path = require('path');
const root = 'src';
const pat = '_readRamByte';
const out = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ts$/.test(e.name)) {
      const txt = fs.readFileSync(p, 'utf8');
      txt.split('\n').forEach((line, i) => {
        if (line.includes(pat)) out.push(`${p}:${i + 1}|${line.trim()}`);
      });
    }
  }
})(root);
fs.writeFileSync('_tmp_rb.txt', out.join('\n'));
console.log('hits:', out.length);
