const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');

console.log('[HEADER]', Array.from(HEADER.subarray(0, 16)).map((v) => v.toString(16).padStart(2, '0')).join(' '));
const nes = new NES({ emulateSound: false });
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });

const rom = nes.rom;
console.log('[ROM] mapperType =', rom.mapperType);
console.log('[ROM] romCount =', rom.romCount, '(16KB banks)');
console.log('[ROM] vromCount =', rom.vromCount, '(4KB banks)');
console.log('[ROM] vrom.length =', rom.vrom.length);
console.log('[ROM] vrom[0].length =', rom.vrom[0] ? rom.vrom[0].length : 'N/A');
console.log('[MMAP] prgBankMap =', JSON.stringify(nes.mmap.prgBankMap));

// ptTile 检查
const ppu = nes.ppu;
let ptNonEmpty = 0;
const ptEmptyObj = { obj: 0, withBmp: 0 };
for (let i = 0; i < 512; i++) {
  const tile = ppu.ptTile[i];
  if (!tile) { ptEmptyObj.obj++; continue; }
  let any = false;
  const bmp = tile.bmp;
  if (bmp) for (let r = 0; r < 8; r++) if (bmp[r]) { any = true; break; }
  if (bmp) ptEmptyObj.withBmp++;
  if (any) ptNonEmpty++;
}
console.log('[PPU] ptTile[0..511]: total=', ppu.ptTile.length, 'nonEmpty=', ptNonEmpty, 'objWithBmpField=', ptEmptyObj);

// vram 检查 (pattern table 区 $0000-$1FFF)
let vramPattern = 0;
for (let i = 0; i < 0x2000; i++) {
  if (ppu.vramMem[i] !== 0) { vramPattern++; }
}
console.log('[PPU] vramMem[0x0000-0x1FFF] non-zero bytes =', vramPattern);

// 检查 loadCHRROM 是否被调用: mapper type 决定
console.log('[MMAP] constructor name =', nes.mmap.constructor.name);
console.log('[MMAP] getChrBankMap =', JSON.stringify(nes.mmap.getChrBankMap()));
