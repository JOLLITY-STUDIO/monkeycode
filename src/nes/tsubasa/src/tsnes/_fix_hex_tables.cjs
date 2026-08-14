// 修复自动生成数据表中的裸 hex 字面量 (81, c1 → 0x81, 0xc1)
const fs = require('fs');

function fixFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let inArray = false;
  const out = lines.map((line) => {
    // 若本行关闭数组，先处理后关闭
    if (line.includes(']')) inArray = false;
    if (inArray) {
      line = line.replace(/(?<![0-9a-zA-Z_])([0-9a-fA-F]{1,4})(?![0-9a-zA-Z_])/g, (m, hex) => {
        return '0x' + hex.toUpperCase();
      });
    }
    // 若本行打开数组，再标记为数组内
    if (line.includes('[')) inArray = true;
    return line;
  });
  fs.writeFileSync(file, out.join('\n'));
  console.log('fixed: ' + file);
}

const base = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/';
fixFile(base + 'bank01-tables.ts');
fixFile(base + 'bank02-tables.ts');
