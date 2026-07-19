import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const H = 16;
const kana = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/data/_chr_map_tsubasa.json', 'utf8'))._mapping;

function dump(fileOff, len, label) {
  console.log(`\n--- ${label} file 0x${fileOff.toString(16)} CDL 0x${(fileOff-H).toString(16)} ---`);
  for (let i = 0; i < len; i += 32) {
    const line = fileOff + i;
    const hex = Array.from(rom.subarray(line, line + Math.min(32, len - i))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    const txt = Array.from(rom.subarray(line, line + Math.min(32, len - i))).map(v => kana[v] || '.').join('');
    console.log(`  ${line.toString(16).padStart(5, '0')}: ${hex} | ${txt}`);
  }
}

dump(0x16134 - 64, 160, 'ジウ at 0x16134');
