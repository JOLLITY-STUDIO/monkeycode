const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
const frameRe = /\{f:(\d+),c:\[[^\]]*\],p:[^,]*,o:\[[^\]]*\],n:\[([^\]]*)\],a:\[([^\]]*)\],s:\{[^}]*\}\}/g;
let m;
const hits = [];
const borderTiles = ['80', '81', '84', '85', '82', '83', '86', '87', '153', '160', '168', '152'];
while ((m = frameRe.exec(arr)) !== null) {
  const f = parseInt(m[1]);
  const nStr = m[2];
  if (borderTiles.some(t => nStr.includes(t))) {
    hits.push(f);
  }
}
console.log('frames with border tiles:', hits.length);
console.log(hits.slice(0, 50));
