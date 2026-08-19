const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_20';
const RANGES = [[0x8459, 0x84D2], [0x8767, 0x8796], [0x8880, 0x88A8]];
const out = [];
for (let p = 1; p <= 8; p++) {
  const lines = fs.readFileSync(dir + '/bank_20_part0' + p + '.asm', 'utf8').split(/\r?\n/);
  for (const l of lines) {
    const m = l.match(/0A:([0-9A-Fa-f]{4}):/);
    if (!m) continue;
    const a = parseInt(m[1], 16);
    for (const [lo, hi] of RANGES) {
      if (a >= lo && a <= hi) { out.push(l); break; }
    }
  }
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_b20_extract.txt', out.join('\n'));
console.log('lines=' + out.length);
