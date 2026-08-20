// 打印 bank26_match.service.ts 中 _addScore 及周边 60 行
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/game/service/bank26_match.service.ts');
const t = fs.readFileSync(p, 'utf8').split('\n');
for (let i = 0; i < t.length; i++) {
  if (t[i].includes('_addScore') || t[i].includes('score_home')) {
    const from = Math.max(0, i - 6), to = Math.min(t.length, i + 14);
    console.log(`---- around line ${i + 1} ----`);
    for (let k = from; k < to; k++) console.log(`${k + 1}| ${t[k]}`);
    console.log('');
  }
}
