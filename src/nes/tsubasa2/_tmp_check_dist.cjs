const fs = require('fs');
const s = fs.readFileSync('dist-cjs2/game/prg/data/scene/OpeningFrameTable.js', 'utf8');
const p = s.indexOf('f: 3722');
const p2 = s.indexOf('f: 3723', p);
const block = s.slice(p, p2);
const m = block.match(/r: 21, d: \[([^\]]*)\]/);
console.log('dist f3722 r21:', m ? m[1] : 'not found');
const m2 = block.match(/r: 23, d: \[([^\]]*)\]/);
console.log('dist f3722 r23:', m2 ? m2[1] : 'not found');
