const fs = require('fs');
const path = require('path');
// 从 cpu.log 找 STA $0020 / STA $20 的所有写入
const cpuLog = fs.readFileSync(path.resolve(__dirname, 'trace/cpu.log'), 'utf8').split('\n');
const writes20 = [];
const writes21 = [];
for (const l of cpuLog) {
  // STA $20 或 STA $0020
  if (l.match(/STA \$20\b/) || l.match(/STA \$0020\b/)) {
    const m = l.match(/STA \$(?:00)?20 = #\$(\w{2})/);
    if (m) {
      const i = l.match(/i(\d+)/)?.[1] || '?';
      writes20.push('i' + i + ' $0020=$' + m[1]);
    }
  }
  if (l.match(/STA \$21\b/) || l.match(/STA \$0021\b/)) {
    const m = l.match(/STA \$(?:00)?21 = #\$(\w{2})/);
    if (m) {
      const i = l.match(/i(\d+)/)?.[1] || '?';
      writes21.push('i' + i + ' $0021=$' + m[1]);
    }
  }
}
// 去重连续相同值
function dedup(arr) {
  const result = [];
  let prev = '';
  for (const e of arr) {
    const val = e.split('=')[1];
    if (val !== prev) {
      result.push(e);
      prev = val;
    }
  }
  return result;
}
console.log('=== $0020 (PPU CTRL) 变化序列 ===');
for (const e of dedup(writes20).slice(0, 30)) console.log('  ' + e);
console.log('\n=== $0021 (PPU MASK) 变化序列 ===');
for (const e of dedup(writes21).slice(0, 30)) console.log('  ' + e);
