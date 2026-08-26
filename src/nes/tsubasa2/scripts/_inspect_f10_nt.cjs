const { OPENING_FRAMES } = require('../dist-cjs/game/prg/data/scene/OpeningFrameTable');
const fs = require('fs');
const fr = OPENING_FRAMES.find((x) => x.f === 10);
if (!fr) { console.log('f10 missing'); process.exit(1); }
const out = [];
out.push(`f10 n=${fr.n.length} a=${fr.a.length} c=${fr.c.length} o=${fr.o.length} p=${fr.p ? 'yes' : 'none'}`);
out.push(`scroll=${JSON.stringify(fr.s)}`);
for (let i = 0; i < fr.n.length; i++) {
  const r = fr.n[i];
  const non0 = r.d.filter((v) => v !== 0).length;
  out.push(`n[${i}] ni=${r.ni} r=${r.r} non0=${non0} head=[${r.d.slice(0, 8).join(',')}]`);
}
if (fr.p) {
  out.push(`bg=[${fr.p.bg.map((v) => v.toString(16)).join(',')}]`);
  out.push(`spr=[${fr.p.spr.map((v) => v.toString(16)).join(',')}]`);
}
fs.writeFileSync('output/_inspect_f10_nt.log', out.join('\n'));
console.log(out.join('\n'));
