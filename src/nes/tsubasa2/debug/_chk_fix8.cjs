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
// 逐帧跑, 每帧前检查 PPU buffer 长度
for (let i = 0; i < 90; i++) {
  const ppu = nes.ppu;
  const bufLen = ppu.buffer ? ppu.buffer.length : -1;
  try {
    // 只跑 nmi + writeStoreToPpu, 不跑 nes.frame()
    game.interrupts.nmi(game._frame);
    // 手动调 writeStoreToPpu
    const mod = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
    mod.writeStoreToPpu(game.store, nes.ppu);
    if ((i+1) % 10 === 0) out.push('frame ' + (i+1) + ' OK bufLen=' + bufLen + ' ptr=' + game.store.read('ram_004D'));
    game._frame++;
  } catch(e) {
    out.push('CRASH frame ' + (i+1) + ' bufLen=' + bufLen + ': ' + e.message);
    out.push(e.stack.split('\n').slice(0,5).join('\n'));
    break;
  }
}
out.push('done');
fs.writeFileSync(path.resolve(__dirname, '_fix8_out.txt'), out.join('\n') + '\n');
