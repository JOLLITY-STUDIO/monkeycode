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
for (let i = 0; i < 120; i++) {
  game.interrupts.nmi(i);
  if (i === 1 || i === 5 || i === 10 || i === 30 || i === 60 || i === 120 - 1) {
    log.push(`frame ${i}: ram_0056=${store.read('ram_0056').toString(16)} ram_0052=${store.read('ram_0052')} ram_0053=${store.read('ram_0053')} ram_0048=${store.read('ram_0048')} ram_0049=${store.read('ram_0049')} ram_004A=${store.read('ram_004A')} ram_004B=${store.read('ram_004B')}`);
    // $062A BG palette RAM
    const bg = [];
    for (let k = 0; k < 0x20; k++) bg.push(store.read(0x062A + k).toString(16).padStart(2, '0'));
    log.push(`  062A: ${bg.join(' ')}`);
  }
}

// 脚本流内容
const bank = store.read('ram_0056');
log.push(`script bank=0x${bank.toString(16)}`);
const stream = store.get(`scriptStream_${bank}`);
if (stream) {
  log.push(`stream len=${stream.length} first64: ${stream.slice(0, 64).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
  // 统计 OpPalette 0xf3 出现位置
  const palIdx = [];
  for (let i = 0; i < stream.length; i++) if (stream[i] === 0xf3) palIdx.push(i);
  log.push(`0xf3(OpPalette) at: ${palIdx.slice(0, 20).join(',')} (total ${palIdx.length})`);
  const faIdx = [];
  for (let i = 0; i < stream.length; i++) if (stream[i] === 0xfa) faIdx.push(i);
  log.push(`0xfa(OpSceneLoad) at: ${faIdx.slice(0, 10).join(',')} (total ${faIdx.length})`);
} else {
  log.push('stream not loaded!');
}

// PPU palette
log.push(`paletteTable bg0: ${store.paletteTable.bgPalettes[0].colors.map(c => c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0')).join(' ')}`);

fs.writeFileSync(path.resolve(__dirname, '_diag_pal_out2.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
