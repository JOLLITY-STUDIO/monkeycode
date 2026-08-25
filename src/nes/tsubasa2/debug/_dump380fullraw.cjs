// dump f380 全部重组指令行
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
let cur = null, out = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  if (m) { cur = parseInt(m[1]); if (cur > 380) break; }
  if (cur === 380) out.push(l);
}
let re = [];
let i = 0;
while (i < out.length) {
  const l = out[i];
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+([\s\S]*)$/);
  if (m) {
    let body = m[4];
    while (i + 1 < out.length && !/^f\d+\s+c\d+\s+i\d+/.test(out[i + 1])) {
      body += ' ' + out[i + 1].trim();
      i++;
    }
    re.push(`f${m[1]} ${body}`);
  }
  i++;
}
console.log(re.join('\n'));
