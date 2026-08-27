// 比较 emu 与 H5 的 PPU 标志位
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();
const emu = nes.ppu;

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);
const h5 = runtime.ppu;

const flags = [
  'f_spVisibility','f_bgVisibility','f_spClipping','f_bgClipping','f_dispType',
  'f_spriteSize','f_bgPatternTable','f_spPatternTable','f_addrInc','f_nTblAddress'
];
for (const f of flags) {
  console.log(`${f}: emu=${emu[f]} h5=${h5[f]}`);
}
