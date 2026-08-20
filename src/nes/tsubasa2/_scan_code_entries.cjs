const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
const out = {};
for (const b of ['bank27', 'bank28', 'bank29']) {
  const t = fs.readFileSync(root + '/' + b + '/_full.s', 'utf8').split(/\r?\n/);
  const entries = [];
  t.forEach((l, i) => {
    const m = l.match(/;\s*\$([0-9A-F]{4})/i);
    if (!m) return;
    const addr = parseInt(m[1], 16);
    const code = l.trim();
    // 指令行 = 含助记符, 非 .byte/.word 开头
    if (/^(JSR|JMP|LDA|STA|LDX|STX|LDY|STY|RTS|RTI|TAX|TAY|TXA|TYA|TSX|TXS|PHA|PLA|PHP|PLP|AND|ORA|EOR|ADC|SBC|CMP|CPX|CPY|INC|DEC|INX|DEX|INY|DEY|ASL|LSR|ROL|ROR|CLC|SEC|CLI|SEI|CLV|CLD|SED|BIT|BCC|BCS|BEQ|BNE|BMI|BPL|BVC|BVS|NOP|BRK)\b/.test(code) && !/^\s*\./.test(code)) {
      entries.push({ addr, code: code.substring(0, 60) });
    }
  });
  // 只保留"看起来像入口"的: 前面是空行/.byte 结束的指令
  out[b] = entries;
  console.log('=== ' + b + ' 指令行总数: ' + entries.length + ' ===');
}
// 输出每个 bank 前 60 条指令行 (含地址)
for (const b of ['bank27', 'bank28', 'bank29']) {
  console.log('\n===== ' + b + ' 前 60 指令 =====');
  out[b].slice(0, 60).forEach((e) => console.log('$' + e.addr.toString(16).toUpperCase().padStart(4, '0') + '  ' + e.code));
}
