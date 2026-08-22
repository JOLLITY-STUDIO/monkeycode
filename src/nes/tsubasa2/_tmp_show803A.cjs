const fs = require('fs');
const s = fs.readFileSync('asm/bank28/_full.s', 'utf8');
// 找 3 个调用点 $81C5 / $8235 / $82A4 的上下文
for (const target of ['$81C5', '$8235', '$82A4']) {
  const i = s.indexOf(target);
  console.log('\n===== ' + target + ' @' + i + ' =====');
  if (i >= 0) console.log(s.slice(i - 900, i + 300));
}
