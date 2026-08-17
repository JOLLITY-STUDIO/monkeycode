// 临时探查脚本2: 表边界
const fs = require('fs');
const src = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts', 'utf8');
const m = src.match(/B27_DATA: readonly number\[\] = \[([\s\S]*?)\];/);
const D = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-F]+$/i.test(s)).map(s => parseInt(s, 16));
function hex(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }
function dump(off, n, label) {
  const row = [];
  for (let i = 0; i < n; i++) row.push(hex(D[off + i]));
  console.log(`-- ${label} off 0x${off.toString(16)} ($${(off + 0xA000).toString(16).toUpperCase()}) ${n}B --`);
  for (let i = 0; i < row.length; i += 16) console.log('  ' + row.slice(i, i + 16).join(' '));
  console.log('');
}
// A42A 完整表 (检查到哪个索引为止有效)
dump(0x42A, 0x40, 'A42A 精灵动画指针表(64B)');
// A46A 开始到 A6AD 之前的精灵数据 (0x46A-0x6AC)
dump(0x46A, 0x80, 'A46A 精灵动画数据(128B)');
dump(0x5EA, 0x80, 'A5EA 精灵动画数据续(128B)');
dump(0x66A, 0x43, 'A66A 精灵动画数据尾(67B)');
// A6AD 表 + A6B5 数据块
dump(0x6AD, 0x10, 'A6AD 场景指针表(16B)');
dump(0x6B5, 0x40, 'A6B5 场景数据块0(64B)');
// AB65 表
dump(0xB65, 0x28, 'AB65 场景数据指针表(40B)');
dump(0xB8D, 0x40, 'AB8D 数据块(64B)');
