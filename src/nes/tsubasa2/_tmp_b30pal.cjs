// Extract bank30 $FBCC palette rows (IDs 0x15, 0x16) + dump bank19 stream head
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bank30Base = 16 + 30 * 0x2000; // ROM offset of bank30 start
const local = (a) => bank30Base + (a - 0x8000);

// table $FBCC; rows at +A*8, 16 bytes each
const out = [];
for (const id of [0x15, 0x16]) {
  const off = local(0xfbcc + id * 8);
  const row = [...rom.subarray(off, off + 16)];
  out.push(`id=${id} off=0x${off.toString(16)} row=${row.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
}
// also dump rows 0x00..0x03 for context
for (const id of [0x00, 0x01, 0x02, 0x03]) {
  const off = local(0xfbcc + id * 8);
  const row = [...rom.subarray(off, off + 16)];
  out.push(`id=${id} row=${row.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
}
fs.writeFileSync('_tmp_b30pal.txt', out.join('\n'));
console.log(out.join('\n'));
