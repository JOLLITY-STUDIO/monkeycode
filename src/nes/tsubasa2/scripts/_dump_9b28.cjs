// 临时脚本：dump bank00 code_sub.s 中 $9B28 附近行（找 $9B28/$9B5E 定义）
const fs = require('fs');
const path = 'src/asm/bank00/code_sub.s';
const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
// 打印所有含 9B2x/9B5E 或地址在 $9B00-$9B90 的行
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/;\s*\$([0-9A-F]{4})\s*$/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x9b00 && a <= 0x9b95) {
      console.log(String(i + 1).padStart(4) + '|' + lines[i]);
    }
  }
}
