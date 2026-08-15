const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_24.asm', 'utf8').split(/\r?\n/);
const out = [];
let inRange = false;
for (const line of lines) {
  const m = line.match(/0C:([0-9A-F]{4})/i);
  if (m) {
    const addr = parseInt(m[1], 16);
    if (addr === 0x8851) inRange = true;
    if (addr === 0x89b4) break;
  }
  if (inRange) out.push(line);
}
fs.writeFileSync('_b24_spr_core.txt', out.join('\n'));
console.log('lines:', out.length);
