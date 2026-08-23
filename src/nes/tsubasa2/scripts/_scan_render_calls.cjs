/* 扫描 bank00/bank02/bank31 中对 code_render 入口的调用点（临时脚本，用后删除） */
const fs = require('fs');
const path = require('path');

const targets = ['8EF0', '8FD1', '9049', '9071', '9076', '9085', '9143', '94D8', '9684', '92E6', '9693'];
const dirs = ['bank00', 'bank01', 'bank02', 'bank11', 'bank30', 'bank31'];

for (const d of dirs) {
  const full = path.join(__dirname, '..', 'src', 'asm', d);
  if (!fs.existsSync(full)) continue;
  const files = fs.readdirSync(full).filter((f) => f.endsWith('.s'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(full, f), 'utf8');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = /JSR \$(8EF0|8FD1|9049|9071|9076|9085|9143|94D8|9684)\b|JMP \$(8EF0|8FD1|9049|9071|9076|9085|9143|94D8|9684)\b|LDA \$(92E6|9693),X/.exec(lines[i]);
      if (m) {
        const addr = m[1] || m[2] || m[3];
        console.log(`${d}/${f}:${i + 1}: ${lines[i].trim()}  (target $${addr})`);
      }
    }
  }
}
