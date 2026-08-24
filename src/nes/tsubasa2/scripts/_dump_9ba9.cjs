const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_sub.s', 'utf8');
const ls = c.split(/\r?\n/);
let idx = -1;
for (let i = 0; i < ls.length; i++) {
  if (ls[i].includes('; $9BA9')) { idx = i; break; }
}
console.log('idx', idx);
if (idx >= 0) {
  for (let i = idx; i < Math.min(idx + 90, ls.length); i++) console.log(ls[i]);
}
