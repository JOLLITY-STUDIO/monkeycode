const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_12.asm', 'utf8').split(/\r?\n/);
for (let j = 419; j < 484 && j < t.length; j++) console.log(String(j).padStart(5) + '|' + t[j]);
