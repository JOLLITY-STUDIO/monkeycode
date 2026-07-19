import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const H = 16, BANK = 16384;
function bankOfFile(off) { return Math.floor((off - H) / BANK); }
function cpuOfFile(off) { return (off - H) % BANK + 0x8000; }
function cdlOfFile(off) { return off - H; }
function dump(fileOff, len, label) {
  console.log(`\n--- ${label} file 0x${fileOff.toString(16)} Bank ${bankOfFile(fileOff)} CPU 0x${cpuOfFile(fileOff).toString(16)} CDL flag=${cdl[cdlOfFile(fileOff)].toString(2).padStart(8, '0')} ---`);
  for (let i = 0; i < len; i += 16) {
    const line = fileOff + i;
    const hex = Array.from(rom.subarray(line, line + Math.min(16, len - i))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    console.log(`  ${line.toString(16).padStart(5, '0')}: ${hex}`);
  }
}

// 翼 hits
dump(0x1a9 - 16, 64, '翼 at 0x1a9');
dump(0x1fd6 - 16, 64, '翼 at 0x1fd6');
dump(0x2f8f - 16, 64, '翼 at 0x2f8f');

// 若林 / 松山 / 日向 hits
dump(0x170c6 - 16, 128, '若林/松山 area 0x170c6');
dump(0x16ed7 - 16, 128, '松山 at 0x16ed7');

// 岬 hits
dump(0x131 - 16, 64, '岬 at 0x131');
