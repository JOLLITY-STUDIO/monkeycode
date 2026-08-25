// temp: dump bank02 PRG to confirm scene vector table & entries
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const bank2 = rom.slice(prgStart + 2 * bankSize, prgStart + 3 * bankSize);

function hex(b, n = 16) {
  const arr = [...b.slice(0, n)].map(x => x.toString(16).padStart(2, '0'));
  return arr.join(' ');
}

console.log('=== vector table at bank offset 0x491 (runtime $A491) ===');
console.log(hex(bank2.slice(0x491, 0x4C3), 50));

// decode vectors
const vecs = [];
for (let i = 0; i < 24; i++) {
  const lo = bank2[0x491 + i * 2];
  const hi = bank2[0x492 + i * 2];
  vecs.push((hi << 8) | lo);
}
console.log('scenes 0-23 vectors (runtime):');
console.log(vecs.map((v, i) => `${i}:$${v.toString(16).padStart(4, '0')}`).join(' '));
console.log('as bank offset:', vecs.map((v, i) => `${i}:$${(v - 0xA000).toString(16).padStart(3, '0')}`).join(' '));

// dump scene 0 start bytes
console.log('=== bytes at scene0 vector ($A4C0) ===');
console.log(hex(bank2.slice(0x4C0, 0x4E0), 32));

// simple 6502 disasm for a few regions
function disasm(off, count) {
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
    0xEA: ['NOP', 1], 0x8D: ['STA abs', 3], 0xAD: ['LDA abs', 3], 0x38: ['SEC', 1],
    0xE9: ['SBC #', 2], 0x69: ['ADC #', 2], 0xBD: ['LDA abs,X', 3], 0x9D: ['STA abs,X', 3],
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
  const out = [];
  let o = off;
  for (let i = 0; i < count && o < bank2.length; i++) {
    const op = bank2[o];
    const addr = (0xA000 + o).toString(16).padStart(4, '0');
    const info = ops[op] || ['??', 1];
    let line = `$${addr} ${info[0]}`;
    const rel = o => (0xA000 + o).toString(16).padStart(4, '0');
    if (info[1] === 2) {
      const b = bank2[o + 1];
      if (info[0] === 'BNE' || info[0] === 'BEQ' || info[0] === 'BCC' || info[0] === 'BCS' || info[0] === 'BPL' || info[0] === 'BMI') {
        const t = o + 2 + (b > 0x7F ? b - 0x100 : b);
        line += ` $${rel(t)}`;
      } else {
        line += ` $${b.toString(16).padStart(2, '0')}`;
      }
    } else if (info[1] === 3) {
      const abs = bank2[o + 1] | (bank2[o + 2] << 8);
      line += ` $${abs.toString(16).padStart(4, '0')}`;
    }
    out.push(line);
    o += info[1];
  }
  return out.join('\n');
}

console.log('\n=== disasm scene 0 ($A4C0) 30 insn ===');
console.log(disasm(0x4C0, 30));
console.log('\n=== disasm scene 1 ($A559) 25 insn ===');
console.log(disasm(0x559, 25));
