// 从 self_window 提取 bank24 数据表区域原始字节
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
console.log('mapped bytes:', map.size);
function dump(start, end, label) {
  const out = [];
  for (let a = start; a <= end; a++) {
    if (!map.has(a)) continue;
    out.push(`0x${map.get(a).toString(16).toUpperCase().padStart(2, '0')}`);
  }
  console.log(`\n=== ${label} ($${start.toString(16).toUpperCase()}-$${end.toString(16).toUpperCase()}) ${out.length} bytes ===`);
  console.log(out.join(', '));
}
dump(0x89b7, 0x89f9, '$89B4 dispatch 表 (16 项指针)');
dump(0x8a12, 0x8a1f, '$8A12 dispatch 表 (4 项指针)');
dump(0x8aac, 0x8ab3, '$8AAC 位置表');
dump(0x8b0a, 0x8b11, '$8B0A 表');
dump(0x8b72, 0x8b8a, '$8B72 表 (5x5)');
dump(0x8bc9, 0x8bd4, '$8BC9 数字表');
dump(0x8d04, 0x8d0b, '$8D04 表');
dump(0x8d40, 0x8d6b, '$8D40 表');
dump(0x8d9e, 0x8e1f, '$8D9E 精灵图案表');
