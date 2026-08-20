// 检查 bank30 ram_0000+ 用法
const fs = require('fs');
const path = require('path');

const full = path.join(__dirname, 'src', 'game', 'service', 'bank30_init.service.ts');
const src = fs.readFileSync(full, 'utf8').split(/\r?\n/);
for (let i = 0; i < src.length; i++) {
  if (src[i].includes('ram_0000')) {
    console.log(`\n### line ${i + 1}`);
    for (let j = Math.max(0, i - 3); j <= Math.min(src.length - 1, i + 3); j++) {
      console.log(`  ${String(j + 1).padStart(4)}| ${src[j]}`);
    }
  }
}
