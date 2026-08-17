const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/game/bank24_hud.service.ts';
const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
const pats = ['_readRamByte', '_readStreamByte', 'readSceneByte', 'KEY_0030', 'KEY_0031', 'ram_0300', 'KEY_0035'];
lines.forEach((l, i) => {
  for (const p of pats) {
    if (l.includes(p)) { console.log((i + 1) + ': ' + l.trim()); break; }
  }
});
