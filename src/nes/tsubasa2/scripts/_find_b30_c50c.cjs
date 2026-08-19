// 查找 bank30 中 $C50C / $C527 / $C53C 例程及其引用的数据表
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out/bank_30';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.asm'));
console.log('bank30 files:', files.length);
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (const pat of ['C50C', 'C527', 'C53C']) {
    let found = 0;
    for (let i = 0; i < t.length && found < 6; i++) {
      if (t[i].includes(pat)) {
        console.log(`${f}:${i + 1}  ${t[i].trim()}`);
        found++;
      }
    }
  }
}
