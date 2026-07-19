import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const H = 16, BANK = 16384;
const bank5Start = H + 5 * BANK;
const bank5End = bank5Start + BANK;

const kana = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/data/_chr_map_tsubasa.json', 'utf8'))._mapping;
const tileToChar = kana;

// Print Bank 5 CDL data regions as Japanese text if possible
function printAsText(start, end) {
  let line = '';
  for (let i = start; i < end; i++) {
    const b = rom[i];
    const c = tileToChar[b] || '.';
    line += c;
    if ((i - start + 1) % 32 === 0) {
      console.log(`0x${(i - start + bank5Start).toString(16)}: ${line}`);
      line = '';
    }
  }
  if (line) console.log(`0x${(end - start + bank5Start).toString(16)}: ${line}`);
}

console.log('=== Bank 5 CDL data regions as text ===');
let ranges = [];
let last = -2;
for (let i = 5 * BANK; i < 6 * BANK; i++) {
  if (cdl[i] & 0x02) {
    if (i !== last + 1) ranges.push({ cdlStart: i, count: 0 });
    ranges[ranges.length - 1].count++;
    last = i;
  }
}
for (const r of ranges) {
  if (r.count < 16) continue;
  const start = r.cdlStart + H;
  const end = start + r.count;
  console.log(`\n--- CDL 0x${r.cdlStart.toString(16)} CPU 0x${(0x8000 + r.cdlStart % BANK).toString(16)} len=${r.count} ---`);
  printAsText(start, end);
}
