// dump 指定帧范围指令 - 健壮解析
const fs = require('fs');
const args = process.argv.slice(2);
const fMin = +(args[0] || 6), fMax = +(args[1] || fMin);
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split(/\r?\n/);
const out = [];
for (const l of t) {
  const m = /^f(\d+)\s+c\d+\s+i\d+\s+A:[0-9A-F]{2} X:[0-9A-F]{2} Y:[0-9A-F]{2} S:[0-9A-F]{2} P:\S+\s+\$?([0-9A-F]{2,3}):([0-9A-F]{4}):?\s*(.*)$/.exec(l);
  if (m) {
    const f = +m[1];
    if (f >= fMin && f <= fMax) {
      out.push('f' + f + ' $' + m[2] + ':' + m[3] + ' ' + (m[4] || '').trim());
    }
  }
}
const fname = '_f' + fMin + '-' + fMax + '.txt';
fs.writeFileSync('debug/' + fname, out.join('\n'));
console.log('wrote', out.length, 'lines → debug/' + fname);
