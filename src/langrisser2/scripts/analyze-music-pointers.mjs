import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const MUSIC_TABLE_BASE = 0x096C74;
const MUSIC_DATA_BASE = 0x090000;

function hex(b) { return b.toString(16).toUpperCase().padStart(2, '0'); }
function hex4(b) { return b.toString(16).toUpperCase().padStart(4, '0'); }
function hex8(b) { return b.toString(16).toUpperCase().padStart(8, '0'); }

console.log('=== Music Pointer Table Analysis ===\n');

console.log('Raw bytes at 0x096C74:');
const rawBytes = rom.slice(MUSIC_TABLE_BASE, MUSIC_TABLE_BASE + 128);
for (let i = 0; i < 16; i++) {
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(hex(rawBytes[i * 8 + j]));
  }
  console.log(`0x${hex8(MUSIC_TABLE_BASE + i * 8)}: ${line.join(' ')}`);
}

console.log('\n\n=== Trying Different Pointer Formats ===\n');

console.log('Format 1: 2-byte Word (Little Endian)');
console.log('ID | Word | Offset from 0x090000');
console.log('---|------|---------------------');
for (let i = 0; i < 64; i++) {
  const offset = MUSIC_TABLE_BASE + i * 2;
  if (offset + 2 > rom.length) break;
  
  const word = (rom[offset + 1] << 8) | rom[offset];
  const dataOffset = word;
  if (dataOffset > 0 && dataOffset < 0x80000) {
    console.log(`${i.toString().padStart(2)} | $${hex4(word)} | ${dataOffset}`);
  }
}

console.log('\nFormat 2: 2-byte Word (Big Endian)');
console.log('ID | Word | Offset from 0x090000');
console.log('---|------|---------------------');
for (let i = 0; i < 64; i++) {
  const offset = MUSIC_TABLE_BASE + i * 2;
  if (offset + 2 > rom.length) break;
  
  const word = (rom[offset] << 8) | rom[offset + 1];
  const dataOffset = word;
  if (dataOffset > 0 && dataOffset < 0x80000) {
    console.log(`${i.toString().padStart(2)} | $${hex4(word)} | ${dataOffset}`);
  }
}

console.log('\nFormat 3: 4-byte Long (Little Endian) - with Bank Offset');
console.log('ID | Address | Bank | Offset');
console.log('---|---------|------|-------');
for (let i = 0; i < 64; i++) {
  const offset = MUSIC_TABLE_BASE + i * 4;
  if (offset + 4 > rom.length) break;
  
  const addr = (rom[offset] << 24) | (rom[offset + 1] << 16) | (rom[offset + 2] << 8) | rom[offset + 3];
  const bank = (addr >> 24) & 0xFF;
  const dataOffset = addr & 0xFFFFFF;
  
  if (dataOffset >= 0x090000 && dataOffset < 0x100000) {
    const relOffset = dataOffset - 0x090000;
    console.log(`${i.toString().padStart(2)} | $${hex8(addr)} | $${hex(bank)} | ${relOffset}`);
  }
}

console.log('\n\n=== Analyzing Music Data Area (0x090000) ===\n');

console.log('First 256 bytes of music data area:');
const musicData = rom.slice(MUSIC_DATA_BASE, MUSIC_DATA_BASE + 256);
for (let i = 0; i < 16; i++) {
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(hex(musicData[i * 16 + j]));
  }
  console.log(`0x${hex8(MUSIC_DATA_BASE + i * 16)}: ${line.join(' ')}`);
}

console.log('\n\n=== Searching for Z80 Code Loading Music Pointers ===\n');

const Z80_CODE_START = 0x1EC000;
const Z80_CODE_SIZE = 0x2000;

for (let i = 0; i < Z80_CODE_SIZE - 5; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0x21) {
    const lo = rom[addr + 1];
    const hi = rom[addr + 2];
    const val = (hi << 8) | lo;
    
    if (val === 0x6C74 || (val >= 0x96C7 && val <= 0x96D7)) {
      console.log(`0x${hex8(addr)}: LD HL,$${hex4(val)}  ; Possible music table reference`);
    }
  }
  
  if (rom[addr] === 0x11) {
    const lo = rom[addr + 1];
    const hi = rom[addr + 2];
    const val = (hi << 8) | lo;
    
    if (val >= 0x9000 || (val >= 0x1500 && val <= 0x1600)) {
      console.log(`0x${hex8(addr)}: LD DE,$${hex4(val)}  ; Possible data reference`);
    }
  }
}

console.log('\n\n=== Checking for 68K Music Initialization Code ===\n');

const MUSIC_INIT_SEARCH_START = 0x020000;
const MUSIC_INIT_SEARCH_SIZE = 0x10000;

for (let i = 0; i < MUSIC_INIT_SEARCH_SIZE - 8; i++) {
  const addr = MUSIC_INIT_SEARCH_START + i;
  
  if (rom[addr] === 0x3C && rom[addr + 4] === 0x3C) {
    const val1 = (rom[addr + 3] << 24) | (rom[addr + 2] << 16) | (rom[addr + 1] << 8) | rom[addr];
    const val2 = (rom[addr + 7] << 24) | (rom[addr + 6] << 16) | (rom[addr + 5] << 8) | rom[addr + 4];
    
    if (val1 === 0xAEC4 || val2 === 0xAEC4) {
      console.log(`0x${hex8(addr)}: MOV.L #$${hex8(val1)},$${hex8(val2)}  ; Music base address setup`);
    }
  }
}