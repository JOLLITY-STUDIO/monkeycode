const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_28.asm', 'utf8').split(/\r?\n/);
const out = [];
let inRange = false;
for (const line of lines) {
  const m = line.match(/0E:([0-9A-F]{4})/i);
  if (m) {
    const addr = parseInt(m[1], 16);
    if (addr === 0x8b30) inRange = true;
    if (addr === 0x8b80) break;
  }
  if (inRange) out.push(line);
}
fs.writeFileSync('_b28_8b30.txt', out.join('\n'));
console.log('lines:', out.length);
