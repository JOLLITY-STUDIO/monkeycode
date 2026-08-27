const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);

console.log('emu sramAddress:', nes.ppu.sramAddress);
console.log('H5 sramAddress:', runtime.ppu.sramAddress);
console.log('emu scanline:', nes.ppu.scanline);
console.log('H5 scanline:', runtime.ppu.scanline);
