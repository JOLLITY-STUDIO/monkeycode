// bank26 反汇编 $8978-$8A40 完整区域 (TS _handleGoal 映射区)
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '_tmp_bzk_out', 'bank_26', 'bank_26_part02.asm');
const t = fs.readFileSync(p, 'utf8').split('\n');
let started = false, n = 0;
for (const l of t) {
  const m = l.match(/0D:(8978|897[9A-F]|898|899|89A|89B|89C|89D|89E|8A0|8A1|8A2|8A3|8A4|8A5|8A6|8A7|8A8|8A9|8AA|8AB|8AC|8AD|8AE|8AF|8B0|8B1|8B2|8B3|8B4|8B5|8B6|8B7|8B8|8B9|8BA|8BB|8BC|8BD|8BE|8BF)/);
  if (m && !started) { started = true; }
  if (started) {
    console.log(l.trim().slice(0, 120));
    if (++n > 260) break;
  }
}
