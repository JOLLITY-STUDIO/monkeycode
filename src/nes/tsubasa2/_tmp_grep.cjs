// temp: grep bank30 for C557 / scene entry
const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank30_init.service.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank22_hybrid.service.ts',
];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  console.log('=== ' + f.split('/').pop() + ' ===');
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/C557|C400|SceneCtrl|sceneCtrl|sceneInit|sceneLoad|resetEntry|entryB|entryC|entryD|entryE|entryF|entryG|C4B9/.test(l)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 140));
    }
  });
}
