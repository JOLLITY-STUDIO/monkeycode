const fs = require('fs');
for (const f of ['src/game/service/bank22_hybrid.service.ts', 'src/game/service/bank26_match.service.ts', 'src/game/service/bank28_match.service.ts']) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  console.log('=== ' + f + ' ===');
  lines.forEach((l, i) => {
    if (l.includes('ram_0200') || l.includes('ram_047F') || l.includes('ram_046F') ||
        l.includes('ram_0481') || l.includes('ram_0482') || l.includes('ram_0532') ||
        l.includes('ram_0546') || l.includes('ram_0034') || l.includes('writeSlot') ||
        l.includes('writeByte') || l.includes('clearRange') || l.includes('setBusy')) {
      console.log((i + 1) + ': ' + l.trim());
    }
  });
}
