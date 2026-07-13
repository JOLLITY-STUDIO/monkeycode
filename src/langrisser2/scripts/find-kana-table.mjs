import fs from 'fs';

// The name input screen shows these katakana characters:
// 5-row grid: アイウエオ カキクケコ サシスセソ タチツテト ナニヌネノ ハヒフヘホ マミムメモ
// Plus: ヤユヨ ラリルレロ ワヲン ヴ
// Dakuten: ガギグゲゴ ザジズゼゾ ダヂヅデド バビブベボ パピプペポ
// Numbers: 1234567890
// Symbols: ！？・－
// Small: ァィゥェォャュョッ

// In the game's custom encoding, these map to some indices.
// Let me search for the katakana row bytes in the ROM.

// The game likely stores the kana as byte values corresponding to tile indices.
// Common approach: search for a consecutive sequence of byte values in ROM
// that could be a katakana lookup table.

const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// Strategy: look at the area around ROM 0x082114 (referenced at 0xCB1C)
// and nearby data

console.log('=== ROM $082114 area (referenced in name input code) ===');
const areaStart = 0x082114;
for (let offset = areaStart - 0x40; offset < areaStart + 0x100; offset += 16) {
  const bytes = rom.slice(offset, offset + 16);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
  const ascii = Array.from(bytes).map(b => (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.').join('');
  console.log(`  $${offset.toString(16).padStart(6, '0')}: ${hex}  ${ascii}`);
}

// Also search for common pattern: a table of 32 bytes for the kana grid
// Search for byte sequences that look like small numbers (00-FF) repeated
console.log('\n=== Looking for 32-byte kana lookup tables ===');
for (let i = 0; i < rom.length - 32; i++) {
  const bytes = Array.from(rom.slice(i, i + 32));
  // Check if it looks like a table: values in range 0x80-0xFF (typical font tile range)
  const inRange = bytes.filter(b => b >= 0x80 && b <= 0xFF).length;
  if (inRange >= 24 && bytes[0] !== bytes[1]) {
    console.log(`  ROM $${i.toString(16).padStart(6, '0')}: ${bytes.map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
    if (i > 0x50000) break;
  }
}
