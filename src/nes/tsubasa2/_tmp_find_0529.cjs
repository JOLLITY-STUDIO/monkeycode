// 搜索 ram_0529/052B/052C/052D/052E/052F/0530/0531 STA 位置 + $EB86/$ECxx 调用者
const fs = require('fs'), p = require('path');
const dir = '_tmp_bzk_out';
const pats = [/0529/, /052B/, /052C/, /052D/, /052E/, /052F/, /0530/, /0531/, /EB86/, /ED06/, /ED19/, /0523/, /0524/];
const hits = [];
(function w(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = p.join(d, e.name);
    if (e.isDirectory()) { w(f); continue; }
    if (/\.(asm)$/i.test(e.name)) {
      const s = fs.readFileSync(f, 'utf8');
      const ls = s.split('\n');
      ls.forEach((ln, i) => {
        for (const re of pats) {
          if (re.test(ln) && /[A-Z]{2}\s+ram_05|JSR \$EB|JSR \$ED|JMP \$EB/.test(ln)) {
            hits.push(p.relative('.', f).replace(/\\/g, '/') + ':' + (i + 1) + ': ' + ln.trim().slice(0, 110));
            break;
          }
        }
      });
    }
  }
})(dir);
console.log('命中:', hits.length);
console.log(hits.join('\n'));
