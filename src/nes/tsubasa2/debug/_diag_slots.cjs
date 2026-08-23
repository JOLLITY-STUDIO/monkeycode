const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const nes = new tsnes.NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
const store = game.store;

const log = [];
const samples = [2, 5, 10, 20, 40, 80, 150];
let nextSample = 0;
for (let i = 0; i < 150; i++) {
  game.interrupts.nmi(i);
  if (i + 1 === samples[nextSample]) {
    const f = i + 1;
    const slots = [];
    for (let s = 0x01; s < 0x19; s += 4) {
      slots.push(`${s.toString(16)}:c=${store.read(0x0000 + s).toString(16)} cb=${store.read(0x0001 + s).toString(16)}`);
    }
    let bgNz = 0;
    for (let k = 0; k < 0x20; k++) if (store.read(0x062A + k) !== 0) bgNz++;
    let buf3f = 0;
    for (let k = 0; k < 0x80; k++) {
      // buffer 布局 [ctrl][lo][hi]: ctrl=0x05E8+x, lo=0x05E9+x, hi=0x05EA+x
      const lo = store.read(0x05E9 + k);
      const hi = store.read(0x05EA + k);
      if (hi === 0x3f && lo === 0x00) buf3f++;
    }
    log.push(`frame ${f}: slots[${slots.join(' ')}] 062A_nz=${bgNz} buf_3f00=${buf3f} 004C=${store.read('ram_004C').toString(16)} 0056=${store.read('ram_0056').toString(16)}`);
    nextSample++;
  }
}

// 终态调色板
log.push(`final 062A: ${Array.from({ length: 0x20 }, (_, k) => store.read(0x062A + k).toString(16).padStart(2, '0')).join(' ')}`);
log.push(`final paletteTable bg0: ${store.paletteTable.bgPalettes[0].colors.map(c => c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0')).join(' ')}`);

fs.writeFileSync(path.resolve(__dirname, '_diag_slots_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
