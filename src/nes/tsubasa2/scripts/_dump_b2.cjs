const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const hdr = 16;
function fileB0(addr) { return hdr + (addr & 0x1fff); }
function fileB2(addr) { return 0x4010 + (addr & 0x1fff); }
function dump(f, addr, len) {
  const out = [];
  for (let i = 0; i < len; i += 16) {
    const bytes = [];
    for (let j = 0; j < 16 && i + j < len; j++) bytes.push(rom[f(addr + i + j)].toString(16).padStart(2, '0'));
    out.push('$' + (addr + i).toString(16).padStart(4, '0').toUpperCase() + ': ' + bytes.join(' '));
  }
  return out.join('\n');
}
console.log('=== bank00 $8976-$89D0 (NT attr load) ===');
console.log(dump(fileB0, 0x8976, 0x5a));
console.log('=== bank02 $A82F-$A88A (sprite load) ===');
console.log(dump(fileB2, 0xa82f, 0x5b));
