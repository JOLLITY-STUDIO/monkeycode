// 临时：在 bank00/bank02 查找场景 1-13（$855A/$A55A 起）
const fs = require('fs');
const path = require('path');
for (const dir of ['src/asm/bank00', 'src/asm/bank02']) {
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.s'))) {
    const ls = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    ls.forEach((l, i) => {
      if (l.includes('855A') || l.includes('A55A')) {
        console.log(`${dir}/${f} line ${i + 1}: ${l.trim()}`);
      }
    });
  }
}
