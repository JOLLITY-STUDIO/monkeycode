// _tail.cjs — 显示 UTF-8/UTF-16 日志的尾部 N 行
const fs = require('fs');
const src = process.argv[2];
const n = parseInt(process.argv[3] || '15', 10);
const kw = process.argv[4] || '';
const buf = fs.readFileSync(src);
const txt = buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
let lines = txt.split(/\r?\n/);
if (kw) lines = lines.filter((x) => x.includes(kw));
console.log(lines.slice(-n).join('\n'));
