// 提取 bank_00.asm: $8895-$8976, $890C-$88FB, $98EA
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_00.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

function dump(start, end, label) {
  console.log(`\n===== ${label} =====`);
  for (const line of lines) {
    const m = line.match(/00:([0-9A-F]{4}):/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr >= start && addr <= end) {
      console.log(line.replace(/\s+$/, ''));
    }
  }
}
dump(0x8895, 0x8920, '$8895 场景选择');
dump(0x8920, 0x8976, '$8920 场景数据加载');
dump(0x890C, 0x88FB, '$890C 精灵移动');
dump(0x88FB, 0x890C, '$88FB attr异或');
dump(0x98EA, 0x9920, '$98EA NT填充');
console.log('\ndone');
