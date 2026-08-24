const fs = require('fs');
const d = fs.readFileSync('src/game/prg/data/tables/player-stats.ts', 'utf8');
const ids = [...d.matchAll(/\{\s*id:\s*0x([0-9A-Fa-f]{2})[^}]*?name:\s*['"]([^'"]+)['"]/g)].map(m => [parseInt(m[1], 16), m[2]]);
console.log('total entries:', ids.length);
const want = [0x24, 0x41, 0x42, 0x76, 0x77, 0x78, 0x91, 0xA0, 0xB0, 0xC0, 0x2E, 0x2F, 0x7A, 0x7B, 0x7D];
want.forEach(id => {
  const hit = ids.find(([i]) => i === id);
  console.log('0x' + id.toString(16).padStart(2, '0').toUpperCase() + ': ' + (hit ? hit[1] : 'NOT FOUND'));
});
