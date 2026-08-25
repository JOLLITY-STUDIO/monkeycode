// temp: locate ASL TAX LDA $A492,X PHA LDA $A491,X PHA RTS dispatcher in PRG
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const out = [];
for (let i = 0; i + 8 < rom.length - prgStart; i++) {
  const b = (o) => rom[prgStart + i + o];
  // ASL(0A) TAX(AA) LDA abs(AD) lo=0x92 hi=0xA4 ... or LDA $A491
  if (b(0) === 0x0A && b(1) === 0xAA &&
      ((b(2) === 0xAD && b(3) === 0x92 && b(4) === 0xA4) ||
       (b(2) === 0xAD && b(3) === 0x91 && b(4) === 0xA4))) {
    const bankIdx = Math.floor(i / bankSize);
    const off = i % bankSize;
    const addr = (0x8000 + off).toString(16).padStart(4, '0');
    out.push(`dispatcher at PRG idx 0x${i.toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr} (R7=$A000: $${(0xA000 + off).toString(16).padStart(4, '0')})`);
  }
  // also JSR $A484 = 20 84 A4
  if (b(0) === 0x20 && b(1) === 0x84 && b(2) === 0xA4) {
    const bankIdx = Math.floor(i / bankSize);
    const off = i % bankSize;
    const addr = (0x8000 + off).toString(16).padStart(4, '0');
    out.push(`JSR $A484 at PRG idx 0x${i.toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr}`);
  }
  // JMP $A484 = 4C 84 A4
  if (b(0) === 0x4C && b(1) === 0x84 && b(2) === 0xA4) {
    const bankIdx = Math.floor(i / bankSize);
    const off = i % bankSize;
    const addr = (0x8000 + off).toString(16).padStart(4, '0');
    out.push(`JMP $A484 at PRG idx 0x${i.toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr}`);
  }
}
fs.writeFileSync('debug/_find_disp.txt', out.join('\n') + '\n');
console.log('written', out.length, 'hits');
