const fs = require('fs');
for (const f of [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]) {
  const p = 'output/emu-full/frame-' + String(f).padStart(4, '0') + '/palette.json';
  if (!fs.existsSync(p)) { console.log('f' + f + ': MISSING'); continue; }
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log('f' + f + ' bg=' + d.bg.map(v => v.toString(16).padStart(2, '0')).join(','));
  console.log('      sp=' + d.spr.map(v => v.toString(16).padStart(2, '0')).join(','));
}
