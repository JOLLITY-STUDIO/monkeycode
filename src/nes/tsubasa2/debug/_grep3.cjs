const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/store/DataStore.ts','utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.indexOf('writeNT') >= 0 || l.indexOf('nt0') >= 0 || l.indexOf('nt1') >= 0 || l.indexOf('get nt') >= 0) {
    console.log((i+1) + ': ' + l.trim());
  }
});
