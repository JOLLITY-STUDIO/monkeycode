const fs = require('fs');
const l = fs.readFileSync('debug/trace/scene.log', 'utf8').split('\n').filter(x => x);
console.log('总行数', l.length);
const cnt = {};
for (const x of l) {
  const m = x.match(/scene=\$([0-9A-F]{2})/);
  if (m) cnt[m[1]] = (cnt[m[1]] || 0) + 1;
}
console.log('场景分布:', cnt);
console.log('--- 前 20 行 ---');
console.log(l.slice(0, 20).join('\n'));
console.log('--- 场景变化点 ---');
let prev = null;
for (const x of l) {
  const m = x.match(/scene=\$([0-9A-F]{2})/);
  if (m && m[1] !== prev) {
    console.log(x);
    prev = m[1];
  }
}
