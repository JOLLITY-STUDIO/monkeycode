// 比较 H5 原始 CHR_BANK_02 与 emu pt.json tile 148 (0x94) 的 16 byte 图案数据
const fs = require('fs');
const { CHR_BANKS } = require('./dist-cjs2/game/chr/index');

const pt = JSON.parse(fs.readFileSync('output/emu-full/frame-0800/pt.json', 'utf8'));
const emuTile = pt[148];

// tile 148 在 bank2(8KB) 的偏移: 每个 bank 8KB, tile 148 在 slot2(bank2*8KB + tile20*16)
// 但 bank2 本身包含 8KB = 512 tile(0..511), tile20 偏移 = 20*16 = 320
const bank2 = CHR_BANKS[2];
const offset = 20 * 16;
const h5Plane0 = Array.from(bank2.slice(offset, offset + 8));
const h5Plane1 = Array.from(bank2.slice(offset + 8, offset + 16));

console.log('emu tile 148 plane0:', JSON.stringify(emuTile.plane0));
console.log('emu tile 148 plane1:', JSON.stringify(emuTile.plane1));
console.log('H5 bank2 tile20 plane0:', JSON.stringify(h5Plane0));
console.log('H5 bank2 tile20 plane1:', JSON.stringify(h5Plane1));

// 也看看 bank0/1/3 的 tile20, 以及 bank2 周围几个 tile
console.log('\nH5 bank2 tile18-22 plane0:');
for (let t = 18; t <= 22; t++) {
  const o = t * 16;
  console.log('tile', t, ':', Array.from(bank2.slice(o, o + 8)).map(v => v.toString(16).padStart(2, '0')).join(','));
}
