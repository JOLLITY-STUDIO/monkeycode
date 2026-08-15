// 在 bank_30.asm 中查找 C4B9 / C4BD / C557 语义
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname);
const f = path.join(dir, 'bank_30.asm');
if (!fs.existsSync(f)) { console.log('bank_30.asm not found'); process.exit(0); }
const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
const targets = ['$C4B9', '$C4BD', '$C557', '$C503', '$C400', '$C4B2'];
for (let i = 0; i < lines.length; i++) {
  for (const t of targets) {
    if (lines[i].includes(t) || lines[i].includes(t.replace('$', ''))) {
      // print surrounding context
      const start = Math.max(0, i - 4);
      const end = Math.min(lines.length - 1, i + 20);
      console.log(`===== ${t} @ line ${i + 1} =====`);
      for (let j = start; j <= end; j++) console.log(lines[j]);
      console.log('');
    }
  }
}
