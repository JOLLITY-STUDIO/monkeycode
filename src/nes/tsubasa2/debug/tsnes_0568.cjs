const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
nes.frame(); // skip RESET
// 跑10帧
for (let i = 0; i < 10; i++) nes.frame();
// dump $0568-$0588
console.log('=== tsnes $0568-$0588 (10帧后) ===');
for (let i = 0x0568; i <= 0x0588; i++) {
  console.log('$' + i.toString(16).toUpperCase() + ' = ' + nes.cpu.mem[i & 0x7ff]);
}
// dump $0094/$0095
console.log('\n$0094 = ' + nes.cpu.mem[0x0094]);
console.log('$0095 = ' + nes.cpu.mem[0x0095]);
// dump $00E6-$00ED
console.log('\n$00E6-$00ED:');
for (let i = 0xE6; i <= 0xED; i++) {
  console.log('$00' + i.toString(16).toUpperCase() + ' = ' + nes.cpu.mem[i]);
}
// dump $05E8-$05F8
console.log('\n$05E8-$05F8:');
for (let i = 0x05E8; i <= 0x05F8; i++) {
  const v = nes.cpu.mem[i & 0x7ff];
  if (v !== 0) console.log('$' + i.toString(16).toUpperCase() + ' = ' + v);
}
// ram_00ED
console.log('\n$00ED = ' + nes.cpu.mem[0x00ED]);
