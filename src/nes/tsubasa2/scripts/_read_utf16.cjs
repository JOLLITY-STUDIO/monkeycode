// _read_utf16.cjs — 读取可能为 UTF-16LE 的日志并按关键词过滤
const fs = require('fs');
const src = process.argv[2];
const dst = process.argv[3];
const kw = process.argv[4] || 'nesFrame=';
const buf = fs.readFileSync(src);
const txt = buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
const lines = txt.split(/\r?\n/).filter((x) => x.includes(kw));
fs.writeFileSync(dst, lines.join('\n'), 'utf8');
console.log('hits=' + lines.length);
