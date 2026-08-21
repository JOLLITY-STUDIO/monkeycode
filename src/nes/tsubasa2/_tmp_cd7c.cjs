// 找 $CD7C (C50C 跳转目标) 的实现
const fs = require('fs');
const path = require('path');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):[p]});}
const files = walk('asm/bank30').filter(f=>f.endsWith('.s')&&!f.endsWith('_full.s'));
console.log('=== bank30 含 $CD7C 的行 ===');
for (const f of files) {
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/);
  lines.forEach((l,i)=>{
    if (/CD7C/i.test(l)) console.log(`${f}:${i+1}: ${l.trim()}`);
  });
}
// $CD7C = bank30 偏移 $0D7C. bank30 从 $C000 开始, 找地址注释 $CD7x 或 $CD8x 的行
console.log('\n=== bank30 地址在 $CD70-$CDA0 的代码段 ===');
for (const f of files) {
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/);
  let printing = false; let printCnt = 0;
  for (let i=0;i<lines.length;i++) {
    if (/;\s*\$CD7[0-9A-Fa-f]/i.test(lines[i])||/;\s*\$CD8[0-9A-Fa-f]/i.test(lines[i])||/;\s*\$CD9[0-9A-Fa-f]/i.test(lines[i])||/;\s*\$CDA[0-9A-Fa-f]/i.test(lines[i])) {
      printing = true; printCnt = 0;
    }
    if (printing) { console.log(`${f}:${i+1}: ${lines[i].trim()}`); printCnt++; if (printCnt>50) {printing=false;} }
  }
}
