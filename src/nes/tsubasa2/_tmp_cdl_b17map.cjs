// 把 CDL 的 bank17 数据段(68段) 与 asm/bank17 的 label/注释对应
const fs = require('fs');
const path = require('path');

// 1. 从 CDL 重新取 bank17 数据段
const buf = fs.readFileSync('docs/Captain Tsubasa II - Super Striker (Japan)202060822.cdl');
const b17 = buf.slice(17 * 0x2000, 18 * 0x2000);
function segments(arr, mask) {
  const out = []; let s = -1;
  for (let i = 0; i <= arr.length; i++) {
    const hit = i < arr.length && (arr[i] & mask) !== 0;
    if (s >= 0 && !hit) { out.push({ start: s, len: i - s }); s = -1; }
    else if (s < 0 && hit) s = i;
  }
  return out;
}
const dseg = segments(b17, 0x02);

// 2. 读取 asm/bank17 所有 .s，收集 label 与 .byte 段
const asmDir = 'asm/bank17';
const asmFiles = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.s$/.test(f)) asmFiles.push(p);
  }
})(asmDir);

const labels = []; // {addr, name, line}
for (const f of asmFiles) {
  const ls = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i];
    // label 形如 "XXXX: ..." 或 "LABEL:"
    const m = l.match(/^([A-Za-z_][\w]*):/);
    const ma = l.match(/^\$?([0-9A-F]{4}):/);
    if (m && ma) labels.push({ addr: parseInt(ma[1], 16), name: m[1], file: f, line: i + 1 });
    else if (ma && (l.includes('.byte') || l.includes('.word') || l.includes('.db') || l.includes(';'))) {
      // 地址注释行
    }
  }
}
labels.sort((a, b) => a.addr - b.addr);
console.log('asm labels (前 60):');
for (const lb of labels.slice(0, 60)) console.log('  $' + lb.addr.toString(16).padStart(4, '0') + ' ' + lb.name + '  (' + lb.file.split('/').pop() + ':' + lb.line + ')');

// 3. 将每个 CDL 数据段与最近的 label 匹配
console.log('\n===== bank17 CDL 数据段 → 对应 label =====');
for (const s of dseg) {
  let best = null;
  for (const lb of labels) {
    if (lb.addr <= s.start) best = lb;
    else break;
  }
  console.log('  $' + s.start.toString(16).padStart(4, '0') + '-$' + (s.start + s.len - 1).toString(16).padStart(4, '0') +
    ' (' + String(s.len).padStart(3) + 'B)' + (best ? '  → ' + best.name + ' @ $' + best.addr.toString(16) : '  → ???'));
}

// 4. CDL 数据段覆盖范围 vs 未覆盖
let covered = 0;
for (const s of dseg) covered += s.len;
console.log('\nbank17 实际数据消费:', covered, 'B /', 0x2000, 'B (' + ((covered / 0x2000) * 100).toFixed(1) + '%)');
