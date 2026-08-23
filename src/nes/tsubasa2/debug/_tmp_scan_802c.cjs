const fs = require('fs');
const path = require('path');
const files = [
  path.resolve(__dirname, '../asm/bank00/_full.s'),
  path.resolve(__dirname, '../asm/bank00/code_main.s'),
  path.resolve(__dirname, '../asm/bank00/code_scene.s'),
  path.resolve(__dirname, '../asm/bank00/code_sub.s'),
];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    // 搜 $802C 附近或 $001E bit4 语义
    if (/(802C|802D|802E|802F)/i.test(line) || (line.includes('001E') && line.includes('10'))) {
      const start = Math.max(0, i - 4);
      const end = Math.min(lines.length, i + 5);
      console.log(`── ${path.basename(f)}:${i + 1} ──`);
      for (let j = start; j < end; j++) console.log(lines[j]);
      console.log('');
    }
  });
}
