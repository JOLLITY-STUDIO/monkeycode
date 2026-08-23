const fs = require('fs');
const path = require('path');
// 在 bank00 反汇编中找 R7 配置：LDA #$01; STA $8000; LDA #bank; STA $8001
for (const dir of ['src/asm/bank00', 'src/asm/bank30', 'src/asm/bank31']) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.includes('STA $8000') || l.includes('STA $8001') || l.includes('STA $E000') || l.includes('STA $C000')) {
        // 打印上下文
        const ctx = lines.slice(Math.max(0, i - 2), i + 3).map(x => x.trim()).join(' | ');
        console.log(dir + '/' + f + ':' + (i + 1) + ': ' + ctx);
      }
    }
  }
}
