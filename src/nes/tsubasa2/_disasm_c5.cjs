const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b30 = 0x10 + 30 * 0x2000;
function r(cpu) { return rom[b30 + (cpu - 0xC000)]; }
const OPS = {
  0x69: [2, 'imm', 'ADC'], 0x65: [2, 'zp', 'ADC'], 0x75: [2, 'zpx', 'ADC'], 0x6d: [3, 'abs', 'ADC'], 0x7d: [3, 'absx', 'ADC'], 0x79: [3, 'absy', 'ADC'], 0x61: [2, 'indx', 'ADC'], 0x71: [2, 'indy', 'ADC'],
  0x29: [2, 'imm', 'AND'], 0x25: [2, 'zp', 'AND'], 0x35: [2, 'zpx', 'AND'], 0x2d: [3, 'abs', 'AND'], 0x3d: [3, 'absx', 'AND'], 0x39: [3, 'absy', 'AND'], 0x21: [2, 'indx', 'AND'], 0x31: [2, 'indy', 'AND'],
  0x0a: [1, 'acc', 'ASL'], 0x06: [2, 'zp', 'ASL'], 0x16: [2, 'zpx', 'ASL'], 0x0e: [3, 'abs', 'ASL'], 0x1e: [3, 'absx', 'ASL'],
  0x90: [2, 'rel', 'BCC'], 0xb0: [2, 'rel', 'BCS'], 0xf0: [2, 'rel', 'BEQ'], 0x30: [2, 'rel', 'BMI'], 0xd0: [2, 'rel', 'BNE'], 0x10: [2, 'rel', 'BPL'], 0x50: [2, 'rel', 'BVC'], 0x70: [2, 'rel', 'BVS'],
  0x24: [2, 'zp', 'BIT'], 0x2c: [3, 'abs', 'BIT'],
  0x00: [1, 'imp', 'BRK'],
  0xc9: [2, 'imm', 'CMP'], 0xc5: [2, 'zp', 'CMP'], 0xd5: [2, 'zpx', 'CMP'], 0xcd: [3, 'abs', 'CMP'], 0xdd: [3, 'absx', 'CMP'], 0xd9: [3, 'absy', 'CMP'], 0xc1: [2, 'indx', 'CMP'], 0xd1: [2, 'indy', 'CMP'],
  0xe0: [2, 'imm', 'CPX'], 0xe4: [2, 'zp', 'CPX'], 0xec: [3, 'abs', 'CPX'],
  0xc0: [2, 'imm', 'CPY'], 0xc4: [2, 'zp', 'CPY'], 0xcc: [3, 'abs', 'CPY'],
  0x49: [2, 'imm', 'EOR'], 0x45: [2, 'zp', 'EOR'], 0x55: [2, 'zpx', 'EOR'], 0x4d: [3, 'abs', 'EOR'], 0x5d: [3, 'absx', 'EOR'], 0x59: [3, 'absy', 'EOR'], 0x41: [2, 'indx', 'EOR'], 0x51: [2, 'indy', 'EOR'],
  0x18: [1, 'imp', 'CLC'], 0x38: [1, 'imp', 'SEC'], 0x58: [1, 'imp', 'CLI'], 0x78: [1, 'imp', 'SEI'], 0xb8: [1, 'imp', 'CLV'], 0xd8: [1, 'imp', 'CLD'], 0xf8: [1, 'imp', 'SED'],
  0xc8: [1, 'imp', 'INY'], 0x88: [1, 'imp', 'DEY'], 0xe8: [1, 'imp', 'INX'], 0xca: [1, 'imp', 'DEX'],
  0x4c: [3, 'abs', 'JMP'], 0x6c: [3, 'ind', 'JMP'],
  0x20: [3, 'abs', 'JSR'],
  0xa9: [2, 'imm', 'LDA'], 0xa5: [2, 'zp', 'LDA'], 0xb5: [2, 'zpx', 'LDA'], 0xad: [3, 'abs', 'LDA'], 0xbd: [3, 'absx', 'LDA'], 0xb9: [3, 'absy', 'LDA'], 0xa1: [2, 'indx', 'LDA'], 0xb1: [2, 'indy', 'LDA'],
  0xa2: [2, 'imm', 'LDX'], 0xa6: [2, 'zp', 'LDX'], 0xb6: [2, 'zpx', 'LDX'], 0xae: [3, 'abs', 'LDX'], 0xbe: [3, 'absy', 'LDX'],
  0xa0: [2, 'imm', 'LDY'], 0xa4: [2, 'zp', 'LDY'], 0xb4: [2, 'zpx', 'LDY'], 0xac: [3, 'abs', 'LDY'], 0xbc: [3, 'absx', 'LDY'],
  0x4a: [1, 'acc', 'LSR'], 0x46: [2, 'zp', 'LSR'], 0x56: [2, 'zpx', 'LSR'], 0x4e: [3, 'abs', 'LSR'], 0x5e: [3, 'absx', 'LSR'],
  0xea: [1, 'imp', 'NOP'],
  0x09: [2, 'imm', 'ORA'], 0x05: [2, 'zp', 'ORA'], 0x15: [2, 'zpx', 'ORA'], 0x0d: [3, 'abs', 'ORA'], 0x1d: [3, 'absx', 'ORA'], 0x19: [3, 'absy', 'ORA'], 0x01: [2, 'indx', 'ORA'], 0x11: [2, 'indy', 'ORA'],
  0x48: [1, 'imp', 'PHA'], 0x68: [1, 'imp', 'PLA'], 0x08: [1, 'imp', 'PHP'], 0x28: [1, 'imp', 'PLP'],
  0x2a: [1, 'acc', 'ROL'], 0x26: [2, 'zp', 'ROL'], 0x36: [2, 'zpx', 'ROL'], 0x2e: [3, 'abs', 'ROL'], 0x3e: [3, 'absx', 'ROL'],
  0x6a: [1, 'acc', 'ROR'], 0x66: [2, 'zp', 'ROR'], 0x76: [2, 'zpx', 'ROR'], 0x6e: [3, 'abs', 'ROR'], 0x7e: [3, 'absx', 'ROR'],
  0x40: [1, 'imp', 'RTI'], 0x60: [1, 'imp', 'RTS'],
  0xe9: [2, 'imm', 'SBC'], 0xe5: [2, 'zp', 'SBC'], 0xf5: [2, 'zpx', 'SBC'], 0xed: [3, 'abs', 'SBC'], 0xfd: [3, 'absx', 'SBC'], 0xf9: [3, 'absy', 'SBC'], 0xe1: [2, 'indx', 'SBC'], 0xf1: [2, 'indy', 'SBC'],
  0x85: [2, 'zp', 'STA'], 0x95: [2, 'zpx', 'STA'], 0x8d: [3, 'abs', 'STA'], 0x9d: [3, 'absx', 'STA'], 0x99: [3, 'absy', 'STA'], 0x81: [2, 'indx', 'STA'], 0x91: [2, 'indy', 'STA'],
  0x86: [2, 'zp', 'STX'], 0x96: [2, 'zpx', 'STX'], 0x8e: [3, 'abs', 'STX'],
  0x84: [2, 'zp', 'STY'], 0x94: [2, 'zpx', 'STY'], 0x8c: [3, 'abs', 'STY'],
  0xaa: [1, 'imp', 'TAX'], 0x8a: [1, 'imp', 'TXA'], 0xa8: [1, 'imp', 'TAY'], 0x98: [1, 'imp', 'TYA'], 0xba: [1, 'imp', 'TSX'], 0x9a: [1, 'imp', 'TXS'],
};
function disasm(start, count) {
  let pc = start; const out = [];
  for (let i = 0; i < count && pc <= 0xDFFF; ) {
    const op = r(pc); const info = OPS[op];
    if (!info) { out.push(`$${pc.toString(16).toUpperCase()}: .byte $${op.toString(16).toUpperCase()}  ???`); pc++; i++; continue; }
    const [len, mode, name] = info; let operand = '';
    const b1 = r(pc + 1), b2 = r(pc + 2);
    if (mode === 'imm') operand = `#$${b1.toString(16).toUpperCase().padStart(2, '0')}`;
    else if (mode === 'zp') operand = `$${b1.toString(16).toUpperCase().padStart(2, '0')}`;
    else if (mode === 'zpx') operand = `$${b1.toString(16).toUpperCase().padStart(2, '0')},X`;
    else if (mode === 'abs') operand = `$${(b1 | (b2 << 8)).toString(16).toUpperCase().padStart(4, '0')}`;
    else if (mode === 'absx') operand = `$${(b1 | (b2 << 8)).toString(16).toUpperCase().padStart(4, '0')},X`;
    else if (mode === 'absy') operand = `$${(b1 | (b2 << 8)).toString(16).toUpperCase().padStart(4, '0')},Y`;
    else if (mode === 'indx') operand = `($${b1.toString(16).toUpperCase().padStart(2, '0')},X)`;
    else if (mode === 'indy') operand = `($${b1.toString(16).toUpperCase().padStart(2, '0')}),Y`;
    else if (mode === 'ind') operand = `($${(b1 | (b2 << 8)).toString(16).toUpperCase().padStart(4, '0')})`;
    else if (mode === 'rel') operand = `$${((pc + 2 + (b1 << 24 >> 24)) & 0xffff).toString(16).toUpperCase().padStart(4, '0')}`;
    out.push(`$${pc.toString(16).toUpperCase()}: ${name} ${operand}`);
    pc += len; i++;
  }
  return out.join('\n');
}
console.log('########## CAA5 (CB0F tail / scheduler) ##########');
console.log(disasm(0xCAA5, 70));
console.log('\n########## CD89 表 (CD7C 用的指针表) 前 24 项 u16 ##########');
for (let i = 0; i < 24; i++) {
  const o = 0xCD89 + i * 2;
  console.log(`$CD89+${i * 2}: $${(r(o) | (r(o + 1) << 8)).toString(16).toUpperCase().padStart(4, '0')}`);
}
