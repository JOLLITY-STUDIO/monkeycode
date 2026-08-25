const fs = require('fs');
const files = [
  'src/game/prg/data/tables/match-action-table.ts',
  'src/game/prg/data/tables/player-table.ts',
];
for (const f of files) {
  console.log('=== ' + f + ' ===');
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/MatchActionPointer|PlayerProfile|interface/.test(l)) {
      console.log((i+1) + ': ' + l.substring(0, 150));
    }
  }
}
