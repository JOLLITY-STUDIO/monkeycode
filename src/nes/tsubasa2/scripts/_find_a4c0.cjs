const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank02/_full.s', 'utf8').split('\n');
lines.forEach((l, i) => {
  const m = l.match(/\$\s*([0-9A-F]{4})/i);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0xA200 && a <= 0xA900) console.log((i + 1) + ': ' + l.trim());
  }
});
