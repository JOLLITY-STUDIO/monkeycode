const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function dump(label, bank, cpuAddr, len) {
  const base = 0x10 + bank * 0x2000 + (cpuAddr - (bank === 30 ? 0xC000 : 0xE000));
  const bytes = [...rom.slice(base, base + len)];
  let out = `=== ${label} bank${bank} ${cpuAddr.toString(16).toUpperCase()} ===\n`;
  bytes.forEach((b, i) => {
    out += b.toString(16).padStart(2, '0') + ' ';
    if ((i + 1) % 16 === 0) out += `| +${(i - 15).toString(16).padStart(2, '0')}\n`;
  });
  console.log(out);
}
dump('subC575-$E267', 31, 0xE267, 0x60);
