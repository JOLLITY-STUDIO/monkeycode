const fs = require('fs');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const vram = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const tileAddr = 0x40 * 32;
const tileBytes = new Uint8Array(vram.slice(tileAddr, tileAddr + 32));

console.log('Target tile bytes:', Array.from(tileBytes).map(b => b.toString(16).padStart(2, '0')).join(' '));

// Search raw ROM
function find(data, target) {
  const matches = [];
  for (let i = 0; i < data.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      if (data[i + j] !== target[j]) { ok = false; break; }
    }
    if (ok) matches.push(i);
  }
  return matches;
}

// Search byte-swapped version
const swapped = new Uint8Array(tileBytes.length);
for (let i = 0; i < tileBytes.length; i += 2) {
  swapped[i] = tileBytes[i + 1];
  swapped[i + 1] = tileBytes[i];
}

const m1 = find(rom, tileBytes);
const m2 = find(rom, swapped);

console.log('Raw matches:', m1.length);
console.log('Byte-swapped matches:', m2.length);
if (m2.length > 0) {
  m2.slice(0, 10).forEach(a => {
    console.log('  0x' + a.toString(16).padStart(6, '0'));
  });
}

// Also try nibbles swapped (4-bit swap)
const nibbleSwap = new Uint8Array(tileBytes.length);
for (let i = 0; i < tileBytes.length; i++) {
  nibbleSwap[i] = ((tileBytes[i] & 0x0F) << 4) | ((tileBytes[i] & 0xF0) >> 4);
}
const m3 = find(rom, nibbleSwap);
console.log('Nibble-swapped matches:', m3.length);
