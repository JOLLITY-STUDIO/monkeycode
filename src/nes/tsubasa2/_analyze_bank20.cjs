// 分析 bank20 主数据流区 + bank21 子流数据区边界
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function bank(n, lo, len) {
  const off = 0x10 + n * 0x2000 + lo;
  return rom.slice(off, off + len);
}
function hexArr(buf, from, to) {
  const out = [];
  for (let i = from; i < to && i < buf.length; i++) out.push(buf[i].toString(16).toUpperCase().padStart(2, '0'));
  return out.join(' ');
}
// 主数据流指针表 $8968
const ptrs = bank(20, 0x968, 0x30);
console.log('=== 主数据流指针表 (24项) ===');
const targets = [];
for (let i = 0; i < 24; i++) {
  const lo = ptrs[i * 2], hi = ptrs[i * 2 + 1];
  targets.push((hi << 8) | lo);
  console.log(`idx${i}: $${((hi << 8) | lo).toString(16).toUpperCase()}`);
}
const minT = Math.min(...targets), maxT = Math.max(...targets);
console.log('指针范围:', '$' + minT.toString(16), '-', '$' + maxT.toString(16));
// dump 主数据流区
const stream = bank(20, minT - 0x8000, 0x2000 - (minT - 0x8000));
console.log('\n=== 主数据流区 $' + minT.toString(16).toUpperCase() + ' 起 400 字节 ===');
console.log(hexArr(stream, 0, 400));
// bank20 尾部数据 (流可能延伸到 $9FFF)
console.log('\n=== bank20 尾部 $9E00-$9FFF (流末尾) ===');
console.log(hexArr(bank(20, 0x1E00, 0x200), 0, 0x200));
// bank21 A1B4 表指向的记录
const a1b4 = bank(21, 0x1B4, 0x40);
console.log('\n=== bank21 A1B4 表指向 ===');
const a1targets = [];
for (let i = 0; i < 0x20; i++) {
  const lo = a1b4[i * 2], hi = a1b4[i * 2 + 1];
  a1targets.push((hi << 8) | lo);
}
console.log('首项: $' + a1targets[0].toString(16).toUpperCase(), '末项: $' + a1targets[31].toString(16).toUpperCase());
const a1min = Math.min(...a1targets), a1max = Math.max(...a1targets);
console.log('范围:', '$' + a1min.toString(16).toUpperCase(), '-', '$' + a1max.toString(16).toUpperCase());
// dump 第一条记录
const rec0 = bank(21, a1targets[0] - 0xA000, 32);
console.log('A1B4[0] 记录 ($' + a1targets[0].toString(16).toUpperCase() + '):', hexArr(rec0, 0, 32));
// bank21 AC47 表
const ac47 = bank(21, 0xC47, 0x40);
const acTargets = [];
for (let i = 0; i < 0x20; i++) {
  const lo = ac47[i * 2], hi = ac47[i * 2 + 1];
  acTargets.push((hi << 8) | lo);
}
console.log('\n=== bank21 AC47 表指向 ===');
console.log('首项: $' + acTargets[0].toString(16).toUpperCase(), '末项: $' + acTargets[31].toString(16).toUpperCase());
const acMin = Math.min(...acTargets), acMax = Math.max(...acTargets);
console.log('范围:', '$' + acMin.toString(16).toUpperCase(), '-', '$' + acMax.toString(16).toUpperCase());
const rec1 = bank(21, acTargets[0] - 0xA000, 32);
console.log('AC47[0] 记录 ($' + acTargets[0].toString(16).toUpperCase() + '):', hexArr(rec1, 0, 32));
