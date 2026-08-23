const fs = require('fs');
const src = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8');
const lines = src.split('\n');
// 找包含 9459 或 948E 或 9491 的行
let hits = [];
lines.forEach((l, i) => {
  if (/9459|948E|9491|9482|94AE|94BB|9224/.test(l)) hits.push(i + 1 + ': ' + l.trim());
});
console.log(hits.join('\n'));
