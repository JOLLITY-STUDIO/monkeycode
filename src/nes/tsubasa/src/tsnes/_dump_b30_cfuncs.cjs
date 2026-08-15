// 提取 bank30 固定区函数完整代码
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
const ranges = [[0xCB00, 0xCE20], [0xE200, 0xE250]];
const parse = (l) => {
  const m = l.match(/([0-9A-F]{2}):([0-9A-F]{4}):/);
  return m ? parseInt(m[2], 16) : -1;
};
for (const [lo, hi] of ranges) {
  console.log('═══════════ $' + lo.toString(16) + '-$' + hi.toString(16) + ' ═══════════');
  let cur = lo;
  for (const l of lines) {
    const a = parse(l);
    if (a >= lo && a <= hi) console.log(l.trim());
  }
}
