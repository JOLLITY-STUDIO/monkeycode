// 对比 emu frame-030 与 H5 frame 20 的 NT0 文字区 + palette
const fs = require('fs');

function pad(n) { return n.toString(16).padStart(2, '0'); }

// ---- emu ----
const emuNT = JSON.parse(fs.readFileSync('output/emu-reference/frame-030/nt.json', 'utf8'));
const emuPal = JSON.parse(fs.readFileSync('output/emu-reference/frame-030/palette.json', 'utf8'));
const nt0 = emuNT[0];
console.log('=== emu frame-030 NT0 rows 12-15 cols 12-23 (tile/attr) ===');
for (let y = 12; y < 16; y++) {
  let s = 'y' + y + ': ';
  for (let x = 12; x < 24; x++) {
    const idx = y * 32 + x;
    const v = nt0[idx] || 0;
    s += pad(v.tile !== undefined ? v.tile : 0) + (v.attr ? '/' + pad(v.attr) : '   ') + ' ';
  }
  console.log(s);
}
console.log('emu palette bg:', JSON.stringify(emuPal.bg));
console.log('emu palette sp:', JSON.stringify(emuPal.sp));

// ---- H5 ----
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);
for (let f = 0; f < 21; f++) r.frame(g);
const h5nt = r.ppu.nameTable[0];
console.log('=== H5 frame 20 NT0 rows 12-15 cols 12-23 (tile/attr) ===');
for (let y = 12; y < 16; y++) {
  let s = 'y' + y + ': ';
  for (let x = 12; x < 24; x++) {
    const idx = y * 32 + x;
    const v = h5nt[idx] || 0;
    const t = typeof v === 'object' ? v.tile : v;
    const a = typeof v === 'object' ? v.attr : 0;
    s += pad(t) + (a ? '/' + pad(a) : '   ') + ' ';
  }
  console.log(s);
}
console.log('H5 imgPalette:', JSON.stringify(r.ppu.imgPalette));
console.log('H5 store palette bg:', JSON.stringify(r.store ? r.store.palette?.bg : undefined));
