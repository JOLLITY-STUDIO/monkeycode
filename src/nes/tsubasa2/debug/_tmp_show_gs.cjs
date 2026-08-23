const fs = require('fs');
const l = fs.readFileSync('src/game/prg/code/system/GameSystemService.ts', 'utf8').split('\n');
for (let i = 1315; i < 1390; i++) console.log((i + 1) + ': ' + l[i]);
