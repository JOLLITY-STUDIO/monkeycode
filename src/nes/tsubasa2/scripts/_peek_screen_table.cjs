const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/OpeningScreenTable.ts';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split('\n');
for (let i = 0; i < Math.min(10, lines.length); i++) {
  console.log(`line ${i + 1} len=${lines[i].length}`);
  console.log(lines[i].slice(0, 400));
  console.log('---');
}
