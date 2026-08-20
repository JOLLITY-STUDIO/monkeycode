// 查看 scripts-bank-03.ts 的脚本结构
const fs = require('fs');
const s = fs.readFileSync('src/game/data/prg/scene/textscript/scripts-bank-03.ts','utf8');
const lines = s.split('\n');
for(const l of lines){
  if(l.startsWith('  {')){ console.log(l.slice(0,1100)); break; }
}
