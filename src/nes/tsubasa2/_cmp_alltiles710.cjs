// f710: 比较所有可见 sprite tile 与所有非零 BG tile 的 ptTile
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

function compare(idx) {
  const e = emuPpu.ptTile[idx];
  const h = h5Ppu.ptTile[idx];
  if (!e || !h) return -1;
  for (let i = 0; i < 64; i++) if (e.pix[i] !== h.pix[i]) return i;
  return -2;
}

const oam = JSON.parse(fs.readFileSync('output/emu-full/frame-0710/oam.json', 'utf8'));
const usedSpr = new Set();
for (const s of oam) {
  if (s.y < 240) usedSpr.add(s.tile + 256); // spPatternTable=1
}
console.log('visible sprite tile count:', usedSpr.size);
let diffSpr = [];
for (const idx of usedSpr) {
  const r = compare(idx);
  if (r !== -2) diffSpr.push({ idx, firstDiff: r });
}
console.log('sprite tile diffs:', diffSpr.length);
if (diffSpr.length) console.log(diffSpr.slice(0, 10));

const nt = JSON.parse(fs.readFileSync('output/emu-full/frame-0710/nt.json', 'utf8'));
const usedBg = new Set();
for (const v of nt[0].tile) if (v !== 0) usedBg.add(v);
console.log('non-zero BG tile count:', usedBg.size);
let diffBg = [];
for (const idx of usedBg) {
  const r = compare(idx);
  if (r !== -2) diffBg.push({ idx, firstDiff: r });
}
console.log('BG tile diffs:', diffBg.length);
if (diffBg.length) console.log(diffBg.slice(0, 10));
