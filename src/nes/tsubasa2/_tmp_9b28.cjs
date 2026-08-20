const fs = require('fs');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
for (const f of fs.readdirSync(ROOT)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(ROOT + '/' + f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/; \$9B2[0-9A-F]|; \$9B3[0-9A-F]|; \$9B4[0-9A-F]|; \$9B5[0-9A-F]/.test(l)) {
      console.log(f + ':' + (i + 1) + '  ' + l.trim().slice(0, 90));
    }
  }
}
