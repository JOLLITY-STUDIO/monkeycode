// 修正 bank30 偏移: bank30 = $C000-$DFFF, 偏移 = 16+30*0x2000 + (addr-0xC000)
const fs = require('fs');
const rom = fs.readFileSync('roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b30off = 16 + 30 * 0x2000;

// 微型 6502 子集模拟器 (仅本次验证用)
class Mem {
  constructor(bytes, base) { this.b = new Uint8Array(0x10000); this.b.set(bytes, base); }
  rb(a) { return this.b[a & 0xffff]; }
  rw(a) { return this.rb(a) | (this.rb(a + 1) << 8); }
  wb(a, v) { this.b[a & 0xffff] = v & 0xff; }
}
const sp = 0xff; // 栈指针
const mem = new Mem(rom.slice(0, 0x10000), 0);
const stack = new Uint8Array(256);
// 构造栈: JSR $C509 后返回地址压栈: 先 hi 后 lo
// 模拟表 B: 调用 $81BC (返回地址 $81C6)
// 栈: [..., 0x81, 0xC6] (0xC6 在栈顶)
const retAddr = 0x81c6;
let spIdx = 0;
stack[spIdx++] = (retAddr >> 8) & 0xff; // 先压 hi
stack[spIdx++] = retAddr & 0xff;        // 再压 lo (栈顶)
// 之后 PHA 的模拟: 简单化, 用一个 A 保存区
// 表 B 数据载入
const tableB = [0xCC, 0x81, 0x76, 0x82, 0x4D, 0x82];
// 目标 = table[2i+2]<<8 | table[2i+1] (按我理解的 dispatcher)
for (let a = 0; a < 3; a++) {
  const lo = tableB[2 * a + 1];
  const hi = tableB[2 * a + 2] ?? 0;
  console.log('A=' + a + ' → 目标 $' + (hi << 8 | lo).toString(16));
}
// 如果目标 = table[2i]<<8 | table[2i+1] (标准)
for (let a = 0; a < 3; a++) {
  const lo = tableB[2 * a];
  const hi = tableB[2 * a + 1];
  console.log('标准 A=' + a + ' → $' + (hi << 8 | lo).toString(16));
}
// 表 A
const tableA = [0x27, 0x83, 0xE7, 0x83, 0xFF, 0x83, 0x58, 0x83, 0x77, 0x83, 0x64, 0x83, 0xD2, 0x83, 0xE7, 0x83, 0xEE, 0x83];
console.log('\n表 A (dispatcher 实际):');
for (let a = 0; a < 9; a++) {
  const lo = tableA[2 * a + 1];
  const hi = tableA[2 * a + 2] ?? 0;
  console.log('  A=' + a + ' → $' + (hi << 8 | lo).toString(16));
}
console.log('\n表 A (标准):');
for (let a = 0; a < 9; a++) {
  const lo = tableA[2 * a];
  const hi = tableA[2 * a + 1];
  console.log('  A=' + a + ' → $' + (hi << 8 | lo).toString(16));
}
