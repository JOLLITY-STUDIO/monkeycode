// 查找 bank_20 相关的 asm / 反汇编文件
const fs = require('fs');
const path = require('path');
function walk(d, out) {
  let items;
  try { items = fs.readdirSync(d); } catch (e) { return; }
  for (const f of items) {
    const p = path.join(d, f);
    let st;
    try { st = fs.statSync(p); } catch (e) { continue; }
    if (st.isDirectory()) {
      if (!f.startsWith('node_modules') && !f.startsWith('.git') && !f.startsWith('mini-audio')) walk(p, out);
    } else if (/bank_20|bank20/i.test(f)) {
      out.push(p);
    }
  }
}
const out = [];
walk('d:/studio/github/monkeycode/src/nes/tsubasa', out);
console.log(out.join('\n'));
