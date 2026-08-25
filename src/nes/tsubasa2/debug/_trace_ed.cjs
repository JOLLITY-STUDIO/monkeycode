// 追踪 $ED (ram 00ED) 写入 → 真实场景序列
const fs = require('fs');
const dir = 'docs/roms/opening-all';
const p = fs.readdirSync(dir).find(n => n.endsWith('.log'));
const s = fs.readFileSync(dir + '/' + p, 'utf8');
const lines = s.split(/\r?\n/).filter(l => l.trim().length > 0);
const writes = [];
for (const l of lines) {
  // 匹配 STA $ED / STX $ED / STY $ED 以及 LDA $ED
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+(\$..):([0-9A-F]{4}):\s+((?:STA|STX|STY|LDA) \$ED(?: = #\$([0-9A-F]{2}))?)/);
  if (m) {
    writes.push({ frame: +m[1], cycle: +m[2], bank: m[4], addr: m[5], op: m[6], val: m[7] ?? '' });
  }
}
console.log('$ED 写操作总数', writes.length);
// 场景变化序列：只保留值变化的
let last = -1;
const changes = [];
for (const w of writes) {
  if (w.op.startsWith('LDA')) continue; // 读不算
  const v = parseInt(w.val, 16);
  if (v !== last) { last = v; changes.push({ frame: w.frame, cycle: w.cycle, bank: w.bank, addr: w.addr, op: w.op, val: w.val }); }
}
console.log('$ED 值变化点', changes.length);
for (const c of changes.slice(0, 120)) {
  console.log(`  f${c.frame} c${c.cycle} ${c.bank}:${c.addr} ${c.op} = ${c.val}`);
}
