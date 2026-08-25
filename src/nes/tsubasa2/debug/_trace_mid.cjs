// 中间帧 f26-f343 的指令内容
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split(/\r?\n/);
const out = [];
for (const l of t) {
  const m = /^f(\d+)\s+c\d+\s+i\d+\s+A:([0-9A-F]{2}) X:([0-9A-F]{2}) Y:([0-9A-F]{2}) S:([0-9A-F]{2}) P:\S+\s+\$?([0-9A-F]{2})?:?([0-9A-F]{4}):\s*(.+)$/.exec(l);
  if (m) {
    const f = +m[1];
    if (f >= 26 && f <= 343) out.push('f' + f + ' ' + (m[5] ? m[5] + ':' : '') + m[6] + ': ' + m[7].trim().slice(0, 70));
  }
}
console.log('total mid-frame instructions:', out.length);
console.log(out.join('\n'));
