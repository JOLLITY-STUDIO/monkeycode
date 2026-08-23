// 定位 bank00 关键子程序在 asm 文件中的定义行（行尾地址注释）
const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00';
const targets = ['9A0D','9FA8','8920','8AF7','9A35','99F0','9F69','9F89','9F96','8976','8895','9A43','AA06','9EED','9B28','9B5E','9B7F','98A0','98EA','890C','88FB','9AA2','9A71','9AB8','9ADA','9DEE','A200','A2F8'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    for (const t of targets) {
      // 行尾注释含目标地址，且该行是助记符或 .proc（定义点）
      const m = ln.match(/;\s*\$?([0-9A-F]{4})\s*$/i);
      if (m && m[1].toUpperCase() === t && /^\s+(LDA|LDX|LDY|STA|STX|STY|JMP|JSR|RTS|BIT|CMP|CPX|CPY|TAX|TAY|TXA|TYA|ASL|LSR|ROL|ROR|INC|DEC|CLC|SEC|SEI|CLI|AND|ORA|EOR|ADC|SBC|PLA|PHA|RTI|NOP|BPL|BMI|BEQ|BNE|BCC|BCS|BVC|BVS|INX|INY|DEX|DEY|\.proc)/i.test(ln)) {
        console.log(`${f}:${i + 1}  ${ln.trim()}   (定义 ${t})`);
        break;
      }
    }
  });
}
