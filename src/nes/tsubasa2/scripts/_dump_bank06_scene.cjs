// 转储 bank6 尾部场景数据表（CPU $BF00 = 物理 $9F00 = ROM 0xC010+0x1F00 = 0xDF10）
const fs = require('fs');
const path = require('path');
const romPath = process.argv[2] || path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
const bankBase = 16 + 6 * 0x2000;
console.log('bank6 ROM base = 0x' + bankBase.toString(16));
const cpuStart = 0xbf00;
const len = 0x100;
const romOff = bankBase + (cpuStart - 0xa000);
console.log('dump CPU $BF00-$BFFF → ROM 0x' + romOff.toString(16));
const hex = [];
for (let i = 0; i < len; i++) hex.push(buf[romOff + i].toString(16).padStart(2, '0'));
for (let r = 0; r < len; r += 16) {
  console.log('$' + (cpuStart + r).toString(16).toUpperCase() + ': ' + hex.slice(r, r + 16).join(' '));
}
console.log('\n=== 场景条目解析（stride 19，起始 $BF00） ===');
for (let s = 0; s < 16; s++) {
  const base = cpuStart + s * 19;
  const o = base - 0xa000;
  const bytes = [];
  for (let i = 0; i < 19; i++) bytes.push(buf[bankBase + o + i].toString(16).padStart(2, '0'));
  console.log('scene ' + s + ' @$' + base.toString(16).toUpperCase() + ': ' + bytes.join(' '));
}
