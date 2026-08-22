const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(require('fs').readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
const out = [];
for (let i = 0; i < 300; i++) {
  try {
    game.frame(nes);
    if ((i+1) % 30 === 0) {
      const nt = game.store.nt0;
      let nz = 0;
      for (let j = 0; j < nt.length; j++) if (nt[j] && nt[j].tile !== 0) nz++;
      const ppu = nes.ppu;
      const buf = ppu.buffer;
      let bnz = 0;
      for (let j = 0; j < buf.length; j++) if (buf[j] !== 0) bnz++;
      out.push('frame ' + (i+1) + ': nt0=' + nz + ' ptr=' + game.store.read('ram_004D') + ' ppuBuf=' + bnz + ' ram_0628=' + game.store.read('ram_0628'));
    }
  } catch(e) {
    out.push('CRASH frame ' + (i+1) + ' ptr=' + game.store.read('ram_004D') + ': ' + e.message);
    out.push(e.stack.split('\n').slice(0,5).join('\n'));
    break;
  }
}
out.push('done');
fs.writeFileSync(path.resolve(__dirname, '_fix7_out.txt'), out.join('\n') + '\n');
