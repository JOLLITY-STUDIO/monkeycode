const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningScreenTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_SCREENS');
const re = /'id':(\d+),'label':'([^']+)','startFrame':(\d+),'endFrame':(\d+)/g;
let m;
while ((m = re.exec(s.slice(start))) !== null) {
  console.log(m[1], m[2], m[3], m[4]);
}
