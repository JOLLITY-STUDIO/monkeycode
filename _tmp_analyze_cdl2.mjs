import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const BANK = 16384;
function cdlToFile(cdlOff) { return cdlOff + 16; }
function cdlToCpu(cdlOff) { return (cdlOff % BANK) + 0x8000; }
function cdlToRomBank(cdlOff) { return Math.floor(cdlOff / BANK); }
function dumpCdl(cdlOff, len, label) {
  console.log(`\n--- ${label} CDL 0x${cdlOff.toString(16)} => CPU 0x${cdlToCpu(cdlOff).toString(16)} ROM bank ${cdlToRomBank(cdlOff)} file 0x${cdlToFile(cdlOff).toString(16)} ---`);
  for (let i = 0; i < len; i += 16) {
    const line = cdlOff + i;
    const fileOff = cdlToFile(line);
    const hex = Array.from(rom.subarray(fileOff, fileOff + Math.min(16, len - i))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    const flags = Array.from(cdl.subarray(line, line + Math.min(16, len - i))).map(v => v.toString(2).padStart(8, '0')).join(' ');
    console.log(`  CDL ${line.toString(16).padStart(5, '0')}: ${hex} | ${flags}`);
  }
}

console.log('CDL file size:', cdl.length, 'Banks:', cdl.length / BANK);

// Roster table: Bank 1, CPU 0xAA47 => CDL 0x4000 + 0x2A47 = 0x6A47
dumpCdl(0x6a47, 128, 'Roster table (Bank 1 CPU 0xAA47)');

// StatBlock05: Bank 5, CPU 0xABDC => CDL 0x14000 + 0x2BDC = 0x16BDC
// But earlier we saw CDL 0x12b9c range was accessed. Check bank 5 data accesses.
// Actually, Bank 5 CDL = 5 * 0x4000 = 0x14000 to 0x17FFF. CPU 0xABDC = CDL 0x14000 + 0x2BDC = 0x16BDC.
// Let's check CDL around 0x16bdc and also the earlier reported 0x12b9c.
dumpCdl(0x16bdc, 64, 'StatBlock05 expected (Bank 5 CPU 0xABDC)');

// Pointer table: Bank 0x0C, CPU 0x8DC2 => CDL 0x30000 + 0x0DC2 = 0x30DC2
// classType: Bank 0x0C, CPU 0x86B8 => CDL 0x30000 + 0x06B8 = 0x306B8
// attrBlocks: Bank 0x0C, CPU 0x90DF => CDL 0x30000 + 0x10DF = 0x310DF
dumpCdl(0x30dc2, 64, 'Pointer table (Bank 0xC CPU 0x8DC2)');
dumpCdl(0x306b8, 64, 'ClassType table (Bank 0xC CPU 0x86B8)');
dumpCdl(0x310df, 64, 'AttrBlocks (Bank 0xC CPU 0x90DF)');

// Skill block: Bank 9, CPU 0x9620 => CDL 0x24000 + 0x1620 = 0x25620
dumpCdl(0x25620, 64, 'SkillBlock (Bank 9 CPU 0x9620)');

// Action table: Bank 9, CPU 0x9720 => CDL 0x24000 + 0x1720 = 0x25720
dumpCdl(0x25720, 64, 'ActionTable (Bank 9 CPU 0x9720)');

// Type markers: Bank 9, CPU 0x9360 => CDL 0x24000 + 0x1360 = 0x25360
dumpCdl(0x25360, 64, 'TypeMarkers (Bank 9 CPU 0x9360)');
