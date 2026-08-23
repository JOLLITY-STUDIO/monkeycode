// 临时脚本：在 _full.s 中定位子程序定义行，用后删除
const fs = require('fs');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/_full.s';
const syms = ['9FA8', '9A0D', '890C', '88FB', '99F0', '9B7F', '98A0', '98EA', '9A35', '8AF7', '8920', '9B28', '9B5E', '9A71', '9AA2', '9AB8', '9ADA', '9DEE', '9A31', '99D1', '997A', '9EA2', '9EFB', '9F04'];
const lines = fs.readFileSync(file, 'latin1').split(/\r?\n/);
for (const s of syms) {
  lines.forEach((ln, i) => {
    // 定义行：行首是地址标签（形如 "9FA8:"）或注释里 "$9FA8:" 后跟指令
    if (new RegExp('^\\s*' + s + '\\s*:').test(ln)) {
      console.log('=== ' + s + ' @line ' + (i + 1) + ' ===');
      console.log(ln.trim());
      // 打印后面 4 行作为上下文
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) console.log('  | ' + lines[j].trim());
    }
  });
}
