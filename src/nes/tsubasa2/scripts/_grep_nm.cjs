const fs = require('fs');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/game';
const files = fs.readdirSync(ROOT).filter(f => /\.ts$/.test(f));
const targets = ['0300', 'namePtr', 'name', 'writeByte', 'NAMES', 'grid', 'C539', '0x54', '0x34', '_readIndirectPtr', 'KEY_0034'];
for (const f of files) {
  const c = fs.readFileSync(ROOT + '/' + f, 'utf8');
  const lines = c.split(/\r?\n/);
  let printed = false;
  lines.forEach((l, i) => {
    if (targets.some(t => l.includes(t)) && /bank24/.test(f)) {
      if (!printed) { console.log('--- ' + f + ' ---'); printed = true; }
      console.log((i + 1) + ': ' + l.trim());
    }
  });
}
