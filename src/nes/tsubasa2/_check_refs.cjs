const fs = require('fs');
// 直接检查 bank20_match-aux.ts 的 import 目标是否存在
const targets = [
  ['src/game/prg/data/prg-bank-20', 'bank20_match-aux.ts L24'],
  ['src/game/prg/data/prg-bank-21', 'bank20_match-aux.ts L25'],
  ['src/game/prg/data/prg-bank-31', 'bank20_match-aux.ts L26'],
  ['src/game/prg/data/prg-bank-19', 'bank19_auxiliary.ts L27'],
  ['src/game/prg/data/prg-bank-18', 'bank11_match-turn.ts L62'],
];
for (const [base, from] of targets) {
  const ts = base + '.ts';
  const js = base + '.js';
  console.log(from + ' -> ' + base + ': ts=' + fs.existsSync(ts) + ' js=' + fs.existsSync(js));
}
