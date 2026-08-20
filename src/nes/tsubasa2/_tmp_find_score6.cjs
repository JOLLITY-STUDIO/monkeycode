// 1) 看反汇编格式样本; 2) 搜 GOAL/goal 得分逻辑附近的 STA 地址
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out');
// 列出 bank26 相关文件
function walk(d, depth) {
  if (depth <= 0) return [];
  const out = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p, depth - 1));
    else if (/bank.?26/i.test(f) || /bank.?20/i.test(f)) out.push(p);
  }
  return out;
}
const b26 = walk(dir, 3);
console.log('bank26 files:', b26.map(x => x.replace(dir, '')).join(', '));
// 打印第一个文件前 40 行看格式
if (b26.length) {
  const t = fs.readFileSync(b26[0], 'utf8').split('\n');
  console.log('---- format sample ----');
  for (let i = 0; i < Math.min(40, t.length); i++) console.log(t[i].slice(0, 120));
}
