// 反汇编 bank28 $8000-$802C (C527 数字渲染入口)
const fs = require('fs');
const txt = fs.readFileSync('rom-data/prg-bank-28.ts', 'utf8');
const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
const arr = m[1].split(',').map(s => parseInt(s.trim(), 16));
const OP = {
  0x4c: ['JMP', 2, 1], 0x20: ['JSR', 2, 1], 0x60: ['RTS', 0, 0],
  0xa9: ['LDA#', 1, 0], 0xa5: ['LDAzp', 1, 0], 0xad: ['LDAabs', 2, 0], 0xb1: ['LDA(zp),Y', 1, 0], 0xb9: ['LDAabs,Y', 2, 0], 0xbd: ['LDAabs,X', 2, 0],
  0x85: ['STAzp', 1, 0], 0x8d: ['STAabs', 2, 0], 0x99: ['STAabs,Y', 2, 0], 0x9d: ['STAabs,X', 2, 0],
  0xa2: ['LDX#', 1, 0], 0xa6: ['LDXzp', 1, 0], 0xae: ['LDXabs', 2, 0], 0x86: ['STXzp', 1, 0],
  0xa0: ['LDY#', 1, 0], 0xa4: ['LDYzp', 1, 0], 0xac: ['LDYabs', 2, 0], 0x84: ['STYzp', 1, 0], 0xbc: ['LDYabs,X', 2, 0],
  0x48: ['PHA', 0, 0], 0x68: ['PLA', 0, 0], 0x08: ['PHP', 0, 0], 0x28: ['PLP', 0, 0], 0xaa: ['TAX', 0, 0], 0xa8: ['TAY', 0, 0], 0x8a: ['TXA', 0, 0], 0x98: ['TYA', 0, 0],
  0x18: ['CLC', 0, 0], 0x38: ['SEC', 0, 0],
  0x69: ['ADC#', 1, 0], 0x65: ['ADCzp', 1, 0], 0x6d: ['ADCabs', 2, 0], 0x71: ['ADC(zp),Y', 1, 0],
  0xe9: ['SBC#', 1, 0], 0xe5: ['SBCzp', 1, 0], 0xed: ['SBCabs', 2, 0],
  0x29: ['AND#', 1, 0], 0x2d: ['ANDabs', 2, 0], 0x09: ['ORA#', 1, 0], 0x49: ['EOR#', 1, 0],
  0x0a: ['ASL', 0, 0], 0x4a: ['LSR', 0, 0], 0x2a: ['ROL', 0, 0], 0x6a: ['ROR', 0, 0],
  0xc9: ['CMP#', 1, 0], 0xc5: ['CMPzp', 1, 0], 0xcd: ['CMPabs', 2, 0],
  0xe0: ['CPX#', 1, 0], 0xe8: ['INX', 0, 0], 0xca: ['DEX', 0, 0],
  0xc0: ['CPY#', 1, 0], 0xc8: ['INY', 0, 0], 0x88: ['DEY', 0, 0],
  0xe6: ['INCzp', 1, 0], 0xc6: ['DECzp', 1, 0],
  0x90: ['BCC', 1, 1], 0xb0: ['BCS', 1, 1], 0xf0: ['BEQ', 1, 1], 0xd0: ['BNE', 1, 1], 0x30: ['BMI', 1, 1], 0x10: ['BPL', 1, 1],
  0x6c: ['JMP(', 2, 1], 0xea: ['NOP', 0, 0],
};
function dis(start, end) {
  for (let a = start; a <= end;) {
    const op = arr[a - 0x8000];
    const d = OP[op];
    if (!d) { console.log(`$${a.toString(16)}: ?? ${op.toString(16)}`); a++; continue; }
    const [name, len, br] = d;
    let e = '';
    if (len === 1) e = `#$${arr[a - 0x8000 + 1].toString(16).toUpperCase().padStart(2, '0')}`;
    if (len === 2) {
      const t = (arr[a - 0x8000 + 2] << 8 | arr[a - 0x8000 + 1]).toString(16).toUpperCase().padStart(4, '0');
      e = `$${t}`;
    }
    console.log(`$${a.toString(16)}: ${name}${e}`);
    a += 1 + len;
  }
}
console.log('===== $8000-$802C =====');
dis(0x8000, 0x802c);
