const fs = require('fs');
const path = require('path');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):[p]});}
const files = walk('asm').filter(f=>f.endsWith('.s') && !f.endsWith('_full.s'));
// 搜 LDA #$0A; STA $00ED (设场景索引=0x0A=开场)
console.log('=== LDA #$0A 后 STA $00ED ===');
for (const f of files) {
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/STA\s+\$00ED/i.test(lines[i])) {
      const ctx = lines.slice(Math.max(0,i-3), i+1).map((l,idx)=>`  ${l.trim()}`).join('\n');
      // 只打前 4 行有 LDA #$0A 的
      if (/LDA\s+#\$0A/i.test(lines.slice(Math.max(0,i-3),i).join(' '))) {
        console.log(`${f}:${i+1}\n${ctx}`);
      }
    }
  }
}
// bank31 Reset 向量附近 — 开机初始化
console.log('\n=== bank31 Reset 向量附近 (开机) ===');
const b31 = fs.readFileSync('asm/bank31/code_main.s','utf8').split(/\r?\n/);
for (let i = 0; i < Math.min(40, b31.length); i++) console.log(`  ${i+1}: ${b31[i].trim()}`);
