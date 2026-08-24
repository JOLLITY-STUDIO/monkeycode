const d = require('fs').readFileSync('src/game/prg/data/tables/player-stats.ts', 'utf8');
const re = /id:\s*0x([0-9A-Fa-f]+)\s*,\s*name:\s*['"]([^'"]+)['"]/g;
const map = {};
let m;
while ((m = re.exec(d)) !== null) {
  map[parseInt(m[1], 16)] = m[2];
}
for (const id of [0x17, 0x18, 0x23, 0x24, 0x25, 0x26, 0x19, 0x1A, 0x1B, 0x1E, 0x1F, 0x20, 0x21, 0x10, 0x09, 0x0A, 0x0F]) {
  console.log('0x' + id.toString(16).padStart(2, '0').toUpperCase() + ' = ' + (map[id] || '?'));
}
