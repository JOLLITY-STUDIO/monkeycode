const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/audio/bank12-data.ts', 'utf8');
const lines = s.split('\n');
console.log('total lines:', lines.length);
const idx = lines.findIndex(l => l.includes('JUMP_TABLE_8269'));
console.log('JUMP_TABLE_8269 at line', idx);
for (let i = idx - 2; i < idx + 40; i++) {
  if (i >= 0 && i < lines.length) console.log((i + 1) + ': ' + lines[i]);
}
