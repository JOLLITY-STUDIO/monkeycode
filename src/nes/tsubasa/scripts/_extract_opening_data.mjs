/**
 * 提取 TECMO logo 开场动画的帧数据
 * 从 rom.nes 提取 nametable, palette, CHR tiles
 * 输出到 src/tsnes/tsubasa-ts/game/data/opening/
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CWD = process.cwd();
const rom = readFileSync(join(CWD, 'rom.nes'));
const PO = 16; // PRG offset in iNES

// ── bank 03: nametable data ──
const bo3 = PO + 3 * 8192;
const nt = Array.from(rom.slice(bo3, bo3 + 960));
const at = Array.from(rom.slice(bo3 + 960, bo3 + 1024));

// ── CHR bank 15: opening tiles ──
const chrOff = PO + 262144 + 15 * 4096;
const chr15 = Array.from(rom.slice(chrOff, chrOff + 4096));

// ── bank 06: palette ──
const bo6 = PO + 6 * 8192;
const palA = Array.from(rom.slice(bo6 + 0x1000, bo6 + 0x1000 + 16));
const palB = Array.from(rom.slice(bo6 + 0x1300, bo6 + 0x1300 + 16));

const OUT = join(CWD, 'src/tsnes/tsubasa-ts/game/data/opening');
mkdirSync(OUT, { recursive: true });

// ═══════════════════ nametable.ts ═══════════════════
{
  let ts = '// TECMO logo nametable — extracted from PRG bank 03 (data_03)\n';
  ts += '// 960 tile indices + 64 attribute bytes\n\n';
  ts += 'export const TECMO_NAMETABLE: number[] = [\n';
  for (let r = 0; r < 30; r++) {
    ts += '  ' + nt.slice(r * 32, (r + 1) * 32).join(',') + ',\n';
  }
  ts += '];\n\n';
  ts += 'export const TECMO_ATTRIBUTES: number[] = [\n  ' + at.join(',') + '\n];\n';
  ts += 'export const NAMETABLE_ROWS = 30;\n';
  ts += 'export const NAMETABLE_COLS = 32;\n';
  writeFileSync(join(OUT, 'nametable.ts'), ts);
  console.log('nametable.ts ok');
}

// ═══════════════════ palette.ts ═══════════════════
{
  const nesPal = [
    0x7c7c7c,0x0000fc,0x0000bc,0x4428bc,0x940084,0xa80020,0xa81000,0x881400,
    0x503000,0x007800,0x006800,0x005800,0x004058,0x000000,0x000000,0x000000,
    0xbcbcbc,0x0078f8,0x0058f8,0x6844fc,0xd800cc,0xe40058,0xf83800,0xe45c10,
    0xac7c00,0x00b800,0x00a800,0x00a844,0x008888,0x000000,0x000000,0x000000,
    0xf8f8f8,0x3cbcfc,0x6888fc,0x9878f8,0xf878f8,0xf85898,0xf87858,0xfea044,
    0xf8b800,0xb8f818,0x58d854,0x58f898,0x00e8d8,0x787878,0x000000,0x000000,
    0xfcfcfc,0xa4e4fc,0xb8b8f8,0xd8b8f8,0xf8b8f8,0xf8a4c0,0xf0d0b0,0xfce0a8,
    0xf8d878,0xd8f878,0xb8f8b8,0xb8f8d8,0x00fcfc,0xf8d8f8,0x000000,0x000000,
  ];

  let ts = '// TECMO logo palette — extracted from PRG bank 06 (palette_data)\n';
  ts += '// Palette A: BG colors, Palette B: Sprite colors\n\n';
  ts += 'export const PAL_BG: number[] = [' + palA.join(',') + '];\n';
  ts += 'export const PAL_SPR: number[] = [' + palB.join(',') + '];\n';
  ts += '\nexport const NES_MASTER_PALETTE: number[] = [\n';
  for (let i = 0; i < 64; i++) {
    ts += '  0x' + nesPal[i].toString(16).padStart(6, '0') + ',\n';
  }
  ts += '];\n';
  ts += '\n// Brightness ramp: maps brightness level (0-15) to PPU palette darkening\n';
  ts += '// Level maps to NES color index (0x0D = black, 0x0F = full black for fade)\n';
  ts += '// For each brightness level, palette colors become darker\n';
  ts += 'export const BRIGHTNESS_RAMP: number[][] = [\n';
  // 16 brightness levels, each maps 16 palette entries to darkened values
  for (let b = 0; b < 16; b++) {
    const row = palA.map(c => {
      if (c === 0x0f) return 0x0f; // black stays black
      const bright = (c & 0x30) >> 4; // original brightness (0-3)
      const hue = c & 0x0f;
      const newBright = Math.max(0, Math.round(bright * b / 15));
      return (newBright << 4) | hue;
    });
    ts += '  [' + row.join(',') + '], // level ' + b + '\n';
  }
  ts += '];\n';
  writeFileSync(join(OUT, 'palette.ts'), ts);
  console.log('palette.ts ok');
}

// ═══════════════════ tiles.ts ═══════════════════
{
  let ts = '// TECMO logo tiles — CHR bank 15 (opening)\n';
  ts += '// 4KB = 256 tiles × 16 bytes each (2bpp planar: 8 low + 8 high)\n\n';
  ts += 'export const CHR_BANK_15: number[] = [\n';
  for (let i = 0; i < 256; i++) {
    ts += '  ' + chr15.slice(i * 16, i * 16 + 16).join(',') + ',\n';
  }
  ts += '];\n';
  ts += 'export const TILES_PER_BANK = 256;\n';
  ts += 'export const TILE_BYTES = 16;\n';
  writeFileSync(join(OUT, 'tiles.ts'), ts);
  console.log('tiles.ts ok');
}

// ═══════════════════ index.ts ═══════════════════
{
  writeFileSync(join(OUT, 'index.ts'),
    'export { TECMO_NAMETABLE, TECMO_ATTRIBUTES, NAMETABLE_ROWS, NAMETABLE_COLS } from "./nametable";\n' +
    'export { PAL_BG, PAL_SPR, NES_MASTER_PALETTE, BRIGHTNESS_RAMP } from "./palette";\n' +
    'export { CHR_BANK_15, TILES_PER_BANK, TILE_BYTES } from "./tiles";\n');
  console.log('index.ts ok');
}

console.log('\nDone. Data extracted to:', OUT);
