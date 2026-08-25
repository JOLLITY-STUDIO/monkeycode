const fs = require('fs');
function show(file, from, to) {
  const s = fs.readFileSync(file, 'utf8');
  const lines = s.split(/\r?\n/);
  const out = [];
  lines.forEach((l, i) => {
    const m = l.match(/;\s*\$([0-9A-F]{4})\b/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= from && a <= to) out.push((i + 1) + ':' + l);
    }
  });
  console.log('=== ' + file + ' $' + from.toString(16) + '-$' + to.toString(16) + ' ===');
  console.log(out.join('\n'));
}
show('src/asm/bank00/code_sub.s', 0x9980, 0x99B5);
show('src/asm/bank00/code_sub.s', 0x97B0, 0x97D0);
show('src/asm/bank00/code_sub.s', 0x98E0, 0x9900);
show('src/asm/bank00/code_sub.s', 0x99D0, 0x99F0);
