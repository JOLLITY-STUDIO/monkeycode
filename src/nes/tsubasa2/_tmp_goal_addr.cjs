// 找 bank26 TS 中 _handleGoal 上方的 ROM 地址注释
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/game/service/bank26_match.service.ts');
const t = fs.readFileSync(p, 'utf8').split('\n');
// 打印所有含 $ 地址的注释行(前 80 条)定位 _handleGoal 区段
for (let i = 0; i < t.length; i++) {
  const l = t[i];
  if (/\$\w{4}/.test(l) && /(goal|Goal|GOAL|进球|得分|score|Score|81|8[0-9A-F]|9[0-9A-F])/.test(l)) {
    console.log(`${i + 1}| ${l.trim().slice(0, 110)}`);
  }
}
console.log('\n==== _handleGoal 定位 ====');
for (let i = 0; i < t.length; i++) {
  if (t[i].includes('_handleGoal')) {
    for (let k = Math.max(0, i - 20); k < i; k++) {
      if (/\$\w{4}/.test(t[k])) console.log(`${k + 1}| ${t[k].trim().slice(0, 110)}`);
    }
    console.log(`>>> ${i + 1}| ${t[i].trim().slice(0, 110)}`);
    break;
  }
}
