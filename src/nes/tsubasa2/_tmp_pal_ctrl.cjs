// 查 $0048/$0049 谁写入 (STA $0048/STA $0049) — 谁决定用哪组调色板
const fs = require('fs');
const path = require('path');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):[p]});}
const files = walk('asm').filter(f=>f.endsWith('.s') && !f.endsWith('_full.s'));
console.log('=== STA $0048 (BG调色板索引) ===');
let cnt = 0;
for (const f of files) {
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/STA\s+\$0048\b/i.test(lines[i])) {
      const ctx = lines.slice(Math.max(0,i-3), i+1).map((l,idx)=>`  ${Math.max(0,i-3)+idx+1}: ${l.trim()}`).join('\n');
      console.log(`\n${f}:${i+1}\n${ctx}`);
      cnt++; if (cnt > 25) { console.log('[truncated]'); process.exit(0); }
    }
  }
}
console.log(`\n总计 ${cnt} 处 STA $0048`);

console.log('\n=== mainInitParam / paletteLoad 调用点 (JSR $9A31/$9A35/$9A4C/$9A60) ===');
for (const f of files) {
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/JSR\s+\$9A(31|35|4C|60|B8|DA)/i.test(lines[i])) {
      const ctx = lines.slice(Math.max(0,i-4), i+2).map((l,idx)=>`  ${Math.max(0,i-4)+idx+1}: ${l.trim()}`).join('\n');
      console.log(`\n${f}:${i+1}\n${ctx}`);
    }
  }
}
