const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank12';
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const ls = c.split(/\r?\n/);
  ls.forEach((l, i) => {
    if (l.includes('; $805E') || l.includes('; $8063')) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
