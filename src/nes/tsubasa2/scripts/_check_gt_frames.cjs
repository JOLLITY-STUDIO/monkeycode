/** 检查 OpeningFrameTable f10-f40 的 p / n / a / c 数据规模 */
const fs = require('fs');
const { OPENING_FRAMES } = require('../dist-cjs/game/prg/data/scene/OpeningFrameTable');
const out = [];
for (const f of [10, 11, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 80, 100, 150, 200, 250, 280, 282, 300, 340, 350]) {
  const e = OPENING_FRAMES.find((x) => x.f === f);
  if (!e) { out.push(`f${f} MISSING`); continue; }
  const p = e.p ? `p:bg0=${e.p.bg[0].toString(16)} bg=${e.p.bg.length} spr=${e.p.spr.length}` : 'p:none';
  out.push(`f${f} s=${JSON.stringify(e.s)} n=${e.n.length} a=${e.a.length} c=${e.c.length} o=${e.o.length} ${p}`);
}
fs.writeFileSync('output/_gt_frames.log', out.join('\n'));
console.log(out.join('\n'));
