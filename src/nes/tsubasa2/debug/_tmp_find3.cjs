const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/system/GameSystemService.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
for (const pat of ['registerCoroutine(', '_coroutineYieldImpl', 'bankSwitchR7(', 'currentR7Bank(']) {
  lines.forEach((l, i) => { if (l.includes(pat)) console.log(`${i + 1}: ${l.trim()}`); });
}
