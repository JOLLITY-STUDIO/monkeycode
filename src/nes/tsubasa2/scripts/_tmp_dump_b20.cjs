const fs = require('fs');
const d = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/';
const s = fs.readFileSync(d + 'bank_20.asm', 'utf8').split(/\r?\n/);
const hits = [];
const inRange = (a, lo, hi) => a >= lo && a <= hi;
s.forEach((l, i) => {
  const m = l.match(/0A:(8[0-9A-F]{3}|9[0-9A-F]{3}|A[0-9A-F]{3}|B[0-9A-F]{3}):/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (inRange(a, 0x88E4, 0x88F4)) hits.push([i + 1, l.trim()]);
    if (inRange(a, 0xA1B0, 0xA1BC)) hits.push([i + 1, l.trim()]);
    if (inRange(a, 0xAC44, 0xAC50)) hits.push([i + 1, l.trim()]);
  }
});
console.log(hits.map(h => h[0] + ': ' + h[1]).join('\n'));
