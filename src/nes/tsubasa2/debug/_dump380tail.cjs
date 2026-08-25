// dump 355-380 帧完整行
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
let cur = null, buf = [], started = false;
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  const f = m ? parseInt(m[1]) : cur;
  if (m) cur = f;
  if (f >= 355 && f <= 380) { started = true; buf.push(l); }
  else if (m && started) break;
}
console.log('lines', buf.length);
console.log(buf.join('\n'));
