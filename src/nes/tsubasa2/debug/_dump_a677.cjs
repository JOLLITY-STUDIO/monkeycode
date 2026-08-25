const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const b2 = (cpu) => cpu - 0xA000 + 0x4000;
function hexdump(cpuStart, len, label) {
  const off = b2(cpuStart);
  const bytes = Array.from(prg.slice(off, off + len));
  console.log('===== ' + label + ' $' + cpuStart.toString(16).toUpperCase() + ' (' + len + 'B) =====');
  console.log(JSON.stringify(bytes));
  for (let i = 0; i < bytes.length; i += 16) {
    console.log('$' + (cpuStart + i).toString(16).toUpperCase().padStart(4,'0') + ': ' + bytes.slice(i, i+16).map(x=>x.toString(16).padStart(2,'0')).join(' '));
  }
}
hexdump(0xA677, 0x84, 'bank2 $A677-$A6FA (S15 tail + S16)');
hexdump(0xA773, 0x30, 'bank2 $A773-$A7A2 (S16/S17 transition)');
