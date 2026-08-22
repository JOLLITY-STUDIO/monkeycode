// dump bank28 原始字节 (window $8000 偏移) 验证反汇编对位
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x10 + 28 * 0x2000;
const hex = (n) => n.toString(16).toUpperCase().padStart(2, '0');
const start = parseInt(process.argv[2] || '868B', 16);
const count = parseInt(process.argv[3] || '48', 10);
let line = '';
for (let i = 0; i < count; i++) {
  line += hex(rom[BASE + (start - 0x8000) + i]) + ' ';
  if ((i + 1) % 8 === 0) { console.log('$' + (start + i - 7).toString(16).toUpperCase().padStart(4, '0') + ': ' + line); line = ''; }
}
if (line) console.log('$' + (start + count - (count % 8 || 8)).toString(16).toUpperCase().padStart(4, '0') + ': ' + line);
