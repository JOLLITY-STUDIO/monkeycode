const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_render.s', 'utf8');
const ls = c.split(/\r?\n/);
ls.forEach((l, i) => {
  if (l.includes('$8EF0')) console.log((i + 1) + ': ' + l.trim());
});
