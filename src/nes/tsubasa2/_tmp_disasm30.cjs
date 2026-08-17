const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(0x10);
const b30 = rom.slice(30 * 0x2000, 31 * 0x2000);
const b31 = rom.slice(31 * 0x2000, 32 * 0x2000);

const OP = {
  0xa9: 'LDA #$%02X', 0xad: 'LDA $%04X', 0xbd: 'LDA $%04X,X', 0xb9: 'LDA $%04X,Y', 0xa5: 'LDA zp $%02X', 0xb5: 'LDA zp $%02X,X', 0xa2: 'LDX #$%02X', 0xae: 'LDX $%04X', 0xa6: 'LDX zp $%02X', 0xa0: 'LDY #$%02X', 0xac: 'LDY $%04X', 0xa4: 'LDY zp $%02X',
  0x8d: 'STA $%04X', 0x9d: 'STA $%04X,X', 0x99: 'STA $%04X,Y', 0x85: 'STA zp $%02X', 0x86: 'STX zp $%02X', 0x84: 'STY zp $%02X',
  0xe8: 'INX', 0xc8: 'INY', 0xca: 'DEX', 0x88: 'DEY',
  0x69: 'ADC #$%02X', 0x65: 'ADC zp $%02X', 0x6d: 'ADC $%04X', 0x7d: 'ADC $%04X,X', 0xe9: 'SBC #$%02X', 0xe5: 'SBC zp $%02X', 0xed: 'SBC $%04X',
  0x18: 'CLC', 0x38: 'SEC', 0x4a: 'LSR A', 0x6a: 'ROR A', 0x0a: 'ASL A', 0x2a: 'ROL A',
  0x26: 'ROL zp $%02X', 0x2e: 'ROL $%04X', 0x66: 'ROR zp $%02X', 0x6e: 'ROR $%04X',
  0x29: 'AND #$%02X', 0x25: 'AND zp $%02X', 0x2d: 'AND $%04X', 0x3d: 'AND $%04X,X',
  0x09: 'ORA #$%02X', 0x05: 'ORA zp $%02X', 0x0d: 'ORA $%04X', 0x1d: 'ORA $%04X,X',
  0x49: 'EOR #$%02X', 0x45: 'EOR zp $%02X',
  0xc9: 'CMP #$%02X', 0xc5: 'CMP zp $%02X', 0xcd: 'CMP $%04X', 0xdd: 'CMP $%04X,X',
  0xe0: 'CPX #$%02X', 0xe4: 'CPX zp $%02X', 0xc0: 'CPY #$%02X',
  0xd0: 'BNE %s', 0xf0: 'BEQ %s', 0x90: 'BCC %s', 0xb0: 'BCS %s', 0x10: 'BPL %s', 0x30: 'BMI %s', 0x50: 'BVC %s', 0x70: 'BVS %s',
  0x4c: 'JMP $%04X', 0x6c: 'JMP ($%04X)', 0x20: 'JSR $%04X', 0x60: 'RTS', 0x40: 'RTI',
  0x48: 'PHA', 0x68: 'PLA', 0xaa: 'TAX', 0x8a: 'TXA', 0xa8: 'TAY', 0x98: 'TYA', 0xea: 'NOP',
  0x24: 'BIT zp $%02X', 0x2c: 'BIT $%04X', 0x3c: 'BIT $%04X,X',
  0x91: 'STA ($%02X),Y', 0xb1: 'LDA ($%02X),Y', 0x81: 'STA ($%02X,X)', 0xa1: 'LDA ($%02X,X)',
  0x00: 'BRK', 0xce: 'DEC $%04X', 0xee: 'INC $%04X', 0xc6: 'DEC zp $%02X', 0xe6: 'INC zp $%02X', 0xfe: 'INC $%04X,X',
  0xb4: 'LDY zp $%02X,X', 0x96: 'STX zp $%02X,Y', 0x5d: 'EOR $%04X,X', 0x79: 'ADC $%04X,Y',
  0xde: 'DEC $%04X,X', 0x36: 'ROL zp $%02X,X', 0x1e: 'ASL $%04X,X', 0x16: 'ASL zp $%02X,X',
};

function disasm(data, base, start, end) {
  const out = [];
  for (let i = start - base; i < end - base; i++) {
    const op = data[i];
    if (op === undefined) break;
    const t = OP[op];
    if (!t) { out.push(`${(base + i).toString(16).toUpperCase()}: .byte ${op.toString(16).padStart(2,'0')}`); continue; }
    let s = t;
    let adv = 1;
    if (t.includes('%04X')) {
      const lo = data[i + 1], hi = data[i + 2];
      s = s.replace('%04X', ((hi << 8) | lo).toString(16).toUpperCase().padStart(4, '0'));
      adv = 3;
    } else if (t.includes('%02X')) {
      s = s.replace('%02X', data[i + 1].toString(16).toUpperCase().padStart(2, '0'));
      adv = 2;
    }
    if (s.includes('%s')) {
      const rel = data[i + 1];
      const target = base + i + 2 + (rel >= 0x80 ? rel - 0x100 : rel);
      s = s.replace('%s', `$${target.toString(16).toUpperCase()}`);
      adv = 2;
    }
    out.push(`${(base + i).toString(16).toUpperCase()}: ${s}`);
    i += adv - 1;
  }
  return out.join('\n');
}

console.log('=== $CC02 (C530) ===');
console.log(disasm(b30, 0xc000, 0xcc02, 0xcc48));
console.log('\n=== raw CC02-CC47 ===');
console.log(Array.from(b30.slice(0xcc02, 0xcc48)).map(x => x.toString(16).padStart(2, '0')).join(' '));
console.log('\n=== $CC46 (C52D) ===');
console.log(disasm(b30, 0xc000, 0xcc46, 0xccd2));
