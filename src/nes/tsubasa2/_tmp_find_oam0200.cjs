// 搜索所有 bank 汇编中 $0200 硬件 OAM 写入 (9D 00 02 / 99 00 02 / 8D 00 02) 与 $04A5 全引用
const fs = require('fs'), p = require('path');
const dir = '_tmp_bzk_out';
const hits = [];
(function w(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = p.join(d, e.name);
    if (e.isDirectory()) { w(f); continue; }
    if (/\.asm$/.test(e.name)) {
      const s = fs.readFileSync(f, 'utf8');
      const ls = s.split('\n');
      ls.forEach((ln, i) => {
        const t = ln.trim();
        if (/ram_0200|04A5|STA \$0200|ram_0202|ram_0201/.test(t) && /[0-9A-F]{2}:[0-9A-F]{4}:/.test(t)) {
          hits.push(p.relative('.', f).replace(/\\/g, '/') + ':' + (i + 1) + ': ' + t.slice(0, 115));
        }
      });
    }
  }
})(dir);
console.log('命中:', hits.length);
console.log(hits.slice(0, 80).join('\n'));
