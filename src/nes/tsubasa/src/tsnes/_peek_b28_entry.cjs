// Peek bank28 $8000-$8010 entry
const fs = require('fs');
const a = fs.readFileSync('_tmp_bzk_out/bank_28.asm', 'utf8').split(/\r?\n/);
let shown = 0;
for (let i = 0; i < a.length && shown < 20; i++) {
  if (a[i].includes('28:800') || a[i].includes('28:801') || a[i].includes('28:802')) {
    console.log(a[i]);
    shown++;
  }
}
