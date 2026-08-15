const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const pats = [/8103/, /8104/, /81EE/, /A103/, /A104/, /A1EE/];
for (const f of fs.readdirSync(dir)) {
  if (!/bank_.*\.asm$/.test(f) || f === 'bank_27.asm') continue;
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const p of pats) {
      if (p.test(l) && /JSR|JMP|\.word|\.addr/i.test(l)) {
        console.log(f + ':' + (i + 1) + ': ' + l.trim());
        break;
      }
    }
  });
}
