import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const MUSIC_TABLE_BASE = 0x096C74;
const MUSIC_DATA_BASE = 0x090000;
const MUSIC_COUNT = 64;

const rom = fs.readFileSync(ROM_PATH);
console.log(`ROM size: ${rom.length} bytes`);

const musicTable = [];
for (let i = 0; i < MUSIC_COUNT; i++) {
  const offset = MUSIC_TABLE_BASE + i * 4;
  if (offset + 4 > rom.length) break;
  
  const addr = (rom[offset + 3] << 24) |
               (rom[offset + 2] << 16) |
               (rom[offset + 1] << 8) |
               rom[offset];
  
  musicTable.push({
    id: i,
    addr: addr.toString(16).toUpperCase().padStart(8, '0'),
    offset: offset.toString(16).toUpperCase().padStart(8, '0'),
    data: addr !== 0 ? addr - MUSIC_DATA_BASE : -1,
  });
}

console.log('\n=== 音乐指针表 (0x096C74) ===');
console.log('ID | Address    | Offset');
console.log('---|------------|--------');
for (const entry of musicTable) {
  if (entry.data >= 0) {
    console.log(`${entry.id.toString().padStart(2)} | ${entry.addr} | ${entry.data.toString().padStart(6)}`);
  }
}

const nonZeroEntries = musicTable.filter(e => e.data >= 0);
console.log(`\n有效音乐条目: ${nonZeroEntries.length}/${MUSIC_COUNT}`);

const outputDir = path.join(__dirname, '../20260713/output/music');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const entry of nonZeroEntries) {
  const startAddr = parseInt(entry.addr, 16);
  let endAddr = rom.length;
  
  const nextEntry = musicTable.find(e => e.id > entry.id && e.data >= 0);
  if (nextEntry) {
    endAddr = parseInt(nextEntry.addr, 16);
  }
  
  const size = endAddr - startAddr;
  if (size > 0 && startAddr < rom.length) {
    const musicData = rom.slice(startAddr, Math.min(endAddr, rom.length));
    fs.writeFileSync(
      path.join(outputDir, `music_${entry.id.toString().padStart(3, '0')}.bin`),
      musicData
    );
    console.log(`音乐 ${entry.id}: ${size} bytes → music_${entry.id.toString().padStart(3, '0')}.bin`);
  }
}

console.log('\n=== 音乐数据区分析 ===');
console.log(`音乐表基址: 0x${MUSIC_TABLE_BASE.toString(16)}`);
console.log(`音乐数据基址: 0x${MUSIC_DATA_BASE.toString(16)}`);
console.log(`音乐区大小: ${(rom.length - MUSIC_DATA_BASE) / 1024} KB`);

const totalMusicSize = nonZeroEntries.reduce((sum, entry) => {
  const startAddr = parseInt(entry.addr, 16);
  const nextEntry = musicTable.find(e => e.id > entry.id && e.data >= 0);
  const endAddr = nextEntry ? parseInt(nextEntry.addr, 16) : rom.length;
  return sum + (endAddr - startAddr);
}, 0);

console.log(`已提取音乐总大小: ${totalMusicSize / 1024} KB`);