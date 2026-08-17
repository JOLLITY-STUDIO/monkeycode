// 临时探查脚本3: $8000 文本区 + 尾部数据区
const fs = require('fs');
const src = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts', 'utf8');
const m = src.match(/B27_DATA: readonly number\[\] = \[([\s\S]*?)\];/);
const D = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-F]+$/i.test(s)).map(s => parseInt(s, 16));
function hex(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }
function dump(off, n, label) {
  const row = [];
  for (let i = 0; i < n; i++) row.push(hex(D[off + i]));
  console.log(`-- ${label} off 0x${off.toString(16)} ${n}B --`);
  for (let i = 0; i < row.length; i += 16) console.log('  ' + row.slice(i, i + 16).join(' '));
  console.log('');
}
dump(0x000, 0x100, '$8000 文本/名字数据(256B)');
// 尾部 0x198D-0x1FFF
dump(0x198D, 0x80, '尾部数据区0 (0x198D)');
dump(0x1A0D, 0x80, '尾部数据区1 (0x1A0D)');
dump(0x1B8D, 0x80, '尾部数据区2 (0x1B8D)');
dump(0x1E8D, 0x80, '尾部数据区3 (0x1E8D)');
