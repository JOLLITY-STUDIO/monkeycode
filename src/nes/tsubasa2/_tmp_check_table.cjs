const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const base = 0x10 + 19 * 0x2000;
// scan stream 0x1467 .. 0x1FFF for control codes >= 0xE0
const counts = {};
const positions = {};
for (let off = 0x1467; off < 0x2000; off++) {
  const b = rom[base + off];
  if (b >= 0xe0) {
    counts[b] = (counts[b] || 0) + 1;
    if (!positions[b]) positions[b] = [];
    if (positions[b].length < 4) positions[b].push('0x' + off.toString(16));
  }
}
console.log('control codes used in stream:');
Object.keys(counts).sort((a, b) => a - b).forEach(k => {
  console.log('$' + Number(k).toString(16).toUpperCase() + ' x' + counts[k] + '  at ' + positions[k].join(','));
});
