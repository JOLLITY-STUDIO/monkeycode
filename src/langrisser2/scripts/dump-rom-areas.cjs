const fs = require('fs');
const path = require('path');

const rom = fs.readFileSync(path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md'));

const areas = [
  0x04A8, 0x04D4, 0x0508, 0x051A, 0x05B6, 0x05B4, 0x05CE,
  0x80AE, 0x8106, 0x810C, 0x82BE, 0x82EE, 0x82FA, 0x2DA4C
];

for (const a of areas) {
  console.log('=== 0x' + a.toString(16).padStart(6, '0') + ' ===');
  for (let i = 0; i < 64; i += 16) {
    const bytes = rom.slice(a + i, a + i + 16);
    const hex = Array.from(bytes).map(x => x.toString(16).padStart(2, '0')).join(' ');
    const txt = Array.from(bytes).map(x => x >= 32 && x < 127 ? String.fromCharCode(x) : '.').join('');
    console.log(' 0x' + (a + i).toString(16).padStart(6, '0') + ': ' + hex + ' |' + txt + '|');
  }
  console.log();
}
