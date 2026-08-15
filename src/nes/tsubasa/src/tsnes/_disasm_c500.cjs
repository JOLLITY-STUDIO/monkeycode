// 反汇编 bank30 $C500-$C570 固定区 API 入口
const fs = require('fs');
const txt = fs.readFileSync('rom-data/prg-bank-30.ts', 'utf8');
const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
const arr = m[1].split(',').map((s) => {
  const v = parseInt(s.trim(), 16);
  return isNaN(v) ? 0xea : v;
});
const OP = {
  0x4c: ['JMP', 2], 0x20: ['JSR', 2], 0x60: ['RTS', 0], 0xa9: ['LDA#', 1], 0xa5: ['LDAzp', 1],
  0xad: ['LDAabs', 2], 0xb1: ['LDA(zp),Y', 1], 0xb9: ['LDAabs,Y', 2], 0xbd: ['LDAabs,X', 2],
  0xb5: ['LDAzp,X', 1], 0xbc: ['LDYabs,X', 2], 0x85: ['STAzp', 1], 0x8d: ['STAabs', 2],
  0x99: ['STAabs,Y', 2], 0x9d: ['STAabs,X', 2], 0x95: ['STAzp,X', 1], 0xa2: ['LDX#', 1],
  0xa6: ['LDXzp', 1], 0xae: ['LDXabs', 2], 0x86: ['STXzp', 1], 0xa0: ['LDY#', 1], 0xa4: ['LDYzp', 1],
  0xac: ['LDYabs', 2], 0x84: ['STYzp', 1], 0x48: ['PHA', 0], 0x68: ['PLA', 0], 0x08: ['PHP', 0],
  0x28: ['PLP', 0], 0xaa: ['TAX', 0], 0xa8: ['TAY', 0], 0x8a: ['TXA', 0], 0x98: ['TYA', 0],
  0x18: ['CLC', 0], 0x38: ['SEC', 0], 0x69: ['ADC#', 1], 0x65: ['ADCzp', 1], 0x6d: ['ADCabs', 2],
  0x71: ['ADC(zp),Y', 1], 0x79: ['ADCabs,Y', 2], 0xe9: ['SBC#', 1], 0xe5: ['SBCzp', 1],
  0xed: ['SBCabs', 2], 0xf9: ['SBCabs,Y', 2], 0x29: ['AND#', 1], 0x25: ['ANDzp', 1],
  0x2d: ['ANDabs', 2], 0x39: ['ANDabs,Y', 2], 0x31: ['AND(zp),Y', 1], 0x09: ['ORA#', 1],
  0x0d: ['ORAabs', 2], 0x19: ['ORAabs,Y', 2], 0x11: ['ORA(zp),Y', 1], 0x49: ['EOR#', 1],
  0x4d: ['EORabs', 2], 0x59: ['EORabs,Y', 2], 0x0a: ['ASL', 0], 0x0e: ['ASLabs', 2],
  0x16: ['ASLzp,X', 1], 0x4a: ['LSR', 0], 0x4e: ['LSRabs', 2], 0x2a: ['ROL', 0], 0x26: ['ROLzp', 1],
  0x2e: ['ROLabs', 2], 0x36: ['ROLzp,X', 1], 0x6a: ['ROR', 0], 0x66: ['RORzp', 1], 0x6e: ['RORabs', 2],
  0x76: ['RORzp,X', 1], 0xc9: ['CMP#', 1], 0xc5: ['CMPzp', 1], 0xcd: ['CMPabs', 2], 0xd9: ['CMPabs,Y', 2],
  0xdd: ['CMPabs,X', 2], 0xd1: ['CMP(zp),Y', 1], 0xe0: ['CPX#', 1], 0xe4: ['CPXzp', 1],
  0xc0: ['CPY#', 1], 0xc4: ['CPYzp', 1], 0xe8: ['INX', 0], 0xca: ['DEX', 0], 0xc8: ['INY', 0],
  0x88: ['DEY', 0], 0xe6: ['INCzp', 1], 0xee: ['INCabs', 2], 0xf6: ['INCzp,X', 1], 0xc6: ['DECzp', 1],
  0xce: ['DECabs', 2], 0xd6: ['DECzp,X', 1], 0x90: ['BCC', 1], 0xb0: ['BCS', 1], 0xf0: ['BEQ', 1],
  0xd0: ['BNE', 1], 0x30: ['BMI', 1], 0x10: ['BPL', 1], 0x50: ['BVC', 1], 0x70: ['BVS', 1],
  0x6c: ['JMP(', 2], 0xea: ['NOP', 0], 0x00: ['BRK', 0],
};
const out = [];
for (let a = 0xc500; a <= 0xc570; ) {
  const op = arr[a - 0xc000];
  const d = OP[op] || ['??', 0];
  const [name, len] = d;
  let extra = '';
  if (len === 1) extra = ' #$' + arr[a - 0xc000 + 1].toString(16).toUpperCase().padStart(2, '0');
  if (len === 2) {
    const lo = arr[a - 0xc000 + 1], hi = arr[a - 0xc000 + 2];
    extra = ' $' + (hi << 8 | lo).toString(16).toUpperCase().padStart(4, '0');
  }
  out.push('$' + a.toString(16).toUpperCase() + ': ' + name + extra);
  a += 1 + len;
}
fs.writeFileSync('_c500_disasm.txt', out.join('\n'), 'utf8');
console.log('ok');
