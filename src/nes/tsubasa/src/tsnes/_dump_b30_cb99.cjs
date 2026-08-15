// 精确提取 bank30 $CB99-$CBAD 原始行（不过滤、不格式化）
const fs = require('fs');
const b30 = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = b30.split(/\r?\n/);
for (const l of lines) {
  const m = l.match(/0x[0-9A-F]{6}\s+0F:([0-9A-F]{4}):\s+([0-9A-F]{2}(?:\s[0-9A-F]{2})*)\s+([A-Z]{3})/);
  if (!m) continue;
  const a = parseInt(m[1], 16);
  if (a >= 0xCB90 && a <= 0xCBB0) {
    console.log(m[1] + ' | ' + m[2] + ' | ' + m[3]);
  }
}
