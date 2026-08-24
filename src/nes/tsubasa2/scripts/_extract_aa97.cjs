// 提取 bank02 的 $AA97 NT 长文本表 + $A677 精灵属性表
// bank02 = PRG bank 2（8KB），映射 CPU $A000-$BFFF
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgStart = 0x10;
const bankOff = prgStart + 2 * 0x2000; // bank02 物理偏移
function cpu(addr) { return rom[bankOff + (addr - 0xA000)]; }

console.log('=== A677-A77A (精灵属性表) ===');
let s677 = [];
for (let a = 0xa677; a <= 0xa77a; a++) s677.push(cpu(a));
console.log(s677.map(b => b.toString(16).padStart(2, '0')).join(','));

console.log('\n=== AA97 开始 400 字节 ===');
let raw = [];
for (let a = 0xaa97; a < 0xaa97 + 400; a++) raw.push(cpu(a));
// 按场景15格式解析：3字节组 [b0=flags/addrHi, b1=addrLo, b2=count]? 先打印原始
console.log(raw.map(b => b.toString(16).padStart(2, '0')).join(','));

console.log('\n=== 尝试解析（每 3 字节一组）===');
let i = 0;
while (i + 2 < raw.length) {
  const b0 = raw[i], b1 = raw[i + 1], b2 = raw[i + 2];
  const flags = b0 >> 7;          // bit7 = 结束
  const delay = (b0 >> 6) & 1;    // bit6 = 延时
  const addrHi = b0 & 0x7f;       // 低 7 位
  console.log(`[$AA97+0x${i.toString(16)}] b0=$b0(flags=${flags} delay=${delay} hi7=$${addrHi.toString(16)}) b1(lo)=$${b1.toString(16)} b2(count)=$${b2.toString(16)}` + (flags ? '  <== 结束' : ''));
  i += 3;
  if (flags) break;
}
