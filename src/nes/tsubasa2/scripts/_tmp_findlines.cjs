// 临时脚本: 在 asm 文件中查找地址所在行号
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_01');
const targets = process.argv.slice(2).map(t => t.toUpperCase());

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.asm')) continue;
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/00:([0-9A-F]{4}):/);
    if (!m) continue;
    const addr = m[1];
    if (targets.includes(addr)) {
      console.log(`${file}:${i + 1}: ${lines[i].trimEnd()}`);
    }
  }
}
