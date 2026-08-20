// dump BOOT 调色板渐显序列 + 完整 NT/ATTR/OAM → JSON
const fs = require('fs');
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
const nes = new NES({ emulateSound: false, sampleRate: 0 });
nes.loadROM(fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
function hex(v, n = 2) { return v.toString(16).padStart(n, '0').toUpperCase(); }

// 1. 渐显序列
console.log('===== 调色板渐显 (帧 8-34) =====');
const fadeRows = [];
for (let f = 1; f <= 34; f++) {
  nes.frame();
  if (f >= 8 && f % 2 === 0) {
    const ppu = nes.ppu;
    const pal = [];
    for (let i = 0; i < 32; i++) pal.push(hex(ppu.vramMem[0x3f00 + i] & 0x3f, 2));
    const line = `f${hex(f, 2)} BG[${pal.slice(0, 16).join(' ')}] SPR[${pal.slice(16).join(' ')}]`;
    console.log(line);
    fadeRows.push(pal.slice());
  }
}

// 2. 帧 40 完整快照
console.log('\n===== 帧 40 快照 =====');
for (let f = 35; f <= 40; f++) nes.frame();
const ppu = nes.ppu;
const pal = [];
for (let i = 0; i < 32; i++) pal.push(ppu.vramMem[0x3f00 + i] & 0x3f);
console.log('BG palette:', pal.slice(0, 16).map(v => hex(v)).join(' '));
console.log('SPR palette:', pal.slice(16).map(v => hex(v)).join(' '));
const nt0 = [];
for (let i = 0; i < 960; i++) nt0.push(ppu.nameTable[0].tile[i] & 0xff);
const attr0 = [];
for (let i = 0; i < 64; i++) attr0.push((ppu.nameTable[0].attribute ?? ppu.vramMem[0x23c0 + i]) & 0xff);
const oam = [];
for (let i = 0; i < 64; i++) {
  oam.push({
    y: ppu.spriteMem[i * 4],
    tile: ppu.spriteMem[i * 4 + 1],
    attr: ppu.spriteMem[i * 4 + 2],
    x: ppu.spriteMem[i * 4 + 3],
  });
}

fs.writeFileSync('_tmp_boot_nt.json', JSON.stringify({ nt0, attr0, oam, bgPal: pal.slice(0, 16), sprPal: pal.slice(16) }));
console.log('\n已写 _tmp_boot_nt.json (nt0 960B, attr0 64B, oam 64spr, palettes)');
console.log('NT0 非零:', nt0.filter(v => v !== 0).length);
console.log('ATTR0:', attr0.map(v => hex(v)).join(' '));
