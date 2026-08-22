const fs = require('fs');
const path = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts';
const s = fs.readFileSync(path, 'utf8').split('\n');
console.log('total:', s.length);
s.forEach((l, i) => {
  const t = l.trim();
  if (/^\s*(private|protected|public)?\s*(get\s+\w+|set\s+\w+|\w+\()/.test(l) || /^\s*(private|protected|public)?\s*\*?\w+\(.*\):/.test(l)) {
    console.log((i + 1) + ': ' + t);
  }
});
