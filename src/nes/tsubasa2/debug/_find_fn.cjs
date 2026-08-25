// 搜索 bank02/bank00 中 8895 / 8920 例程定义
const fs = require('fs');
const path = require('path');
const dirs = ['src/asm/bank02', 'src/asm/bank00'];
const targets = ['8895', '8920'];
for (const dir of dirs) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const t of targets) {
        // 定义形如 "    LDA #$00                   ; $8895"
        const m = line.match(/;\s*\$?(8895|8920)\b/);
        if (m) {
          console.log(`${dir}/${f}:${i + 1}: ${line.trim()}`);
          break;
        }
      }
    });
  }
}
