// 搜索所有 bank asm 中调用 entryF ($A212 / 8484) 的位置及其返回处理
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const targets = ['20 12 A2', '20 84 A4', '4C 12 A2', '4C 84 A4', 'A212', 'A484'];
const files = fs.readdirSync(dir).filter(f => /^bank_\d+\.asm$/.test(f));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'latin1').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/JSR \$A212|JMP \$A212|JSR \$8484|JMP \$8484/.test(line)) {
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length, i + 8);
      console.log(`--- ${f} line ${i + 1} ---`);
      for (let j = start; j < end; j++) console.log(lines[j].replace(/\s+$/, ''));
    }
  }
}
console.log('done');
