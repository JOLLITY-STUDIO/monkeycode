const fs = require('fs');
const d = JSON.parse(fs.readFileSync('debug/_emu_frames.json', 'utf8'));
for (const f of d) {
  if ([9, 11, 13, 15, 17, 20, 25].indexOf(f.frame) < 0) continue;
  const nt0 = f.nt0;
  const nz = nt0.filter(v => v !== 0);
  const uniq = [...new Set(nt0)].sort((a, b) => a - b);
  console.log('=== frame', f.frame, 'nz=' + nz.length, 'unique=' + JSON.stringify(uniq));
  for (let y = 0; y < 30; y++) {
    let row = '';
    let has = false;
    for (let x = 0; x < 32; x++) {
      const v = nt0[y * 32 + x];
      if (v !== 0) has = true;
      row += v === 0 ? '..' : (v < 16 ? '0' + v.toString(16) : v.toString(16));
    }
    if (has) console.log(String(y).padStart(2) + ' ' + row);
  }
  console.log('');
}
