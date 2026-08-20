const fs = require('fs');
const p = 'src/game/data/prg/prg-bank-30.ts';
console.log('exists:', fs.existsSync(p));
if (fs.existsSync(p)) {
  const st = fs.statSync(p);
  console.log('size:', st.size);
  const s = fs.readFileSync(p, 'utf8');
  console.log('head:', JSON.stringify(s.slice(0, 100)));
}
// bank29 import 方式
const b29 = fs.readFileSync('src/game/service/bank29_roster.service.ts', 'utf8');
const m = b29.match(/import[^\n]*prg-bank-29[^\n]*/);
console.log('bank29 import:', m && m[0]);
// 其他文件如何 import prg-bank-29/30
const dir = 'src/game/service';
for (const f of fs.readdirSync(dir)) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8');
  for (const line of s.split('\n')) {
    if (/import[^\n]*(prg-bank-2[5-9]|prg-bank-3[01])[^\n]*/.test(line)) {
      console.log(f + ' :: ' + line.trim());
    }
  }
}
