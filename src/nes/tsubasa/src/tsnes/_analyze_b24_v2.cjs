// Bank 24 结构分析 v2: 输出到文件避免控制台截断
const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_24.asm', 'utf8').split(/\r?\n/);
const out = [];
const log = (s) => out.push(s);

const entries = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
  if (!m) continue;
  const flags = lines[i].substring(0, 11).trim();
  entries.push({ flags, bank: m[1], addr: parseInt(m[2], 16), text: m[3], line: i + 1 });
}

log('=== total entries: ' + entries.length + ' ===');

// call graph: 所有 JSR/JMP 目标
log('\n=== JSR/JMP targets ===');
const tgtMap = {};
for (const e of entries) {
  const tm = e.text.match(/(JSR|JMP)\s+\$([0-9A-F]{4})/i);
  if (tm) {
    const t = parseInt(tm[2], 16);
    tgtMap[t] = tgtMap[t] || [];
    tgtMap[t].push('$' + e.addr.toString(16).toUpperCase() + ':' + tm[1]);
  }
}
const sorted = Object.keys(tgtMap).map(k => parseInt(k)).sort((a, b) => a - b);
for (const t of sorted) {
  const isData = t >= 0x8D9E;
  log('  $' + t.toString(16).toUpperCase() + (isData ? ' [DATA?]' : '') + ' <- ' + tgtMap[t].join(', '));
}

// 找代码区里所有被跳转到的函数入口 (callers)
log('\n=== code area entry points (has JMP/JSR refs) ===');
for (const t of sorted) {
  if (t < 0x8000 || t >= 0x8D9E) continue;
  const e = entries.find(x => x.addr === t);
  if (e) log('  $' + t.toString(16).toUpperCase() + ': ' + e.text);
}

fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_b24_analysis.txt', out.join('\n'));
console.log('written _b24_analysis.txt');
