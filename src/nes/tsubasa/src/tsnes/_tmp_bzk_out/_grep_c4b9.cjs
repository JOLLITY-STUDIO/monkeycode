const fs = require('fs');
const t = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = t.split(/\r?\n/);
const out = [];
for (let i = 0; i < lines.length; i++) {
  if (/\$C4B9|\$C4BD|\$C557|\$C4B2|\$C503|\$C572/.test(lines[i])) {
    out.push(...lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 10)));
    out.push('---');
  }
}
console.log(out.join('\n'));
