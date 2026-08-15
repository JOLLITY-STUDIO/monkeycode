// Find bank24 entry $8000-$8005 in bank_24.asm
const fs = require('fs');
const a = fs.readFileSync('_tmp_bzk_out/bank_24.asm', 'utf8').split(/\r?\n/);
let shown = 0;
for (let i = 0; i < a.length && shown < 30; i++) {
  if (/0C:80(0[0-9A-F]|1[0-9A-F])/.test(a[i])) {
    for (let j = i; j < i + 6 && j < a.length; j++) console.log(a[j]);
    console.log('---');
    shown++;
  }
}
