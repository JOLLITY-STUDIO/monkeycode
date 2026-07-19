import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const BANK = 16384;
function cdlToFile(cdlOff) { return cdlOff + 16; }
function cdlToCpu(cdlOff) { return (cdlOff % BANK) + 0x8000; }
function cdlToRomBank(cdlOff) { return Math.floor(cdlOff / BANK); }
function dumpCdl(cdlOff, len, label) {
  console.log(`\n--- ${label} CDL 0x${cdlOff.toString(16)} => Bank ${cdlToRomBank(cdlOff)} CPU 0x${cdlToCpu(cdlOff).toString(16)} ---`);
  for (let i = 0; i < len; i += 16) {
    const line = cdlOff + i;
    const fileOff = cdlToFile(line);
    const hex = Array.from(rom.subarray(fileOff, fileOff + Math.min(16, len - i))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    console.log(`  CDL ${line.toString(16).padStart(5, '0')}: ${hex}`);
  }
}

// ジウ hits
dumpCdl(0x201d4 - 32, 96, 'ジウ hit at 0x201d4');
// リマ hit
dumpCdl(0x27854 - 32, 96, 'リマ hit at 0x27854');
// ジウ other hits
dumpCdl(0x2d33c - 32, 96, 'ジウ hit at 0x2d33c');
dumpCdl(0x2f8ea - 32, 96, 'ジウ hit at 0x2f8ea');
