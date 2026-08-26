const fs = require('fs');
const path = require('path');
for (const f of [3600, 3680, 3700, 3750, 3800, 3900, 4000, 4080, 4096, 4120, 4150, 4190, 4200]) {
  const d = path.join('output', 'emu-full', 'frame-' + String(f).padStart(4, '0'));
  try {
    const pal = JSON.parse(fs.readFileSync(path.join(d, 'palette.json'), 'utf8'));
    const nt0 = JSON.parse(fs.readFileSync(path.join(d, 'nt.json'), 'utf8'));
    const st = JSON.parse(fs.readFileSync(path.join(d, 'state.json'), 'utf8'));
    const cnt = (arr) => arr.reduce((n, v) => n + (v !== 0 ? 1 : 0), 0);
    const bgNZ = cnt(pal.bg), sprNZ = cnt(pal.spr);
    const ntNZ = [0, 1, 2, 3].map((i) => cnt(nt0[i].tile.slice(0, 960)));
    console.log(`f${f} palBg=${bgNZ} palSpr=${sprNZ} ntNZ=${ntNZ.join('/')} scroll=${JSON.stringify(st.scroll && st.scroll.regV + ',' + st.scroll.regH + ',' + st.scroll.regVT + ',' + st.scroll.regHT)}`);
  } catch (e) { console.log(`f${f} ERR ${e.message}`); }
}
