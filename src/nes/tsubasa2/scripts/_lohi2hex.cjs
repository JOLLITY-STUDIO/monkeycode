const fs = require('fs');
const f = 'src/game/prg/data/tables/match-event-table.ts';
let s = fs.readFileSync(f, 'utf8');
s = s.replace(/\{ eventId: (\d+), lo: (0x[0-9A-Fa-f]+), hi: (0x[0-9A-Fa-f]+), target: (\d+) \}/g,
  (m, id, lo, hi, targetDec) => {
    const target = parseInt(targetDec);
    const hex = '0x' + target.toString(16).toUpperCase().padStart(4, '0');
    return `{ eventId: ${id}, lo: ${lo}, hi: ${hi}, target: ${hex} }`;
  });
fs.writeFileSync(f, s);
console.log('hexified');
