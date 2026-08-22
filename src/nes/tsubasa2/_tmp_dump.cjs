const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
for (const f of fs.readdirSync(dir)) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8').split('\n');
  for (let i = 0; i < s.length; i++) {
    if (/\$9B2[0-9A-F]\b|\$9B5[0-9A-F]\b/.test(s[i])) {
      console.log(f, (i + 1) + ': ' + s[i].trim());
    }
  }
}
