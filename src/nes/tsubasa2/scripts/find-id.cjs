// Search player-table.ts for IDs 0x17-0x26 and print full line content
const d = require('fs').readFileSync('src/game/prg/data/tables/player-table.ts', 'utf8');
const lines = d.split('\n');
let count = 0;
for (let i = 0; i < lines.length; i++) {
  if (count >= 50) break;
  const l = lines[i];
  if (/(?:id|name).*0x1[789]|0x2[0-6]/.test(l) || (l.includes('id: 0x2') && i < 200)) {
    console.log(i + 1 + ': ' + l);
    count++;
  }
}
