const fs = require('fs');
const lines = fs
  .readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_27.asm', 'utf8')
  .split(/\r?\n/);
let inRange = false;
for (const l of lines) {
  const m = l.match(/0D:([0-9A-F]{4}):/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x8130 && a <= 0x8249) inRange = true;
    else if (a > 0x8249) inRange = false;
  }
  if (inRange && l.trim()) console.log(l);
}
