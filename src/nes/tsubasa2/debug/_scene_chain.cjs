const fs = require('fs');
const out = [];
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
out.push('rom size: ' + rom.length);
function b0(addr) { return rom[0x10 + (addr - 0x8000)]; }
out.push('=== 场景表 $8AEC (bank0) ===');
for (let i = 0; i < 48; i += 2) {
  const base = b0(0x8AEC + i);
  const bank = b0(0x8AED + i);
  const next = b0(0x8AEE + i);
  out.push(`[${i/2}] base=$${base.toString(16)} bank=${bank} next=$${next.toString(16)}`);
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/debug/_scene_chain.txt', out.join('\n'));
console.log('done');
