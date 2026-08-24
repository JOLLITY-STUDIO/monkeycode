// 临时：提取 code_sub.s 场景 1-13（$855A-$8629）
const fs = require('fs');
const s = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8');
const ls = s.split(/\r?\n/);
const idx = {};
ls.forEach((l, i) => { const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/); if (m) idx[m[1].toUpperCase()] = i; });
const start = idx['855A'];
const end = idx['8629'];
console.log('855A line=' + start + '  8629 line=' + end);
if (start !== undefined && end !== undefined) {
  console.log(ls.slice(start, end + 2).join('\n'));
}
