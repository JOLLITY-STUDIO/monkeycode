const fs = require('fs');
const f = '_tmp_bzk_out/bank_12.asm';
const lines = fs.readFileSync(f, 'utf-8').split('\n');
// find bank prefix used
console.log('first lines:');
for (let i = 0; i < 6; i++) console.log(i + ': ' + lines[i].slice(0, 120));
// collect addresses 8000-81D0
const out = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/:8([0-9A-F]{3})/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x000 && a <= 0x1F0) out.push({ a, line: lines[i] });
  }
}
out.sort((x, y) => x.a - y.a);
console.log('\n=== $8000-$81F0 ===');
for (const o of out) console.log(`8${o.a.toString(16).toUpperCase().padStart(3, '0')} | ${o.line.trim()}`);
