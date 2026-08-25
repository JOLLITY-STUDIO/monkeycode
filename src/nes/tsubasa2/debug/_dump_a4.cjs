// dump 所有 $01:A4xx 执行行，重建 Scene0 时间线
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const lines = log.split(/\r?\n/);
const RE = /^f(\d+)\s+c\d+\s+i\d+\s+A:[0-9A-F]{2}\s+X:[0-9A-F]{2}\s+Y:[0-9A-F]{2}\s+S:[0-9A-F]{2}\s+P:\S+\s+\$01:([0-9A-F]{4}):\s*([0-9A-F ]{0,12})?\s*([A-Z]+)?/;
const out = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(RE);
  if (!m) continue;
  const f = parseInt(m[1], 10);
  const addr = m[2];
  if (addr.startsWith('A4') || addr.startsWith('A5')) {
    out.push('f' + f + ' $01:' + addr + ' ' + (m[3] || '') + ' ' + (m[4] || ''));
  }
}
console.log('A4/A5 行数:', out.length);
// 每帧只保留首次出现的地址序列（时间线）
let lastF = 0;
const tl = [];
for (const l of out) {
  const f = parseInt(l.match(/^f(\d+)/)[1], 10);
  if (f !== lastF) { tl.push('--- f' + f); lastF = f; }
  tl.push('  ' + l.replace(/^f\d+/, ''));
}
console.log(tl.slice(0, 200).join('\n'));
