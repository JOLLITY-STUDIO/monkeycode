const fs = require('fs');
const r = fs.readFileSync('src/game/prg/data/store/RamViews.ts', 'utf8');
const lines = r.split('\n');
let i = 0;
for (i = 0; i < lines.length; i++) {
  if (/MatchRoundView/.test(lines[i])) break;
}
if (i >= lines.length) { console.log('not found'); process.exit(0); }
console.log('MatchRoundView starts at line ' + (i + 1));
for (; i < lines.length; i++) {
  const l = lines[i];
  if (/^export class/.test(l) && !l.includes('MatchRoundView')) break;
  console.log((i + 1) + ': ' + l.substring(0, 200));
}
