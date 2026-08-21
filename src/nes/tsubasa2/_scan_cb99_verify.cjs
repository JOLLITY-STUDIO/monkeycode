// 修正物理偏移验证 bank22: physical(addr) = 0x10 + 22*0x2000 + (addr - 0x8000)
const fs = require('fs');
const path = require('path');

const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(romPath);
// bank22 CPU $8000 窗口
const ph = (addr) => 0x10 + 22 * 0x2000 + (addr - 0x8000);

console.log('=== bank22 raw bytes $80B0-$80C9 (physical 0x' + ph(0x80b0).toString(16) + ') ===');
for (let off = 0x80b0; off <= 0x80c9; off += 16) {
  const bytes = [];
  for (let i = off; i < Math.min(off + 16, 0x80ca); i++) {
    bytes.push(rom[ph(i)].toString(16).padStart(2, '0'));
  }
  console.log('$' + off.toString(16) + ': ' + bytes.join(' '));
}

console.log('\n=== bank22 TEMPLATE_PTR $8280 first 8 entries ===');
for (let i = 0; i < 8; i++) {
  const p = 0x8280 + i * 2;
  const lo = rom[ph(p)];
  const hi = rom[ph(p + 1)];
  console.log('  [' + i + '] = $' + (hi << 8 | lo).toString(16));
}

console.log('\n=== bank22 DISP_81D2 first 12 (Y disp) ===');
for (let i = 0; i < 12; i++) {
  console.log('  [' + i + '] = $' + rom[ph(0x81d2 + i)].toString(16));
}

console.log('\n=== bank22 DISP_81FA first 16 (X disp) ===');
for (let i = 0; i < 16; i++) {
  console.log('  [' + i + '] = $' + rom[ph(0x81fa + i)].toString(16));
}

// 读 bank30 $CB99 真实字节 (CPU $C000 固定, physical = 0x10 + 30*0x2000 + (addr-0xC000))
const ph30 = (addr) => 0x10 + 30 * 0x2000 + (addr - 0xc000);
console.log('\n=== bank30 $CB99 raw ($CB99-$CBBF) ===');
for (let off = 0xcb99; off <= 0xcbbf; off += 16) {
  const bytes = [];
  for (let i = off; i < Math.min(off + 16, 0xcbc0); i++) {
    bytes.push(rom[ph30(i)].toString(16).padStart(2, '0'));
  }
  console.log('$' + off.toString(16) + ': ' + bytes.join(' '));
}
