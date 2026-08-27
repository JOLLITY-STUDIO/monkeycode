const fs = require('fs');
for (const f of [3731, 3742, 3780]) {
  const p = `output/emu-full/frame-${String(f).padStart(4, '0')}/oam.json`;
  const o = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log(`\n=== emu f${f} OAM ===`);
  let cnt = 0;
  for (const e of o) {
    if (e.y < 240) {
      console.log('slot' + e.idx, 'y=' + e.y, 'tile=' + e.tile, 'attr=' + e.attr, 'x=' + e.x);
      cnt++;
    }
  }
  console.log('onscreen count', cnt);
}
