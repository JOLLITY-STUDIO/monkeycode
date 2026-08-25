// 扫描全 ROM (修正字节序: 6502 绝对寻址低字节在前)
// JSR $A484 = 20 84 A4 | JMP $A484 = 4C 84 A4
// JSR $A212 = 20 12 A2 | JMP $A212 = 4C 12 A2
// JSR $A855 = 20 55 A8 | JSR $A86E = 20 6E A8
// JSR $A491 (vector table) = 20 91 A4
// JSR $A8CE (OAM DMA) = 20 CE A8 | JSR $A8FE = 20 FE A8
const fs = require('fs');
const path = require('path');

const romPath = process.argv[2] || 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(path.resolve(__dirname, '..', romPath));
const PRG_BANKS = rom[4];
const prg = rom.slice(16, 16 + PRG_BANKS * 0x4000);

function prg2cpu(idx) {
  if (idx >= 0 && idx < 0x2000) return idx + 0x8000;       // bank0 -> $8000-$9FFF
  if (idx >= 0x4000 && idx < 0x6000) return idx - 0x4000 + 0xa000; // bank2 -> $A000-$BFFF
  return -1;
}

function scan(needle, label) {
  console.log(`\n===== ${label} =====`);
  let count = 0;
  for (let i = 0; i + needle.length <= prg.length; i++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) if (prg[i+j] !== needle[j]) { match = false; break; }
    if (match) {
      const cpu = prg2cpu(i);
      count++;
      console.log(`  PRG 0x${i.toString(16).padStart(5,'0')} -> cpu $${cpu >= 0 ? cpu.toString(16).toUpperCase() : '??'} (bytes: ${prg.slice(i-3,i+6).map(b=>b.toString(16).padStart(2,'0')).join(' ')})`);
    }
  }
  console.log(`  total: ${count}`);
}

scan([0x20, 0x84, 0xA4], 'JSR $A484');
scan([0x4C, 0x84, 0xA4], 'JMP $A484');
scan([0x20, 0x12, 0xA2], 'JSR $A212');
scan([0x4C, 0x12, 0xA2], 'JMP $A212');
scan([0x20, 0x55, 0xA8], 'JSR $A855');
scan([0x20, 0x6E, 0xA8], 'JSR $A86E');
scan([0x20, 0x91, 0xA4], 'JSR $A491');
scan([0x20, 0xCE, 0xA8], 'JSR $A8CE');
scan([0x20, 0xFE, 0xA8], 'JSR $A8FE');
scan([0x20, 0x00, 0xA2], 'JSR $A200');
scan([0x20, 0x0F, 0xA2], 'JSR $A20F');
scan([0x20, 0x0C, 0xA2], 'JSR $A20C');
