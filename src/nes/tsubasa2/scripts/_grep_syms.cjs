// 临时脚本：在 bank00 asm 中定位子程序符号地址，用后删除
const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00';
const syms = ['9FA8', '9A0D', '890C', '88FB', '99F0', '9B7F', '98A0', '98EA', '9A35', '8AF7', '8920', '9B28', '9B5E', '9A71', '9AA2', '9AB8', '9ADA', '9DEE'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'latin1').split(/\r?\n/);
  lines.forEach((ln, i) => {
    for (const s of syms) {
      const m = ln.match(new RegExp('^\\s*' + s + '\\s*:')) || ln.match(new RegExp('JSR\\s*\\$?' + s + '\\b')) || ln.match(new RegExp('JMP\\s*\\$?' + s + '\\b'));
      if (m) console.log(f + ':' + (i + 1) + ': ' + ln.trim());
    }
  });
}
