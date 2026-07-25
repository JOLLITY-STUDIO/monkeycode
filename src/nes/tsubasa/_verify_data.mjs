import { readFileSync } from 'fs';

const rom = readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/rom.nes');
const PO = 16;

// Compare NT data
const bo3 = PO + 3 * 8192;
const romNt = Array.from(rom.slice(bo3, bo3 + 960));
const romAt = Array.from(rom.slice(bo3 + 960, bo3 + 1024));

const { TECMO_NAMETABLE, TECMO_ATTRIBUTES } = await import('./src/tsnes/tsubasa-ts/game/data/opening/nametable.ts');

let ntDiff = 0, atDiff = 0;
for (let i = 0; i < 960; i++) if (romNt[i] !== TECMO_NAMETABLE[i]) ntDiff++;
for (let i = 0; i < 64; i++) if (romAt[i] !== TECMO_ATTRIBUTES[i]) atDiff++;

console.log('NT diff:', ntDiff, '/ 960');
console.log('AT diff:', atDiff, '/ 64');
if (ntDiff > 0) {
  for (let i = 0; i < Math.min(960, 64); i++) {
    if (romNt[i] !== TECMO_NAMETABLE[i]) {
      console.log(`  NT[${i}]: ROM=${romNt[i]} TS=${TECMO_NAMETABLE[i]}`);
    }
  }
}
if (atDiff > 0) {
  for (let i = 0; i < 64; i++) {
    if (romAt[i] !== TECMO_ATTRIBUTES[i]) {
      console.log(`  AT[${i}]: ROM=${romAt[i]} TS=${TECMO_ATTRIBUTES[i]}`);
    }
  }
}

// Compare palette
const bo6 = PO + 6 * 8192;
const romPal = Array.from(rom.slice(bo6 + 0x1000, bo6 + 0x1010));
const { PAL_BG } = await import('./src/tsnes/tsubasa-ts/game/data/opening/palette.ts');
let palDiff = 0;
for (let i = 0; i < 16; i++) if (romPal[i] !== PAL_BG[i]) palDiff++;
console.log('Palette diff:', palDiff, '/ 16');
if (palDiff > 0) {
  console.log('ROM:', romPal.map(x => x.toString(16).padStart(2, '0')).join(' '));
  console.log('TS: ', PAL_BG.map(x => x.toString(16).padStart(2, '0')).join(' '));
}
