// 查找 bank_00.asm 中 9FA8 结尾 + 其他小函数
const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'bank_00.asm');
if (!fs.existsSync(f)) { console.log('bank_00.asm not found'); process.exit(0); }
const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
const targets = ['9FA8', '9F69', '890C', '8895', '9B28', '9B5E', '98EA'];
for (let i = 0; i < lines.length; i++) {
  for (const t of targets) {
    if (lines[i].includes(':' + t + ':')) {
      const start = Math.max(0, i - 1);
      const end = Math.min(lines.length - 1, i + 16);
      console.log(`===== ${t} @ line ${i + 1} =====`);
      for (let j = start; j <= end; j++) console.log(lines[j]);
      console.log('');
    }
  }
}
