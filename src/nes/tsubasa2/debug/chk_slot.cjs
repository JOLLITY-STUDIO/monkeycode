const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
// 检查 $0568-$05FF 区
const vals = [];
for (let i = 0x0568; i <= 0x05FF; i++) {
  const v = game.store.read('ram_' + i.toString(16).toUpperCase().padStart(4,'0'));
  if (v !== 0) vals.push('$' + i.toString(16).toUpperCase() + '=' + v);
}
console.log('$0568-$05FF 非零: ' + vals.length);
if (vals.length > 0) console.log(vals.slice(0, 20).join(', '));
// 检查协程槽
for (let s = 1; s < 0x19; s += 4) {
  const c = game.store.read('ram_000' + s.toString(16).toUpperCase());
  const cb = game.store.read('ram_000' + (s+1).toString(16).toUpperCase());
  const r6 = game.store.read('ram_000' + (s+2).toString(16).toUpperCase());
  const r7 = game.store.read('ram_000' + (s+3).toString(16).toUpperCase());
  console.log('slot ' + s + ': count=' + c + ' cb=' + cb + ' r6=' + r6 + ' r7=' + r7);
}
