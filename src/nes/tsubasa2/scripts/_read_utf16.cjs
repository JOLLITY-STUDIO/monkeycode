const fs = require('fs');
// 读 UTF-16 文件
const buf = fs.readFileSync('output/emu-scene0-timeline.txt');
let s;
if (buf[0] === 0xFF && buf[1] === 0xFE) s = buf.toString('utf16le');
else if (buf[0] === 0xFE && buf[1] === 0xFF) s = buf.toString('utf16be');
else s = buf.toString('utf8');
const lines = s.split(/\r?\n/);
console.log('total lines:', lines.length);
// 提取帧范围
const frames = new Set();
for (const l of lines) {
  const m = l.match(/f\s*(\d+)/);
  if (m) frames.add(+m[1]);
}
const fa = [...frames].sort((a, b) => a - b);
console.log('frames:', fa.length, 'min:', fa[0], 'max:', fa[fa.length - 1]);
console.log('sample:', fa.slice(0, 10), '...', fa.slice(-10));
console.log('\n=== first 20 lines ===');
console.log(lines.slice(0, 20).join('\n'));
console.log('\n=== last 15 lines ===');
console.log(lines.slice(-15).join('\n'));
