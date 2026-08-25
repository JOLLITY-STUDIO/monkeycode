// dump 376-380 原始行（重组折行）到 stdout
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
let cur = null, out = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  if (m) { cur = parseInt(m[1]); if (cur > 380) break; }
  if (cur !== null && cur >= 376) out.push(l);
}
// 重组：把每个 "fNNN cXXXX iYYYY" 开头的行当作新指令行，其后续行是续行
let re = [];
let i = 0;
while (i < out.length) {
  const l = out[i];
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+([\s\S]*)$/);
  if (m) {
    let body = m[4];
    // 续行直到下一个指令行
    while (i + 1 < out.length && !/^f\d+\s+c\d+\s+i\d+/.test(out[i + 1])) {
      body += ' ' + out[i + 1].trim();
      i++;
    }
    re.push(`f${m[1]} ${body}`);
  }
  i++;
}
console.log(re.join('\n'));
