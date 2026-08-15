const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = src.split(/\r?\n/);
const re = /^(\S)(\s\S)*?\s+0x[0-9A-F]{6}\s+[0-9A-F]{2}:([0-9A-F]{4}):\s+(.+)$/;
let matched = 0;
const samples = [];
for (const l of lines) {
  const m = l.match(re);
  if (m) {
    matched++;
    if (m[1] === 'C') {
      const a = parseInt(m[2], 16);
      if (a >= 0xcb00 && a <= 0xcc00) samples.push(m[2] + ': ' + m[3].trim());
    }
  }
}
console.log('total regex matches:', matched, 'samples in CBxx:', samples.length);
console.log(samples.slice(0, 20).join('\n'));
