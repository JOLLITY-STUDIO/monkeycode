const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const startMarker = '{f:3110,';
const start = s.indexOf(startMarker);
if (start < 0) { console.log('frame 3110 not found'); process.exit(0); }
let depth = 0;
let end = start;
for (let i = start; i < s.length; i++) {
  if (s[i] === '{') depth++;
  else if (s[i] === '}') {
    depth--;
    if (depth === 0) { end = i; break; }
  }
}
const txt = s.slice(start, end + 1);
// 只打印 n/a 字段附近
const nIdx = txt.indexOf(',n:');
const aIdx = txt.indexOf(',a:');
const sIdx = txt.indexOf(',s:');
console.log('n field:', txt.slice(nIdx, Math.min(aIdx, sIdx)));
console.log('a field:', txt.slice(aIdx, sIdx));
