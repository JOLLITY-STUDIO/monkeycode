const fs = require('fs');
const s = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8');
const lines = s.split(/\r?\n/);
const targets = ['99F0', '99F3', '99F5', '99F9', '99FB', '99FD', '9A01', '9A03', '9A05', '9A07', '9A09', '9A0C', '9A0E', '9A10', '9A12', '9A14', '9A16', '9A17', '9A19', '9A1B', '9A1D', '9A1F', '9A21', '9A23', '9A25', '9A27', '9A29', '9A2B', '9A2D', '9A2F', '9A30', '9A43', '9A71', '9A7E', '9AA2', '9B07', '9B28'];
lines.forEach((l, i) => {
  const m = l.match(/^(\S+)\s/);
  if (m && targets.includes(m[1].toUpperCase())) {
    // print from this line up to next blank or 25 lines
    console.log('=== @ line ' + (i + 1) + ' ===');
    for (let j = i; j < Math.min(i + 28, lines.length); j++) {
      console.log(lines[j]);
    }
  }
});
