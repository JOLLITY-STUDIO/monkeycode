// 分析 bank18/19 物理结构 (pattern 数据 vs 剧情数据流)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function bank(n) {
  const off = 0x10 + n * 0x2000;
  return rom.slice(off, off + 0x2000);
}
function hexArr(buf, from, to) {
  const out = [];
  for (let i = from; i < to && i < buf.length; i++) out.push(buf[i].toString(16).toUpperCase().padStart(2, '0'));
  return out.join(' ');
}
// bank19 数据流起点 $9467 (标注) → 物理偏移 = 0x1467 ($9467-$8000)
const b19 = bank(19);
console.log('=== bank19 $9467 起 128B (剧情数据流) ===');
console.log(hexArr(b19, 0x1467, 0x1467 + 128));
// bank19 尾部
console.log('\n=== bank19 $9E00-$9FFF (尾部) ===');
console.log(hexArr(b19, 0x1E00, 0x2000));
// bank19 全零检测: 分段统计非零密度
console.log('\n=== bank19 分段非零密度 (每 0x100 字节) ===');
for (let off = 0; off < 0x2000; off += 0x400) {
  let nz = 0;
  for (let i = off; i < off + 0x400; i++) if (b19[i] !== 0) nz++;
  console.log('$' + (0x8000 + off).toString(16).toUpperCase() + '-$' + (0x8000 + off + 0x400).toString(16).toUpperCase() + ': ' + nz + '/1024');
}
// bank18 同分析
const b18 = bank(18);
console.log('\n=== bank18 分段非零密度 ===');
for (let off = 0; off < 0x2000; off += 0x400) {
  let nz = 0;
  for (let i = off; i < off + 0x400; i++) if (b18[i] !== 0) nz++;
  console.log('$' + (0x8000 + off).toString(16).toUpperCase() + '-$' + (0x8000 + off + 0x400).toString(16).toUpperCase() + ': ' + nz + '/1024');
}
// bank18 中段样例 (可能是 pattern 数据)
console.log('\n=== bank18 $8800-$8900 (样例) ===');
console.log(hexArr(b18, 0x800, 0x900));
// bank19 中段样例
console.log('\n=== bank19 $8800-$8900 (样例) ===');
console.log(hexArr(b19, 0x800, 0x900));
