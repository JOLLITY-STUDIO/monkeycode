// 打印 bank_26_part02.asm 中 0D:8A40-0D:8B80 区段
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '_tmp_bzk_out', 'bank_26', 'bank_26_part02.asm');
const t = fs.readFileSync(p, 'utf8').split('\n');
let started = false, n = 0;
for (const l of t) {
  const m = l.match(/0D:(8A4[0-9A-F]|8A5|8A6|8A7|8A8|8A9|8AA|8AB|8AC|8AD|8AE|8AF|8B0|8B1|8B2|8B3|8B4|8B5|8B6|8B7|8B8|8B9|8BA|8BB)/);
  if (m && !started) { started = true; }
  if (started) {
    console.log(l.trim().slice(0, 120));
    if (++n > 200) break;
  }
}
