// dump bank2 $A000-$A484 (hub + pointer tables) 与 $8AEC region (bank0 脚本选择表)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
function cpu2prg(cpu) { return cpu - 0xA000 + 0x4000; }
function hex(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }
// bank0 $8AEC (CPU $8000-$9FFF → prg idx cpu-0x8000)
const b0 = (cpu) => cpu - 0x8000;
function dump(cpuStart, len, label, prgFn) {
  console.log('===== ' + label + ' $' + cpuStart.toString(16).toUpperCase() + ' (' + len + ' bytes) =====');
  for (let p = cpuStart; p < cpuStart + len; p += 16) {
    const row = [];
    for (let i = 0; i < 16; i++) row.push(hex(prg[prgFn(p + i)]));
    console.log('$' + p.toString(16).toUpperCase() + ': ' + row.join(' '));
  }
}
// 脚本选择表 $8AEC-$8AF0 (bank0)
dump(0x8AEC, 32, 'bank0 scene-script select table', b0);
// bank2 $A0xx 指针表
dump(0xA000, 0x100, 'bank2 $A000-$A0FF', cpu2prg);
dump(0xA100, 0x100, 'bank2 $A100-$A1FF', cpu2prg);
