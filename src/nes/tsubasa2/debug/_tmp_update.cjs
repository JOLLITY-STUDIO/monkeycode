const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/BootRouter.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts',
];
files.forEach((p) => {
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  let s = -1;
  ls.forEach((l, i) => { if (s < 0 && /update\(frame: number\)/.test(l)) s = i; });
  if (s < 0) { console.log('no update(frame) in ' + p); return; }
  console.log('### update in ' + p + ' at line ' + (s + 1));
  for (let i = s; i < Math.min(s + 45, ls.length); i++) console.log((i + 1) + ': ' + ls[i]);
});
