import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const prg = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.prg.bin');
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const H = 16;

console.log('PRG bin header:', Array.from(prg.subarray(0, 16)).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('ROM header:', Array.from(rom.subarray(0, 16)).map(v => v.toString(16).padStart(2, '0')).join(' '));

function dump(buf, off, len, label) {
  console.log(`\n--- ${label} at file offset 0x${off.toString(16)} ---`);
  for (let i = 0; i < len; i += 16) {
    const line = off + i;
    const hex = Array.from(buf.subarray(line, line + Math.min(16, len - i))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    console.log(`  ${line.toString(16).padStart(5, '0')}: ${hex}`);
  }
}

// Check roster table in original ROM
const romRosterOff = 16 + 1 * 16384 + (0xAA47 - 0x8000);
dump(rom, romRosterOff, 64, 'ROM roster table (file 0x6a57)');

// Check PRG bin at corresponding offsets
// If PRG bin has header at offset 0, PRG data starts at offset 16
// CDL offset 0x6a47 corresponds to PRG data offset 0x6a47, file offset 0x6a47 + 16 = 0x6a57
const prgRosterOff = 16 + 1 * 16384 + (0xAA47 - 0x8000);
dump(prg, prgRosterOff, 64, 'PRG bin roster table (file 0x6a57)');

// Check PRG bin at offset 0x4a57 (if CDL offset 0x4a47 corresponds there)
dump(prg, 0x4a57, 64, 'PRG bin CDL 0x4a47 + 16');

// Check PRG bin at offset 0x4a47 (if no header offset)
dump(prg, 0x4a47, 64, 'PRG bin CDL 0x4a47');

// Compare PRG bin data section with ROM data section
console.log('\n--- Compare PRG bin PRG data with ROM PRG data ---');
let same = 0, diff = 0;
for (let i = 0; i < 256 * 1024; i++) {
  if (prg[16 + i] === rom[16 + i]) same++; else diff++;
}
console.log('same bytes:', same, 'diff bytes:', diff);

// Compare larger
const prgLen = prg.length - H;
const romPrgLen = rom.length - H;
console.log('PRG data length in bin:', prgLen, 'ROM PRG data length:', romPrgLen);
