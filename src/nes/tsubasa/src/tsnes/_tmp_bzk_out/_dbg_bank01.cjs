// debug: 对比 INIT_PALETTE 与 MENU_TILE
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-01.ts', 'utf8');
const eq = rom.indexOf('= ['); const a = rom.indexOf('[', eq); const b = rom.lastIndexOf(']');
const raw = rom.slice(a + 1, b).split(',').map(t => parseInt(t.trim(), 16));

const gen = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank01-tables.ts', 'utf8');
const eq2 = gen.indexOf('= ['); const a2 = gen.indexOf('[', eq2); const b2 = gen.lastIndexOf(']');
const g = gen.slice(a2 + 1, b2).split(',').map(t => parseInt(t.trim(), 16));

function show(name, srcArr, genArr, len, label) {
  let firstDiff = -1;
  for (let i = 0; i < len; i++) if (srcArr[i] !== genArr[i]) { firstDiff = i; break; }
  console.log(name, label, 'firstDiff:', firstDiff);
  if (firstDiff >= 0) {
    const s = Math.max(0, firstDiff - 4), e = Math.min(len, firstDiff + 8);
    console.log('  rom :', srcArr.slice(s, e).map(v => v.toString(16).padStart(2, '0')).join(' '));
    console.log('  gen :', genArr.slice(s, e).map(v => v.toString(16).padStart(2, '0')).join(' '));
  }
}

show('INIT_PALETTE', raw.slice(0x1205, 0x1205 + 248), g.slice(272, 272 + 248), 248, '$B205');
show('MENU_TILE', raw.slice(0x1C6E, 0x1C6E + 99), g.slice(790, 790 + 99), 99, '$BC6E');
