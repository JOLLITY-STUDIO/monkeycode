const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
// 1) 最近修改的脚本/测试文件
const all = [];
const walk = (p, depth) => {
  if (depth > 3) return;
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (/node_modules|dist|\.git|output|docs/.test(p)) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), depth + 1);
  } else {
    all.push({ p, t: st.mtimeMs });
  }
};
walk(root, 0);
all.sort((a, b) => b.t - a.t);
console.log('== 最近 40 个文件 ==');
all.slice(0, 40).forEach((f) => console.log(new Date(f.t).toISOString().slice(0, 19), f.p));
