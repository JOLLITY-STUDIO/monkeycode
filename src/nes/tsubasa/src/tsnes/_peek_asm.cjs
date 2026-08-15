const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
for (const line of lines) {
  const m = line.match(/00:([0-9A-F]{4}):/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x90D0 && a <= 0x9260) console.log(line);
  }
}
