// 跑 H5 的 Tsubasa2 类 300 帧, dump NT0 + 调色板
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

// 创建 tsnes NES 实例 (H5 用 tsnes 的 PPU 渲染)
const NES = tsnes.NES;
const nes = new NES();
const romData = require('fs').readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
nes.loadROM(romData);

// 创建 H5 Tsubasa2
const game = new ts.default(nes);
game.boot();

// 跑 300 帧
for (let i = 0; i < 300; i++) {
  game.frame(nes);
}

// dump NT0
const ppu = nes.ppu;
console.log('=== H5 300帧后 NT0 非零 tile ===');
let nzCount = 0;
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    const addr = 0x2000 + y * 32 + x;
    const v = ppu.vramMem[addr] || 0;
    if (v !== 0) {
      console.log('  [' + y + ',' + x + '] tile=#$' + v.toString(16).toUpperCase().padStart(2, '0'));
      nzCount++;
    }
  }
}
console.log('非零 tile 总数: ' + nzCount);

// dump 调色板
console.log('\n=== H5 300帧后 调色板 ===');
const pal = [];
for (let i = 0; i < 32; i++) {
  pal.push(ppu.vramMem[0x3f00 + i] || 0);
}
console.log('BG:  [' + pal.slice(0, 16).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ']');
console.log('SPR: [' + pal.slice(16, 32).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ']');

// dump OAM
console.log('\n=== H5 300帧后 OAM 非零精灵 ===');
let sprCount = 0;
for (let i = 0; i < 64; i++) {
  const y = ppu.spriteMem[i * 4];
  const tile = ppu.spriteMem[i * 4 + 1];
  const attr = ppu.spriteMem[i * 4 + 2];
  const x = ppu.spriteMem[i * 4 + 3];
  if (y !== 0 && y < 240) {
    console.log('  spr#' + i + ' Y=' + y + ' Tile=#' + tile.toString(16).toUpperCase().padStart(2, '0') + ' Attr=#' + attr.toString(16).toUpperCase().padStart(2, '0') + ' X=' + x);
    sprCount++;
  }
}
console.log('可见精灵数: ' + sprCount);
