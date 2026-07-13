const fs = require('fs');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const a = 0x0A4400;
for (let i = 0; i < 512; i += 16) {
  const bytes = Array.from(rom.slice(a + i, a + i + 16)).map(x => x.toString(16).padStart(2, '0')).join(' ');
  const text = Array.from(rom.slice(a + i, a + i + 16)).map(x => x >= 32 && x < 127 ? String.fromCharCode(x) : '.').join('');
  console.log((a + i).toString(16).padStart(6, '0') + ': ' + bytes + ' |' + text + '|');
}
