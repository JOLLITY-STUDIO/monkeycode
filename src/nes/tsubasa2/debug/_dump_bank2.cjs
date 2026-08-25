// temp: dump bank2 bytes around dispatcher $A484 (offset 0x484) and vector table $A491
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const bankIdx = 2;
const bank = rom.slice(prgStart + bankIdx * bankSize, prgStart + (bankIdx + 1) * bankSize);
const base = 0xA000; // bank2 mapped at $A000-$BFFF
for (let o = 0x480; o <= 0x4C0; o += 16) {
  const bytes = [];
  const addrs = [];
  for (let i = 0; i < 16 && o + i <= 0x4C0; i++) {
    bytes.push(bank[o + i].toString(16).padStart(2, '0'));
    addrs.push('$' + (base + o + i).toString(16).padStart(4, '0'));
  }
  console.log(addrs[0] + ': ' + bytes.join(' '));
}
// vector table 24 entries starting at $A491 (offset 0x491), each entry = target-1 (LE)
console.log('\n=== vector table entries (target-1 -> actual) ===');
for (let i = 0; i < 24; i++) {
  const lo = bank[0x491 + i * 2];
  const hi = bank[0x492 + i * 2];
  const t = lo | (hi << 8);
  console.log(`[$A491+${i * 2}] = $${t.toString(16).padStart(4, '0')} -> target $${(t + 1).toString(16).padStart(4, '0')}`);
}
