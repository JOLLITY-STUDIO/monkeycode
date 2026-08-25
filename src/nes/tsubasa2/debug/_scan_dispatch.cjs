// 扫描全 ROM: JSR $A484 (20 84 A4) / JMP $A484 (4C 84 A4) / 以及 $A212 入口的真实调用点
// 目的: 找到场景分发器的唯一调用者, 确认返回值消费模型
const fs = require('fs');
const path = require('path');

const romPath = process.argv[2] || 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(path.resolve(__dirname, '..', romPath));
const PRG_BANKS = rom[4];
const prg = rom.slice(16, 16 + PRG_BANKS * 0x4000);

function prg2cpu(idx) {
  // PRG 0x0000-0x1FFF -> cpu $8000-$9FFF (bank0)
  // PRG 0x4000-0x5FFF -> cpu $A000-$BFFF (bank2)
  if (idx >= 0 && idx < 0x2000) return idx + 0x8000;
  if (idx >= 0x4000 && idx < 0x6000) return idx - 0x4000 + 0xa000;
  return -1;
}

function scan(needle, label) {
  console.log(`\n===== ${label} (${needle.map(b=>b.toString(16).padStart(2,'0').toUpperCase()).join(' ')}) =====`);
  let count = 0;
  for (let i = 0; i + needle.length <= prg.length; i++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) if (prg[i+j] !== needle[j]) { match = false; break; }
    if (match) {
      const cpu = prg2cpu(i);
      count++;
      console.log(`  PRG 0x${i.toString(16).padStart(5,'0')} -> cpu $${cpu >= 0 ? cpu.toString(16).toUpperCase() : '??'}`);
    }
  }
  console.log(`  total: ${count}`);
}

// JSR/JMP $A484 (dispatcher), $A855 (scene entry), $A86E (scene entry), $A212 (hub), $A200, $A20F, $A20C
scan([0x20, 0x84, 0xA4], 'JSR $A484');
scan([0x4C, 0x84, 0xA4], 'JMP $A484');
scan([0x20, 0xA8, 0x55], 'JSR $A855');
scan([0x20, 0xA8, 0x6E], 'JSR $A86E');
scan([0x20, 0xA2, 0x12], 'JSR $A212');
scan([0x4C, 0xA2, 0x12], 'JMP $A212');
scan([0x20, 0xA2, 0x00], 'JSR $A200');
scan([0x20, 0xA2, 0x0F], 'JSR $A20F');
scan([0x20, 0xA2, 0x0C], 'JSR $A20C');
