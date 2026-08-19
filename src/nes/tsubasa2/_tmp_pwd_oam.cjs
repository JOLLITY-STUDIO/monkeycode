// trace password 场景的 OAM 数据, 找真实精灵
const path = require('path');
const fs = require('fs');
const { NES } = require(path.resolve('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js'));
const { BUTTON_DOWN, BUTTON_START } = require(path.resolve('d:/studio/github/monkeycode/src/nes/tsnes/_build/controller.js'));

const ROM_PATH = 'd:/studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes';
const romData = new Uint8Array(fs.readFileSync(ROM_PATH).buffer);

const nes = new NES({ emulateSound: false, onStatusUpdate: () => {} });
nes.loadROM(romData);

// 跑 BOOT 完后等 TITLE
for (let i = 0; i < 130; i++) nes.frame();

// DOWN×2 + START
function tap(btn) { nes.buttonDown(1, btn); nes.frame(); nes.buttonUp(1, btn); nes.frame(); }
tap(BUTTON_DOWN); tap(BUTTON_DOWN); tap(BUTTON_START);

// 跑 50 帧让 password 完全渲染
for (let i = 0; i < 50; i++) nes.frame();

// dump OAM (这次捕获 password 真实数据)
console.log('=== OAM password 场景 (frame=' + nes.fpsFrameCount + ') ===');
let oamStr = 'const PASSWORD_OAM = [\n';
for (let s = 0; s < 64; s++) {
  const b = 0x0200 + s*4;
  const y = nes.cpu.mem[b], tile = nes.cpu.mem[b+1], attr = nes.cpu.mem[b+2], x = nes.cpu.mem[b+3];
  if (y || tile || attr || x) oamStr += `  { y: 0x${y.toString(16).padStart(2,'0')}, tile: 0x${tile.toString(16).padStart(2,'0')}, attr: 0x${attr.toString(16).padStart(2,'0')}, x: 0x${x.toString(16).padStart(2,'0')}, active: true },\n`;
}
oamStr += '];';
console.log(oamStr);
console.log('\ntotal sprites:', oamStr.split('\n').length - 3);