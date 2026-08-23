// 用 tsnes 运行时内存反汇编 bank0 $9148-$94D8 (解码误标 .byte 段)
const fs = require('fs');
const path = require('path');
const NES = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/src/nes.js').default;
const { disassembleRange } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/src/debug/disasm.js');
const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(romPath);
const nes = new NES();
nes.loadROM(rom);
nes.mmap.loadROM();
// 运行时映射: $8000 窗口 = R6; $A000 窗口 = R7
// $9148 是 bank0 代码 → R6=0
nes.mmap.write(0x8000, 6); // cmd 6 = R6
nes.mmap.write(0x8001, 0); // bank 0
nes.mmap.write(0x8000, 7); // cmd 7 = R7
nes.mmap.write(0x8001, 9); // bank 9 (数据流, 用于地址解析)
const mem = (a) => nes.cpu.mem[a];
// 反汇编 $9148-$94D8
const out = disassembleRange(0x9148, 0x94D8 - 0x9148 + 1, mem);
console.log(out);
