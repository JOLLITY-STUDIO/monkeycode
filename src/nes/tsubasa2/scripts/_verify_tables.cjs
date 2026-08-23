// 验证各音频 bank 在 $870D/$8725/$8754 偏移处是否有内嵌表
const fs = require('fs');
const path = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(path);
// PRG 从 16 字节头后开始，每 bank 8KB
const banks = {};
const total = (rom.length - 16) / 8192;
for (let b = 0; b < total; b++) {
  banks[b] = rom.slice(16 + b * 8192, 16 + (b + 1) * 8192);
}
const hex = (arr, off, len) => Array.from(arr.slice(off, off + len)).map(x => x.toString(16).padStart(2, '0')).join(' ');
for (const b of [7, 12, 13, 14, 15]) {
  const d = banks[b];
  console.log(`bank ${b}:`);
  console.log(`  $870D freq[0..5]: ${hex(d, 0x70d, 12)}`);
  console.log(`  $8725 dur[0..7]:  ${hex(d, 0x725, 8)}`);
  console.log(`  $8754 sub[0..3]:  ${hex(d, 0x754, 8)}`);
}
// BGM[0] $8892 → bank7 offset 0x892
console.log(`\nBGM[0] @ bank7 0x892: ${hex(banks[7], 0x892, 16)}`);
// SE[0] $8E42 → bank13 offset 0xe42
console.log(`SE[0] @ bank13 0xe42: ${hex(banks[13], 0xe42, 16)}`);
