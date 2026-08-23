const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_render.s';
const c = fs.readFileSync(p, 'utf8');
const ls = c.split('\n');
let idx = -1;
ls.forEach((l, i) => { if (/8EF0/.test(l) && idx < 0) idx = i; });
console.log('8EF0 at line', idx + 1);
if (idx >= 0) {
  for (let i = idx; i < Math.min(idx + 140, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
}
