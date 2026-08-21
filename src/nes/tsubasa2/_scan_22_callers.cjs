// 临时扫描: 查找所有 asm 中设置 $0024 (R6 bank) = 0x16 (22) 或 JSR $8003 的调用点
const fs = require('fs');
const path = require('path');
const dirs = ['asm/bank22', 'asm/bank24', 'asm/bank28', 'asm/bank30', 'asm/bank31'];
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(path.join(d, f), 'utf8').split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (/LDA #\$(16|22)\s*$/.test(l) || /JSR \$8003/.test(l) || /JMP \$8003/.test(l)) {
        const ctx = lines.slice(Math.max(0, i - 3), Math.min(lines.length, i + 4)).map((x) => x.trim()).join(' | ');
        console.log(`${d}/${f}:${i + 1}: ${ctx}`);
      }
    }
  }
}
