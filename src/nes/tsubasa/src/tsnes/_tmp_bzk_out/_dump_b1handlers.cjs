// 提取 bank_01.asm 中 CPU $90F0-$91E7 区间（脚本解释器 handler 0-15 + 辅助函数）
const fs = require('fs');
const lines = fs.readFileSync(__dirname + '/bank_01.asm', 'utf8').split(/\r?\n/);
let out = [];
for (const line of lines) {
  const m = line.match(/00:([0-9A-F]{4}):/);
  if (m) {
    const addr = parseInt(m[1], 16);
    if (addr >= 0x90F0 && addr <= 0x91FF) out.push(line);
  }
}
fs.writeFileSync(__dirname + '/_b1_script_handlers.txt', out.join('\n'), 'utf8');
console.log('lines:', out.length);
