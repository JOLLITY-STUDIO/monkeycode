const fs = require('fs');
const b = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const base = 16 + 31 * 0x2000;
const hex = (off, n) => {
  const parts = [];
  for (let i = 0; i < n; i++) parts.push(b[base + off + i].toString(16).padStart(2, '0').toUpperCase());
  return parts.join(' ');
};
console.log('bank31 file offset base = 0x' + base.toString(16));
console.log('E000:', hex(0x0000, 32));
console.log('E9DA:', hex(0x09DA, 32));
console.log('F159:', hex(0x1159, 16));
console.log('F182:', hex(0x1182, 16));
console.log('F206:', hex(0x1206, 16));
console.log('F311:', hex(0x1311, 16));
console.log('F329:', hex(0x1329, 32));
// search for the 0x95-entry dialog table: entries look like xx F5 (pointing into F5xx)
let tableStart = -1;
for (let i = 0x1300; i < 0x1400; i++) {
  if (b[base + i] === 0xeb && b[base + i + 1] === 0x05) { tableStart = i; break; }
}
console.log('dialog table candidate at $' + tableStart.toString(16) + (tableStart >= 0 ? ': ' + hex(tableStart, 48) : ''));
