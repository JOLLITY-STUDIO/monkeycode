const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
for (let i = 0; i < 90; i++) game.frame(nes);
const ppu = nes.ppu;
const log = [];
log.push('imgPalette: ' + Array.from(ppu.imgPalette, c => c.toString(16).padStart(6, '0')).join(' '));
log.push('sprPalette: ' + Array.from(ppu.sprPalette, c => c.toString(16).padStart(6, '0')).join(' '));
log.push('vramMem 3F00: ' + Array.from({ length: 32 }, (_, i) => ppu.vramMem[0x3f00 + i].toString(16).padStart(2, '0')).join(' '));
const store = game.store;
log.push('ram_062A: ' + Array.from({ length: 32 }, (_, k) => store.read(0x062A + k).toString(16).padStart(2, '0')).join(' '));
log.push('ram_004A=' + store.read('ram_004A') + ' ram_004B=' + store.read('ram_004B'));
// nt0 使用的 tile 与调色板属性
const nt = store.nt0;
const palUsed = new Set();
for (let y = 0; y < 30; y++) {
  const row = nt[y];
  if (!row) continue;
  for (let x = 0; x < 32; x++) if (row[x] && row[x].tile !== 0) palUsed.add(row[x].palette);
}
log.push('nt0 palette values: ' + Array.from(palUsed).join(','));
// store.paletteTable bg0
const bg = store.paletteTable.bgPalettes[0].colors;
log.push('paletteTable bg0: ' + bg.map(c => c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0')).join(' '));
fs.writeFileSync(path.resolve(__dirname, '_diag_pal2_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
