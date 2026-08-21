// 校验 bank18 CHAPTER_MAP_DATA vs ROM
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const B18 = 0x10 + 18 * 0x2000; // bank18 ROM 偏移 0x24010
const romMap = Array.from(rom.slice(B18, B18 + 8192));

// 从 chapter-table.ts 提取 CHAPTER_MAP_DATA 数组
const src = fs.readFileSync('src/game/prg/data/scene/chapter-table.ts', 'utf8');
const m = src.match(/export const CHAPTER_MAP_DATA: readonly number\[\] = \[([\s\S]*?)\n\];/);
if (!m) { console.log('FAIL 无法解析 CHAPTER_MAP_DATA'); process.exit(1); }
const tsMap = m[1].split(',').map(s => parseInt(s.trim(), 10));

console.log('CHAPTER_MAP_DATA: TS=' + tsMap.length + 'B ROM=' + romMap.length + 'B');
let diffCount = 0;
for (let i = 0; i < Math.min(tsMap.length, romMap.length); i++) {
  if (tsMap[i] !== romMap[i]) {
    if (diffCount < 10) console.log('  [' + i + '] TS=' + tsMap[i] + ' ROM=' + romMap[i]);
    diffCount++;
  }
}
console.log(diffCount === 0 ? 'PASS CHAPTER_MAP_DATA' : 'FAIL 共 ' + diffCount + ' 处差异');
