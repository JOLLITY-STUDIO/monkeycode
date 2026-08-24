const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank02/code_sub.s', 'utf8');
const ls = c.split(/\r?\n/);
let start = -1;
for (let i = 0; i < ls.length; i++) {
  if (ls[i].includes('; $84C1')) { start = i; break; }
}
if (start >= 0) {
  for (let i = start; i < start + 170 && i < ls.length; i++) {
    console.log((i + 1) + ': ' + ls[i]);
  }
} else {
  console.log('not found $84C1');
}
