const fs = require('fs');
for (const f of [3731, 3742, 3780]) {
  const p = `output/emu-full/frame-${String(f).padStart(4, '0')}/oam.json`;
  const o = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log(`\n=== f${f} oam type=${typeof o} len=${o.length} ===`);
  if (Array.isArray(o)) {
    console.log('first 8:', o.slice(0, 8));
    let cnt = 0;
    for (let i = 0; i < 64; i++) {
      const y = o[i * 4 + 0];
      const t = o[i * 4 + 1];
      const a = o[i * 4 + 2];
      const x = o[i * 4 + 3];
      if (y < 240 && y > 0) {
        console.log('slot' + i, 'y=' + y, 'tile=' + t, 'attr=' + a, 'x=' + x);
        cnt++;
      }
    }
    console.log('onscreen count', cnt);
  }
}
