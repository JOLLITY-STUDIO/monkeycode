// 列出 bank_30.asm 中所有地址在 CC00-CC60 / CCD0-CD20 / CF00-CF50 的行（不管前缀格式）
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_30.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');
for (const line of lines) {
  const m = line.match(/0x[0-9A-F]{6} ([0-9A-F]{2}):([0-9A-F]{4}):/);
  if (!m) continue;
  const addr = parseInt(m[2], 16);
  if ((addr >= 0xCC00 && addr <= 0xCC60) || (addr >= 0xCCD0 && addr <= 0xCD20) || (addr >= 0xCF00 && addr <= 0xCF50)) {
    console.log(line.replace(/\s+$/, ''));
  }
}
console.log('done');
