const fs = require('fs');
for (const f of ['code_main.s', 'code_sub.s', 'code_data.s']) {
  const s = fs.readFileSync('asm/bank30/' + f, 'utf8');
  const lines = s.split('\n');
  const addrs = [];
  for (const l of lines) {
    const m = l.match(/;\s*\$([0-9A-F]{4})/);
    if (m) addrs.push(parseInt(m[1], 16));
  }
  // 该文件含哪些段的指令 (有操作码的行)
  const codeLines = lines.filter(l => /^\s{4}(LDA|STA|JSR|JMP|RTS|RTI|LDX|LDY|TAX|TAY|TXA|TYA|PHA|PLA|PLP|PHP|AND|ORA|EOR|ADC|SBC|CMP|CPX|CPY|INC|DEC|INX|INY|DEX|DEY|ASL|LSR|ROL|ROR|CLC|SEC|CLI|SEI|CLD|SED|BCC|BCS|BEQ|BNE|BMI|BPL|BVC|BVS|BIT|STX|STY|NOP|BRK)/.test(l));
  const byteLines = lines.filter(l => /\.byte\s/.test(l));
  console.log('=== ' + f + ' ===');
  console.log('  lines=' + lines.length + ' codeLines=' + codeLines.length + ' byteLines=' + byteLines.length);
  if (addrs.length) {
    console.log('  addr range: $' + addrs[0].toString(16).toUpperCase() + '-$' + addrs[addrs.length-1].toString(16).toUpperCase());
  }
  // 第一个 code 行位置
  const firstCodeIdx = lines.findIndex(l => /^\s{4}(LDA|STA|JSR|JMP|RTS|RTI)/.test(l));
  if (firstCodeIdx >= 0) {
    const m = lines[firstCodeIdx].match(/;\s*\$([0-9A-F]{4})/);
    console.log('  first real code at line ' + (firstCodeIdx+1) + ' addr $' + (m ? m[1] : '?'));
  }
}
