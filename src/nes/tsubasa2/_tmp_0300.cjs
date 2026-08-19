const fs = require('fs');
const path = require('path');
const root = 'src';
const pats = ['0x0300', 'ram_0300', 'writeNT', 'KEY_0034', 'ram_0034'];
const out = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ts$/.test(e.name)) {
      const txt = fs.readFileSync(p, 'utf8');
      txt.split('\n').forEach((line, i) => {
        if (pats.some(pat => line.includes(pat))) out.push(`${p}:${i + 1}|${line.trim()}`);
      });
    }
  }
})(root);
fs.writeFileSync('_tmp_0300.txt', out.join('\n'));
console.log('hits:', out.length);
