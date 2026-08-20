// 临时: 查找 bank26 $9C0F/$9E0D/$9E5A 球 sprite 绘制代码
const fs = require('fs');
const p = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = p.join(d, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/bank_26_part0[4567]\.asm$/.test(f)) {
      const t = fs.readFileSync(fp, 'utf8').split('\n');
      for (let i = 0; i < t.length; i++) {
        const l = t[i];
        const m = l.match(/0D:(9[CE][0-9A-F]{2}):/);
        if (m && /C -/.test(l)) {
          const addr = parseInt(m[1], 16);
          if ((addr >= 0x9C00 && addr <= 0x9D20) || (addr >= 0x9E00 && addr <= 0x9F00)) {
            console.log(fp + ' L' + (i + 1) + ' ' + l.trim());
          }
        }
      }
    }
  }
}
walk('_tmp_bzk_out');
