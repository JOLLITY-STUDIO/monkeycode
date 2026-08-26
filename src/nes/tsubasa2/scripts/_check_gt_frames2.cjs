const { OPENING_FRAMES } = require('../dist-cjs/game/prg/data/scene/OpeningFrameTable');
const fs = require('fs');
const out = [];
for (let f = 10; f <= 80; f++) {
  const e = OPENING_FRAMES.find((x) => x.f === f);
  if (!e) continue;
  const nTiles = e.n.reduce((sum, r) => sum + r.d.filter((v) => v !== 0).length, 0);
  const nRows = e.n.length;
  out.push(`f${f} nRows=${nRows} nTiles=${nTiles} a=${e.a.length} o=${e.o.length} p=${e.p ? 'y' : 'n'} scroll=${JSON.stringify(e.s)}`);
}
fs.writeFileSync('output/_gt_frames2.log', out.join('\n'));
console.log(out.join('\n'));
