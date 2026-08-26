const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
// 匹配每个 OpeningFrameEntry，{f:NNNN,...}
const frameRe = /\{f:(\d+),c:\[[^\]]*\],p:[^,]*,o:\[[^\]]*\],n:\[([^\]]*)\],a:\[([^\]]*)\],s:\{[^}]*\}\}/g;
let m;
const hits = [];
while ((m = frameRe.exec(arr)) !== null) {
  const f = parseInt(m[1]);
  const nStr = m[2];
  if (nStr.includes('170')) {
    // 找出具体行
    const rowRe = /\{ni:(\d+),r:(\d+),d:\[([^\]]*)\]\}/g;
    let rm;
    while ((rm = rowRe.exec(nStr)) !== null) {
      if (rm[3].includes('170')) {
        hits.push({ f, ni: parseInt(rm[1]), r: parseInt(rm[2]) });
      }
    }
  }
}
console.log('frames with tile 170:', hits.length);
console.log(hits.slice(0, 30));
