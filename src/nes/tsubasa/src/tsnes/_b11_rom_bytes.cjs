// 直接从 NES ROM 读取原始字节验证
const fs = require('fs');
const dir = fs.readdirSync('roms').find(f => f.endsWith('.nes'));
const buf = fs.readFileSync('roms/' + dir);
const hex = (off, n) => {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(buf[off + i].toString(16).padStart(2, '0'));
  return arr.join(' ');
};
// bank 30: 文件偏移 = 16 + 30*0x2000; CPU 地址 $C000-DFFF
const b30 = 16 + 30 * 0x2000;
console.log('=== bank30 $CB90-$CB10 ===');
console.log(hex(b30 + 0xcb90 - 0xc000, 0x90));
console.log('=== bank30 $C509-$C520 ===');
console.log(hex(b30 + 0xc509 - 0xc000, 0x20));
