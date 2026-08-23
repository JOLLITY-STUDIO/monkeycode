const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
const targets = ['9085', '9087', '9089', '908F', '9093', '9095', '9097'];
for (const f of files) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < s.length; i++) {
    if (targets.some(t => s[i].includes('; $' + t))) console.log(f + ' ' + (i + 1) + ': ' + s[i]);
  }
}
