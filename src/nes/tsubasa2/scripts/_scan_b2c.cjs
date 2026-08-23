// 定位 bank02 场景 12-23 代码（CPU 地址 $8602-$87FA）
const fs = require('fs');
const dir = 'src/asm/bank02';
const want = ['$8602', '$861C', '$8629', '$8650', '$869C', '$877A', '$8782', '$878D', '$87BD', '$87CE', '$87D6', '$87FA'];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(`${dir}/${f}`, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const w of want) {
      if (l.includes(`; ${w}`)) { console.log(`${f}:${i + 1}: ${l.trim()}`); break; }
    }
  });
}
