// 提取 emu frame-3110 NT0 属性表区域字节 + 打印 emu attrib 数组的精确分布
const fs = require('fs');
const emu = JSON.parse(fs.readFileSync('output/emu-full/frame-3110/nt.json', 'utf8'));
const nt0 = emu[0];
console.log('tile[0x3C0..0x3FF] (属性表区域 64 字节):');
console.log(JSON.stringify(nt0.tile.slice(0x3c0, 0x400)));
console.log('\ntile[960..1023] rows:');
for (let r = 30; r < 32; r++) {
  const base = r * 32;
  console.log(`row${r}:`, nt0.tile.slice(base, base + 32).join(','));
}
console.log('\nattrib rows 28-31:');
for (let r = 28; r < 32; r++) {
  const base = r * 32;
  console.log(`attribRow${r}:`, nt0.attrib.slice(base, base + 32).join(','));
}
// attrib 8/4 分布
let eightStart = -1, fourStart = -1;
for (let i = 0; i < nt0.attrib.length; i++) {
  if (nt0.attrib[i] === 8 && eightStart < 0) eightStart = i;
  if (nt0.attrib[i] === 4 && fourStart < 0) fourStart = i;
}
console.log('\nfirst attrib=8 at', eightStart, 'first attrib=4 at', fourStart, 'len', nt0.attrib.length);
