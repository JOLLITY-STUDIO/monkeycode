// 6502 各助记符的操作数长度 (字节数)。用于反汇编地址推算。
// 1 = 无操作数 (accumulator / implied / branch), 2 = 8位操作数, 3 = 16位操作数
const OPCODE_LEN = {
  // implied / accumulator
  'BRK': 1, 'CLC': 1, 'CLD': 1, 'CLI': 1, 'CLV': 1, 'DEX': 1, 'DEY': 1,
  'INX': 1, 'INY': 1, 'NOP': 1, 'PHA': 1, 'PHP': 1, 'PLA': 1, 'PLP': 1,
  'RTI': 1, 'RTS': 1, 'SEC': 1, 'SED': 1, 'SEI': 1, 'TAX': 1, 'TAY': 1,
  'TSX': 1, 'TXA': 1, 'TXS': 1, 'TYA': 1,
  // branch (relative, 1 byte operand)
  'BCC': 2, 'BCS': 2, 'BEQ': 2, 'BMI': 2, 'BNE': 2, 'BPL': 2, 'BVC': 2, 'BVS': 2,
  // 2-byte operand
  'AND': 2, 'BIT': 2, 'CMP': 2, 'CPX': 2, 'CPY': 2, 'EOR': 2, 'LDA': 2, 'LDX': 2,
  'LDY': 2, 'ORA': 2, 'SBC': 2, 'STA': 2, 'STX': 2, 'STY': 2, 'ADC': 2,
  // 3-byte operand
  'JMP': 3, 'JSR': 3, 'ASL': 3, 'DEC': 3, 'INC': 3, 'LSR': 3, 'ROL': 3, 'ROR': 3,
};

// 依据寻址模式修正: 某些助记符(ASL/DEC/INC/LSR/ROL/ROR/AND...)在 accumulator 模式为1字节。
// 用操作数文本判断: 无操作数 → 1字节; #$xx → 2字节; $xxxx (abs) → 3字节; $xx,X → 2字节; 其余abs 3字节
function instrLen(mnemonic, operand) {
  const m = mnemonic.toUpperCase();
  if (OPCODE_LEN[m] === undefined) return 3; // 未知助记符默认3
  if (!operand) return 1; // implied / accumulator
  // 操作数形态
  if (/^#\$[0-9A-Fa-f]{1,2}$/.test(operand)) return 2;        // immediate
  if (/^\$[0-9A-Fa-f]{4}/.test(operand)) return 3;            // absolute (16-bit)
  if (/^\$[0-9A-Fa-f]{1,2}(,|\)|\(|$)/.test(operand)) return 2; // zero-page / indexed zp / zp,X / (zp),Y / (zp,X)
  if (/^\([^)]*\$[0-9A-Fa-f]{4}/.test(operand)) return 3;     // (abs),Y
  if (/^[A-Za-z_]+/.test(operand)) return 2;                  // label
  return OPCODE_LEN[m] || 2;
}

module.exports = { OPCODE_LEN, instrLen };
