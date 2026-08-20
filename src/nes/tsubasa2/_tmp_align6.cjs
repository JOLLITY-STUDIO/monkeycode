// 检查 bank24/bank26 数组键格式一致性
const fs = require('fs');
const path = require('path');

function show(file, patterns, ctx = 1) {
  const full = path.join(__dirname, 'src', 'game', 'service', file);
  const src = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  for (let i = 0; i < src.length; i++) {
    for (const p of patterns) {
      if (src[i].includes(p)) {
        console.log(`\n### ${file} : ${p} (line ${i + 1})`);
        for (let j = Math.max(0, i - ctx); j <= Math.min(src.length - 1, i + ctx); j++) {
          console.log(`  ${String(j + 1).padStart(4)}| ${src[j]}`);
        }
        break;
      }
    }
  }
}

console.log('===== bank24 KEY_060B / KEY_0601 读写 =====');
show('bank24_hud.service.ts', ['KEY_060B', 'KEY_0601', 'KEY_0602', 'KEY_0603', '_readArr', '_writeArr']);

console.log('\n===== bank26 _readArr/_writeArr 定义 =====');
show('bank26_match.service.ts', ['_readArr(baseKey', '_writeArr(baseKey']);
