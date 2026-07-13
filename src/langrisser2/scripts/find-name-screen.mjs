import fs from 'fs';

const asm = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Search for text strings that might appear on name input screen
// e.g., character names, "なまえ", etc.
const searchTerms = ['エルウィン', 'なまえ', 'NAME', 'ネーム', 'へル', 'レディン', 'シェル', 'リアナ', 'ラーナ', 'レオン'];

console.log('=== Searching for name input related strings in ASM ===');
lines.forEach((l, i) => {
  for (const term of searchTerms) {
    if (l.includes(term)) {
      // Show context around the match
      const start = Math.max(0, i - 3);
      const end = Math.min(lines.length, i + 3);
      for (let j = start; j < end; j++) {
        console.log(`L${j+1}: ${lines[j].trim().substring(0, 150)}`);
      }
      console.log('---');
      return;
    }
  }
});

// Also search for "START" in the ROM binary for the text
console.log('\n\n=== Search for name input keywords in ROM raw data ===');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const romString = rom.toString('binary');

// Common Japanese name input screen patterns
const patterns = [
  '\u30A8\u30EB\u30A6\u30A3\u30F3', // エルウィン
  '\u306A\u307E\u3048',             // なまえ
  '\u540D\u524D',                  // 名前
];

for (const pat of patterns) {
  let pos = -1;
  let found = 0;
  while ((pos = romString.indexOf(pat, pos + 1)) !== -1 && found < 3) {
    console.log(`Found "${pat}" at ROM offset $${pos.toString(16).padStart(6, '0')}:`, 
      [...rom.subarray(pos, pos + pat.length * 3)].map(b => 
        b >= 0x20 && b < 0x7f || b >= 0xA0 ? String.fromCharCode(b) : '.'
      ).join('')
    );
    found++;
  }
}
