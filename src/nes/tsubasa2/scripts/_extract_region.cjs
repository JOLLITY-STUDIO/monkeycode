// 临时脚本：从 _full.s 提取指定地址区域（按行号含地址注释）
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'asm', 'bank00', '_full.s');
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

function extract(range) {
  const [start, end] = range;
  let buf = [];
  for (const line of lines) {
    const m = line.match(/^\s*(\S+)?\s+.*\;\s*\$([0-9A-F]{4})/i);
    const addr = m ? parseInt(m[2], 16) : null;
    if (addr === null) continue;
    if (addr >= start && addr <= end) buf.push(line);
  }
  return buf.join('\n');
}

console.log('===== $9480-$94C5 =====');
console.log(extract([0x9480, 0x94c5]));
console.log('\n===== $9F60-$9FB0 =====');
console.log(extract([0x9f60, 0x9fb0]));
console.log('\n===== $92E0-$9300 =====');
console.log(extract([0x92e0, 0x9300]));
