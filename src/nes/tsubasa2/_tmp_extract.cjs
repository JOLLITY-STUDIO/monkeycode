const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const header = 16;
function bankBytes(i) {
  return rom.subarray(header + i * 0x2000, header + (i + 1) * 0x2000);
}
const b2 = bankBytes(2);
const out = [];
// bank2 offset $1800-$1A00 (runtime $B800-$BA00 window with R7=2)
out.push('=== bank2 @ $1800-$1840 (runtime $B800, first 64 bytes) ===');
for (let o = 0x1800; o < 0x1840; o += 16) {
  const row = [];
  for (let j = 0; j < 16; j++) row.push(b2[o + j].toString(16).padStart(2, '0'));
  out.push(o.toString(16).padStart(4, '0') + ': ' + row.join(' '));
}
// 16-bit LE pointer dump $1800-$1900 (128 pointers)
out.push('=== pointers $B800.. ===');
for (let o = 0x1800; o < 0x1900; o += 2) {
  const lo = b2[o], hi = b2[o + 1];
  const ptr = lo | (hi << 8);
  out.push(('$' + (0x1800 + (o - 0x1800)).toString(16).padStart(4, '0')).padEnd(8) + ' -> ' + ptr.toString(16).padStart(4, '0'));
}
// bank0 offset $001C-$0030 to verify $801E entry
const b0 = bankBytes(0);
out.push('=== bank0 @ $001C-$0030 (runtime $801C) ===');
let row = [];
for (let o = 0x1c; o < 0x30; o++) row.push(b0[o].toString(16).padStart(2, '0'));
out.push(row.join(' '));
// bank0 offset $98EC-$9800 region: check $B800-with-R7=0 alternative. bank0 offset $1800:
out.push('=== bank0 @ $1800-$1820 (runtime $9800) ===');
row = [];
for (let o = 0x1800; o < 0x1820; o++) row.push(b0[o].toString(16).padStart(2, '0'));
out.push(row.join(' '));
fs.writeFileSync('_tmp_extract_out.txt', out.join('\n') + '\n');
console.log('ok');
