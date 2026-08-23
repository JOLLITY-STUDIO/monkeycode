// 转储 bank02 尾部场景数据（CPU $BF00 = 物理 $9F00 = ROM 0x5F10），并验证 $9DEE 乘法语义
const fs = require('fs');
const path = require('path');
const romPath = process.argv[2] || path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
const prgStart = buf[4] * 0x4000;
console.log('PRG size markers:', buf[4], 'x16KB; header says PRG=0x' + buf[4].toString(16));
console.log('header[4] bytes:', Array.from(buf.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
// bank02 物理基址 = 16 + 2*0x2000
const bankBase = 16 + 2 * 0x2000;
const phys = (cpu) => bankBase + (cpu - 0xa000);
console.log('bank02 physical base ROM offset = 0x' + bankBase.toString(16));
// 转储 CPU $BF00..$BFFF（物理 $9F00..$9FFF）
const cpuStart = 0xbf00;
const len = 0x100;
const romOff = phys(cpuStart);
console.log('dump CPU $' + cpuStart.toString(16).toUpperCase() + '-$BFFF → ROM 0x' + romOff.toString(16));
const hex = [];
for (let i = 0; i < len; i++) hex.push(buf[romOff + i].toString(16).padStart(2, '0'));
for (let r = 0; r < len; r += 16) {
  console.log('$' + (cpuStart + r).toString(16).toUpperCase() + ': ' + hex.slice(r, r + 16).join(' '));
}
// 19 字节步长解析场景 0..7
console.log('\n=== 场景条目解析（stride 19，起始 $BF00） ===');
for (let s = 0; s < 8; s++) {
  const base = cpuStart + s * 19;
  const o = phys(base) - bankBase + (cpuStart - 0xa000); // 偏移量
  const bytes = [];
  for (let i = 0; i < 19; i++) bytes.push(buf[romOff + o + i].toString(16).padStart(2, '0'));
  console.log('scene ' + s + ' @$' + base.toString(16).toUpperCase() + ': ' + bytes.join(' '));
}
