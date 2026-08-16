// 临时: 从 bank_16.asm 提取 CPU 地址区间 (用法: node _tmp_asm_probe.cjs 86CC-86E2)
const fs = require('fs');
const lo = parseInt(process.argv[2].split('-')[0], 16);
const hi = parseInt(process.argv[2].split('-')[1], 16);
const L = fs.readFileSync('_tmp_bzk_out/bank_16.asm', 'utf8').split(/\r?\n/);
const f = [];
for (const l of L) {
  const m = l.match(/08:([0-9A-F]{4})/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= lo && a <= hi) f.push(l);
  }
}
console.log(f.join('\n'));
