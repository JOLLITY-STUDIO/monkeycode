// 扫描 _full.s：哪些代码地址出现在 bank02 (>= $8000 & <= $9FFF) 内部 vs 外部
// 输出：bank02 内部代码地址 -> 它有多大可能性是 bank02 模块
const fs = require('fs');
const path = require('path');
const t = fs.readFileSync(path.join(__dirname, '..', 'src', 'asm', 'bank02', '_full.s'), 'utf8');
const ls = t.split(/\r?\n/);

// 收集 bank02 内部 $8000-$9FFF 的代码入口 / 数据起点
const anchors = new Set();
for (let i = 0; i < ls.length; i++) {
  const ln = ls[i];
  const m = ln.match(/;\s*\$([8-9A-F][0-9A-F]{3})\s*$/);
  if (m) anchors.add(m[1].toUpperCase());
}

// 扫描所有 >= $A000 引用（外部 bank）
const extRef = new Map();
for (let i = 0; i < ls.length; i++) {
  const ln = ls[i];
  const re = /\$([0-9A-F]{4})/g;
  let m;
  while ((m = re.exec(ln)) !== null) {
    const a = parseInt(m[1], 16);
    if (a >= 0xa000) {
      const k = m[1].toUpperCase();
      extRef.set(k, (extRef.get(k) || 0) + 1);
    }
  }
}
const sortedExt = [...extRef.entries()].sort((a, b) => parseInt(a[0], 16) - parseInt(b[0], 16));
console.log('--- external >= $A000 references by bank02 (top 30) ---');
for (const [k, c] of sortedExt.slice(0, 30)) console.log('  $' + k + ' : refs=' + c);

// 给定方向表 ($8A20)，看 size
// $8A1F 是上一条 RTS，所以 $8A20 起
console.log('--- bank02 internal code/data anchors (count=' + anchors.size + ') ---');
const sorted = [...anchors].sort((a, b) => parseInt(a, 16) - parseInt(b, 16));
for (const a of sorted) console.log('  $' + a);
