const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_render.s';
const ls = fs.readFileSync(p, 'utf8').split('\n');
// 找 $94C1 定义: 行尾注释 ; $94C1 且前面有代码
let defs = [];
ls.forEach((l, i) => {
  const m = l.match(/94C1/);
  if (m) defs.push(i);
});
console.log('lines with 94C1:', defs.map((d) => d + 1).join(','));
// 打印每个出现点附近
defs.forEach((d) => {
  console.log('--- around line ' + (d + 1) + ' ---');
  for (let i = Math.max(0, d - 3); i < Math.min(d + 45, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
});
