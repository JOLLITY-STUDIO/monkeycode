/* 临时脚本：全 asm 目录搜例程定义（用完删除） */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm');
const re = /;\s*\$?(A72C|A767|A82F|AC6D|AC71|A677|A67B|AA97|8A14|978B)\s*$/;
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.s')) {
      const lines = fs.readFileSync(p, 'latin1').split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (re.test(lines[i])) console.log((i + 1) + ': ' + lines[i].trim() + '  [' + p + ']');
      }
    }
  }
}
walk(dir);
console.log('done');
