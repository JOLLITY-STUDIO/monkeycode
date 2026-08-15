// 快速 6502 反汇编: bank28 $802D-$818B (C527 数字渲染内部)
const fs = require('fs');
const txt = fs.readFileSync('rom-data/prg-bank-28.ts', 'utf8');
const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
if (!m) { console.error('NO MATCH'); process.exit(1); }
const arr = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('bank28 len', arr.length);
const OP = {
  0x4c: ['JMP', 2, 1], 0x20: ['JSR', 2, 1], 0x60: ['RTS', 0, 0],
  0xa9: ['LDA #', 1, 0], 0xa5: ['LDA zp', 1, 0], 0xad: ['LDA abs', 2, 0], 0xb1: ['LDA (zp),Y', 1, 0], 0xb9: ['LDA abs,Y', 2, 0], 0xbd: ['LDA abs,X', 2, 0], 0xb5: ['LDA zp,X', 1, 0],
  0x85: ['STA zp', 1, 0], 0x8d: ['STA abs', 2, 0], 0x99: ['STA abs,Y', 2, 0], 0x9d: ['STA abs,X', 2, 0], 0x95: ['STA zp,X', 1, 0],
  0xa2: ['LDX #', 1, 0], 0xa6: ['LDX zp', 1, 0], 0xae: ['LDX abs', 2, 0], 0x86: ['STX zp', 1, 0],
  0xa0: ['LDY #', 1, 0], 0xa4: ['LDY zp', 1, 0], 0xac: ['LDY abs', 2, 0], 0x84: ['STY zp', 1, 0], 0xbc: ['LDY abs,X', 2, 0],
  0x48: ['PHA', 0, 0], 0x68: ['PLA', 0, 0], 0x08: ['PHP', 0, 0], 0x28: ['PLP', 0, 0], 0xaa: ['TAX', 0, 0], 0xa8: ['TAY', 0, 0], 0x8a: ['TXA', 0, 0], 0x98: ['TYA', 0, 0], 0xba: ['TSX', 0, 0], 0x9a: ['TXS', 0, 0],
  0x18: ['CLC', 0, 0], 0x38: ['SEC', 0, 0], 0x58: ['CLI', 0, 0], 0x78: ['SEI', 0, 0], 0xb8: ['CLV', 0, 0],
  0x69: ['ADC #', 1, 0], 0x65: ['ADC zp', 1, 0], 0x6d: ['ADC abs', 2, 0], 0x71: ['ADC (zp),Y', 1, 0], 0x79: ['ADC abs,Y', 2, 0],
  0xe9: ['SBC #', 1, 0], 0xe5: ['SBC zp', 1, 0], 0xed: ['SBC abs', 2, 0], 0xf9: ['SBC abs,Y', 2, 0],
  0x29: ['AND #', 1, 0], 0x25: ['AND zp', 1, 0], 0x2d: ['AND abs', 2, 0], 0x39: ['AND abs,Y', 2, 0], 0x31: ['AND (zp),Y', 1, 0],
  0x09: ['ORA #', 1, 0], 0x0d: ['ORA abs', 2, 0], 0x19: ['ORA abs,Y', 2, 0], 0x11: ['ORA (zp),Y', 1, 0],
  0x49: ['EOR #', 1, 0], 0x4d: ['EOR abs', 2, 0], 0x59: ['EOR abs,Y', 2, 0],
  0x0a: ['ASL', 0, 0], 0x0e: ['ASL abs', 2, 0], 0x16: ['ASL zp,X', 1, 0],
  0x4a: ['LSR', 0, 0], 0x4e: ['LSR abs', 2, 0],
  0x2a: ['ROL', 0, 0], 0x26: ['ROL zp', 1, 0], 0x2e: ['ROL abs', 2, 0], 0x36: ['ROL zp,X', 1, 0],
  0x6a: ['ROR', 0, 0], 0x66: ['ROR zp', 1, 0], 0x6e: ['ROR abs', 2, 0], 0x76: ['ROR zp,X', 1, 0],
  0xc9: ['CMP #', 1, 0], 0xc5: ['CMP zp', 1, 0], 0xcd: ['CMP abs', 2, 0], 0xd9: ['CMP abs,Y', 2, 0], 0xdd: ['CMP abs,X', 2, 0], 0xd1: ['CMP (zp),Y', 1, 0],
  0xe0: ['CPX #', 1, 0], 0xe4: ['CPX zp', 1, 0], 0xe8: ['INX', 0, 0], 0xca: ['DEX', 0, 0],
  0xc0: ['CPY #', 1, 0], 0xc4: ['CPY zp', 1, 0], 0xc8: ['INY', 0, 0], 0x88: ['DEY', 0, 0],
  0xe6: ['INC zp', 1, 0], 0xee: ['INC abs', 2, 0], 0xf6: ['INC zp,X', 1, 0],
  0xc6: ['DEC zp', 1, 0], 0xce: ['DEC abs', 2, 0], 0xd6: ['DEC zp,X', 1, 0],
  0x90: ['BCC', 1, 1], 0xb0: ['BCS', 1, 1], 0xf0: ['BEQ', 1, 1], 0xd0: ['BNE', 1, 1], 0x30: ['BMI', 1, 1], 0x10: ['BPL', 1, 1], 0x50: ['BVC', 1, 1], 0x70: ['BVS', 1, 1],
  0x6c: ['JMP (', 2, 1], 0xea: ['NOP', 0, 0],
};
function disasm(start, end) {
  for (let a = start; a <= end;) {
    const op = arr[a - 0x8000];
    const d = OP[op];
    if (!d) { console.log(`$${a.toString(16)}: ?? ${op.toString(16)}`); a++; continue; }
    const [name, len, br] = d;
    let extra = '';
    if (len === 1) extra = `#$${arr[a - 0x8000 + 1].toString(16).toUpperCase().padStart(2, '0')}`;
    if (len === 2) {
      const lo = arr[a - 0x8000 + 1], hi = arr[a - 0x8000 + 2];
      const target = (hi << 8 | lo).toString(16).toUpperCase().padStart(4, '0');
      extra = br ? `$${target}` : `$${target}`;
    }
    console.log(`$${a.toString(16)}: ${name}${extra}`);
    a += 1 + len;
  }
}
console.log('\n===== $802D-$819D =====');
disasm(0x802d, 0x819d);
console.log('\n===== $818E table 16 =====');
console.log(arr.slice(0x818e - 0x8000, 0x818e - 0x8000 + 16).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('\n===== $8199 table 8 =====');
console.log(arr.slice(0x8199 - 0x8000, 0x8199 - 0x8000 + 8).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('\n===== $9E4E table 48 =====');
console.log(arr.slice(0x9e4e - 0x8000, 0x9e4e - 0x8000 + 48).map(b => b.toString(16).padStart(2, '0')).join(' '));
