// 搜索谁切换 bank 11/16: 模式 LDA #$0B 或 #$10 后 STA ram_0025
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));
const results = [];
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // bank 11 = #$0B, bank 16 = #$10
    if (/LDA #\$(0B|10)\b/i.test(l)) {
      // 看接下来 4 行内是否有 STA ram_0025 或 STA $8001
      let ctx = [l.trim().slice(0, 100)];
      for (let j = 1; j <= 5; j++) {
        const nxt = lines[i + j] || '';
        ctx.push(nxt.trim().slice(0, 100));
        if (/STA (ram_0025|\$8001|a: ram_0025)/.test(nxt)) break;
      }
      if (ctx.some(c => /STA (ram_0025|\$8001)/.test(c))) {
        results.push(`[${f}] ${ctx.join(' | ')}`);
      }
    }
  }
}
console.log(results.join('\n'));
