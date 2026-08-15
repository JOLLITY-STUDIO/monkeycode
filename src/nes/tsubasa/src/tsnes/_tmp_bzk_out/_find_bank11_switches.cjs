// 扫描所有 bank_*.asm 中切换 bank 11 的调用点: LDA #$0B / STA ram_0025 / JSR $CE2D
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => /^bank_\d+\.asm$/.test(f));

for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // 匹配 LDA #$0B (切换 bank 11 到 ram_0025)
    if (/LDA #\$0B/.test(l)) {
      // 向前看后 3 行是否含 STA ram_0025 或 JSR $CE2D
      const ctx = lines.slice(i, i + 4).join('\n');
      if (/STA ram_0025|JSR \$CE2D|JSR \$CBB0|JSR \$CE0A/.test(ctx)) {
        const addr = (l.match(/[0-9A-F]{2}:([0-9A-F]{4})/) || [])[1] || '';
        console.log(`=== ${f}:${i + 1} CPU:${addr}`);
        for (let k = i; k < i + 5 && k < lines.length; k++) console.log('   ' + lines[k].trim());
      }
    }
  }
}
console.log('done');
