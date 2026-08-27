// 跑 emu 到 f710，打印 PPU 标志位
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();
const ppu = nes.ppu;
console.log('emu f710 f_spriteSize:', ppu.f_spriteSize);
console.log('emu f710 f_spPatternTable:', ppu.f_spPatternTable);
console.log('emu f710 f_bgPatternTable:', ppu.f_bgPatternTable);
console.log('emu f710 reg2000:', ppu.reg2000.toString(2).padStart(8,'0'), '=0x'+ppu.reg2000.toString(16));
console.log('emu f710 reg2001:', ppu.reg2001.toString(2).padStart(8,'0'), '=0x'+ppu.reg2001.toString(16));
