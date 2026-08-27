// 诊断调色板链路: store.palette.bg / fade / writeMem(0x3f00) / imgPalette
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);

const ppu = r.ppu;
const origWriteMem = ppu.writeMem.bind(ppu);
let palWrites = [];
ppu.writeMem = function (addr, value) {
  if (addr >= 0x3f00 && addr < 0x3f20) {
    palWrites.push([addr, value]);
  }
  return origWriteMem(addr, value);
};

for (let f = 0; f < 12; f++) {
  palWrites = [];
  r.frame(g);
  const bg = Array.from(g.store.palette.bg);
  const spr = Array.from(g.store.palette.spr);
  console.log('H5 f' + f + ' (NES f' + (f + 10) + ') fade.bg=' + g.store.fade.bg.toString(16) +
    ' palWrites=' + palWrites.length +
    ' bg[1]=' + bg[1].toString(16) + ' bg[3]=' + bg[3].toString(16) + ' bg[9]=' + bg[9].toString(16) +
    ' imgPal[3]=' + (ppu.imgPalette[3] >>> 0).toString(16).padStart(8, '0'));
  if (f >= 10) {
    console.log('  bg full: ' + bg.map(v => v.toString(16).padStart(2, '0')).join(','));
    console.log('  palWrites sample: ' + JSON.stringify(palWrites.slice(0, 6)));
    console.log('  imgPal 0-15: ' + Array.from(ppu.imgPalette).map(v => (v >>> 0).toString(16).padStart(8, '0')).join(','));
  }
}
