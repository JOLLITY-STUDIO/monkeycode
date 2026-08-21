// bank11: ram_05CA 写入点 + $84A1 调色板组逻辑
const fs = require('fs');
const c = fs.readFileSync('src/game/prg/code/bank11_match-turn.ts', 'utf8').split(/\r?\n/);
c.forEach((l, i) => {
  if (/KEY_05CA|ram_05CA/.test(l)) console.log((i + 1) + ': ' + l.trim());
});
