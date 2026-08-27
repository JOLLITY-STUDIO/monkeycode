const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const m = s.match(/export const OPENING_FRAMES[\s\S]*?\];/);
if (!m) { console.log('no match'); process.exit(1); }
const arr = eval('(' + m[0].replace(/export const OPENING_FRAMES\s*=\s*/, '').replace(/;$/, '') + ')');
for (const f of arr) {
  if (f.f >= 3720 && f.f <= 3760) {
    const n = f.n || [];
    console.log('f=' + f.f, 'nRows=' + n.length, 'rows=' + (n.length ? n.map(r => r.ni + ':' + r.r).join(',') : '-'));
  }
}
