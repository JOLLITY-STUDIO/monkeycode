const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const b12 = prg.slice(12 * 0x2000, 13 * 0x2000);
const b13 = prg.slice(13 * 0x2000, 14 * 0x2000);
const hex = (arr, off, len) => Array.from(arr.slice(off, off + len)).map(x => x.toString(16).padStart(2, '0')).join(' ');
console.log('bank12 @ 0xE42 (=$8E42):', hex(b12, 0xe42, 24));
console.log('bank13 @ 0xE42 (=$8E42):', hex(b13, 0xe42, 24));
console.log('bank12 @ 0x892 (=$8892):', hex(b12, 0x892, 24));
console.log('bank7  @ 0x892 (=$8892):', hex(prg.slice(7 * 0x2000, 8 * 0x2000), 0x892, 24));
console.log('\nbank12 $8BDA 表前 12 项:', hex(b12, 0xbda, 24));
console.log('bank12 $8798 表前 6 项:', hex(b12, 0x798, 12));
// BGM 指针 $8798[0] = ?
console.log('\nBGM[0] ptr =', (b12[0x798] | (b12[0x799] << 8)).toString(16));
console.log('SE[0] ptr =', (b12[0xbda] | (b12[0xbdb] << 8)).toString(16));
console.log('SE[3] ptr (req $32? id3) =', (b12[0xbda + 4] | (b12[0xbdb + 4] << 8)).toString(16));
// 检查 bank12 0x892 内容（若 R6 不切，BGM 数据应从 bank12 读）
console.log('\nbank12 $892 是否像 BGM 乐谱(mask 2c)?', b12[0x892].toString(16));
