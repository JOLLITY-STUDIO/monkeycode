const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');

const nes = new NES({ emulateSound: false });
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });
const ppu = nes.ppu;

let initCount = 0, pixNonZero = 0;
for (let i = 0; i < 512; i++) {
  const tile = ppu.ptTile[i];
  if (!tile) continue;
  if (tile.initialized) initCount++;
  if (tile.pix) {
    let any = false;
    for (let p = 0; p < 64; p++) if (tile.pix[p]) { any = true; break; }
    if (any) pixNonZero++;
  }
}
console.log('[PPU] ptTile initialized tiles =', initCount, '/512');
console.log('[PPU] ptTile tiles with non-zero pix =', pixNonZero);

// vromTile 检查
const rom = nes.rom;
let vromTileInit = 0;
if (rom.vromTile && rom.vromTile[0]) {
  for (let i = 0; i < 256; i++) if (rom.vromTile[0][i] && rom.vromTile[0][i].initialized) vromTileInit++;
}
console.log('[ROM] vromTile[0] initialized =', vromTileInit, '/256');

// 具体看几个 tile 的 pix
for (const idx of [0x50, 0x51, 0x52, 0x0, 0x1, 0x23]) {
  const tile = ppu.ptTile[idx];
  if (!tile) { console.log('ptTile[' + idx + '] = undefined'); continue; }
  let nz = 0;
  for (let p = 0; p < 64; p++) if (tile.pix[p]) nz++;
  console.log('ptTile[' + idx + '] initialized=' + tile.initialized + ' nonZeroPix=' + nz);
}
