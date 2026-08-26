const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.subarray(16, 16 + 256 * 1024);
function dumpCpu(lo, hi, name) {
  const base = lo - 0x8000;
  const lines = [];
  for (let i = 0; i <= hi - lo; i += 16) {
    const p = base + i;
    const bytes = [];
    for (let k = 0; k < 16; k++) bytes.push(prg[p + k].toString(16).padStart(2, '0'));
    lines.push(`$${(lo + i).toString(16).toUpperCase()}: ${bytes.join(' ')}`);
  }
  console.log(`==== ${name} ====`);
  console.log(lines.join('\n'));
}
dumpCpu(0x8160, 0x8200, '5-mode handlers CPU $8160-$8200 (bank0)');
