const fs = require('fs');
const lines = fs.readFileSync('debug/trace/opening-nt.log', 'utf8').split('\n');
let nz = [];
let seen = new Set();
for (const l of lines) {
  const m = l.match(/STA \$2007 = #\$([0-9A-F]{2}) @ \$([0-9A-F]{4})/);
  if (!m) continue;
  const tile = parseInt(m[1], 16);
  if (tile !== 0) {
    nz.push(l.trim());
    const key = m[2].slice(0, 2);
    if (!seen.has(key)) { seen.add(key); }
  }
}
console.log('nonZero total:', nz.length);
console.log('first 80:');
for (const l of nz.slice(0, 80)) console.log(l);
