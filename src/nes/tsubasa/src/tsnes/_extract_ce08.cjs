const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split('\n');
const re = /\b([0-9A-F]{4}):\s/i;
const out = [];
let capturing = false;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(re);
  if (m) {
    const a = parseInt(m[1], 16);
    if (!capturing && a >= 0xce08 && a <= 0xce80) capturing = true;
    if (capturing && a > 0xce80) break;
  }
  if (capturing) out.push(lines[i]);
}
fs.writeFileSync('_b30_ce08_dump.txt', out.join('\n'));
console.log('lines:', out.length);
