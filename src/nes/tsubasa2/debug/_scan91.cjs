// temp: find LDA/STA $0091 consumers, write to file
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const out = [];
for (let i = 0; i + 2 < rom.length - prgStart; i++) {
  const op = rom[prgStart + i];
  const operand = rom[prgStart + i + 1];
  if ((op === 0xA5 || op === 0x85 || op === 0x45 || op === 0x05 || op === 0x25) && operand === 0x91) {
    const bankIdx = Math.floor(i / bankSize);
    const off = i % bankSize;
    const addr = (0x8000 + off).toString(16).padStart(4, '0');
    out.push(`PRG idx 0x${i.toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr} op $${op.toString(16).padStart(2, '0')}`);
  }
}
fs.writeFileSync('debug/_scan91.txt', out.join('\n') + '\n');
console.log('written', out.length, 'hits');
