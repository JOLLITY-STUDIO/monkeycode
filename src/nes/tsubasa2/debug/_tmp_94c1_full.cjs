const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_render.s';
const ls = fs.readFileSync(p, 'utf8').split('\n');
// 打印 409-560 行 (含 9201-94C1 区域) 以及 640-700 行
for (let i = 408; i < Math.min(530, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
console.log('======= 640-700 =======');
for (let i = 639; i < Math.min(700, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
