const fs = require('fs');
const path = require('path');
const emuDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/output/emu-full';
const samples = [10, 100, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4200];
for (const f of samples) {
  const p = path.join(emuDir, `frame-${String(f).padStart(4, '0')}`, 'state.json');
  try {
    const s = JSON.parse(fs.readFileSync(p, 'utf8'));
    console.log(`f${f} nTblAddress=${s.nTblAddress} mirroring=${s.mirroring ?? 'N/A'}`);
  } catch { console.log(`f${f} no state.json`); }
}
