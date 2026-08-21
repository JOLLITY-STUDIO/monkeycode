// 找 bank11 fn_85C2 调用点与参数
const fs = require('fs');
const c = fs.readFileSync('src/game/prg/code/bank11_match-turn.ts', 'utf8').split(/\r?\n/);
c.forEach((l, i) => {
  if (/fn_85C2/.test(l)) console.log((i + 1) + ': ' + l.trim());
});
