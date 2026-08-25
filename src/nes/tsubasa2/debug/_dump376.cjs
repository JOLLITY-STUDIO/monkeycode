// dump 376-380 帧完整行（unwrapped 单行）
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
// 重新组装：行可能被换行拆开（fxxx 在行首）
let cur = null, out = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  if (m) { cur = parseInt(m[1]); if (cur > 380) break; }
  if (cur !== null && cur >= 376) out.push(l);
}
console.log(out.join('\n'));
