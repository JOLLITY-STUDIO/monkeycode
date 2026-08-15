// 分析 bank_24.asm：区分代码段/数据段，列出代码入口与数据表范围
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_24.asm', 'utf8').split(/\r?\n/);

const segments = []; // {kind, start, end, count, startLine, endLine}
let current = null;
let prevAddr = null;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // 行格式: {flags 7ch} {phys} {bank}:{addr}: {body}
  const m = l.match(/^([CD]) .*?([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
  if (!m) {
    // 也匹配数据行 (第一个字符是 -)
    const m2 = l.match(/^- .*?([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
    if (!m2) { prevAddr = null; continue; }
    const kind = 'DATA';
    const addr = parseInt(m2[2], 16);
    if (addr < 0x8000 || addr > 0x9FFF) { prevAddr = null; continue; }
    if (current && current.kind === kind && addr === prevAddr + 1) {
      current.count++;
    } else {
      if (current) segments.push(current);
      current = { kind, start: addr, end: addr, count: 1, startLine: i, endLine: i };
    }
    prevAddr = addr;
    continue;
  }
  const kind = 'CODE';
  const addr = parseInt(m[3], 16);
  if (addr < 0x8000 || addr > 0x9FFF) { prevAddr = null; continue; }
  if (current && current.kind === kind && addr === prevAddr + 1) {
    current.count++;
    current.end = addr;
    current.endLine = i;
  } else {
    if (current) segments.push(current);
    current = { kind, start: addr, end: addr, count: 1, startLine: i, endLine: i };
  }
  prevAddr = addr;
}
if (current) segments.push(current);

console.log('=== 段分布 (bank24 自窗口 $8000-$9FFF) ===');
for (const seg of segments) {
  const len = seg.end - seg.start + 1;
  console.log(`${seg.kind.padEnd(4)} $${seg.start.toString(16).padStart(4,'0')}-$${seg.end.toString(16).padStart(4,'0')} (${len}B) lines ${seg.startLine}-${seg.endLine}`);
}
