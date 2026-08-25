const fs = require('fs');
const f = 'src/game/prg/data/tables/match-event-table.ts';
let s = fs.readFileSync(f, 'utf8');
// Convert { eventId: N, lo: 0xXX, hi: 0xYY } to { eventId: N, lo: 0xXX, hi: 0xYY, target: ((0xYY<<8)|0xXX) }
s = s.replace(/\{ eventId: (\d+), lo: (0x[0-9A-Fa-f]+), hi: (0x[0-9A-Fa-f]+) \}/g,
  (m, id, lo, hi) => {
    const loV = parseInt(lo, 16);
    const hiV = parseInt(hi, 16);
    const target = (hiV << 8) | loV;
    return `{ eventId: ${id}, lo: ${lo}, hi: ${hi}, target: ${target} }`;
  });
fs.writeFileSync(f, s);
console.log('patched');
