// 搜索关键地址
const fs = require('fs');
const path = require('path');

function grepAll(dir, patterns, ctx = 5) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
  for (const f of files) {
    const full = path.join(dir, f);
    const src = fs.readFileSync(full, 'utf8').split(/\r?\n/);
    for (let i = 0; i < src.length; i++) {
      for (const p of patterns) {
        if (src[i].includes(p)) {
          console.log(`\n### ${dir}\\${f} : ${p} (line ${i + 1})`);
          for (let j = Math.max(0, i - ctx); j <= Math.min(src.length - 1, i + ctx); j++) {
            console.log(`  ${String(j + 1).padStart(4)}| ${src[j]}`);
          }
          break;
        }
      }
    }
  }
}

console.log('========== bank26 中 $0610 ==========');
grepAll(path.join(__dirname, 'asm', 'bank26'), ['$0610']);
console.log('\n========== bank26 中 $060B (位置数组) ==========');
grepAll(path.join(__dirname, 'asm', 'bank26'), ['$060B'], 3);
console.log('\n========== bank31 $EC08-$ED85 比赛时钟段 ==========');
grepAll(path.join(__dirname, 'asm', 'bank31'), ['STA $0517', '$05EA'], 8);
