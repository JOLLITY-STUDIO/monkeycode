// 临时：dump $A8C0-$A900（$88CA OAM 提交）与 $AADF 表区
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x4010;
function rd(cpuAddr) { return rom[BASE + (cpuAddr & 0x1fff)]; }
function dump(start, end, label) {
  console.log('=== ' + label + ' ===');
  let line = '';
  for (let a = start; a <= end; a++) {
    line += rd(a).toString(16).padStart(2, '0') + ' ';
    if ((a - start + 1) % 16 === 0) { console.log((a - 15).toString(16).toUpperCase().padStart(4, '0') + ' ' + line); line = ''; }
  }
  if (line) console.log((end - ((end - start + 1) % 16) + 1).toString(16).toUpperCase().padStart(4, '0') + ' ' + line);
}
dump(0xA8C0, 0xA8FF, 'A8C0-A8FF');
dump(0xAADF, 0xAB30, 'AADF-AB30 tables');
