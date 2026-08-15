// 反汇编 bank30 $CB90-$CBF0 ($C509 dispatch 核心) + bank28 $802D-$819D ($C527)
const fs = require('fs');
function load(path) {
  const txt = fs.readFileSync(path, 'utf8');
  const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
  if (!m) throw new Error('cannot parse ' + path);
  const arr = m[1].split(',').map((s) => {
    const v = parseInt(s.trim(), 16);
    return isNaN(v) ? 0xea : v;
  });
  return arr;
}
const OP = {
  0x4c: ['JMP', 2, 1], 0x20: ['JSR', 2, 1], 0x60: ['RTS', 0, 0],
  0xa9: ['LDA#', 1, 0], 0xa5: ['LDAzp', 1, 0], 0xad: ['LDAabs', 2, 0],
  0xb1: ['LDA(zp),Y', 1, 0], 0xb9: ['LDAabs,Y', 2, 0], 0xbd: ['LDAabs,X', 2, 0],
  0xb5: ['LDAzp,X', 1, 0], 0xbc: ['LDYabs,X', 2, 0],
  0x85: ['STAzp', 1, 0], 0x8d: ['STAabs', 2, 0], 0x99: ['STAabs,Y', 2, 0],
  0x9d: ['STAabs,X', 2, 0], 0x95: ['STAzp,X', 1, 0],
  0xa2: ['LDX#', 1, 0], 0xa6: ['LDXzp', 1, 0], 0xae: ['LDXabs', 2, 0],
  0x86: ['STXzp', 1, 0], 0xa0: ['LDY#', 1, 0], 0xa4: ['LDYzp', 1, 0],
  0xac: ['LDYabs', 2, 0], 0x84: ['STYzp', 1, 0],
  0x48: ['PHA', 0, 0], 0x68: ['PLA', 0, 0], 0x08: ['PHP', 0, 0], 0x28: ['PLP', 0, 0],
  0xaa: ['TAX', 0, 0], 0xa8: ['TAY', 0, 0], 0x8a: ['TXA', 0, 0], 0x98: ['TYA', 0, 0],
  0x18: ['CLC', 0, 0], 0x38: ['SEC', 0, 0], 0x58: ['CLI', 0, 0], 0x78: ['SEI', 0, 0],
  0x69: ['ADC#', 1, 0], 0x65: ['ADCzp', 1, 0], 0x6d: ['ADCabs', 2, 0],
  0x71: ['ADC(zp),Y', 1, 0], 0x79: ['ADCabs,Y', 2, 0],
  0xe9: ['SBC#', 1, 0], 0xe5: ['SBCzp', 1, 0], 0xed: ['SBCabs', 2, 0],
  0xf9: ['SBCabs,Y', 2, 0],
  0x29: ['AND#', 1, 0], 0x25: ['ANDzp', 1, 0], 0x2d: ['ANDabs', 2, 0],
  0x39: ['ANDabs,Y', 2, 0], 0x31: ['AND(zp),Y', 1, 0],
  0x09: ['ORA#', 1, 0], 0x0d: ['ORAabs', 2, 0], 0x19: ['ORAabs,Y', 2, 0],
  0x11: ['ORA(zp),Y', 1, 0], 0x49: ['EOR#', 1, 0], 0x4d: ['EORabs', 2, 0],
  0x59: ['EORabs,Y', 2, 0],
  0x0a: ['ASL', 0, 0], 0x0e: ['ASLabs', 2, 0], 0x16: ['ASLzp,X', 1, 0],
  0x4a: ['LSR', 0, 0], 0x4e: ['LSRabs', 2, 0],
  0x2a: ['ROL', 0, 0], 0x26: ['ROLzp', 1, 0], 0x2e: ['ROLabs', 2, 0],
  0x36: ['ROLzp,X', 1, 0], 0x6a: ['ROR', 0, 0], 0x66: ['RORzp', 1, 0],
  0x6e: ['RORabs', 2, 0], 0x76: ['RORzp,X', 1, 0],
  0xc9: ['CMP#', 1, 0], 0xc5: ['CMPzp', 1, 0], 0xcd: ['CMPabs', 2, 0],
  0xd9: ['CMPabs,Y', 2, 0], 0xdd: ['CMPabs,X', 2, 0], 0xd1: ['CMP(zp),Y', 1, 0],
  0xe0: ['CPX#', 1, 0], 0xe4: ['CPXzp', 1, 0], 0xc0: ['CPY#', 1, 0], 0xc4: ['CPYzp', 1, 0],
  0xe8: ['INX', 0, 0], 0xca: ['DEX', 0, 0], 0xc8: ['INY', 0, 0], 0x88: ['DEY', 0, 0],
  0xe6: ['INCzp', 1, 0], 0xee: ['INCabs', 2, 0], 0xf6: ['INCzp,X', 1, 0],
  0xc6: ['DECzp', 1, 0], 0xce: ['DECabs', 2, 0], 0xd6: ['DECzp,X', 1, 0],
  0x90: ['BCC', 1, 1], 0xb0: ['BCS', 1, 1], 0xf0: ['BEQ', 1, 1], 0xd0: ['BNE', 1, 1],
  0x30: ['BMI', 1, 1], 0x10: ['BPL', 1, 1], 0x50: ['BVC', 1, 1], 0x70: ['BVS', 1, 1],
  0x6c: ['JMP(', 2, 1], 0xea: ['NOP', 0, 0], 0x00: ['BRK', 0, 0],
};
function disasm(arr, base, start, end) {
  const out = [];
  for (let a = start; a <= end;) {
    const op = arr[a - base];
    const d = OP[op] || ['??', 0, 0];
    const [name, len] = d;
    let extra = '';
    if (len === 1) extra = ' #$' + arr[a - base + 1].toString(16).toUpperCase().padStart(2, '0');
    if (len === 2) {
      const lo = arr[a - base + 1], hi = arr[a - base + 2];
      extra = ' $' + (hi << 8 | lo).toString(16).toUpperCase().padStart(4, '0');
    }
    out.push('$' + a.toString(16).toUpperCase() + ': ' + name + extra);
    a += 1 + len;
  }
  return out.join('\n');
}
const b30 = load('rom-data/prg-bank-30.ts');
const b28 = load('rom-data/prg-bank-28.ts');
let s = '==== bank30 $CB90-$CBF0 ====\n' + disasm(b30, 0xc000, 0xcb90, 0xcbf0) + '\n\n';
s += '==== bank30 $CD3C-$CD90 ($C51E 除法 / $C50C 名字区指针) ====\n' + disasm(b30, 0xc000, 0xcd3c, 0xcd90) + '\n\n';
s += '==== bank28 $802D-$81A0 ($C527 数字渲染) ====\n' + disasm(b28, 0x8000, 0x802d, 0x81a0) + '\n\n';
s += '==== bank28 $9E40-$9E60 ($9E4E 等级表) ====\n' + Array.from({ length: 0x20 }, (_, i) => {
  const v = b28[0x9e4e - 0x8000 + i];
  return '$' + (0x9e4e + i).toString(16).toUpperCase() + ': ' + '0x' + v.toString(16).toUpperCase().padStart(2, '0');
}).join('\n') + '\n';
fs.writeFileSync('_c509_c527_disasm.txt', s, 'utf8');
console.log('written _c509_c527_disasm.txt');
