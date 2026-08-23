const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank30/_full.s', 'utf8').split('\n');
lines.forEach((l, i) => {
  const m = l.match(/\$\s*([0-9A-F]{4})/i);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0xC4B0 && a <= 0xC560) console.log((i + 1) + ': ' + l.trim());
  }
});
