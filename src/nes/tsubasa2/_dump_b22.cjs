/* 临时: dump bank22 代码区 + 数据表 */
const fs = require('fs');
const rom = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const data = fs.readFileSync(rom);
const off = 0x10 + 22 * 0x2000; // bank22 物理偏移
const b = data.slice(off, off + 0x2000);

function dump(addr, len) {
  const o = addr - 0x8000; // bank22 CPU $8000-$9FFF
  const arr = [];
  for (let i = o; i < o + len; i++) arr.push(b[i].toString(16).padStart(2, '0'));
  console.log(`$${addr.toString(16)}: ${arr.join(' ')}`);
}
dump(0x8000, 0x30);
dump(0x8068, 0x1a);
dump(0x80b5, 0x30);
dump(0x80e2, 0x30);
dump(0x8100, 0x70);
dump(0x8160, 0x80);
dump(0x81d2, 0x30);   // DISP_81D2 (Y 位移)
dump(0x81fa, 0x44);   // DISP_81FA (X 位移)
dump(0x8280, 0x30);   // TEMPLATE_PTR_8280
