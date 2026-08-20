const fs = require('fs');
const m = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe3.txt', 'utf-8');
const lines = m.split('\n');
let out = '';
for (const l of lines) {
  if (l.startsWith('    text=')) {
    const t = l.substring(10);
    const kataCount = (t.match(/[ア-ト]/g) || []).length;
    const kanaCount = (t.match(/[アイウエオカキクケコサシスセソタチツテトナニヌネノ]/g) || []).length;
    if (kataCount >= 5 && kanaCount >= 5) {
      out += l + '\n';
    }
  }
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe4.txt', out, 'utf-8');
console.log('matches', out.split('\n').length);
