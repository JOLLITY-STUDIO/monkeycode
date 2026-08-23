// 临时脚本：查找 $0090/$0091/$008E/$008F/$0049 使用点，用后删除
const fs = require('fs');
const path = require('path');
const targets = ['$0090', '$0091', '$008E', '$008F'];
for (const dir of ['src/asm/bank00', 'src/asm/bank02']) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
  for (const f of files) {
    const lines = fs.readFileSync(path.join(dir, f), 'latin1').split(/\r?\n/);
    lines.forEach((ln, i) => {
      for (const t of targets) {
        if (ln.includes(t)) console.log(dir + '/' + f + ':' + (i + 1) + ': ' + ln.trim());
      }
    });
  }
}
