const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();

// 跑5帧看协程是否执行
for (let i = 0; i < 5; i++) {
  try { game.frame(nes); } catch(e) { console.log('Frame ' + i + ' error: ' + e.message); break; }
}

// 检查协程槽
console.log('=== 协程槽 ===');
for (let s = 1; s < 0x19; s += 4) {
  const c = game.store.read('ram_000' + s.toString(16).toUpperCase());
  const cb = game.store.read('ram_000' + (s+1).toString(16).toUpperCase());
  const r6 = game.store.read('ram_000' + (s+2).toString(16).toUpperCase());
  const r7 = game.store.read('ram_000' + (s+3).toString(16).toUpperCase());
  console.log('slot ' + s + ': count=' + c + ' cb=' + cb + ' r6=' + r6 + ' r7=' + r7);
}

// 检查 $0568 区
console.log('\n=== $0568-$0578 ===');
for (let i = 0x0568; i <= 0x0578; i++) {
  const v = game.store.read('ram_' + i.toString(16).toUpperCase().padStart(4,'0'));
  console.log('$' + i.toString(16).toUpperCase() + ' = ' + v);
}

// 检查 $0094/$0095
console.log('\n=== $0094/$0095 ===');
console.log('$0094 = ' + game.store.read('ram_0094'));
console.log('$0095 = ' + game.store.read('ram_0095'));

// 检查 $00E6-$00ED
console.log('\n=== $00E6-$00ED ===');
for (let i = 0xE6; i <= 0xED; i++) {
  console.log('$00' + i.toString(16).toUpperCase() + ' = ' + game.store.read('ram_00' + i.toString(16).toUpperCase()));
}

// 检查 $05E8 buffer
console.log('\n=== $05E8-$05F0 ===');
for (let i = 0x05E8; i <= 0x05F0; i++) {
  const v = game.store.read('ram_' + i.toString(16).toUpperCase().padStart(4,'0'));
  console.log('$' + i.toString(16).toUpperCase() + ' = ' + v);
}

// 检查 ram_00ED
console.log('\nram_00ED = ' + game.store.read('ram_00ED'));
console.log('ram_0020 = ' + game.store.read('ram_0020'));
console.log('ram_0021 = ' + game.store.read('ram_0021'));
console.log('ram_0628 = ' + game.store.read('ram_0628'));
