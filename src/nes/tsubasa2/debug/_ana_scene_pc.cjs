// 统计 opening trace 每个 bank 内 256 字节块的执行计数（定位热代码）
const fs = require('fs');
const b = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const blocks = {}; // bank -> block256 -> count
const frames = [];
for (const m of b.matchAll(/f(\d+)\s+c(\d+)\s+i(\d+)/g)) frames.push(+m[1]);
let minF = Math.min(...frames), maxF = Math.max(...frames);
console.log('frames:', minF, '-', maxF);

for (const m of b.matchAll(/\$([0-9A-F]{2}):([0-9A-F]{4}):/g)) {
  const bk = m[1];
  const addr = parseInt(m[2], 16);
  const blk = addr & 0xff00;
  if (!blocks[bk]) blocks[bk] = {};
  blocks[bk][blk] = (blocks[bk][blk] || 0) + 1;
}
const out = [];
for (const [bk, bl] of Object.entries(blocks)) {
  out.push('=== bank ' + bk + ' ===');
  const arr = Object.entries(bl).sort((a, b2) => b2[1] - a[1]);
  for (const [blk, c] of arr.slice(0, 30)) {
    out.push('  $' + bk + ':' + blk.toString(16).toUpperCase() + '-$' + (blk + 0xff).toString(16).toUpperCase() + '  x' + c);
  }
}
fs.writeFileSync('debug/_hot_blocks.txt', out.join('\n'), 'utf8');
console.log('WROTE');
