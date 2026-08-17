const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(0x10);
// 搜索引用 $0498/$0499 的 LDA/STA/DEC/INC (opcode + 98 04 / 99 04)
const pats = { 0xad: 'LDA $0498', 0x8d: 'STA $0498', 0xee: 'INC $0498', 0xce: 'DEC $0498', 0xae: 'LDX $0498' };
const out = [];
for (let bank = 0; bank < 32; bank++) {
  const base = bank * 0x2000;
  for (let i = 0; i < 0x2000 - 2; i++) {
    const op = rom[base + i];
    const lo = rom[base + i + 1], hi = rom[base + i + 2];
    if (hi === 0x04 && (lo === 0x98 || lo === 0x99)) {
      const win = bank >= 30 ? 0xc000 : 0x8000;
      const addr = win + i;
      if (addr >= 0x8000 && addr < 0x10000) {
        out.push(`bank${bank} $${addr.toString(16).toUpperCase()}: ${(pats[op] || '???')} (op $${op.toString(16)})`);
      }
    }
  }
}
console.log(out.join('\n'));
