// _find_9fa8.cjs — 找 $9FA8 wait 函数实现
const fs = require('fs');
const files = ['src/asm/bank02/code_sub.s', 'src/asm/bank00/code_sub.s', 'src/asm/bank00/code_main.s'];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = /;\s*\$9FA8/.exec(lines[i]);
    if (m) {
      console.log('=== ' + f + ' line ' + (i + 1) + ' ===');
      for (let j = i; j < Math.min(i + 30, lines.length); j++) console.log(lines[j]);
      console.log('');
    }
  }
}
