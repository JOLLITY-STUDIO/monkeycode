const fs = require('fs');
// 1. _full.s 注释/分节结构
const s = fs.readFileSync('asm/bank30/_full.s', 'utf8');
const lines = s.split('\n');
console.log('=== _full.s total lines:', lines.length, '===');
// 找分段标题行（注释含 ===== 或 --- 或大段说明）
lines.forEach((l, i) => {
  if (/^;?\s*[-=]{5,}/.test(l) || /bank30|Bank 30|SECTION|subroutines?|routines?|table/i.test(l) && /^;/.test(l)) {
    console.log((i + 1) + ': ' + l.trim().slice(0, 110));
  }
});
