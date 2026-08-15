// 临时搜索脚本: 定位 bank_11.asm 关键表/区段
const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8').split(/\r?\n/);
const pats = ['86EE', '86F0', '87F6', '81D5', '827F', '8B42', '81BC', '8185', '84A1'];
for (const pat of pats) {
  let n = 0;
  t.forEach((l, i) => {
    if (l.includes(pat) && n < 4) {
      console.log(pat, '->', i + 1, ':', l.trim().slice(0, 100));
      n++;
    }
  });
  console.log('---');
}
