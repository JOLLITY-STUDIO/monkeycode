// Bank 24 结构分析: 代码区/数据区/字符串/表
const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_24.asm', 'utf8').split(/\r?\n/);

// 1) 收集所有地址行
const entries = []; // {addr, flags, text, line}
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
  if (!m) continue;
  const flags = lines[i].substring(0, 11).trim();
  entries.push({ flags, bank: m[1], addr: parseInt(m[2], 16), text: m[3], line: i + 1 });
}

// 2) 数据区从第一个无 C flag 开始 ($8D9E 之后)
let codeEndIdx = entries.findIndex(e => e.addr === 0x8D9E);
if (codeEndIdx < 0) codeEndIdx = entries.findIndex(e => !e.flags.startsWith('C') && e.addr > 0x8D00);
console.log('=== data area starts at entry idx', codeEndIdx, 'total entries:', entries.length, '===');

// 3) 数据区提取字符串(可打印 ASCII 序列)与表
let cur = '';
let curStart = null;
const strings = [];
for (let i = codeEndIdx; i < entries.length; i++) {
  const e = entries[i];
  const bm = e.text.match(/\.byte \$([0-9A-F]{2})/i);
  if (bm) {
    const v = parseInt(bm[1], 16);
    if (v >= 0x20 && v <= 0x7e) {
      if (curStart === null) curStart = e.addr;
      cur += String.fromCharCode(v);
    } else {
      if (cur.length >= 3) strings.push({ addr: curStart, len: cur.length, s: cur });
      cur = ''; curStart = null;
    }
  } else {
    if (cur.length >= 3) strings.push({ addr: curStart, len: cur.length, s: cur });
    cur = ''; curStart = null;
  }
}
if (cur.length >= 3) strings.push({ addr: curStart, len: cur.length, s: cur });

console.log('\n=== strings (' + strings.length + ') ===');
strings.forEach(s => console.log('  $' + s.addr.toString(16).toUpperCase(), 'len', s.len, JSON.stringify(s.s)));

// 4) 找 data 区中的连续表 (>=8 行 .byte 或 .word 行)
console.log('\n=== .word tables in data area ===');
const wordTbls = [];
let wt = null;
for (let i = codeEndIdx; i < entries.length; i++) {
  const e = entries[i];
  const isWord = /\.word/.test(e.text);
  if (isWord) { if (!wt) wt = { start: e.addr, n: 0, line: e.line }; wt.n++; }
  else { if (wt) { if (wt.n >= 4) wordTbls.push(wt); wt = null; } }
}
if (wt) { if (wt.n >= 4) wordTbls.push(wt); }
wordTbls.forEach(t => console.log('  $' + t.start.toString(16).toUpperCase(), 'entries', t.n, 'line', t.line));

// 5) 整个文件里 JSR/JMP 的目标地址分布 (哪些地址被调用)
console.log('\n=== JSR/JMP targets (call graph) ===');
const targets = {};
for (const e of entries) {
  const tm = e.text.match(/^\s*(JSR|JMP)\s+\$([0-9A-F]{4})/i);
  if (tm) {
    const t = parseInt(tm[2], 16);
    targets[t] = targets[t] || { name: '$' + tm[2].toUpperCase(), callers: 0 };
    targets[t].callers++;
  }
}
const sorted = Object.keys(targets).map(k => parseInt(k)).sort((a, b) => a - b);
for (const t of sorted) {
  const isData = t >= 0x8D9E;
  console.log('  $' + t.toString(16).toUpperCase() + (isData ? ' [DATA]' : ''), 'refs:', targets[t].callers);
}
