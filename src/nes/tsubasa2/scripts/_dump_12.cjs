const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank12/code_sub.s', 'utf8');
const ls = c.split(/\r?\n/);
for (let i = 0; i < ls.length; i++) {
  const t = ls[i].trim();
  const m = t.match(/; \$([0-9A-F]{4})$/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x805E && a <= 0x80C0) console.log(ls[i]);
  }
}
