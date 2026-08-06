const fs = require('fs');
const path = require('path');

const asmDir = path.join(__dirname, '..', '_tmp_bzk_out');

// 1. 找到所有引用 $FC 且不是 .byte 的代码
const asmFiles = fs.readdirSync(asmDir).filter(f => f.endsWith('.asm'));
for (const f of asmFiles) {
  const content = fs.readFileSync(path.join(asmDir, f), 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // 过滤掉 .byte $FC 的数据定义行
    if (line.includes('#$FC') || (line.includes('CMP') && line.includes('FC')) || line.includes('LDA #$FC') || (line.includes('BEQ') && line.match(/A[0-9A-F]{3}/))) {
      const s = Math.max(0, i - 3);
      console.log(`\n--- ${f}:${i + 1} ---`);
      for (let j = s; j <= i; j++) {
        console.log(`  ${lines[j]}`);
      }
    }
  }
}
