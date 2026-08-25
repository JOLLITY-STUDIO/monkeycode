// temp: find LDA $0091 consumer and disasm around it
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;

const ops = {
  0x20: ['JSR', 3], 0xA9: ['LDA #', 2], 0x85: ['STA z', 2], 0x86: ['STX z', 2],
  0x84: ['STY z', 2], 0xA0: ['LDY #', 2], 0xA2: ['LDX #', 2], 0xA5: ['LDA z', 2],
  0xA6: ['LDX z', 2], 0xB5: ['LDA z,X', 2], 0xE8: ['INX', 1], 0xC8: ['INY', 1],
  0x88: ['DEY', 1], 0xCA: ['DEX', 1], 0x60: ['RTS', 1], 0x4C: ['JMP', 3],
  0xD0: ['BNE', 2], 0xF0: ['BEQ', 2], 0x90: ['BCC', 2], 0xB0: ['BCS', 2],
  0x10: ['BPL', 2], 0x30: ['BMI', 2], 0x18: ['CLC', 1], 0x38: ['SEC', 1],
  0x29: ['AND #', 2], 0x09: ['ORA #', 2], 0x4A: ['LSR', 1], 0x6A: ['ROR', 1],
  0x0A: ['ASL', 1], 0x48: ['PHA', 1], 0x68: ['PLA', 1], 0xAA: ['TAX', 1],
  0xA8: ['TAY', 1], 0x8A: ['TXA', 1], 0x98: ['TYA', 1], 0xE6: ['INC z', 2],
  0xC6: ['DEC z', 2], 0xE0: ['CPX #', 2], 0xC0: ['CPY #', 2], 0xC9: ['CMP #', 2],
  0xEA: ['NOP', 1], 0x8D: ['STA abs', 3], 0xAD: ['LDA abs', 3], 0xE9: ['SBC #', 2],
  0x69: ['ADC #', 2], 0xBD: ['LDA abs,X', 3], 0x9D: ['STA abs,X', 3],
  0xB9: ['LDA abs,Y', 3], 0x99: ['STA abs,Y', 3], 0x2C: ['BIT abs', 3], 0x24: ['BIT z', 2],
  0xE5: ['SBC z', 2], 0x65: ['ADC z', 2], 0xC5: ['CMP z', 2], 0x45: ['EOR z', 2],
  0x25: ['AND z', 2], 0x05: ['ORA z', 2], 0x15: ['ORA z,X', 2], 0x35: ['AND z,X', 2],
  0x55: ['EOR z,X', 2], 0x75: ['ADC z,X', 2], 0x95: ['STA z,X', 2], 0xF6: ['INC z,X', 2],
  0xD6: ['DEC z,X', 2], 0xEC: ['CPX abs', 3], 0xCC: ['CPY abs', 3], 0xCD: ['CMP abs', 3],
  0xE1: ['SBC (z,X)', 2], 0x61: ['ADC (z,X)', 2], 0xC1: ['CMP (z,X)', 2], 0x41: ['EOR (z,X)', 2],
  0x21: ['AND (z,X)', 2], 0x01: ['ORA (z,X)', 2], 0x81: ['STA (z,X)', 2], 0xB1: ['LDA (z),Y', 2],
  0x91: ['STA (z),Y', 2], 0xD1: ['CMP (z),Y', 2], 0x51: ['EOR (z),Y', 2], 0x31: ['AND (z),Y', 2],
  0x11: ['ORA (z),Y', 2], 0x71: ['ADC (z),Y', 2], 0x9A: ['TXS', 1], 0xBA: ['TSX', 1],
  0x08: ['PHP', 1], 0x28: ['PLP', 1], 0x40: ['RTI', 1],
};

// find all LDA $0091 / STA $0091 in entire PRG
for (let i = 0; i + 2 < rom.length - 0x10; i++) {
  const op = rom[prgStart + i];
  const operand = rom[prgStart + i + 1];
  if ((op === 0xA5 || op === 0x85 || op === 0x45 || op === 0x05) && operand === 0x91) {
    const bankIdx = Math.floor(i / bankSize);
    const off = i % bankSize;
    const addr = (0x8000 + off).toString(16).padStart(4, '0');
    console.log(`PRG off 0x${(prgStart + i).toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr} op $${op.toString(16)}`);
  }
}
console.log('---done scan---');
