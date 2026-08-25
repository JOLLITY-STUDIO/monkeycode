const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
function prgOff(cpu) {
  if (cpu >= 0xA000 && cpu <= 0xBFFF) return cpu - 0xA000 + 0x4000;
  if (cpu >= 0x8000 && cpu <= 0x9FFF) return cpu - 0x8000 + 0x2000;
  return -1;
}
function hexdump(cpuStart, len, label) {
  const off = prgOff(cpuStart);
  if (off < 0) { console.log('bad addr ' + cpuStart.toString(16)); return; }
  const bytes = Array.from(prg.slice(off, off + len));
  console.log('===== ' + label + ' $' + cpuStart.toString(16).toUpperCase() + ' (' + len + 'B) =====');
  console.log(JSON.stringify(bytes));
  for (let i = 0; i < bytes.length; i += 16) {
    console.log('$' + (cpuStart + i).toString(16).toUpperCase().padStart(4, '0') + ': ' + bytes.slice(i, i + 16).map(x => x.toString(16).padStart(2, '0')).join(' '));
  }
}
hexdump(0x9B28, 0x48, '$9B28-$9B6F NT buffer write');
hexdump(0x88CA, 0x50, '$88CA-$8919 digit write');
hexdump(0xA82F, 0x28, '$A82F-$A856 sprite placement');
hexdump(0xAC6D, 0x11, '$AC6D-$AC7D nibble->tile');
hexdump(0x8976, 0x28, '$8976-$899D NT load');
hexdump(0x8895, 0x20, '$8895-$88B4 chr config');
hexdump(0x9FA8, 0x10, '$9FA8-$9FB7 wait');
