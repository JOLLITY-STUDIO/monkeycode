const fs = require('fs');
const s = fs.readFileSync('src/game/data/prg/DataStore.ts', 'utf8');
const lines = s.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/isBusy|beginBuild|endBuild|setBusy|class Oam|busy/.test(lines[i])) {
    console.log((i + 1) + ': ' + lines[i]);
  }
}
