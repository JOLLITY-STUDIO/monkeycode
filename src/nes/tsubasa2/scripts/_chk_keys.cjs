const fs = require('fs');
const path = require('path');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/game';
const files = fs.readdirSync(ROOT).filter(f => /\.ts$/.test(f));
const targets = ['ram_003A', 'ram_003B', 'ram_003C', 'ram_003D', 'ram_003E', 'ram_003F', 'ram_002C', 'ram_002D', 'ram_0063', 'ram_0064', 'ram_05F3', 'ram_05F4', 'ram_05F5', 'ram_05E3', 'ram_062A', 'ram_00E2', 'ram_0515', 'ram_04A5'];
for (const f of files) {
  const c = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const lines = c.split(/\r?\n/);
  let hit = false;
  lines.forEach((l, i) => {
    for (const t of targets) {
      if (l.includes(t)) {
        if (!hit) { console.log('--- ' + f + ' ---'); hit = true; }
        console.log((i + 1) + ': ' + l.trim());
        break;
      }
    }
  });
}
