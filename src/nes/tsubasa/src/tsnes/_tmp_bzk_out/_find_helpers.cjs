const fs = require('fs');
const lines = fs
  .readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8')
  .split(/\r?\n/);
const kw = ['CD7C', 'CDC9', 'CDE2', 'CE08', 'CB0F'];
lines.forEach((l, i) => {
  const m = l.match(/[0-9A-F]{2}:([0-9A-F]{4}):/);
  if (m && kw.includes(m[1])) console.log(i + 1 + ': ' + l);
});
