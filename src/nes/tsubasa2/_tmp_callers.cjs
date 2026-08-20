// 临时: 查 $911C/$85AC/$8BD4 调用方
const fs = require('fs');
const p = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = p.join(d, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/bank_26.*\.asm$/.test(f)) {
      const t = fs.readFileSync(fp, 'utf8').split('\n');
      for (let i = 0; i < t.length; i++) {
        const l = t[i];
        if (/JSR \$911C|JSR \$85AC|JSR \$8BD4|JSR \$9D1B|JSR \$9C0F/.test(l)) {
          console.log(fp.replace(/\\/g, '/') + ' L' + (i + 1) + ' ' + l.trim());
        }
      }
    }
  }
}
walk('_tmp_bzk_out');
