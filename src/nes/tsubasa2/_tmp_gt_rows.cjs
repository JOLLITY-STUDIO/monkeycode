const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
for (const f of [3719, 3720, 3721, 3722, 3723, 3724, 3725, 3726]) {
  const p = s.indexOf('{f:' + f + ',');
  const p2 = s.indexOf('{f:' + (f + 1) + ',', p);
  const block = s.slice(p, p2);
  const nm = block.match(/n:\[([\s\S]*?)\],a:/);
  console.log('=== f' + f + ' ===');
  if (nm) {
    const rowRe = /\{ni:(\d+),r:(\d+),d:\[([^\]]*)\]\}/g;
    let rm;
    while ((rm = rowRe.exec(nm[1])) !== null) {
      if (rm[2] === '21' || rm[2] === '23') {
        console.log('r' + rm[2] + ': ' + rm[3]);
      }
    }
  }
}
