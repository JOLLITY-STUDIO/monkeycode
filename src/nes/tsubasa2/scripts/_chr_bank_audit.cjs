const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/output/emu-reference';
const dirs = fs.readdirSync(root).filter(d => d.startsWith('frame-'));
for (const d of dirs) {
  const sw = JSON.parse(fs.readFileSync(path.join(root, d, 'chr-switches.json'), 'utf8'));
  const last = sw.bankMapByScanline[sw.bankMapByScanline.length - 1];
  const banks = (last && last.banks) || [];
  console.log(d + ': sc=' + (last && last.scanline) + ' banks=[' + banks.join(',') + ']');
}
