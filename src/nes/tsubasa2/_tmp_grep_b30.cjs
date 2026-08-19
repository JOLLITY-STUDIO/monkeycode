const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_30/bank_30_part03.asm';
const c = fs.readFileSync(f, 'utf8');
const ls = c.split(/\r?\n/);
for (let i = 0; i < ls.length; i++) {
  if (/CB99|CC02|CD7C|CDC9|CE4A|CE4D|CCD2/.test(ls[i])) {
    console.log((i + 1) + ': ' + ls[i].trim());
  }
}
