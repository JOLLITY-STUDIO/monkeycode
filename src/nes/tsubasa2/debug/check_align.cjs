const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
const romData = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
nes.loadROM(romData);

const game = new ts.default(nes);
game.boot();

for (let i = 0; i < 300; i++) {
  try { game.frame(nes); } catch(e) { break; }
}

const ppu = nes.ppu;
const store = game.store;

// 1. NT0 非零 tile
let nzNt = 0;
const nzTiles = [];
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    const e = store.readNT(0, x, y);
    if (e && e.tile !== 0) {
      nzNt++;
      nzTiles.push(`[${y},${x}]=#$${e.tile.toString(16).toUpperCase().padStart(2,'0')}`);
    }
  }
}
console.log('=== H5 NT0 非零 tile ===');
console.log('总数: ' + nzNt + ' (trace 真实值: 25)');
if (nzNt <= 30) for (const t of nzTiles) console.log('  ' + t);

// 2. 调色板 (vramMem $3F00-$3F1F)
console.log('\n=== H5 调色板 (vramMem) ===');
const pal = [];
for (let i = 0; i < 32; i++) pal.push(ppu.vramMem[0x3f00 + i] || 0);
console.log('BG:  [' + pal.slice(0,16).map(v=>'#'+v.toString(16).toUpperCase().padStart(2,'0')).join(',') + ']');
console.log('SPR: [' + pal.slice(16,32).map(v=>'#'+v.toString(16).toUpperCase().padStart(2,'0')).join(',') + ']');
console.log('trace BG:  [#0F,#16,#00,#30,#0F,#0F,#0F,#0F,#0F,#11,#00,#30,#0F,#0F,#16,#26]');
console.log('trace SPR: [#0F,#05,#16,#15,#0F,#30,#27,#37,#0F,#10,#0F,#0F,#0F,#0F,#00,#30]');

// 3. OAM 精灵
let sprCount = 0;
for (let i = 0; i < 64; i++) {
  const y = ppu.spriteMem[i*4];
  if (y > 0 && y < 240) sprCount++;
}
console.log('\n=== H5 OAM 可见精灵 ===');
console.log('数量: ' + sprCount + ' (trace 真实值: DMA 传输, 不可见)');

// 4. PPU 寄存器
console.log('\n=== H5 PPU 寄存器 ===');
console.log('ram_0020 (PPUCTRL): #$' + store.read('ram_0020').toString(16).toUpperCase().padStart(2,'0') + ' (trace: #$88)');
console.log('ram_0021 (PPUMASK): #$' + store.read('ram_0021').toString(16).toUpperCase().padStart(2,'0') + ' (trace: #$1E)');
console.log('ram_00ED (场景): ' + store.read('ram_00ED') + ' (trace: 2)');

// 5. 渲染缓冲区非零像素
const buf = ppu.buffer;
let nzBuf = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nzBuf++;
console.log('\n=== H5 PPU 渲染缓冲 ===');
console.log('非零像素: ' + nzBuf + '/' + buf.length + ' (trace: 应有 TECMO 文字)');
