// 查找 bank_30.asm 中 CC02 / CCD2 / CF1F 的位置
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_30.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/\$CC02|\$CCD2|\$CF1F/.test(lines[i])) {
    console.log(`line ${i + 1}: ${lines[i].replace(/\s+$/, '')}`);
  }
}
console.log('done');
