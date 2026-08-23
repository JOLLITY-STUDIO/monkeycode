const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts';
const ls = fs.readFileSync(p, 'utf8').split('\n');
const pat = /sub9085|sub9148|sub9147|sub94C1|sub801E|_8297|8297|_initScene|resetEntry|mainLoop|update\(\)|coroutineTick|_runCoroutine/;
ls.forEach((l, i) => {
  if (pat.test(l) && !l.trim().startsWith('*') && !l.trim().startsWith('//')) {
    console.log((i + 1) + ': ' + l.trim().slice(0, 130));
  }
});
