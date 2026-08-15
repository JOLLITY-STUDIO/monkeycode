/** 分析 bank29 数据块结构（0x00 分隔的块）+ 消费方切换函数 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';

// 1) bank29 分块
const t = fs.readFileSync(path.join(dir, 'bank_29.asm'), 'utf8').split(/\r?\n/);
const bytes = [];
for (const l of t) { const m = l.match(/: ([0-9A-F]{2})\s+\.byte/); if (m) bytes.push(parseInt(m[1], 16)); }

// 按连续 >=2 个 0x00 分隔成块
const blocks = [];
let start = 0;
for (let i = 0; i < bytes.length - 1; i++) {
  if (bytes[i] === 0x00 && bytes[i + 1] === 0x00) {
    blocks.push({ start, end: i, len: i - start, data: bytes.slice(start, i) });
    // 跳过连续 0x00
    let j = i;
    while (j < bytes.length && bytes[j] === 0x00) j++;
    i = j - 1;
    start = j;
  }
}
blocks.push({ start, end: bytes.length, len: bytes.length - start, data: bytes.slice(start) });
console.log('=== bank29 数据块 ===');
console.log('总块数:', blocks.length);
blocks.forEach((b, i) => {
  const head = b.data.slice(0, 8).map(v => v.toString(16).padStart(2, '0')).join(' ');
  console.log('#' + String(i).padStart(3) + ' @0x' + b.start.toString(16).padStart(4, '0') + ' len=' + String(b.len).padStart(4) + ' : ' + head);
});
