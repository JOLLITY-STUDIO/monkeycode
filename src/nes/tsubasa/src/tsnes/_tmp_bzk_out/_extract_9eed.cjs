const fs = require('fs');
const src = fs.readFileSync(__dirname + '/_full_disasm.asm', 'utf8');
const lines = src.split(/\r?\n/);
const hits = [];
lines.forEach((l, i) => { if (l.includes('9EED')) hits.push(i); });
console.log('hits:', hits.length, hits.slice(0, 20));
if (hits.length) {
  const i = hits[0];
  console.log('--- context of first hit ---');
  console.log(lines.slice(Math.max(0, i - 5), i + 140).join('\n'));
}
