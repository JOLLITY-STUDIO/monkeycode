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
// 跑 90 帧, 在 nes.frame() 前后加日志
for (let i = 0; i < 90; i++) {
  try {
    // 手动模拟 frame() 但分步
    game.interrupts && game.interrupts.nmi(i);
    // 不能访问 private, 用 frame() 但在内部崩
    game.frame(nes);
    if ((i+1) % 10 === 0) out.push('frame ' + (i+1) + ' OK ptr=' + game.store.read('ram_004D'));
  } catch(e) {
    out.push('CRASH frame ' + (i+1) + ': ' + e.message);
    out.push(e.stack.split('\n').slice(0,8).join('\n'));
    break;
  }
}
out.push('done');
fs.writeFileSync(path.resolve(__dirname, '_fix9_out.txt'), out.join('\n') + '\n');
