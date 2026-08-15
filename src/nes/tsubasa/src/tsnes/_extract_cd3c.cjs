const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split('\n');
const re = /\b([0-9A-F]{4}):\s/i;
const out = [];
let capturing = false;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(re);
  if (m) {
    const a = parseInt(m[1], 16);
    if (!capturing && a >= 0xcd3c && a <= 0xcd89) capturing = true;
    if (capturing && a > 0xcd89) break;
  }
  if (capturing) out.push(lines[i]);
}
fs.writeFileSync('_b30_cd3c_dump.txt', out.join('\n'));
console.log('lines:', out.length);
