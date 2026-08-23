// 临时脚本：查找 STA $0049 与 $0049 使用点，用后删除
const fs = require('fs');
const path = require('path');
for (const dir of ['src/asm/bank00', 'src/asm/bank02']) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
  for (const f of files) {
    const lines = fs.readFileSync(path.join(dir, f), 'latin1').split(/\r?\n/);
    lines.forEach((ln, i) => {
      if (/STA\s+\$0049|LDA\s+\$0049|STX\s+\$0049|LDX\s+\$0049|STY\s+\$0049/.test(ln)) {
        console.log(dir + '/' + f + ':' + (i + 1) + ': ' + ln.trim());
      }
    });
  }
}
