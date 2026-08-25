const fs = require('fs');
const d = JSON.parse(fs.readFileSync('debug/_emu_frames.json', 'utf8'));
for (const f of d) {
  const nt0 = f.nt0;
  const nz = nt0.filter(v => v !== 0);
  const uniq = [...new Set(nt0)].sort((a, b) => a - b);
  console.log('=== frame', f.frame, 'r4A=' + f.r4A, 'r4B=' + f.r4B, 'r628=' + f.r628, 'nz=' + nz.length, 'chr=' + JSON.stringify(f.chrBanks));
  console.log('palBg=' + JSON.stringify(f.palBg));
  console.log('palSp=' + JSON.stringify(f.palSp));
  console.log('unique tiles:', JSON.stringify(uniq));
  // print NT0 as grid 32x30 (only nonzero cells, as compact form)
  let s = '';
  for (let y = 0; y < 30; y++) {
    let row = '';
    for (let x = 0; x < 32; x++) {
      const v = nt0[y * 32 + x];
      row += v === 0 ? '..' : (v < 16 ? '0' + v.toString(16) : v.toString(16));
    }
    s += String(y).padStart(2) + ' ' + row + '\n';
  }
  console.log(s);
}
