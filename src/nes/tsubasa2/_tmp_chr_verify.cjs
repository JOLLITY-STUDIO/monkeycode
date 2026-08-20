// 验证 H5 CHR banks vs 模拟器原始 CHR ROM (vrom 32×4KB)
const fs = require('fs');
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
function hex(v, n = 2) { return v.toString(16).padStart(n, '0').toUpperCase(); }

const h5Banks = {};
for (let b = 0; b < 16; b++) {
  const f = `_test_out/game/data/ppu/tile/chr/chr-bank-${String(b).padStart(2, '0')}.js`;
  const mod = require('./' + f.replace(/\\/g, '/'));
  const arr = Array.isArray(mod) ? mod : (mod.default || Object.values(mod)[0]);
  h5Banks[b] = arr;
}

const nes = new NES({ emulateSound: false, sampleRate: 0 });
nes.loadROM(fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
for (let f = 1; f <= 30; f++) nes.frame();

// vrom: 32 × 4KB 原始字节
const vrom = nes.rom.vrom;
const flat = [];
for (const chunk of vrom) flat.push(...chunk);

let fail = 0, ok = 0;
function cmpTile(label, h5Bank, h5Tile) {
  // ROM 字节偏移 = h5Bank*8192 + h5Tile*16
  const off = h5Bank * 8192 + h5Tile * 16;
  const emu = flat.slice(off, off + 16);
  const h5 = h5Banks[h5Bank].slice(h5Tile * 16, h5Tile * 16 + 16);
  const pass = emu.length === 16 && h5.length === 16 && emu.every((v, i) => v === h5[i]);
  if (pass) ok++; else { fail++; console.log(`FAIL ${label}: H5 bank${h5Bank} tile${hex(h5Tile)} (rom off ${hex(off, 6)})`); }
}

// NT tiles → H5 bank 0
for (const t of [0x03, 0x07, 0x0a, 0x12, 0x14, 0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f]) cmpTile(`NT ${hex(t)}`, 0, t);
// SPR tiles → H5 bank 14 (0x50-0x7F) / bank 10 (0xE5-0xFF)
for (const t of [0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x5b, 0x5c, 0x5d, 0x5e, 0x5f]) cmpTile(`SPR ${hex(t)}`, 14, t);
for (const t of [0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xeb, 0xec, 0xed, 0xee, 0xef, 0xf0, 0xf2, 0xf3, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff]) cmpTile(`SPR ${hex(t)}`, 10, t);

console.log(`\nOK=${ok} FAIL=${fail}`);
console.log(fail === 0 ? '全部一致 ✓ — H5 CHR 映射假设成立' : '存在不一致 ✗');
