const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(require('fs').readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
for (let i = 0; i < 120; i++) {
  game.frame(nes);
  if ((i+1) % 30 === 0) {
    const nt = game.store.nt0;
    let nz = 0;
    const tiles = [];
    for (let j = 0; j < nt.length; j++) if (nt[j] && nt[j].tile) { nz++; if (tiles.length < 10) tiles.push(nt[j].tile.toString(16).padStart(2,'0')); }
    console.log('frame ' + (i+1) + ': ram_004D=' + game.store.read('ram_004D') + ' ram_0628=' + game.store.read('ram_0628') + ' ram_05E8=' + game.store.read('ram_05E8') + ' nt0=' + nz + ' tiles:' + tiles.join(' '));
  }
}
