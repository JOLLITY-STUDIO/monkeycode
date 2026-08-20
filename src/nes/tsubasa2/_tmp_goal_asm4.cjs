// bank_00_part01.asm 打印行 120-200 (含 $80F3 STA E0, $8149 LDA E4, $815D/$8161 E0, $8178 STA E4)
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '_tmp_bzk_out', 'bank_00', 'bank_00_part01.asm');
const t = fs.readFileSync(p, 'utf8').split('\n');
for (let i = 119; i < Math.min(t.length, 200); i++) {
  console.log(t[i].trim().slice(0, 120));
}
