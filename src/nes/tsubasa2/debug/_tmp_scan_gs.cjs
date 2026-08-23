const fs = require('fs');
const l = fs.readFileSync('src/game/prg/code/system/GameSystemService.ts', 'utf8').split('\n');
for (let i = 0; i < l.length; i++) {
  const t = l[i];
  if (/sceneLoad|sub8297|sub9085|preMainLoopInit|tableLoad\(/.test(t)) console.log((i + 1) + ': ' + t.trim());
}
