// 临时：搜索 $00E5 写点和 $978B 数据
const fs = require('fs');
const path = require('path');
for (const dir of ['src/asm/bank00', 'src/asm/bank02']) {
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.s'))) {
    const ls = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    ls.forEach((l, i) => {
      if (/00E5|978B/.test(l)) console.log(`${dir}/${f} ${i + 1}: ${l.trim()}`);
    });
  }
}
