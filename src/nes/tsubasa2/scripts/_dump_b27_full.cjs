// 临时探查脚本: 打印 bank27 各表区域, 用于结构化翻译
const fs = require('fs');
const src = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts', 'utf8');
const m = src.match(/B27_DATA: readonly number\[\] = \[([\s\S]*?)\];/);
const items = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-F]+$/i.test(s));
const D = items.map(s => parseInt(s, 16));
function hex(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }
function dump(cpuAddr, n, label) {
  const off = cpuAddr - 0xA000; // $A000 窗口
  const row = [];
  for (let i = 0; i < n; i++) row.push(hex(D[off + i]));
  console.log(`-- ${label} $${cpuAddr.toString(16).toUpperCase()} (off 0x${off.toString(16)}, ${n}B) --`);
  for (let i = 0; i < row.length; i += 16) console.log('  ' + row.slice(i, i + 16).join(' '));
  console.log('');
}
console.log('array len:', D.length, '(0x' + D.length.toString(16) + ')');
// $8103-$81DB code 区 (offset 0x103)
console.log('-- $8103 code 24B --');
for (let i = 0; i < 24; i++) process.stdout.write(hex(D[0x103 + i]) + ' ');
console.log('\n');
dump(0xA1DC, 16, 'A1DC 递减表');
dump(0xA292, 40, 'A292 动画脚本指针表(前20项)');
dump(0xA2AE, 0x17E, 'A2AE 动画脚本数据区');
dump(0xA42A, 0x20, 'A42A 精灵动画指针表(前16项)');
dump(0xA46A, 0x90, 'A46A 精灵动画数据区');
dump(0xA6AD, 0x20, 'A6AD 场景指针表(lo,hi)');
dump(0xAB65, 0x30, 'AB65 场景数据指针表(lo,hi)');
