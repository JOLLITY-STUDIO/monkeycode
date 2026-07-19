import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');

function dumpRom(fileOff, len) {
  console.log(`ROM file offset 0x${fileOff.toString(16)} (CPU ${'0x' + ((fileOff - 16) % 16384 + 0x8000 + Math.floor((fileOff - 16) / 16384) * 0x4000).toString(16)})`);
  for (let i = 0; i < len; i += 16) {
    const line = fileOff + i;
    const hex = Array.from(rom.subarray(line, line + Math.min(16, len - i))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    console.log(`  ${line.toString(16).padStart(5, '0')}: ${hex}`);
  }
}

console.log('--- ROM at 0x4a57 (CDL 0x4a47 + 16) ---');
dumpRom(0x4a57, 64);

console.log('--- ROM at 0x6a57 (roster table) ---');
dumpRom(0x6a57, 64);

console.log('--- ROM at 0x12b9c+16 (statBlock05 area, CDL) ---');
dumpRom(0x12bac, 64);

console.log('--- ROM at 0x25370+16 (bank 9 data area, CDL) ---');
dumpRom(0x25380, 64);

console.log('--- CDL around roster 0x6a47 (should be 0x6a47 in CDL) ---');
for (let i = 0x6a40; i < 0x6a60; i++) {
  console.log(`  CDL 0x${i.toString(16)}: ${cdl[i].toString(2).padStart(8, '0')} 0x${cdl[i].toString(16).padStart(2, '0')}`);
}
