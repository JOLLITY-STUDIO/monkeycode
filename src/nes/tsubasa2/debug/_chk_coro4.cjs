/**
 * _chk_coro4.cjs — 检查 generator 是否重复从头执行
 */
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(require('fs').readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const game = new ts.default(nes);
game.boot();

// 访问 _coroutineGens (private 字段)
const sys = game.system;
console.log('system 类型:', typeof sys);
console.log('_coroutineGens 存在?', '_coroutineGens' in sys);
console.log('boot 后 _coroutineGens[1]:', sys._coroutineGens && sys._coroutineGens[1]);

for (let i = 0; i < 5; i++) {
  game.frame(nes);
  const gen1 = sys._coroutineGens ? sys._coroutineGens[1] : 'N/A';
  console.log(`frame ${i+1}: ram_0001=${game.store.read('ram_0001')} gen[1]=${gen1 ? 'exists' : 'null'} done=${gen1 && gen1.done ? gen1.done() : '?'}`);
}
