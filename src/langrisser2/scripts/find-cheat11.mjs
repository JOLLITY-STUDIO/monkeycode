import { readFileSync } from 'fs';

const rom = readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// Search for B+START (0x10,0x80) appearing in ROM data
// Focus on data sections that could be tables
let found = [];
for (let i = 0; i < rom.length - 1; i++) {
  if (rom[i] === 0x10 && rom[i+1] === 0x80) {
    // Check context - is this part of a larger table?
    const ctx = [];
    for (let j = Math.max(0, i-4); j < Math.min(rom.length, i+20); j++) {
      ctx.push('0x' + rom[j].toString(16).padStart(2,'0'));
    }
    found.push({ offset: i, context: ctx.join(' ') });
    if (found.length >= 5 && found.length <= 200) continue;
    if (found.length > 200) break;
  }
}

console.log(`Found ${found.length} occurrences of B+START (0x10,0x80)`);
found.slice(0, 15).forEach(f => {
  console.log(`ROM 0x${f.offset.toString(16).padStart(6,'0')}: ${f.context}`);
});

// Also search for START+B (reverse order) 0x80,0x10
let found2 = 0;
for (let i = 0; i < rom.length - 1 && found2 < 10; i++) {
  if (rom[i] === 0x80 && rom[i+1] === 0x10) {
    const ctx = [];
    for (let j = Math.max(0, i-4); j < Math.min(rom.length, i+16); j++) {
      ctx.push('0x' + rom[j].toString(16).padStart(2,'0'));
    }
    console.log(`ROM 0x${i.toString(16).padStart(6,'0')} (START+B): ${ctx.join(' ')}`);
    found2++;
  }
}

// Now search for B..START..RIGHT (10 xx 80 xx 08) within 8 bytes
console.log('\n=== B...START...RIGHT patterns (within 8 bytes) ===');
let found3 = 0;
for (let i = 0; i < rom.length - 8 && found3 < 15; i++) {
  if (rom[i] === 0x10) {
    const sIdx = rom.indexOf(0x80, i+1);
    if (sIdx >= 0 && sIdx <= i+8) {
      const rIdx = rom.indexOf(0x08, sIdx+1);
      if (rIdx >= 0 && rIdx <= sIdx+8) {
        const ctx = [];
        for (let j = i; j < Math.min(rom.length, rIdx+8); j++) {
          ctx.push('0x' + rom[j].toString(16).padStart(2,'0'));
        }
        console.log(`ROM 0x${i.toString(16).padStart(6,'0')}: ${ctx.join(' ')}`);
        found3++;
      }
    }
  }
}
