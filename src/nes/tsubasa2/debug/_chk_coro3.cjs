/**
 * _chk_coro3.cjs — 验证 generator 协程改造
 * 跑 30 帧, 检查 ram_0001 (协程计数器) 和 ram_004D/004E (脚本指针)
 */
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(require('fs').readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const game = new ts.default(nes);
game.boot();

console.log('=== boot 后 ===');
console.log('ram_0001=' + game.store.read('ram_0001') + ' ram_0005=' + game.store.read('ram_0005'));
console.log('ram_00ED=' + game.store.read('ram_00ED') + ' ram_004D=' + game.store.read('ram_004D') + ' ram_004E=' + game.store.read('ram_004E'));
console.log('ram_0700=' + game.store.read('ram_0700'));

for (let i = 0; i < 30; i++) {
  game.frame(nes);
  const f = i + 1;
  if (f % 3 === 0 || f === 1) {
    console.log(`--- frame ${f} ---`);
    console.log('ram_0001=' + game.store.read('ram_0001') + ' ram_0005=' + game.store.read('ram_0005') + ' ram_0009=' + game.store.read('ram_0009'));
    console.log('ram_001B=' + game.store.read('ram_001B') + ' ram_001E=' + game.store.read('ram_001E'));
    console.log('ram_00ED=' + game.store.read('ram_00ED') + ' ram_004D=' + game.store.read('ram_004D') + ' ram_004E=' + game.store.read('ram_004E'));
    console.log('ram_0700=' + game.store.read('ram_0700') + ' ram_004C=' + game.store.read('ram_004C') + ' ram_0094=' + game.store.read('ram_0094') + ' ram_0095=' + game.store.read('ram_0095'));
    console.log('nt0_nonzero=' + countNt(game.store.nt0) + ' ram_0568=' + game.store.read('ram_0568'));
  }
}

function countNt(nt) {
  let n = 0;
  for (let i = 0; i < nt.length; i++) if (nt[i] && nt[i].tile) n++;
  return n;
}
