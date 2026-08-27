// f710: 比较 emu 与 H5 的 ptTile[tileIndex] 像素，找 sprite tile 差异
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
for (let f = 1; f <= 710; f++) nes.frame();
const emuPpu = nes.ppu;

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);
const h5Ppu = runtime.ppu;

function tileToHex(t) {
  if (!t || !t.pix) return 'null';
  const rows = [];
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x++) row += t.pix[y * 8 + x].toString(16);
    rows.push(row);
  }
  return rows.join('\n');
}
function compareTiles(idx) {
  const e = emuPpu.ptTile[idx];
  const h = h5Ppu.ptTile[idx];
  if (!e || !h) return 'missing';
  let same = 0;
  for (let i = 0; i < 64; i++) if (e.pix[i] === h.pix[i]) same++;
  return `${same}/64`;
}

const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const oam = JSON.parse(fs.readFileSync('output/emu-full/frame-0710/oam.json', 'utf8'));
console.log('tile compare (f_spPatternTable=1, index=tile+256):');
for (const s of slots) {
  const t = oam[s].tile;
  const idx = t + 256;
  console.log(`slot${s} tile=${t} idx=${idx}: ${compareTiles(idx)}`);
}
console.log('\n也检查 bgTable=0 的 tile 0..10:');
for (let t = 0; t <= 10; t++) console.log(`tile${t}: ${compareTiles(t)}`);
