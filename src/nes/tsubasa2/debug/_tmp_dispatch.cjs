const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/BootRouter.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/story/ScriptEngine.ts',
];
const pat = /dispatchByIndex|onDispatched|\.update\(\)|scriptEngine|ScriptEngine|loadScript|sub84C5|_script/;
files.forEach((p) => {
  const ls = fs.readFileSync(p, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const t = l.trim();
    if (!pat.test(l)) return;
    if (t.startsWith('*') || t.startsWith('//')) return;
    console.log(p.split('/').pop() + ':' + (i + 1) + ': ' + t.slice(0, 125));
  });
});
