/**
 * find_nt_writer.cjs — 从 nt.log 找特定 tile 写入的 i 值, 再到 CPU 段定位代码
 * 用法: node debug/find_nt_writer.cjs 28
 */
const fs = require('fs');

const targetTile = parseInt(process.argv[2] || '28', 16);
const lines = fs.readFileSync('debug/trace/nt.log', 'utf8').split('\n');

// 聚合完整 NT_WRITE 行 (地址行可能跨行)
const re = /\[NT_WRITE\] i(\d+) .*?STA \$2007 = #\$([0-9A-F]+) @ \$([0-9A-F]+) \(NT0/;

const hits = [];
for (const l of lines) {
  const m = re.exec(l);
  re.lastIndex = 0;
  if (!m) continue;
  const tile = parseInt(m[2], 16);
  if (tile === targetTile) {
    hits.push({ i: parseInt(m[1], 10), line: l.slice(0, 140) });
  }
}
console.log(`tile $${targetTile.toString(16)} hits: ${hits.length}`);
// 打印前 20 个 + 最后一个
hits.slice(0, 20).forEach(h => console.log(`  i${h.i}: ${h.line}`));
if (hits.length > 20) {
  console.log('  ...');
  hits.slice(-5).forEach(h => console.log(`  i${h.i}: ${h.line}`));
}

// 找第一批写入的 i 范围
if (hits.length) {
  const first = hits[0].i;
  const last = hits[hits.length - 1].i;
  console.log(`\n写入范围: i${first} - i${last}`);
  console.log(`\n在 cpu 段里定位: 找包含 i${first} 附近的 STA $2007 / LDA #$xx 指令`);
}
