// temp: show how other banks key the OAM buffer
const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank11_match-turn.service.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank24_hud.service.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank29_roster.service.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank01_data-query.service.ts',
];
for (const f of files) {
  console.log('=== ' + f.split('/').pop() + ' ===');
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/ram_04|ram_02|ram_03|ram_05|BASE_|key\(|\.read\(|\.write\(/.test(l)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 130));
    }
  });
}
