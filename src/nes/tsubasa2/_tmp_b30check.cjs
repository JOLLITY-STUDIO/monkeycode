const fs = require('fs');
const s = fs.readFileSync('src/game/service/bank30_init.service.ts', 'utf8');
const lines = s.split('\n');
console.log('total lines:', lines.length);
// 找所有 doc 注释的 asm 地址标注 + 方法签名
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/对应原始 \$[CD][0-9A-F]{3}/.test(l)) {
    console.log('L' + (i + 1) + ': ' + l.trim().slice(0, 100));
    // 打印后面最近的签名行
    for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
      if (/^  (public |private )?\w+\(/.test(lines[j].trim())) {
        console.log('    -> L' + (j + 1) + ': ' + lines[j].trim().slice(0, 100));
        break;
      }
    }
  }
}
