// dump bank28 $B880-$BC00 区域, 找 21 字节描述符结构
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
const base = 0x10 + 28 * 0x2000;
function b(addr) { return buf[base + (addr - 0x8000)]; }

console.log('=== bank28 $B880-$BB40 前 60 字节每 16 字节一行 ===');
for (let a = 0xb880; a < 0xbb40; a += 16) {
  const row = Array.from({ length: 16 }, (_, j) => b(a + j).toString(16).padStart(2, '0')).join(' ');
  console.log(`$${a.toString(16)}: ${row}`);
}

// 尝试找描述符: [0]=控制(bit7/6=0 常见), [0x12]=模板索引(0-46), [0x13]/[0x14]=偏移
console.log('\n=== 疑似描述符 (每 21 字节步进, 控制 bit6/7=0, 模板索引<47) ===');
const cands = [];
for (let a = 0xb880; a < 0xbb00; a++) {
  const ctrl = b(a);
  const tpl = b(a + 0x12);
  const offsX = b(a + 0x13);
  const offsY = b(a + 0x14);
  if ((ctrl & 0xC0) === 0 && tpl < 47 && offsX < 0x40 && offsY < 0x40) {
    cands.push(a);
  }
}
console.log(`候选地址数: ${cands.length}`);
cands.slice(0, 30).forEach(a => {
  const bytes = Array.from({ length: 21 }, (_, j) => b(a + j).toString(16).padStart(2, '0')).join(' ');
  console.log(`$${a.toString(16)}: ${bytes}`);
});
