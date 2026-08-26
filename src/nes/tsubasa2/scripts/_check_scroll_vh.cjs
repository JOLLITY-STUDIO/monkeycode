const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/OpeningFrameTable.ts';
const s = fs.readFileSync(p, 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arrText = s.slice(start);
const frames = [];
const regex = /\{f:(\d+),c:\[[^\]]*\],p:[^,]*,o:\[[^\]]*\],n:\[[^\]]*\],a:\[[^\]]*\],s:\{v:(\d+),h:(\d+),vt:(\d+),ht:(\d+),fv:(\d+),fh:(\d+)\}\}/g;
let m;
while ((m = regex.exec(arrText)) !== null) {
  const f = parseInt(m[1]);
  const v = parseInt(m[2]);
  const h = parseInt(m[3]);
  if (v !== 0 || h !== 0) frames.push({f, v, h});
}
console.log('frames with v!=0 or h!=0:', frames.slice(0, 30));
console.log('total:', frames.length);
