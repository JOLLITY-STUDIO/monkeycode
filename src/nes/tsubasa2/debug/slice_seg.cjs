/** slice_seg.cjs — 按 i 范围切片 cpu 段日志 (聚合跨行指令) */
const fs = require('fs');
const file = process.argv[2];
const iStart = parseInt(process.argv[3] || '0', 10);
const iEnd = parseInt(process.argv[4] || '100', 10);

const lines = fs.readFileSync(file, 'utf8').split('\n');
// 聚合: 每行可能以 "i数字  $addr: " 开始新指令, 后续行是续行
let out = [];
let cur = null;
for (const l of lines) {
  const m = /^i(\d+)\s+/.exec(l);
  if (m) {
    if (cur) out.push(cur);
    cur = { i: parseInt(m[1], 10), text: l.trim() };
  } else if (cur && l.trim()) {
    cur.text += ' | ' + l.trim();
  }
}
if (cur) out.push(cur);

for (const ins of out) {
  if (ins.i >= iStart && ins.i <= iEnd) {
    console.log(`i${ins.i}: ${ins.text.slice(0, 160)}`);
  }
}
