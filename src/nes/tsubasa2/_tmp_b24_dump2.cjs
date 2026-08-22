// 临时: dump bank24 $8118-$8150 与 $81F0-$8240
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOff = 0x10;
function dump(start, len) {
  const out = [];
  for (let i = 0; i < len; i++) {
    const off = prgOff + 24 * 0x2000 + (start + i - 0x8000);
    out.push((rom[off] ?? 0).toString(16).padStart(2, '0'));
  }
  console.log(`bank24 $${start.toString(16)}: ${out.join(' ')}`);
}
dump(0x8118, 56);
dump(0x81F0, 80);
