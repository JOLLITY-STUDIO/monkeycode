// temp: find KEY_ definitions for ZP and OAM in bank01/11/24
const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank01_data-query.service.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank11_match-turn.service.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank24_hud.service.ts',
];
for (const f of files) {
  console.log('=== ' + f.split('/').pop() + ' ===');
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.slice(0, 130).forEach((l, i) => {
    if (/KEY_\w+\s*=\s*'ram_|KEY_\w+\s*=\s*`/.test(l)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 130));
    }
  });
}
