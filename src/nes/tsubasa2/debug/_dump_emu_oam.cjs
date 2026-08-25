const d = require('./_emu_frames.json');
for (const k of Object.keys(d)) {
  const f = d[k];
  const rows = f.oam.map((s, i) => {
    const p = s.split(',').map(Number);
    return { i, y: p[0], t: p[1], a: p[2], x: p[3] };
  }).filter(r => r.y !== 0 && r.y !== 248);
  console.log(`frame ${f.frame} r4A ${f.r4A} visible ${rows.length}`);
}
