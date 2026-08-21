// 全项目查找 ROM / PRG bank 字节数据
const fs = require('fs');
const path = require('path');
const roots = ['.', '..', '../..', '../../../..'];
const skip = ['node_modules', '.git', 'docs', 'pages', 'scripts', 'test', 'typings', 'mini-audio', 'game-engine-v1.rar', 'trace', 'output'];
function walk(d, out, depth) {
  if (depth > 4) return;
  let items;
  try { items = fs.readdirSync(d); } catch { return; }
  for (const f of items) {
    const p = path.join(d, f);
    let s;
    try { s = fs.statSync(p); } catch { continue; }
    if (s.isDirectory()) {
      if (skip.includes(f)) continue;
      walk(p, out, depth + 1);
    } else if (/\.(nes|bin|prg)$/i.test(f) && s.size > 30000) {
      out.push(p + ' (' + s.size + ')');
    }
  }
  return out;
}
const seen = new Set();
for (const r of roots) {
  const files = walk(r, [], 0);
  for (const f of files) {
    if (!seen.has(f)) { seen.add(f); console.log(f); }
  }
}
console.log('---DONE---');
