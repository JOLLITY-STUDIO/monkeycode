const fs = require('fs');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');

const HEADER = 16, BANK = 16384;

// Strategy: Search ROM for 6502 instructions that reference the roster area $AA47
// "LDA $AA47" = AD 47 AA, "LDX $AA47" = AE 47 AA, "LDY $AA47" = AC 47 AA
// Also indexed: "LDA $AA47,X" = BD 47 AA, "LDA $AA47,Y" = B9 47 AA

console.log('=== Searching PRG for code referencing $AA47 area ===');

const patterns = [
  {name:'LDA abs',  bytes:[0xAD, 0x47, 0xAA]},
  {name:'LDX abs',  bytes:[0xAE, 0x47, 0xAA]},
  {name:'LDY abs',  bytes:[0xAC, 0x47, 0xAA]},
  {name:'STA abs',  bytes:[0x8D, 0x47, 0xAA]},
  {name:'LDA absX',  bytes:[0xBD, 0x47, 0xAA]},
  {name:'LDA absY',  bytes:[0xB9, 0x47, 0xAA]},
  {name:'CMP abs',  bytes:[0xCD, 0x47, 0xAA]},
];

// Also search for immediate references to the roster table address
// 6502 code might load $AA47 as $A9 $47 (LDA #$47) or $A2 $47 (LDX #$47)
// paired with $A9 $AA (LDA #$AA)
const patterns2 = [
  {name:'LDA #$47 LDA #$AA or LDX #$47', bytes:[0xA9, 0x47, 0xA9, 0xAA]}, // unlikely but try
];

// Search all PRG banks 
const prgStart = HEADER;
const prgEnd = Math.min(rom.length, HEADER + 16 * BANK);

for (const pat of patterns) {
  for (let i = prgStart; i < prgEnd - 3; i++) {
    if (rom[i] === pat.bytes[0] && rom[i+1] === pat.bytes[1] && rom[i+2] === pat.bytes[2]) {
      const fileOff = i;
      const bank = Math.floor((fileOff - HEADER) / BANK);
      const addr = ((fileOff - HEADER) % BANK) + 0x8000;
      // Show context around the instruction
      const ctx = Array.from(rom.subarray(Math.max(prgStart, i-4), i + 8))
        .map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
      console.log(`  ${pat.name} at Bank ${bank} $${addr.toString(16)} file 0x${fileOff.toString(16)} | ${ctx}`);
    }
  }
}

// Also search for nearby addresses like $AA40-$AA50
console.log('\n=== Searching for $AA4x references (range $AA40-$AA4F) ===');
for (let lo = 0x40; lo <= 0x4F; lo++) {
  const pat = [0xAD, lo, 0xAA]; // LDA $AA4x
  for (let i = prgStart; i < prgEnd - 3; i++) {
    if (rom[i] === pat[0] && rom[i+1] === pat[1] && rom[i+2] === pat[2]) {
      const fileOff = i;
      const bank = Math.floor((fileOff - HEADER) / BANK);
      const addr = ((fileOff - HEADER) % BANK) + 0x8000;
      const ctx = Array.from(rom.subarray(Math.max(prgStart, i-4), i + 8))
        .map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
      console.log(`  LDA $AA${lo.toString(16)} at Bank ${bank} $${addr.toString(16)} | ${ctx}`);
    }
  }
}

// Also search for code that refers to $0300 (where roster gets copied to RAM)
console.log('\n=== Searching for $0300 references (roster destination in RAM) ===');
for (let lo = 0x00; lo <= 0x0C; lo++) {
  const pats = [
    [0x8D, lo, 0x03],  // STA $030x
    [0x8D, lo, 0x04],  // STA $040x
  ];
  for (const pat of pats) {
    for (let i = prgStart; i < prgEnd - 3; i++) {
      if (rom[i] === pat[0] && rom[i+1] === pat[1] && rom[i+2] === pat[2]) {
        const fileOff = i;
        const bank = Math.floor((fileOff - HEADER) / BANK);
        const addr = ((fileOff - HEADER) % BANK) + 0x8000;
        if (bank >= 2) continue; // skip later banks for now
        const target = '$' + (pat[2].toString(16).padStart(2,'0')) + lo.toString(16).padStart(2,'0');
        const ctx = Array.from(rom.subarray(Math.max(prgStart, i-4), i + 8))
          .map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
        console.log(`  STA ${target} at Bank ${bank} $${addr.toString(16)} | ${ctx}`);
      }
    }
  }
}

// Search for code near the roster load: look for 0x0B or 11 (team size) in loops
console.log('\n=== Searching for CMP #$0B near $0300 references ===');
for (let i = prgStart; i < prgEnd - 3; i++) {
  if (rom[i] === 0xC9 && rom[i+1] === 0x0B) { // CMP #$0B
    // Check if nearby code references $0300 area
    const nearby = Array.from(rom.subarray(Math.max(prgStart, i-10), i + 20))
      .map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
    const checkRange = Array.from(rom.subarray(Math.max(prgStart, i-20), i + 30));
    const has0300 = checkRange.some((b, j) => {
      const pos = i - 20 + j;
      return rom[pos] === 0x03 && pos + 1 < rom.length; // simplified check
    });
    const bank = Math.floor((i - HEADER) / BANK);
    const addr = ((i - HEADER) % BANK) + 0x8000;
    if (bank < 4) {
      console.log(`  CMP #$0B at Bank ${bank} $${addr.toString(16)} | ${nearby}`);
    }
  }
}
