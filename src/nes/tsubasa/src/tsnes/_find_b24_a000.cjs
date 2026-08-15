/* 找包含 $AD1C/$B3CF 指针表的 bank: 扫描各 prg-bank-N.ts 偏移 0xD1C-0x13CF */
const fs = require('fs');
const dir = 'rom-data';
const files = fs.readdirSync(dir).filter(f => /^prg-bank-\d+\.ts$/.test(f));
function load(f) {
  const src = fs.readFileSync(dir + '/' + f, 'utf8');
  const start = src.indexOf('= [') + 2;
  const end = src.lastIndexOf(']');
  const parts = src.slice(start + 1, end).split(',');
  return parts.map(s => parseInt(s.trim(), 16));
}
for (const f of files) {
  const arr = load(f);
  if (arr.length < 0x1400) continue;
  // 偏移 0xD1C 处应该是指针表: $AD1C 应指向 $80xx-$9Fxx (本 bank 或文本流)
  const v = arr[0xD1C];
  const v2 = arr[0xD1D];
  if (v === undefined) continue;
  if (v >= 0x80 && v2 <= 0xFF) {
    // 打印候选
    console.log(f, 'len', arr.length, '0xD1C=', '0x' + v.toString(16), '0xD1D=0x' + v2.toString(16));
  }
}
