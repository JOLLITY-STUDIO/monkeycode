// 在 asm 文件中定位关键地址上下文
const fs = require('fs');
const path = require('path');

function grep(file, patterns, ctx = 6) {
  const src = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let i = 0; i < src.length; i++) {
    for (const p of patterns) {
      if (src[i].includes(p)) {
        console.log(`\n### ${path.basename(file)} : ${p} (line ${i + 1})`);
        for (let j = Math.max(0, i - ctx); j <= Math.min(src.length - 1, i + ctx); j++) {
          console.log(`  ${String(j + 1).padStart(4)}| ${src[j]}`);
        }
        break;
      }
    }
  }
}

// bank26 $95E1 战术调整
grep(path.join(__dirname, 'asm', 'bank26', 'code_sub.s'), ['$95E1', 'STA $0610']);
grep(path.join(__dirname, 'asm', 'bank26', 'code_main.s'), ['$95E1', 'STA $0610']);
grep(path.join(__dirname, 'asm', 'bank26', 'code_data.s'), ['$95E1', 'STA $0610']);

// bank31 比赛时钟
grep(path.join(__dirname, 'asm', 'bank31', 'code_main.s'), ['$EC08', '$ED0F', 'DEC $005E', 'DEC $0072']);
