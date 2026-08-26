const fs = require('fs');
for (const f of [3600, 3680, 3700, 3750, 4080, 4096, 4150, 4200]) {
  const d = 'output/emu-full/frame-' + String(f).padStart(4, '0');
  try {
    const oam = JSON.parse(fs.readFileSync(d + '/oam.json', 'utf8'));
    const vis = [];
    for (let i = 0; i < 64; i++) {
      const o = oam[i];
      if (o.y < 0xf0) vis.push(`${i}:(${o.y},${o.tile},${o.x})`);
    }
    console.log(`f${f} visCount=${vis.length} ${vis.slice(0, 6).join(' ')}${vis.length > 6 ? ' ...' : ''}`);
  } catch (e) { console.log(`f${f} ERR ${e.message}`); }
}
