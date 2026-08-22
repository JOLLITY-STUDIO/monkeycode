const fs = require('fs');
const c = fs.readFileSync('asm/bank01/_full.s', 'utf8');
const lines = c.split('\n');
const targets = ['A01E','A10D','A4EB','A64C','A6D2','AFC2','AF79','AF8A','B050','A39B','A1AE','A3D0'];
for (const t of targets) {
  console.log('\n=== $' + t + ' ===');
  let found = false;
  lines.forEach(function(l, i) {
    if (l.includes('$' + t) && !found) {
      // 只在行尾注释匹配时打印
      if (l.endsWith('$' + t) || l.includes(';$' + t) || l.includes('; $' + t) || l.trim() === '$' + t) {
        console.log('--- line ' + (i+1) + ' ---');
        for (let j = i; j < Math.min(i + 40, lines.length); j++) {
          console.log((j+1) + ': ' + lines[j]);
        }
        found = true;
      }
    }
  });
  if (!found) {
    // 退而求其次: 找最近的地址
    console.log('(not found as line comment, searching references)');
    lines.forEach(function(l, i) {
      if (l.includes('$' + t)) {
        console.log('  ref at ' + (i+1) + ': ' + l.trim());
      }
    });
  }
}
