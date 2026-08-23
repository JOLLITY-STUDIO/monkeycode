const path = require('path');
const fs = require('fs');
const tsnDir = path.resolve(__dirname, '..', '..', 'tsnes');
const romPath = path.resolve(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const NES = require(path.join(tsnDir, '_build', 'src', 'nes.js')).default;
const disasm = require(path.join(tsnDir, '_build', 'src', 'debug', 'disasm.js'));
const nes = new NES();
nes.loadROM(fs.readFileSync(romPath));
nes.mmap.loadROM();
// bank2 在 $A000 窗口 (R7=2)
nes.mmap.write(0x8000, 7); nes.mmap.write(0x8001, 2);

const NMI_CALLBACK_TABLE = [
  0xa4c0, 0xa559, 0xa57b, 0xa581, 0xa5a2, 0xa5a8, 0xa5b0, 0xa5b8,
  0xa5bf, 0xa5cd, 0xa5db, 0xa5e8, 0xa602, 0xa61c, 0xa629, 0xa650,
  0xa69c, 0xa77a, 0xa782, 0xa78d, 0xa7bd, 0xa7ce, 0xa7d6, 0xa7fa,
];

const memRead = (a) => nes.cpu.mem[a] ?? 0;
for (let i = 0; i < NMI_CALLBACK_TABLE.length; i++) {
  const addr = NMI_CALLBACK_TABLE[i];
  console.log(`\n=== idx=${i} $${addr.toString(16).toUpperCase()} ===`);
  const lines = disasm.disassembleRange(addr, 12, memRead);
  for (const e of lines) {
    const a = '$' + e.addr.toString(16).toUpperCase().padStart(4, '0');
    const b = e.bytes.map(x => x.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    console.log(`  ${a}  ${b.padEnd(12)} ${e.text}`);
    if (e.text.startsWith('RTS') || e.text.startsWith('JMP')) break;
  }
}
