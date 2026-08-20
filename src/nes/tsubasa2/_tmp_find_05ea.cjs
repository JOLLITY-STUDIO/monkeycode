// 搜索反汇编/汇编文件中的 ram_05EA 引用
const fs = require('fs'), p = require('path');
const roots = ['asm', '_tmp_bzk_out'];
for (const dir of roots) {
  if (!fs.existsSync(dir)) { console.log(dir, '不存在'); continue; }
  const hits = [];
  (function w(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = p.join(d, e.name);
      if (e.isDirectory()) { w(f); continue; }
      if (/\.(asm|s|inc|txt)$/i.test(e.name)) {
        const s = fs.readFileSync(f, 'utf8');
        const ls = s.split('\n');
        ls.forEach((ln, i) => {
          if (/05EA/.test(ln)) {
            hits.push(p.relative('.', f).replace(/\\/g, '/') + ':' + (i + 1) + ': ' + ln.trim().slice(0, 110));
          }
        });
      }
    }
  })(dir);
  console.log('=== ' + dir + ' 命中:' + hits.length);
  console.log(hits.slice(0, 50).join('\n'));
}
