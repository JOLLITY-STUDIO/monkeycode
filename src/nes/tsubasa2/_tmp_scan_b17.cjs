// 从 Mesen trace log 提取 bank17 访问 + 统计各 bank 出现次数
const fs = require('fs');
const t = fs.readFileSync('docs/Captain Tsubasa II - Super Striker (Japan)202060822.log', 'utf8');
const lines = t.split(/\r?\n/);
console.log('total lines:', lines.length);

// 行格式: $NN:XXXX: ...  (NN=PRG bank, XXXX=地址)
const bankCount = {};
const b17lines = [];
for (const ln of lines) {
  const m = ln.match(/^\$([0-9A-F]{2}):([0-9A-F]{4}):(.*)$/);
  if (!m) continue;
  const b = parseInt(m[1], 16);
  const addr = m[2];
  const rest = m[3];
  bankCount[b] = (bankCount[b] || 0) + 1;
  if (b === 0x11) b17lines.push(ln.trim());
  if (b === 0x11 && b17lines.length <= 200) {}
}
console.log('\n===== 各 bank 出现次数 (trace 行数) =====');
const entries = Object.entries(bankCount).sort((a, b) => a[0] - b[0]);
for (const [k, v] of entries) console.log('  bank', k, ':', v);
console.log('bank17 行数:', b17lines.length);
console.log('\n===== bank17 前 120 行 =====');
for (const l of b17lines.slice(0, 120)) console.log('  ' + l);
// bank17 访问地址分布
const addrs = {};
for (const l of b17lines) {
  const m = l.match(/^\$11:([0-9A-F]{4})/);
  if (m) {
    const a = parseInt(m[1], 16);
    addrs[a] = (addrs[a] || 0) + 1;
  }
}
console.log('\n===== bank17 访问地址分布 (offset: 次数) =====');
const al = Object.keys(addrs).map(Number).sort((a, b) => a - b);
for (const a of al) console.log('  $' + a.toString(16).padStart(4, '0') + ' : ' + addrs[a]);
