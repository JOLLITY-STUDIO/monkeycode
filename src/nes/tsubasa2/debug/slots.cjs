const fs = require('fs');
const path = require('path');
// 从 cpu.log 搜 STA $0000-$0018 区间写入 (协程槽 $0000+X)
// 格式: i{count}  ${bank}:{pc}: {bytes} {mnemonic} ${addr} = #${val}
const cpuLog = fs.readFileSync(path.resolve(__dirname, 'trace/cpu.log'), 'utf8').split('\n');
const slotWrites = {};
for (const l of cpuLog) {
  // STA $00-$18 (零页, 协程槽区)
  const m = l.match(/STA \$(00[0-9A-F]{2}) = #\$(\w{2})/);
  if (m) {
    const addr = parseInt(m[1], 16);
    if (addr <= 0x18) {
      if (!slotWrites[addr]) slotWrites[addr] = [];
      const i = l.match(/i(\d+)/)?.[1] || '?';
      slotWrites[addr].push('i' + i + '=$' + m[2]);
    }
  }
}
console.log('=== 协程槽 $0000-$0018 写入序列 ===');
for (let addr = 0; addr <= 0x18; addr++) {
  if (slotWrites[addr]) {
    const vals = slotWrites[addr];
    // 去重连续相同值
    const dedup = [];
    let prev = '';
    for (const v of vals) {
      const val = v.split('=')[1];
      if (val !== prev) { dedup.push(v); prev = val; }
    }
    console.log('$' + addr.toString(16).padStart(4,'0').toUpperCase() + ': ' + dedup.slice(0, 10).join(', ') + (dedup.length > 10 ? ' ... (' + dedup.length + ')' : ''));
  }
}
