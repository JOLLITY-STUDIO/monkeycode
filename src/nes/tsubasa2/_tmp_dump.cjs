const fs = require('fs');
const path = require('path');
// bank02 has A20F/A20C/A209; bank01 has A006/A009
for (const bank of ['bank02', 'bank01', 'bank30', 'bank31']) {
  const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/' + bank;
  if (!fs.existsSync(p)) continue;
  console.log('===== ' + bank + ' =====');
  for (const fn of fs.readdirSync(p)) {
    if (!fn.endsWith('.s')) continue;
    const lines = fs.readFileSync(path.join(p, fn), 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (/A20[0-9F]|A006|A009/.test(lines[i])) {
        console.log(fn + ':' + (i + 1) + ': ' + lines[i].trim());
      }
    }
  }
}
