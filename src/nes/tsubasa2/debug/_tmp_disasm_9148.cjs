// 用 tsnes 运行时内存反汇编 bank0 $9148-$94D8 (解码误标 .byte 段)
const fs = require('fs');
const NES = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/src/nes.js').default;
const { disassembleRange } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/src/debug/disasm.js');
const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(romPath);
const nes = new NES();
nes.loadROM(rom);
nes.mmap.loadROM();
nes.mmap.write(0x8000, 6);
nes.mmap.write(0x8001, 0);
nes.mmap.write(0x8000, 7);
nes.mmap.write(0x8001, 9);
const mem = (a) => nes.cpu.mem[a];
const out = disassembleRange(0x9148, 0x94D8 - 0x9148 + 1, mem);
let s = '';
for (const o of out) {
  const addr = o.addr.toString(16).toUpperCase();
  s += '$' + addr + '  ' + o.text + '\n';
}
fs.writeFileSync('debug/_tmp_disasm_9148.txt', s);
console.log('written', out.length, 'lines');
