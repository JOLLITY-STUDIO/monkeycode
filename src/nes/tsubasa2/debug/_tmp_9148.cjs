const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts';
const ls = fs.readFileSync(p, 'utf8').split('\n');
let s = -1;
ls.forEach((l, i) => { if (s < 0 && /sub9148Gen/.test(l)) s = i; });
console.log('sub9148Gen first ref line', s + 1);
for (let i = s; i < Math.min(s + 95, ls.length); i++) console.log((i + 1) + ': ' + ls[i].slice(0, 135));
