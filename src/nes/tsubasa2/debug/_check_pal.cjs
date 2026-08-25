const fs = require('fs');
const d = JSON.parse(fs.readFileSync('debug/_emu_frames.json', 'utf8'));
for (const f of d) {
  const nz = f.nt0.filter(v => v !== 0).length;
  console.log('f' + f.frame, 'r4A=' + f.r4A, 'r4B=' + f.r4B, 'r628=' + f.r628, 'nz=' + nz,
    'palBg=' + JSON.stringify(f.palBg), 'palSp=' + JSON.stringify(f.palSp));
}
