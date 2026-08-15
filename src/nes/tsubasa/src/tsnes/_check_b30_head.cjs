// 查看 bank_30.asm 和 bank_31.asm 的头几行, 确认文件偏移->地址映射
const fs = require('fs');
for (const f of ['_tmp_bzk_out/bank_30.asm', '_tmp_bzk_out/bank_31.asm', '_tmp_bzk_out/bank_29.asm']) {
  console.log('==== ' + f + ' (前 15 行) ====');
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/).slice(0, 15);
  for (const l of lines) console.log(l);
  console.log('');
}
