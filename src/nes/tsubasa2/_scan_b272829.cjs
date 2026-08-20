const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
for (const b of ['bank27', 'bank28', 'bank29']) {
  console.log('=== ' + b + ' ===');
  const t = fs.readFileSync(root + '/' + b + '/_full.s', 'utf8').split(/\r?\n/);
  // 找标号定义行 (可能格式: $8000: 或 LABEL: .byte 带 ; $XXXX 注释)
  let count = 0;
  t.forEach((l, i) => {
    if (/^\$[0-9A-F]{4}:/.test(l.trim())) {
      count++;
      if (count <= 120) console.log((i + 1) + ': ' + l.trim().substring(0, 80));
    }
  });
  console.log('  total labels: ' + count);
}
