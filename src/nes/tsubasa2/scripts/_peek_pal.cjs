const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const idx = s.indexOf('const OPENING_FRAMES:');
const arrStart = s.indexOf('[', idx);
let depth = 0, arrEnd = -1;
for (let i = arrStart; i < s.length; i++) {
  if (s[i] === '[') depth++;
  else if (s[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const arrStr = s.slice(arrStart, arrEnd + 1);
let out = [];
let d = 0, cur = '';
for (let i = 0; i < arrStr.length; i++) {
  const c = arrStr[i];
  if (c === '{') { d++; cur += c; }
  else if (c === '}') { d--; cur += c; if (d === 0) { out.push(cur); cur = ''; } }
  else if (d > 0) cur += c;
}
for (const blk of out) {
  const f = parseInt(blk.match(/f:(\d+)/)?.[1] || '0');
  if (f >= 1700 && f <= 1960) {
    const pMatch = blk.match(/p:(null|{[^}]*})/);
    const p = pMatch ? pMatch[1] : '?';
    if (p !== 'null') console.log(f, p);
  }
}
