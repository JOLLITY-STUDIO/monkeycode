// 查看 bank30 $C509 入口及其周边 + $C512 + 相关跳转
const fs = require('fs');
const b30 = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = b30.split(/\r?\n/);
for (const l of lines) {
  const m = l.match(/0x[0-9A-F]{6}\s+0F:([0-9A-F]{4}):\s+([0-9A-F]{2}(?:\s[0-9A-F]{2})*)\s+([A-Z]{3})/);
  if (!m) continue;
  const a = parseInt(m[1], 16);
  if (a >= 0xC500 && a <= 0xC520) {
    console.log(m[1] + ' | ' + m[2] + ' | ' + m[3]);
  }
}
