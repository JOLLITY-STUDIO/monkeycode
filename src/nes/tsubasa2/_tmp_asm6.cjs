const fs = require('fs');
const t = fs.readFileSync('asm/bank06/_full.s', 'utf8').split(/\r?\n/);
console.log('TOTAL LINES:', t.length);
// show first 80 lines
console.log('=== HEAD 60 ===');
console.log(t.slice(0, 60).join('\n'));
// find lines mentioning key addrs (note asm may use $8000 base or offsets)
console.log('\n=== KEY ADDR LINES ===');
t.forEach((l, i) => {
  if (/(8131|816E|818C|8002|8063|813D|8175)/i.test(l)) console.log((i + 1) + ': ' + l);
});
// find any label/comment near $8117-$81DA (offset 0x117-0x1DA)
console.log('\n=== LINES 0x100-0x1F0 offset region: search comments ===');
// asm might show addr comments ; $XXXX. find lines with comment markers around
t.forEach((l, i) => {
  const m = l.match(/;\s*\$?([0-9A-Fa-f]{4})/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x0117 && a <= 0x01DA) console.log((i + 1) + ': ' + l);
  }
});
