// 搜索所有 bank asm 中对 A484 / A4C1 / A559 / A5DC / A651 / A69D / A77B / A7BE / A7CF / A7D7 / A82F 的引用
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => /bank_\d+\.asm$/.test(f));
const targets = ['$A484', '$A4C1', '$A559', '$A5DC', '$A651', '$A69D', '$A77B', '$A7BE', '$A7CF', '$A7D7', '$A82F', '$A206', '$A20C', '$A20F', '$A212', '$A215', '$A21B', '$A2AF', '$A2E8', '$A855', '$A86E', '$A8CE'];
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    for (const t of targets) {
      // 只匹配引用（不在定义行，定义行形如 $A484: ...）
      if (lines[i].includes(t) && !lines[i].includes(t + ':')) {
        hits.push(`${i + 1}: ${lines[i].trim()}`);
        break;
      }
    }
  }
  if (hits.length) {
    console.log(`===== ${f} =====`);
    console.log(hits.join('\n'));
    console.log('');
  }
}
