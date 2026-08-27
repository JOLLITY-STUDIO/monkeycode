const fs = require('fs');
const src = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const m = src.match(/OPENING_FRAMES[^=]*=\s*(\[[\s\S]*\])\s*;/);
if (!m) { console.log('NO ARRAY'); process.exit(1); }
const arr = JSON.parse(m[1].replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":'));
console.log('total:', arr.length);
let best = null, bd = 1e9;
for (const e of arr) { const d = Math.abs(e.f - 800); if (d < bd) { bd = d; best = e; } }
console.log('closest f=' + best.f);
console.log('s=' + JSON.stringify(best.s));
console.log('c=' + JSON.stringify(best.c));
const near = arr.filter(e => e.f >= 785 && e.f <= 820);
console.log('--- entries f in [785,820]: ' + near.length);
for (const e of near) console.log('f=' + e.f + ' s=' + JSON.stringify(e.s));
