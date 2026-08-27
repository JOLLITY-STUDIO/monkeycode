// f710: H5 PPU 关键标志位 vs emu
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);
const ppu = runtime.ppu;
console.log('H5 f_spriteSize:', ppu.f_spriteSize);
console.log('H5 f_spPatternTable:', ppu.f_spPatternTable, 'f_bgPatternTable:', ppu.f_bgPatternTable);
console.log('H5 reg2000:', ppu.reg2000 !== undefined ? ppu.reg2000.toString(2).padStart(8, '0') : 'n/a');
console.log('H5 reg2001:', ppu.reg2001 !== undefined ? ppu.reg2001.toString(2).padStart(8, '0') : 'n/a');
console.log('H5 f_spritesEnabled:', ppu.f_spritesEnabled, 'f_bgEnabled:', ppu.f_bgEnabled);
console.log('emu spTable=1 bgTable=0 (state.json)');
console.log('emu sprite size unknown from dump; expected 8x16?');
