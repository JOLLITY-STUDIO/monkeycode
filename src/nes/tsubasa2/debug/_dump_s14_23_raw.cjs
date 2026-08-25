const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const b2 = (cpu) => cpu - 0xA000 + 0x4000;
function dump(cpuStart, len) {
  const bytes = Array.from(prg.slice(b2(cpuStart), b2(cpuStart) + len));
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const addr = (cpuStart + i).toString(16).toUpperCase();
    const hex = bytes.slice(i, i + 16).map((x) => x.toString(16).padStart(2, '0')).join(' ');
    lines.push(`$${addr}  ${hex}`);
  }
  return lines.join('\n');
}
console.log('=== scene14 $A62A ===');
console.log(dump(0xa62a, 0x27));
console.log('=== scene15 $A651 ===');
console.log(dump(0xa651, 0x4c));
console.log('=== scene16 $A69D ===');
console.log(dump(0xa69d, 0x8e));
console.log('=== helpers $A72C/$A767 ===');
console.log(dump(0xa72c, 0x50));
console.log('=== scene17-23 ===');
console.log(dump(0xa77b, 0x3c));
console.log('=== helper $A82F ===');
console.log(dump(0xa82f, 0x26));
