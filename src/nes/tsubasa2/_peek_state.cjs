const fs = require('fs');
for (const f of [282, 342, 820, 1041, 3728, 3733, 3759, 3775, 3783, 4097]) {
  const p = 'output/emu-full/frame-' + String(f).padStart(4, '0') + '/state.json';
  if (!fs.existsSync(p)) { console.log('f' + f + ': MISSING'); continue; }
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log('=== f' + f + ' scroll=' + JSON.stringify(d.scroll) + ' scrollEnd=' + JSON.stringify(d.scrollEnd));
}
