const fs = require('fs');
const path = require('path');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src';
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) files.push(p);
  }
})(ROOT);
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/Bank27Service|bank27_minimal|bank27-data/.test(l)) {
      console.log(f.replace(ROOT, '.').replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
// bank27-data.ts 尾部导出函数
const d = fs.readFileSync(path.join(ROOT, 'data/bank27-data.ts'), 'utf8');
const tail = d.split(/\r?\n/).slice(-40).join('\n');
console.log('--- bank27-data tail ---');
console.log(tail);
