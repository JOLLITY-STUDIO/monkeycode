// 扫描 code_main.s: 找子程序入口 (被 JSR 引用 + 段落边界) 和 .byte 数据块
const fs = require('fs');
const t = fs.readFileSync('asm/bank31/code_main.s', 'utf8');
const lines = t.split(/\r?\n/);

// 解析每行: 地址 + 助记符 + 操作数
const addrRe = /\$([0-9A-F]{4})\s*;/;
const jsrRe = /JSR \$([0-9A-F]{4})/i;
const jmpRe = /JMP \$([0-9A-F]{4})/i;

const entries = [];   // {addr, kind, line}
const jsrTargets = new Map(); // target -> count
const jmpTargets = new Map();
let byteCount = 0, byteStart = 0;

lines.forEach((l, i) => {
  const m = l.match(addrRe);
  if (m) {
    const addr = parseInt(m[1], 16);
    entries.push({ addr, line: i + 1, text: l.trim() });
    const js = l.match(jsrRe);
    if (js) jsrTargets.set(js[1], (jsrTargets.get(js[1]) || 0) + 1);
    const jp = l.match(jmpRe);
    if (jp) jmpTargets.set(jp[1], (jp[1] === 'C503' || jp[1] === 'C5F0' || jp[1] === 'C506') ? 0 : (jmpTargets.get(jp[1]) || 0) + 1);
  }
  if (l.trim().startsWith('.byte')) {
    if (byteCount === 0) byteStart = i + 1;
    byteCount++;
  } else if (byteCount > 0) {
    // 结束数据块
    console.log(`DATA block: lines ${byteStart}-${i}`);
    byteCount = 0;
  }
});
if (byteCount > 0) console.log(`DATA block: lines ${byteStart}-end`);

// 子程序 = 被 JSR 的目标 (排除 bank30 $C000-$DFFF 和外部)
const subCandidates = new Set();
for (const [target, count] of jsrTargets) {
  const a = parseInt(target, 16);
  if (a >= 0xe000 && count > 0) subCandidates.add(target);
}

// 找每个子程序起始行
console.log('\n=== JSR 子程序入口 (bank31 内) ===');
const byAddr = new Map();
for (const e of entries) byAddr.set(e.addr, e);
for (const target of [...subCandidates].sort((a, b) => parseInt(a, 16) - parseInt(b, 16))) {
  const e = byAddr.get(parseInt(target, 16));
  console.log(`$E${target.replace(/^E/, '')} JSRx${jsrTargets.get(target)} ${e ? '@L' + e.line : '(no label line)'}`);
}

console.log('\n=== JMP 目标 (bank31 内, 循环/跳转) ===');
for (const [target, count] of [...jmpTargets].sort((a, b) => parseInt(a[0], 16) - parseInt(b[0], 16))) {
  const a = parseInt(target, 16);
  if (a >= 0xe000) console.log(`$E${target.replace(/^E/, '')} JMPx${count}`);
}

console.log('\n=== 外部调用 (bank30 $C000+ / bank0-29) ===');
const ext = new Set();
for (const [t, c] of jsrTargets) {
  const a = parseInt(t, 16);
  if (a < 0xe000) ext.add(`${t} x${c}`);
}
for (const [t, c] of jmpTargets) {
  const a = parseInt(t, 16);
  if (a < 0xe000 && c > 0) ext.add(`${t} x${c}`);
}
console.log([...ext].sort().join('\n'));

console.log('\n=== 段落边界 (代码中断点, 疑似未识别数据) ===');
// 找出 .byte 块后的地址
let prevAddr = -1;
for (const e of entries) {
  if (prevAddr >= 0 && e.addr !== prevAddr + 1) {
    console.log(`GAP $${prevAddr.toString(16)} -> $${e.addr.toString(16)}`);
  }
  prevAddr = e.addr;
}
