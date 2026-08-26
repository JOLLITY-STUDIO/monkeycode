// 逐帧追踪 H5 nameTable[0] 变化，找出 NT0 被清空的帧
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);

function ntSummary(ppu) {
  const res = [];
  for (let nt = 0; nt < 4; nt++) {
    const t = ppu.nameTable[nt];
    if (!t) { res.push('nt' + nt + '=MISSING'); continue; }
    let nz = 0;
    for (let i = 0; i < 960; i++) {
      const v = t[i];
      const tv = typeof v === 'object' ? v.tile : v;
      if (tv) nz++;
    }
    res.push('nt' + nt + '=' + nz);
  }
  return res.join(' ');
}

for (let f = 0; f < 26; f++) {
  r.frame(g);
  const s = ntSummary(r.ppu);
  const pal0 = r.ppu.imgPalette ? r.ppu.imgPalette[0] : '?';
  console.log('frame ' + f + ': ' + s + ' pal0=' + pal0);
  if (f >= 10) {
    const t = r.ppu.nameTable[0];
    if (t) {
      let row12 = '';
      for (let x = 12; x < 24; x++) {
        const v = t[12 * 32 + x];
        const tv = typeof v === 'object' ? v.tile : v;
        row12 += (tv || 0).toString(16).padStart(2, '0') + ' ';
      }
      console.log('  nt0 y12 cols12-23: ' + row12);
    }
  }
}
