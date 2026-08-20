const fs = require('fs');
const path = require('path');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
// 1. 3位小写 key 残留 (ram_xxx 3位 或 含小写字母)
console.log('===== 3位/小写 ram_ key 残留 =====');
let n = 0;
for (const f of walk('src')) {
  if (!/\.ts$/.test(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  const lines = s.split('\n');
  lines.forEach((l, i) => {
    const t = l.trim();
    if (t.startsWith('//') || t.startsWith('*')) return;
    const m = t.match(/ram_[0-9a-f]{1,3}['"]|ram_[0-9A-F]*[a-f][0-9A-Fa-f]*['"]/);
    if (m) { n++; console.log(f + ':' + (i + 1) + ': ' + t.slice(0, 100)); }
  });
}
console.log('TOTAL: ' + n);
// 2. bank19 验证脚本 runBoth/初始化
console.log('\n===== _verify_bank19.cjs 初始化逻辑 =====');
const s19 = fs.readFileSync('_verify_bank19.cjs', 'utf8');
const lines19 = s19.split('\n');
lines19.forEach((l, i) => {
  if (/function runBoth|new DataStore|new RefMem|ref\.m|store\.ram|oamShadow/.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 100));
});
