const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
// 打印 $CB99 附近代码行
for (const line of lines) {
  const m = line.match(/0x[0-9A-F]{6} \d\d:([0-9A-F]{4}):/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0xCB99 && a <= 0xCBFF) console.log(line);
  }
}
