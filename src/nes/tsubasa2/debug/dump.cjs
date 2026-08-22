const fs = require('fs');
const path = require('path');
// 加载 tsnes 跑 300 帧后 dump NT0 + 调色板 + OAM
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const romData = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
const nes = new NES();
nes.loadROM(romData);

// 跑 300 帧
for (let i = 0; i < 300; i++) nes.frame();

// dump NT0 (vramMem $2000-$23FF)
const ppu = nes.ppu;
const nt0 = [];
for (let y = 0; y < 30; y++) {
  const row = [];
  for (let x = 0; x < 32; x++) {
    const addr = 0x2000 + y * 32 + x;
    const v = ppu.vramMem[addr] || 0;
    row.push(v);
  }
  nt0.push(row);
}

// 输出 NT0 非零 tile
console.log('=== tsnes 300帧后 NT0 非零 tile ===');
let nzCount = 0;
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    if (nt0[y][x] !== 0) {
      console.log('  [' + y + ',' + x + '] tile=#$' + nt0[y][x].toString(16).toUpperCase().padStart(2, '0'));
      nzCount++;
    }
  }
}
console.log('非零 tile 总数: ' + nzCount);

// dump 调色板 ($3F00-$3F1F)
console.log('\n=== tsnes 300帧后 调色板 ===');
const pal = [];
for (let i = 0; i < 32; i++) {
  pal.push(ppu.vramMem[0x3f00 + i] || 0);
}
console.log('BG:  [' + pal.slice(0, 16).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ']');
console.log('SPR: [' + pal.slice(16, 32).map(v => '#' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ']');

// dump OAM (spriteMem 256 bytes = 64 sprites)
console.log('\n=== tsnes 300帧后 OAM 非零精灵 ===');
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

// CHR pattern table — 看 tile #$28 (T) 的像素数据
console.log('\n=== CHR tile #$28 (TECMO T) 像素数据 ===');
const tileBase = 0x1000; // sprite PT = $1000
const tileAddr = tileBase + 0x28 * 16;
for (let row = 0; row < 8; row++) {
  const lo = ppu.vramMem[tileAddr + row] || 0;
  const hi = ppu.vramMem[tileAddr + row + 8] || 0;
  let pixels = '';
  for (let bit = 7; bit >= 0; bit--) {
    const v = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
    pixels += v.toString(16);
  }
  console.log('  row' + row + ': ' + pixels);
}
