const fs = require('fs');
const p = 'docs/trace/Captain Tsubasa II - Super Striker (Japan)-openning4.log';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);
const b6 = new Map();
for (const l of lines) {
  const m = l.match(/\$06:([0-9A-F]{4}):/);
  if (m) {
    const pc = parseInt(m[1], 16);
    b6.set(pc, (b6.get(pc) || 0) + 1);
  }
}
function ranges(map) {
  const pcs = [...map.keys()].sort((a, b) => a - b);
  const out = [];
  let s = null, e = null;
  for (const p of pcs) {
    if (s === null) { s = e = p; continue; }
    if (p - e <= 8) { e = p; continue; }
    out.push('$' + s.toString(16).toUpperCase().padStart(4, '0') + '-$' + e.toString(16).toUpperCase().padStart(4, '0'));
    s = e = p;
  }
  if (s !== null) out.push('$' + s.toString(16).toUpperCase().padStart(4, '0') + '-$' + e.toString(16).toUpperCase().padStart(4, '0'));
  return out.join(' ');
}
console.log('=== BANK $06 PC RANGES (addr count=' + b6.size + ') ===');
console.log(ranges(b6));
console.log('\n=== BANK $06 lines grouped by PC (top 25 PCs) ===');
const sorted = [...b6.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25);
for (const [pc, c] of sorted) {
  console.log('$06:' + pc.toString(16).toUpperCase().padStart(4, '0') + ' x' + c);
}
