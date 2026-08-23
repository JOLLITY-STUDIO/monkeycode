// 定位 bank02 各场景入口（$A55A-$A7FB）所在文件与行号
const fs = require('fs');
const dir = 'src/asm/bank02';
const want = ['$A559', '$A55A', '$A57B', '$A581', '$A5A2', '$A5A8', '$A5B0', '$A5B8', '$A5BF', '$A5CD', '$A5DB', '$A5E8', '$A602', '$A61C', '$A629', '$A650', '$A69C', '$A77A', '$A782', '$A78D', '$A7BD', '$A7CE', '$A7D6', '$A7FA'];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(`${dir}/${f}`, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const w of want) {
      if (l.includes(`; ${w}`)) { console.log(`${f}:${i + 1}: ${l.trim()}`); break; }
    }
  });
}
