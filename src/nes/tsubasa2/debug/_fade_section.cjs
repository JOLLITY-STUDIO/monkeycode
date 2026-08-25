const fs = require('fs');
const s = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8');
const lines = s.split(/\r?\n/);
lines.forEach((l, i) => {
  const m = l.match(/;\s*\$([0-9A-F]{4})\b/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x99F0 && a <= 0x9B60) {
      console.log((i + 1) + ':' + l);
    }
  }
});
