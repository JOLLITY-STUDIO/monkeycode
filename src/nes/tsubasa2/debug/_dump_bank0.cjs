// temp: dump bank0 $8530-$8580 raw + $84F0 area
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const bankIdx = 0;
const bank = rom.slice(prgStart + bankIdx * bankSize, prgStart + (bankIdx + 1) * bankSize);
const base = 0x8000;
for (const [start, end] of [[0x530, 0x585], [0x4E8, 0x4F8]]) {
  for (let o = start; o <= end; o += 16) {
    const bytes = [];
    const addrs = [];
    for (let i = 0; i < 16 && o + i <= end; i++) {
      bytes.push(bank[o + i].toString(16).padStart(2, '0'));
      addrs.push('$' + (base + o + i).toString(16).padStart(4, '0'));
    }
    console.log(addrs[0] + ': ' + bytes.join(' '));
  }
}
