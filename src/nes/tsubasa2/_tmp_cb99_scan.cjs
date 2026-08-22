// 临时: dump bank11 $8310-$8400 (表项目标区域) 验证 sub8327/sub83E7 等是否为代码入口
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOff = 0x10;
function dumpRange(bankIdx, start, len) {
  const out = [];
  for (let i = 0; i < len; i++) {
    const off = prgOff + bankIdx * 0x2000 + (start + i - 0x8000);
    out.push(rom[off].toString(16).padStart(2, '0'));
  }
  console.log(`bank${bankIdx} $${start.toString(16)}: ${out.join(' ')}`);
}
dumpRange(11, 0x8310, 48);   // $8327 前
dumpRange(11, 0x83E0, 32);   // $83E7 前
dumpRange(11, 0x83F8, 16);   // $83FF
dumpRange(11, 0x8350, 32);   // $8358
dumpRange(11, 0x8370, 16);   // $8377
dumpRange(11, 0x835C, 12);   // $8364
dumpRange(11, 0x83CC, 12);   // $83D2
dumpRange(11, 0x83E8, 12);   // $83EE
