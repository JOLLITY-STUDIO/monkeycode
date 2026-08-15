// 提取 bank24 $8DC2 精灵数据块指针表 + $86B8/$86C8/$86E8 + $8D40 验证
const fs = require('fs');
const t = fs.readFileSync('_b24_self_window.txt', 'utf8');
const lines = t.split('\n');
const map = new Map();
for (const l of lines) {
  const m = l.match(/0C:([0-9A-Fa-f]{4}): ((?:[0-9A-Fa-f]{2} )*)/);
  if (!m) continue;
  const cpu = parseInt(m[1], 16);
  const bytes = m[2].trim().split(' ').filter(Boolean).map((b) => parseInt(b, 16));
  bytes.forEach((b, i) => map.set(cpu + i, b));
}
function dump(start, end, label) {
  const out = [];
  for (let a = start; a <= end; a++) {
    if (!map.has(a)) continue;
    out.push(`0x${map.get(a).toString(16).toUpperCase().padStart(2, '0')}`);
  }
  console.log(`\n=== ${label} ($${start.toString(16).toUpperCase()}-$${end.toString(16).toUpperCase()}) ${out.length} bytes ===`);
  console.log(out.join(', '));
}
dump(0x8dc2, 0x8ddf, '$8DC2 精灵数据块指针表 (15 项)');
dump(0x86b8, 0x86cf, '$86B8 组属性表 (16)');
dump(0x86c8, 0x86e7, '$86C8 下一块配置表');
dump(0x86e8, 0x8707, '$86E8 源地址表');
dump(0x8686, 0x86a5, '$8686 表');
// 也看看精灵数据块本体 (通过 $8DC2 指针)
for (let i = 0; i < 15; i++) {
  const lo = map.get(0x8dc2 + i * 2);
  const hi = map.get(0x8dc3 + i * 2);
  if (lo === undefined || hi === undefined) continue;
  const ptr = (hi << 8) | lo;
  const blk = [];
  for (let a = ptr; a < ptr + 16; a++) {
    if (!map.has(a)) break;
    blk.push(`0x${map.get(a).toString(16).toUpperCase().padStart(2, '0')}`);
  }
  console.log(`block[${i}] ptr=$${ptr.toString(16).toUpperCase()} (${blk.length}B): ${blk.join(', ')}`);
}
