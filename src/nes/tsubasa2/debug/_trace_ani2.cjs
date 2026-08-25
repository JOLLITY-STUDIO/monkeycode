// 帧分布 + 每帧指令数 + 捕获 pc 分布
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split(/\r?\n/);
const perFrame = new Map();
const pcCount = new Map();
for (const l of t) {
  const m = /^f(\d+)\s+c\d+\s+i\d+\s+A:([0-9A-F]{2}) X:([0-9A-F]{2}) Y:([0-9A-F]{2}) S:([0-9A-F]{2}) P:\S+\s+\$?([0-9A-F]{2})?:?([0-9A-F]{4}):\s*(.+)$/.exec(l);
  if (m) {
    const f = +m[1];
    perFrame.set(f, (perFrame.get(f) || 0) + 1);
    const key = (m[5] || '?') + ':' + m[6];
    pcCount.set(key, (pcCount.get(key) || 0) + 1);
  }
}
console.log('frames:', [...perFrame.keys()].join(','));
let max = 0, maxF = 0;
for (const [f, n] of perFrame) { if (n > max) { max = n; maxF = f; } }
console.log('max per frame:', maxF, '=', max);
console.log('\nTop PC (bank:addr count):');
[...pcCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([k, v]) => console.log(' ', k, v));
