// 检查 bank_00.asm 行格式
const fs = require('fs');
const path = require('path');
const asmPath = path.join(__dirname, '_tmp_bzk_out', 'bank_00.asm');
const lines = fs.readFileSync(asmPath, 'utf8').split(/\r?\n/);
// 打印前 30 行
for (let i = 0; i < 30; i++) console.log(JSON.stringify(lines[i]));
// 搜索 JSR $9A0D
const hits = lines.filter(l => l.includes('9A0D')).slice(0, 5);
console.log('9A0D hits:', hits.length);
hits.forEach(h => console.log(JSON.stringify(h)));
