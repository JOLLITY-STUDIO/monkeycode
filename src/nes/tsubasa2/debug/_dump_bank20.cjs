// temp: dump raw bytes bank20 $89C0-$8A40
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const bankIdx = 20;
const bank = rom.slice(prgStart + bankIdx * bankSize, prgStart + (bankIdx + 1) * bankSize);
const base = 0x8000;
for (let o = 0x9C0; o <= 0xA40; o += 16) {
  const bytes = [];
  const addrs = [];
  for (let i = 0; i < 16 && o + i <= 0xA40; i++) {
    bytes.push(bank[o + i].toString(16).padStart(2, '0'));
    addrs.push('$' + (base + o + i).toString(16).padStart(4, '0'));
  }
  console.log(addrs[0] + ': ' + bytes.join(' '));
}
