// 打印 $99F0/$9A0D/$9A35/$9A43/$9A71/$9AA2/$9AB8/$9ADA/$9B07/$9B11 附近代码
const fs = require('fs');
const path = require('path');

const targets = ['$99F0', '$9A0D', '$9A35', '$9A43', '$9A71', '$9AA2', '$9AB8', '$9ADA', '$9B07', '$9B11', '$9BA0', '$9B91', '$9FA8', '$9F69'];
const dir = 'src/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));

for (const file of files) {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const t of targets) {
      // 匹配行注释里的 " ; $9A0D" 且不是 JSR/JMP 调用
      const m = line.match(/;\s*(\$[0-9A-F]{4})/);
      if (m && m[1] === t) {
        console.log(`\n############ ${file}:${i + 1} 找到 ${t} (行 ${i + 1} - ${i + 45}) ############`);
        for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 45); j++) {
          console.log(`${String(j + 1).padStart(4)}|${lines[j]}`);
        }
        break;
      }
    }
  }
}
console.log('\n===== done =====');
