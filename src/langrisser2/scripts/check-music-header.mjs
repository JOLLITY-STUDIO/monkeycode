import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const MUSIC_TABLE_BASE = 0x096C74;
const MUSIC_DATA_BASE = 0x090000;

console.log(`Music table at 0x${MUSIC_TABLE_BASE.toString(16)}`);
console.log(`Music data at 0x${MUSIC_DATA_BASE.toString(16)}`);

console.log('\n=== Music table entries (first 20) ===');
for (let i = 0; i < 20; i++) {
  const tableOffset = MUSIC_TABLE_BASE + i * 2;
  const offset = (rom[tableOffset + 1] << 8) | rom[tableOffset];
  console.log(`  ${i.toString().padStart(2, '0')}: offset=0x${offset.toString(16).padStart(5, '0')}`);
}

console.log('\n=== Music 00 data header ===');
const music00Offset = (rom[MUSIC_TABLE_BASE + 1] << 8) | rom[MUSIC_TABLE_BASE];
const music00Addr = MUSIC_DATA_BASE + music00Offset;
console.log(`Music 00 starts at: 0x${music00Addr.toString(16)}`);

for (let i = 0; i < 64; i += 16) {
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(rom[music00Addr + i + j].toString(16).padStart(2, '0'));
  }
  console.log(`0x${(music00Addr + i).toString(16).padStart(6, '0')}: ${line.join(' ')}`);
}

console.log('\n=== Music 02 data header ===');
const music02Offset = (rom[MUSIC_TABLE_BASE + 5] << 8) | rom[MUSIC_TABLE_BASE + 4];
const music02Addr = MUSIC_DATA_BASE + music02Offset;
console.log(`Music 02 starts at: 0x${music02Addr.toString(16)}`);

for (let i = 0; i < 64; i += 16) {
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(rom[music02Addr + i + j].toString(16).padStart(2, '0'));
  }
  console.log(`0x${(music02Addr + i).toString(16).padStart(6, '0')}: ${line.join(' ')}`);
}

console.log('\n=== Check for pattern structure ===');
const checkAddr = music00Addr;
const buf = rom.slice(checkAddr, checkAddr + 200);

let pos = 0;
while (pos < buf.length) {
  if (buf[pos] === 0xFF && pos + 1 < buf.length) {
    const next = buf[pos + 1];
    if (next === 0xFD) {
      console.log(`0x${pos.toString(16)}: END MARKER`);
      break;
    } else if (next === 0xFE) {
      console.log(`0x${pos.toString(16)}: LOOP/REPEAT`);
      pos += 2;
    } else if (next === 0xFF) {
      console.log(`0x${pos.toString(16)}: WAIT`);
      pos += 2;
    } else {
      console.log(`0x${pos.toString(16)}: UNKNOWN FF 0x${next.toString(16)}`);
      pos += 2;
    }
  } else if (buf[pos] === 0x01 && pos + 1 < buf.length) {
    console.log(`0x${pos.toString(16)}: SETADDR 0x${buf[pos + 1].toString(16)}`);
    pos += 2;
  } else if (buf[pos] === 0x00 && pos + 1 < buf.length) {
    console.log(`0x${pos.toString(16)}: WRITE 0x${buf[pos + 1].toString(16)}`);
    pos += 2;
  } else {
    console.log(`0x${pos.toString(16)}: DIRECT WRITE 0x${buf[pos].toString(16)}`);
    pos += 1;
  }
}
