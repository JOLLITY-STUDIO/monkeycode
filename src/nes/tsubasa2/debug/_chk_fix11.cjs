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
// 只调 interrupts.nmi, 不调 writeStoreToPpu 也不调 nes.frame()
for (let i = 0; i < 90; i++) {
  try {
    game.interrupts.nmi(i);
    if ((i+1) % 10 === 0) out.push('frame ' + (i+1) + ' nmi OK ptr=' + game.store.read('ram_004D'));
  } catch(e) {
    out.push('CRASH frame ' + (i+1) + ': ' + e.message);
    out.push(e.stack.split('\n').slice(0,5).join('\n'));
    break;
  }
}
out.push('done');
fs.writeFileSync(path.resolve(__dirname, '_fix11_out.txt'), out.join('\n') + '\n');
