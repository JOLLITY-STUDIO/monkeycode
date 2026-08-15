const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split('\n');
const re = /\b([0-9A-F]{4}):\s/i;
const out = [];
let capturing = false;
let start = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(re);
  if (m) {
    const a = parseInt(m[1], 16);
    if (!capturing && a >= 0xc527 && a <= 0xc53c) { capturing = true; start = a; }
    if (capturing && a > 0xc53c) break;
  }
  if (capturing) out.push(lines[i]);
}
fs.writeFileSync('_b30_c527_dump.txt', out.join('\n'));
console.log('start at', start.toString(16), 'lines:', out.length);
