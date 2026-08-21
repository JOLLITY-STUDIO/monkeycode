/* 临时: 反汇编 $CB99 ($C509) + $C4B9 ($8083?) */
const fs = require('fs');
const rom = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const data = fs.readFileSync(rom);
const b30 = 0x10 + 30 * 0x2000;
const b = data.slice(b30, b30 + 0x2000);

const OP = {
  0x0a: ['ASL', 'acc'], 0x4e: ['LSR', 'abs'], 0x4c: ['JMP', 'abs'],
  0x6c: ['JMP', 'ind'], 0x18: ['CLC', 'imp'], 0x38: ['SEC', 'imp'], 0x60: ['RTS', 'imp'],
  0x20: ['JSR', 'abs'], 0xa8: ['TAY', 'imp'], 0x98: ['TYA', 'imp'],
  0xaa: ['TAX', 'imp'], 0x8a: ['TXA', 'imp'], 0xa9: ['LDA', 'imm'],
  0xad: ['LDA', 'abs'], 0xbd: ['LDA', 'absx'], 0xb1: ['LDA', 'indy'],
  0x85: ['STA', 'zp'], 0x8d: ['STA', 'abs'], 0x86: ['STX', 'zp'],
  0xe8: ['INX', 'imp'], 0xc8: ['INY', 'imp'], 0xca: ['DEX', 'imp'],
  0x88: ['DEY', 'imp'], 0x49: ['EOR', 'imm'], 0x29: ['AND', 'imm'],
  0x09: ['ORA', 'imm'], 0x69: ['ADC', 'imm'], 0x65: ['ADC', 'zp'],
  0xe9: ['SBC', 'imm'], 0xe5: ['SBC', 'zp'], 0xc9: ['CMP', 'imm'],
  0xcd: ['CMP', 'abs'], 0xd0: ['BNE', 'rel'], 0xf0: ['BEQ', 'rel'],
  0xb0: ['BCS', 'rel'], 0x90: ['BCC', 'rel'], 0x10: ['BPL', 'rel'],
  0x30: ['BMI', 'rel'], 0x08: ['PHP', 'imp'], 0x28: ['PLP', 'imp'],
  0x48: ['PHA', 'imp'], 0x68: ['PLA', 'imp'], 0x4a: ['LSR', 'acc'],
  0x2a: ['ROL', 'acc'], 0x6a: ['ROR', 'acc'], 0xa2: ['LDX', 'imm'],
  0xa6: ['LDX', 'zp'], 0xae: ['LDX', 'abs'], 0xa0: ['LDY', 'imm'],
  0xa4: ['LDY', 'zp'], 0xac: ['LDY', 'abs'], 0x84: ['STY', 'zp'],
  0x8c: ['STY', 'abs'], 0x16: ['ASL', 'zpx'], 0x1e: ['ASL', 'absx'],
  0x6e: ['ROR', 'abs'], 0xea: ['NOP', 'imp'], 0x0e: ['ASL', 'abs'],
  0x46: ['LSR', 'zp'], 0xc5: ['CMP', 'zp'],
  0xce: ['DEC', 'abs'], 0xc6: ['DEC', 'zp'], 0xe0: ['CPX', 'imm'],
};

function disasm(start, count, label) {
  console.log(`===== ${label} @ $${start.toString(16)} =====`);
  let a = start - 0xc000;
  let n = 0;
  while (n < count && a < 0x2000) {
    const op = b[a];
    const entry = OP[op];
    if (!entry) { console.log(`$${(0xc000 + a).toString(16)}: .byte $${op.toString(16).padStart(2, '0')}`); a++; n++; continue; }
    const [name, mode] = entry;
    let operand = '';
    let len = 1;
    if (mode === 'imm') { operand = `#$${b[a + 1].toString(16).padStart(2, '0')}`; len = 2; }
    else if (mode === 'abs' || mode === 'absx' || mode === 'ind') {
      const v = (b[a + 2] << 8) | b[a + 1];
      operand = mode === 'absx' ? `$${v.toString(16).padStart(4, '0')},X` : `$${v.toString(16).padStart(4, '0')}`;
      len = 3;
    }
    else if (mode === 'zp') { operand = `$${b[a + 1].toString(16).padStart(2, '0')}`; len = 2; }
    else if (mode === 'indy') { operand = `($${b[a + 1].toString(16).padStart(2, '0')}),Y`; len = 2; }
    else if (mode === 'rel') {
      const off = b[a + 1]; const t = 0xc000 + a + 2 + ((off & 0x80) ? off - 0x100 : off);
      operand = `$${t.toString(16).padStart(4, '0')}`; len = 2;
    }
    console.log(`$${(0xc000 + a).toString(16)}: ${name} ${operand}`);
    a += len; n++;
  }
}

disasm(0xcb99, 16, 'CB99 (C509 跳转表分派)');
