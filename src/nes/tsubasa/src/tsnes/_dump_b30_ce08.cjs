// 提取 bank30 $CE08 及其调用者
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
const parse = (l) => {
  const m = l.match(/([0-9A-F]{2}):([0-9A-F]{4}):/);
  return m ? parseInt(m[2], 16) : -1;
};
// $CE08 附近
console.log('═══════ $CDE2-$CEE0 (含 CE08) ═══════');
for (const l of lines) {
  const a = parse(l);
  if (a >= 0xCDE2 && a <= 0xCEE0) console.log(l.trim());
}
// 查找谁 JSR $CE08 或 JSR $CDF8
console.log('\n═══════ 引用 $CE08 的地方 ═══════');
for (const l of lines) {
  if (l.includes('$CE08') || l.includes('$CE0E') || l.includes('$CE2D')) {
    if (!l.includes('0F:CE0')) console.log(l.trim().slice(0, 100));
  }
}
