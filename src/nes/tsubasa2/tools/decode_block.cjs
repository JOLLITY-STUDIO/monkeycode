/**
 * 解码一个 .byte 数据块为 6502 指令序列, 用于判断是否为"被误标的子程代码"。
 *
 * 用法: node tools/decode_block.cjs "字节列表(逗号分隔 $XX)"
 */
const raw = process.argv[2].replace(/[^0-9a-fA-F,]/g, '');
const bytes = raw.split(',').filter(Boolean).map((s) => parseInt(s, 16));

// 基础 6502 指令解码表: opcode -> [助记符, 长度, 寻址方式描述]
const T = {};
function op(c, len, m) { T[c] = [len, m]; }
const o = [
  [0xA9, 2, 'LDA #$xx'], [0xA2, 2, 'LDX #$xx'], [0xA0, 2, 'LDY #$xx'],
  [0x20, 3, 'JSR $xxxx'], [0x4C, 3, 'JMP $xxxx'], [0x6C, 3, 'JMP ($xxxx)'],
  [0x85, 2, 'STA $xx'], [0x86, 2, 'STX $xx'], [0x84, 2, 'STY $xx'],
  [0x8D, 3, 'STA $xxxx'], [0x8E, 3, 'STX $xxxx'], [0x8C, 3, 'STY $xxxx'],
  [0xA5, 2, 'LDA $xx'], [0xA6, 2, 'LDX $xx'], [0xA4, 2, 'LDY $xx'],
  [0xAD, 3, 'LDA $xxxx'], [0xAE, 3, 'LDX $xxxx'], [0xAC, 3, 'LDY $xxxx'],
  [0xB5, 2, 'LDA $xx,X'], [0xB6, 2, 'LDX $xx,Y'], [0xB4, 2, 'LDY $xx,X'],
  [0xBD, 3, 'LDA $xxxx,X'], [0xBE, 3, 'LDX $xxxx,Y'], [0xBC, 3, 'LDY $xxxx,X'],
  [0xB9, 3, 'LDA $xxxx,Y'], [0xB1, 2, 'LDA ($xx),Y'], [0xA1, 2, 'LDA ($xx,X)'],
  [0xB2, 2, 'LDA ($xx)'], [0x91, 2, 'STA ($xx),Y'], [0x81, 2, 'STA ($xx,X)'],
  [0x99, 3, 'STA $xxxx,Y'], [0x9D, 3, 'STA $xxxx,X'],
  [0x48, 1, 'PHA'], [0x68, 1, 'PLA'], [0x08, 1, 'PHP'], [0x28, 1, 'PLP'],
  [0xAA, 1, 'TAX'], [0x8A, 1, 'TXA'], [0xA8, 1, 'TAY'], [0x98, 1, 'TYA'],
  [0xBA, 1, 'TSX'], [0x9A, 1, 'TXS'], [0xE8, 1, 'INX'], [0xC8, 1, 'INY'],
  [0xCA, 1, 'DEX'], [0x88, 1, 'DEY'], [0x60, 1, 'RTS'], [0x40, 1, 'RTI'],
  [0x00, 1, 'BRK'], [0xEA, 1, 'NOP'], [0x18, 1, 'CLC'], [0x38, 1, 'SEC'],
  [0x58, 1, 'CLI'], [0x78, 1, 'SEI'], [0xD8, 1, 'CLD'], [0xF8, 1, 'SED'],
  [0xB8, 1, 'CLV'], [0xD0, 2, 'BNE $xx'], [0xF0, 2, 'BEQ $xx'], [0x90, 2, 'BCC $xx'],
  [0xB0, 2, 'BCS $xx'], [0x30, 2, 'BMI $xx'], [0x10, 2, 'BPL $xx'], [0x50, 2, 'BVC $xx'], [0x70, 2, 'BVS $xx'],
  [0x65, 2, 'ADC $xx'], [0x6D, 3, 'ADC $xxxx'], [0x75, 2, 'ADC $xx,X'], [0x7D, 3, 'ADC $xxxx,X'], [0x79, 3, 'ADC $xxxx,Y'], [0x61, 2, 'ADC ($xx,X)'], [0x71, 2, 'ADC ($xx),Y'],
  [0xE5, 2, 'SBC $xx'], [0xED, 3, 'SBC $xxxx'], [0xF5, 2, 'SBC $xx,X'], [0xFD, 3, 'SBC $xxxx,X'], [0xF9, 3, 'SBC $xxxx,Y'], [0xE1, 2, 'SBC ($xx,X)'], [0xF1, 2, 'SBC ($xx),Y'],
  [0x25, 2, 'AND $xx'], [0x2D, 3, 'AND $xxxx'], [0x35, 2, 'AND $xx,X'], [0x3D, 3, 'AND $xxxx,X'], [0x39, 3, 'AND $xxxx,Y'], [0x21, 2, 'AND ($xx,X)'], [0x31, 2, 'AND ($xx),Y'],
  [0x05, 2, 'ORA $xx'], [0x0D, 3, 'ORA $xxxx'], [0x15, 2, 'ORA $xx,X'], [0x1D, 3, 'ORA $xxxx,X'], [0x19, 3, 'ORA $xxxx,Y'], [0x01, 2, 'ORA ($xx,X)'], [0x11, 2, 'ORA ($xx),Y'],
  [0x45, 2, 'EOR $xx'], [0x4D, 3, 'EOR $xxxx'], [0x55, 2, 'EOR $xx,X'], [0x5D, 3, 'EOR $xxxx,X'], [0x59, 3, 'EOR $xxxx,Y'], [0x41, 2, 'EOR ($xx,X)'], [0x51, 2, 'EOR ($xx),Y'],
  [0xC5, 2, 'CMP $xx'], [0xCD, 3, 'CMP $xxxx'], [0xD5, 2, 'CMP $xx,X'], [0xDD, 3, 'CMP $xxxx,X'], [0xD9, 3, 'CMP $xxxx,Y'], [0xC1, 2, 'CMP ($xx,X)'], [0xD1, 2, 'CMP ($xx),Y'],
  [0xE0, 2, 'CPX #$xx'], [0xE4, 2, 'CPX $xx'], [0xEC, 3, 'CPX $xxxx'], [0xC0, 2, 'CPY #$xx'], [0xC4, 2, 'CPY $xx'], [0xCC, 3, 'CPY $xxxx'],
  [0x24, 2, 'BIT $xx'], [0x2C, 3, 'BIT $xxxx'],
  [0x0A, 1, 'ASL A'], [0x06, 2, 'ASL $xx'], [0x0E, 3, 'ASL $xxxx'], [0x16, 2, 'ASL $xx,X'], [0x1E, 3, 'ASL $xxxx,X'],
  [0x4A, 1, 'LSR A'], [0x46, 2, 'LSR $xx'], [0x4E, 3, 'LSR $xxxx'], [0x56, 2, 'LSR $xx,X'], [0x5E, 3, 'LSR $xxxx,X'],
  [0x2A, 1, 'ROL A'], [0x26, 2, 'ROL $xx'], [0x2E, 3, 'ROL $xxxx'], [0x36, 2, 'ROL $xx,X'], [0x3E, 3, 'ROL $xxxx,X'],
  [0x6A, 1, 'ROR A'], [0x66, 2, 'ROR $xx'], [0x6E, 3, 'ROR $xxxx'], [0x76, 2, 'ROR $xx,X'], [0x7E, 3, 'ROR $xxxx,X'],
  [0xC6, 2, 'DEC $xx'], [0xCE, 3, 'DEC $xxxx'], [0xD6, 2, 'DEC $xx,X'], [0xDE, 3, 'DEC $xxxx,X'],
  [0xE6, 2, 'INC $xx'], [0xEE, 3, 'INC $xxxx'], [0xF6, 2, 'INC $xx,X'], [0xFE, 3, 'INC $xxxx,X'],
  [0x69, 2, 'ADC #$xx'], [0xE9, 2, 'SBC #$xx'], [0x29, 2, 'AND #$xx'], [0x09, 2, 'ORA #$xx'], [0x49, 2, 'EOR #$xx'], [0xC9, 2, 'CMP #$xx'],
];
for (const [c, len, m] of o) T[c] = [len, m];

let i = 0;
let pc = 0x8000;
const out = [];
let unknown = 0;
while (i < bytes.length) {
  const b = bytes[i];
  const entry = T[b];
  if (entry) {
    const [len, m] = entry;
    let operand = '';
    if (len === 2) operand = '$' + (bytes[i + 1] !== undefined ? bytes[i + 1].toString(16).padStart(2, '0') : '??');
    if (len === 3) operand = '$' + ((bytes[i + 2] !== undefined ? bytes[i + 2] : 0).toString(16).padStart(2, '0')) + ((bytes[i + 1] !== undefined ? bytes[i + 1] : 0).toString(16).padStart(2, '0'));
    const opstr = m.includes('#$') || m.includes('$xxxx') || m.includes('$xx') ? (m.split(' ')[0] + ' ' + operand + (m.includes(',X') ? ',X' : '') + (m.includes(',Y') ? ',Y' : '')) : m;
    out.push(`  0x${pc.toString(16).toUpperCase()}: ${b.toString(16).padStart(2, '0')} ${(bytes[i + 1] !== undefined ? bytes[i + 1].toString(16).padStart(2, '0') : '  ')} ${(bytes[i + 2] !== undefined ? bytes[i + 2].toString(16).padStart(2, '0') : '  ')}  ${opstr}`);
    pc += len;
    i += len;
  } else {
    out.push(`  0x${pc.toString(16).toUpperCase()}: ${b.toString(16).padStart(2, '0')}  ????  (非法/数据)`);
    unknown++;
    pc += 1;
    i += 1;
  }
}
console.log('字节: ' + bytes.map((b) => '$' + b.toString(16).padStart(2, '0')).join(','));
console.log('长度: ' + bytes.length + ' 字节, 非法/数据字节: ' + unknown);
console.log(out.join('\n'));
