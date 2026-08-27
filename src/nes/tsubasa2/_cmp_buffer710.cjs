// f710: 直接比较 emu ppu.buffer 与 H5 ppu.buffer (Uint32Array)
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();
const emuBuf = nes.ppu.buffer;

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);
const h5Buf = runtime.ppu.buffer;

let same = 0, diff = 0;
for (let i = 0; i < 256 * 240; i++) {
  if (emuBuf[i] === h5Buf[i]) same++;
  else diff++;
}
console.log('buffer exact match:', same, '/', 256 * 240, `(${(same / (256 * 240) * 100).toFixed(2)}%)`);
console.log('diff:', diff);
