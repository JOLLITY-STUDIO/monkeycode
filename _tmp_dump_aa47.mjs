import { readFileSync } from 'fs';

const rom = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const prgStart = 16; // .nes header 16 bytes

// AA47 is in Bank $01. Bank $01 = PRG offset 0x04000 ~ 0x07FFF
// In .nes file: 0x04010 + AA47 = 0x04010 + 0x0A47 = 0x04A57
// Actually: header(16) + bank_offset + addr_within_bank
const bank1Base = 0x04000;
const aa47Offset = 0x0A47;
const fileOffset = prgStart + bank1Base + aa47Offset;

console.log('=== AA47 table in Bank $01 ===');
console.log(`File offset: 0x${fileOffset.toString(16).toUpperCase()}`);

// Read ~512 bytes to see multiple match entries
const raw = rom.slice(fileOffset, fileOffset + 512);

// Try to identify structure: we expect match entries
// Each match might have: 11 player IDs (team A) + 11 (team B) = 22 bytes minimum
// plus formation + control data
console.log('\n--- Raw hex dump (32 bytes per row) ---');
for (let i = 0; i < raw.length; i += 32) {
  const chunk = Array.from(raw.slice(i, i + 32))
    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
    .join(' ');
  const offsetHex = (fileOffset + i).toString(16).toUpperCase().padStart(5, '0');
  console.log(`${offsetHex}: ${chunk}`);
}

// Now try parsing as per WORKLOG §10.4 structure
// "AA47+0x00~0x0A: 主队 11 人球员 ID 列表"
// "AA47+0x0C~0x16: 客队 11 人球员 ID 列表"
// But this describes ONE match. Let's see if there's a pattern.

// Hypothesis: each match is a fixed-size block. Let's try different block sizes.
console.log('\n--- Attempting to parse match blocks ---');

// First, let's just show the first few team entries
const teamASize = 11;
const teamBSize = 11;

for (let matchIdx = 0; matchIdx < 8; matchIdx++) {
  // Try block size = 0x19 (25 bytes: 11+11+3 extra?)
  // Or 0x81 as per WORKLOG?
  const base = matchIdx * 34; // guess 34 = 11+11+12 extra
  const teamA = Array.from(raw.slice(base, base + teamASize))
    .map(b => b.toString(16).padStart(2, '0'));
  const teamB = Array.from(raw.slice(base + teamASize, base + teamASize + teamBSize))
    .map(b => b.toString(16).padStart(2, '0'));
  console.log(`\nmatch[${matchIdx}] (block at +0x${(base).toString(16)}):`);
  console.log(`  Team A: ${teamA.join(' ')}`);
  console.log(`  Team B: ${teamB.join(' ')}`);
}
