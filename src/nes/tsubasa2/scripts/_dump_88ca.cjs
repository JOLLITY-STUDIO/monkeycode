// 临时：dump bank00 $88C0-$8900（$88CA OAM 提交入口）
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function rd(cpuAddr) { return rom[0x10 + (cpuAddr & 0x1fff)]; } // bank0 文件偏移
function dump(start, end, label) {
  console.log('=== ' + label + ' ===');
  let line = '';
  for (let a = start; a <= end; a++) {
    line += rd(a).toString(16).padStart(2, '0') + ' ';
    if ((a - start + 1) % 16 === 0) { console.log((a - 15).toString(16).toUpperCase().padStart(4, '0') + ' ' + line); line = ''; }
  }
  if (line) console.log(line);
}
dump(0x88C0, 0x8900, 'bank00 88C0-8900');
