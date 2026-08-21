// dump bank28 $B8AE 起, 21 字节步进的描述符
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
const base = 0x10 + 28 * 0x2000;
function b(addr) { return buf[base + (addr - 0x8000)]; }

console.log('=== bank28 描述符 $B8AE + n*21 ===');
for (let n = 0; n < 12; n++) {
  const a = 0xb8ae + n * 21;
  const bytes = Array.from({ length: 21 }, (_, j) => b(a + j).toString(16).padStart(2, '0')).join(' ');
  const ctrl = b(a); const tpl = b(a + 0x12);
  console.log(`$${a.toString(16)}: ${bytes}  | ctrl=$${ctrl.toString(16)} tpl=${tpl}`);
}
