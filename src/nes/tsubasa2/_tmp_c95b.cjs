// dump bank30 $C95B (04A5 consumer)
const fs = require('fs');
function loadBank(file) {
  const s = fs.readFileSync(file, 'utf8');
  const m = s.match(/= \[([\s\S]*?)\];/);
  return (m[1].match(/0x[0-9a-fA-F]+/g) || []).map(h => parseInt(h, 16));
}
const b30 = loadBank('src/game/data/prg-bank-30.ts');
const r30 = a => b30[a - 0xC000] ?? 0;
const OP = {
  '20': 'JSR', '60': 'RTS', '4C': 'JMP', 'EA': 'NOP', '00': 'BRK',
  'A9': 'LDA #', 'A5': 'LDA zp', 'A6': 'LDX zp', 'A0': 'LDY #', 'A4': 'LDY zp',
  '85': 'STA zp', '86': 'STX zp', '84': 'STY zp', '8D': 'STA abs', '8E': 'STX abs',
  'E8': 'INX', 'C8': 'INY', 'CA': 'DEX', '88': 'DEY', '18': 'CLC', '38': 'SEC',
  'D0': 'BNE', 'F0': 'BEQ', '90': 'BCC', 'B0': 'BCS', '10': 'BPL', '30': 'BMI',
  'C9': 'CMP #', 'C5': 'CMP zp', 'E0': 'CPX #', 'C0': 'CPY #', '69': 'ADC #', 'E9': 'SBC #',
  '29': 'AND #', '09': 'ORA #', '4A': 'LSR A', '0A': 'ASL A', '2A': 'ROL A', '6A': 'ROR A',
  '0D': 'ORA abs', '2D': 'AND abs', '0E': 'ASL abs',
  'AA': 'TAX', 'A8': 'TAY', '8A': 'TXA', '98': 'TYA', 'BA': 'TSX', '9A': 'TXS', '48': 'PHA', '68': 'PLA',
  '08': 'PHP', '28': 'PLP', '24': 'BIT zp', '2C': 'BIT abs', '9D': 'STA abs,X', '99': 'STA abs,Y',
  'BD': 'LDA abs,X', 'B9': 'LDA abs,Y', 'BC': 'LDY abs,X', 'BE': 'LDX abs,Y',
  'B1': 'LDA (zp),Y', '91': 'STA (zp),Y', 'A1': 'LDA (zp,X)', '81': 'STA (zp,X)',
  'E6': 'INC zp', 'C6': 'DEC zp', 'F6': 'INC zp,X', 'D6': 'DEC zp,X',
  '40': 'RTI', 'CB': '?', '6C': 'JMP (', '8D': 'STA abs', 'B5': 'LDA zp,X', '95': 'STA zp,X'
};
const LEN = { 'A9': 2, 'A0': 2, '20': 3, '4C': 3, 'D0': 2, 'F0': 2, '90': 2, 'B0': 2, '10': 2, '30': 2, 'C9': 2, 'E0': 2, 'C0': 2, '69': 2, 'E9': 2, '29': 2, '09': 2, '8D': 3, '8E': 3, '0D': 3, '2D': 3, '0E': 3, '9D': 3, '99': 3, 'BD': 3, 'B9': 3, 'BC': 3, 'BE': 3, '2C': 3, 'E6': 2, 'C6': 2, 'F6': 2, 'D6': 2, 'A5': 2, '85': 2, 'A6': 2, '86': 2, 'A4': 2, '84': 2, 'C5': 2, '24': 2, 'B5': 2, '95': 2, '6C': 3, 'C9': 2, 'E6': 2, 'C6': 2, 'CE': 3, '4A': 1, '0A': 1, '2A': 1, '6A': 1, 'EE': 3, 'AE': 3, 'AD': 3, 'AC': 3, 'A2': 2, 'A3': 2, '0C': 3, 'D9': 3, 'D5': 2, 'D6': 2, 'D4': 2, 'D2': 2, 'D1': 2, 'DE': 3, '36': 2, '34': 2, 'FE': 3, 'F2': 3, 'F4': 3, 'F1': 3, 'F3': 3, 'F5': 3, 'F7': 3, 'F9': 3, 'ED': 3, 'EB': 3, 'E5': 2, 'E4': 2, 'E7': 2, 'C7': 2, 'E6': 2, 'F8': 1, '0B': 2, '12': 2, '7A': 1, '5A': 1, 'B8': 1, '08': 1, '28': 1, '48': 1, '68': 1, 'E8': 1, 'C8': 1, 'CA': 1, '88': 1, 'AA': 1, 'A8': 1, '8A': 1, '98': 1, 'BA': 1, '9A': 1, 'CB': 1, '1A': 1, '3A': 1, '7C': 3, '8C': 3, '8D': 3 };
function disasm(fn, start, count) {
  const lines = [];
  let a = start;
  const end = start + count;
  while (a < end) {
    const op = fn(a);
    const hex = op.toString(16).toUpperCase().padStart(2, '0');
    const name = OP[hex] || ('??' + hex);
    let arg = '';
    const len = LEN[hex] || 1;
    if (len === 2) arg = fn(a + 1).toString(16).padStart(2, '0');
    if (len === 3) {
      const lo = fn(a + 1), hi = fn(a + 2);
      arg = (hi << 8 | lo).toString(16).padStart(4, '0');
    }
    lines.push('  $' + a.toString(16).toUpperCase().padStart(4, '0') + ': ' + name.padEnd(10) + ' $' + arg);
    a += len;
  }
  return lines.join('\n');
}
console.log(disasm(r30, 0xC940, 0x100));
