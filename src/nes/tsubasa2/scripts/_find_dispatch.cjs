// 搜索 dispatch($8486) 调用者、$9B91 调用者、场景入口代码 RTS 返回值的消费方式
const fs = require('fs');
const path = require('path');
const roots = {
  bank00: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00',
  bank02: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank02',
  bank30: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank30',
  bank31: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank31',
};
const targets = ['8486', '9B91', 'A55A', 'A2F8', 'A200', '9EED', '8491'];
for (const [tag, dir] of Object.entries(roots)) {
  if (!fs.existsSync(dir)) { console.log(`-- ${tag}: 目录不存在`); continue; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
  for (const f of files) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    lines.forEach((ln, i) => {
      for (const t of targets) {
        if (new RegExp('\\b' + t + '\\b', 'i').test(ln)) {
          // 只看 JSR/JMP/LDA 引用该地址的行（排除注释行尾定义）
          if (/(JSR|JMP|JMP \()\s+\$?'?0?'?'?'?'?'?'?'?\s*[A-F0-9]{0,2}\$?'?0?'?'?'?'?'?'?/i.test(ln) || new RegExp('(JSR|JMP)\\s+\\$' + t, 'i').test(ln)) {
            console.log(`${tag}/${f}:${i + 1}  ${ln.trim()}`);
            break;
          }
        }
      }
    });
  }
}
