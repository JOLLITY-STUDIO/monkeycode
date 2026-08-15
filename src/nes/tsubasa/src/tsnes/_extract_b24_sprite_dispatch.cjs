const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_24.asm', 'utf8').split('\n');
const addrs = ['89B4','89BC','89FA','8A12','8A43','8A86','8A93','8AAF','8AB8','8AC1','8AD7','8AE7','8B2F','8B48','8B8B','8BD5','8BDE','8BEA','8BF0','8C04','8C47','8C52','8C55','8C85','8C9F','8CA5','8CDC','8D1A','8D6C'];
const re = /\b([0-9A-F]{4}):\s/i;
const out = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(re);
  if (m && addrs.includes(m[1].toUpperCase())) {
    let cnt = 0;
    while (i < lines.length && cnt < 70) {
      out.push(lines[i]);
      i++;
      cnt++;
      const mm = lines[i] ? lines[i].match(re) : null;
      if (mm && addrs.includes(mm[1].toUpperCase())) break;
    }
    out.push('-----');
  }
}
console.log(out.join('\n'));
