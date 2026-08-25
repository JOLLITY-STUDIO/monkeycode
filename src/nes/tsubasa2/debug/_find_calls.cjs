// temp: find callers of $A210/$A212/$A484 and all readers of $0091
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const out = [];
function locate(pat, label) {
  for (let i = 0; i + pat.length < rom.length - prgStart; i++) {
    let hit = true;
    for (let k = 0; k < pat.length; k++) {
      if (rom[prgStart + i + k] !== pat[k]) { hit = false; break; }
    }
    if (hit) {
      const bankIdx = Math.floor(i / bankSize);
      const off = i % bankSize;
      const addr = (0x8000 + off).toString(16).padStart(4, '0');
      out.push(`${label} at PRG idx 0x${i.toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr} (R7 base $A000: $${(0xA000 + off).toString(16).padStart(4, '0')})`);
    }
  }
}
locate([0x20, 0x10, 0xA2], 'JSR $A210');
locate([0x20, 0x12, 0xA2], 'JSR $A212');
locate([0x4C, 0x12, 0xA2], 'JMP $A212');
locate([0x4C, 0x10, 0xA2], 'JMP $A210');
locate([0x20, 0x84, 0xA4], 'JSR $A484');
locate([0x4C, 0x84, 0xA4], 'JMP $A484');
// all ops with operand $91 (zero page read/write) - broad
for (let i = 0; i + 2 < rom.length - prgStart; i++) {
  const op = rom[prgStart + i];
  const operand = rom[prgStart + i + 1];
  if (operand === 0x91 && [0xA5, 0xA6, 0xA4, 0xC5, 0x25, 0x05, 0x45, 0xE5, 0x65, 0xE6, 0xC6, 0x24, 0xB5, 0x95, 0xF6, 0xD6, 0x75, 0x15, 0x35, 0x55, 0xD5, 0xF5, 0x85, 0x86, 0x84, 0xB1, 0xD1, 0x51, 0x31, 0x11, 0x71, 0xE1, 0x61, 0xC1, 0x41, 0x21, 0x01, 0x81, 0x91].includes(op)) {
    const bankIdx = Math.floor(i / bankSize);
    const off = i % bankSize;
    const addr = (0x8000 + off).toString(16).padStart(4, '0');
    out.push(`op $${op.toString(16).padStart(2, '0')} $0091 at PRG idx 0x${i.toString(16).padStart(6, '0')} bank ${bankIdx} runtime $${addr} (R7 base $A000: $${(0xA000 + off).toString(16).padStart(4, '0')})`);
  }
}
fs.writeFileSync('debug/_find_calls.txt', out.join('\n') + '\n');
console.log('written', out.length, 'hits');
