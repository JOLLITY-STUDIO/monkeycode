// 修复 asm/bank01/code_main.s 中大神修复误标时插入的换行注释
// 模式: "指令行\n; $XXXX  (原反\n汇编误标 ...)" → 合并注释行
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'asm', 'bank01', 'code_main.s');
let t = fs.readFileSync(p, 'utf8');

// 先打印所有含"原反"的行区间，确认结构
const lines = t.split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('原反')) console.log((i + 1) + ': [' + JSON.stringify(l.slice(0, 100)) + ']');
});

// 合并: 注释行 "; $XXXX  (原反" 后紧跟独立行 "汇编误标 ...)" → 合并
let before = (t.match(/\(原反[\r\n]/g) || []).length;
t = t.replace(/(;[^\r\n]*\$[0-9A-Fa-f]{4}[^\r\n]*\(原反)[\r\n]+\s*(汇编误标[^\r\n]*)\)/g, (m, c1, c2) => c1 + c2);
fs.writeFileSync(p, t);
let after = (t.match(/\(原反[\r\n]/g) || []).length;
console.log('merged:', before, '-> left:', after);
