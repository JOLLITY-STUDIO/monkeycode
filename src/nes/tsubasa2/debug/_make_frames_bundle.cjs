const fs = require('fs');
const src = fs.readFileSync('debug/_emu_ref13_bundle.cjs', 'utf8');
const marker = 'var ROM_PATH = path.join(__dirname, "..", "docs", "roms", "Captain Tsubasa II - Super Striker (Japan).nes");';
const idx = src.indexOf(marker);
if (idx < 0) { console.error('marker not found'); process.exit(1); }
const game = src.slice(0, idx);
const main = `
var ROM_PATH = path.join(__dirname, "..", "docs", "roms", "Captain Tsubasa II - Super Striker (Japan).nes");
var OUT = path.join(__dirname, "_emu_frames.json");
var romBytes = fs2.readFileSync(ROM_PATH);
var nes = new nes_default({ emulateSound: false });
nes.loadROM(romBytes);
var ppu = nes.ppu;
var mmap = nes.mmap;
function dumpNT(idx) {
  var nt = ppu.nameTable[idx];
  var arr = [];
  for (var i = 0; i < 960; i++) arr.push(nt.tile[i]);
  return arr;
}
function dumpAttr(idx) {
  var nt = ppu.nameTable[idx];
  var arr = [];
  var a = nt.attr;
  for (var i = 0; i < 64; i++) arr.push(a ? a[i] : 0);
  return arr;
}
function oamDump() {
  var arr = Array.from(ppu.spriteMem);
  var out = [];
  for (var i = 0; i < 64; i++) out.push(arr[i*4+0]+","+arr[i*4+1]+","+arr[i*4+2]+","+arr[i*4+3]);
  return out;
}
var FRAMES = [1,3,5,7,9,11,13,15,17,20,25,30];
var results = [];
var total = 0;
for (var fi = 0; fi < FRAMES.length; fi++) {
  var target = FRAMES[fi];
  while (total < target) { nes.frame(); total++; }
  results.push({
    frame: total,
    r4A: nes.cpu && nes.cpu.mem ? nes.cpu.mem[0x4A] : undefined,
    r4B: nes.cpu && nes.cpu.mem ? nes.cpu.mem[0x4B] : undefined,
    r628: nes.cpu && nes.cpu.mem ? nes.cpu.mem[0x628] : undefined,
    palBg: Array.from(ppu.vramMem.slice(16128, 16144)),
    palSp: Array.from(ppu.vramMem.slice(16144, 16160)),
    chrBanks: mmap.chrBanks ? Array.from(mmap.chrBanks) : [],
    nt0: dumpNT(0),
    nt0attr: dumpAttr(0),
    oam: oamDump()
  });
}
fs2.writeFileSync(OUT, JSON.stringify(results));
console.log("done ->", OUT);
`;
fs.writeFileSync('debug/_emu_frames_bundle.cjs', game + main);
console.log('bundle written');
