const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
function dumpOam(file, f) {
  const oam = [];
  for (let i = 0; i < 64; i++) {
    oam.push({
      idx: i,
      y: nes.ppu.spriteMem[i * 4 + 0],
      tile: nes.ppu.spriteMem[i * 4 + 1],
      attr: nes.ppu.spriteMem[i * 4 + 2],
      x: nes.ppu.spriteMem[i * 4 + 3],
    });
  }
  fs.writeFileSync(file, JSON.stringify(oam));
}
for (let f = 1; f <= 711; f++) {
  nes.frame();
  if (f === 709 || f === 711) {
    dumpOam(`_emu_oam_f${f}.json`, f);
    console.log('dumped emu f' + f);
  }
}
