// f710: 比较 emu ppu.spriteMem 与 H5 ppu.spriteMem
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();
const emuMem = nes.ppu.spriteMem;

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);
const h5Mem = runtime.ppu.spriteMem;

let same = 0;
for (let i = 0; i < 256; i++) if (emuMem[i] === h5Mem[i]) same++;
console.log('spriteMem match:', same, '/256 =', (same / 256 * 100).toFixed(2) + '%');
if (same < 256) {
  const diffs = [];
  for (let i = 0; i < 256; i++) {
    if (emuMem[i] !== h5Mem[i]) diffs.push(`i=${i} emu=${emuMem[i]} h5=${h5Mem[i]}`);
  }
  console.log('diffs:', diffs.slice(0, 20).join(' | '));
}
