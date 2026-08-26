const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
const frameRe = /\{f:(\d+),c:\[[^\]]*\],p:[^,]*,o:\[[^\]]*\],n:\[([^\]]*)\],a:\[([^\]]*)\],s:\{[^}]*\}\}/g;
let m;
const hits = [];
while ((m = frameRe.exec(arr)) !== null) {
  const f = parseInt(m[1]);
  if (f < 3046 || f > 3726) continue;
  const nStr = m[2];
  if (nStr.includes('92') || nStr.includes('115') || nStr.includes('66')) {
    hits.push(f);
  }
}
console.log('story_cup frames with text tiles 92/115/66:', hits.length);
console.log(hits.slice(0, 50));
