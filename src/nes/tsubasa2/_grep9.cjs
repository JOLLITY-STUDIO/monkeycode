const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/store/RamViews.ts', 'utf8');
const lines = t.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/class FadeView|fade|0x0[0-9a-f]{2}/i.test(lines[i])) {
    console.log(i + 1 + ': ' + lines[i].trim());
  }
}
