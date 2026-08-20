// 临时: 查名字区记录 $0300+ 消费方 (bank30/bank31/bank26)
const fs = require('fs');
const p = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = p.join(d, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/_bank_(30|31|26)_.*\.asm$/.test(f)) {
      const t = fs.readFileSync(fp, 'utf8').split('\n');
      for (let i = 0; i < t.length; i++) {
        const l = t[i];
        if (/\$0300|\(ram_0034\)/.test(l) && /C -/.test(l)) {
          console.log(fp.replace(/\\/g, '/') + ' L' + (i + 1) + ' ' + l.trim());
        }
      }
    }
  }
}
walk('_tmp_bzk_out');
