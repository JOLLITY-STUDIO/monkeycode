const fs = require('fs');
const s = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_main.s', 'utf8').split(/\r?\n/);
const out = [];
for (let i = 0; i < s.length; i++) {
  const m = s[i].match(/; \$([0-9A-F]{4})/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x80D4 && a <= 0x8168) out.push((i + 1) + ': ' + s[i]);
  }
}
console.log(out.join('\n'));
