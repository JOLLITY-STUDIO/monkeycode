// 读取固定 bank $8AEC 区域 (脚本 ID 映射表)
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_00');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));

for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('00:8AEC')) {
      console.log(`FOUND in ${f} line ${i + 1}`);
      // 打印 8AEC 起 100 行
      for (let j = i; j < Math.min(i + 100, lines.length); j++) {
        console.log(`${j + 1}: ${lines[j].trimEnd()}`);
      }
      process.exit(0);
    }
  }
}
console.log('not found 8AEC');
