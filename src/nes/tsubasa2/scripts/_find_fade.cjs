// 定位 $99F0/$9A0D/$9A35/$9A43/$9A71/$9AB8/$9ADA 渐显渐隐相关子程序
const fs = require('fs');
const path = require('path');

const targets = ['$99F0', '$9A0D', '$9A35', '$9A43', '$9A71', '$9AB8', '$9ADA', '$9AA2', '$9B07', '$9B11', '$9BA0', '$9B91'];
const dir = 'src/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));

for (const file of files) {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split(/\r?\n/);
  let block = [];
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*;.*\$[0-9A-F]{4}:?\s*$/.test(lines[i])) {
      if (block.length) blocks.push(block);
      block = [{ line: i + 1, text: lines[i] }];
    } else {
      block.push({ line: i + 1, text: lines[i] });
    }
  }
  if (block.length) blocks.push(block);
  for (const b of blocks) {
    const joined = b.map(x => x.text).join(' ');
    for (const t of targets) {
      if (joined.includes('; ' + t) || joined.includes('JSR ' + t) || joined.includes('JMP ' + t)) {
        console.log(`=== ${file} 块起始行 ${b[0].line} (${b[0].text.trim()}) 包含 ${t}`);
      }
    }
  }
}
console.log('done');
