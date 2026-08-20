const fs = require('fs');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
for (const b of ['bank24', 'bank26']) {
  const dir = ROOT + '/' + b;
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(dir + '/' + f, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.includes('8C85') || (l.includes('$8C8') || l.includes('$8C7')) && l.includes(';')) {
        console.log(b + '/' + f + ':' + (i + 1) + '  ' + l.trim().slice(0, 100));
      }
    }
  }
}
