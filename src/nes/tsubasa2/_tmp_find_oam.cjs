// 1) TS 中 emitSprites 调用点  2) 汇编中 04A5 / 0200 OAM 转换引用
const fs = require('fs'), p = require('path');

console.log('=== TS emitSprites 调用点 ===');
(function w(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = p.join(d, e.name);
    if (e.isDirectory()) { if (/node_modules|dist|_tmp/.test(f)) continue; w(f); continue; }
    if (/\.ts$/.test(e.name)) {
      const s = fs.readFileSync(f, 'utf8');
      const ls = s.split('\n');
      ls.forEach((ln, i) => {
        if (/emitSprites|setPos|setBank/.test(ln)) {
          console.log(p.relative('.', f).replace(/\\/g, '/') + ':' + (i + 1) + ': ' + ln.trim().slice(0, 100));
        }
      });
    }
  }
})(process.cwd());

console.log('\n=== 汇编中 04A5 引用 (bank24/30/31) ===');
(function w(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = p.join(d, e.name);
    if (e.isDirectory()) { w(f); continue; }
    if (/bank_(24|30|31)_.*\.asm$/.test(e.name)) {
      const s = fs.readFileSync(f, 'utf8');
      const ls = s.split('\n');
      ls.forEach((ln, i) => {
        if (/04A5/.test(ln) && /ram_04A5|04A5/.test(ln)) {
          console.log(p.relative('.', f).replace(/\\/g, '/') + ':' + (i + 1) + ': ' + ln.trim().slice(0, 110));
        }
      });
    }
  }
})('_tmp_bzk_out');
