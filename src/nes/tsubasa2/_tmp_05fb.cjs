// $05FB 谁写入 + 取值域. 还要看 $0034 指向 $03xx 后, 那段 RAM 数据怎么来的(谁写 $0300+)
const fs = require('fs');
const path = require('path');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):[p]});}
const all = walk('asm').filter(f=>f.endsWith('.s')&&!f.endsWith('_full.s'));
console.log('=== STA $05FB (谁写比赛阶段) ===');
let cnt=0;
for (const f of all) {
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/);
  for (let i=0;i<lines.length;i++) {
    if (/STA\s+\$05FB/i.test(lines[i])) {
      const ctx = lines.slice(Math.max(0,i-3),i+1).map((l,idx)=>`  ${Math.max(0,i-3)+idx+1}: ${l}`).join('\n');
      console.log(`\n${f}:${i+1}\n${ctx}`);
      cnt++; if(cnt>30){console.log('[truncated]');process.exit(0);}
    }
  }
}
