// 临时脚本：dump ROM 指定偏移的字节，用后删除
const fs = require('fs');
const args = process.argv.slice(2);
const [off, len] = [parseInt(args[0], 16), parseInt(args[1], 16)];
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/rom.nes');
// 尝试找 rom 文件位置
const files = fs.readdirSync('d:/studio/github/monkeycode/src/nes/tsubasa2').filter(f => /\.nes$/i.test(f));
console.log('NES files:', files);
const path = 'd:/studio/github/monkeycode/src/nes/tsubasa2/' + (files[0] || 'rom.nes');
const data = fs.readFileSync(path);
for (let i = 0; i < len; i += 16) {
  const a = off + i;
  const bytes = [];
  for (let j = 0; j < 16 && a + j < data.length; j++) bytes.push(data[a + j].toString(16).padStart(2, '0'));
  console.log((a).toString(16).padStart(6, '0') + ': ' + bytes.join(' '));
}
