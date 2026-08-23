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
let prev = -1;
let ntMax = 0;
for (let i = 0; i < 6000; i++) {
  try {
    game.frame(nes);
    const ed = game.store.read('ram_00ED');
    const vm = nes.ppu.vramMem;
    const ntCount = () => {
      let nz = 0;
      if (vm) for (let j = 0x2000; j < 0x2400; j++) if (vm[j] !== 0) nz++;
      return nz;
    };
    if (ed !== prev) {
      out.push(`frame ${i + 1}: ram_00ED=${ed} (0x${ed.toString(16).toUpperCase()}) nt0=${ntCount()}`);
      prev = ed;
    }
    const c = ntCount();
    if (c > ntMax) ntMax = c;
  } catch (e) {
    out.push(`CRASH frame ${i + 1}: ${e.message}`);
    out.push(e.stack.split('\n').slice(0, 6).join('\n'));
    break;
  }
}
out.push(`nt0Max=${ntMax}`);
out.push('done');
fs.writeFileSync(path.resolve(__dirname, '_opening_progress_out.txt'), out.join('\n') + '\n');
console.log(out.join('\n'));
