const fs = require('fs');
['src/game/service/bank24_hud.service.ts', 'src/game/service/bank28_match.service.ts', 'src/game/service/bank30_init.service.ts'].forEach((f) => {
  const s = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  console.log('=== ' + f + ' ===');
  s.forEach((l, i) => {
    if (/060B|KEY_0601|KEY_0606|KEY_044E|0601_|0606_|060B_/.test(l)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 125));
    }
  });
});
