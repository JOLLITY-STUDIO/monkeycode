const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();
console.log('emu sramAddress:', nes.ppu.sramAddress);
console.log('emu scanline:', nes.ppu.scanline);
