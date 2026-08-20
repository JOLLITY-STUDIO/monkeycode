// PC 分布分析 v2: 具体地址 + $8B00-$8BFF 段详细
const path = require('path');
const fs = require('fs');
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');

const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES({ emulateSound: false });
nes.loadROM(rom);

const pcHist = new Map();
const b8xx = [];
let total = 0;
const maxSamples = 3000000;

const origCb = nes.cpu._traceCb;
nes.cpu._traceCb = function (pc, opcode, cycles) {
  if (origCb) { try { origCb.call(this, pc, opcode, cycles); } catch {} }
  if (total >= maxSamples) return;
  total++;
  pcHist.set(pc, (pcHist.get(pc) || 0) + 1);
  if (pc >= 0x8b00 && pc <= 0x8bff) {
    if (b8xx.length < 60 || b8xx.some(x => x.pc === pc)) b8xx.push({ pc, c: (pcHist.get(pc) || 0) });
  }
  if (pc === 0x8b1c || pc === 0x8b0d || pc === 0x8af7 || pc === 0x806c || pc === 0x8824) {
    b8xx.push({ pc, c: (pcHist.get(pc) || 0), hit: true });
  }
};

for (let i = 0; i < 400; i++) nes.frame();

console.log('frames=400 total_instr=' + total);
const arr = [...pcHist.entries()].sort((a, b) => b[1] - a[1]);
console.log('\n=== TOP 35 具体地址 ===');
for (const [pc, c] of arr.slice(0, 35)) {
  console.log('$' + pc.toString(16).toUpperCase().padStart(4, '0') + ': ' + c);
}
console.log('\n=== $8B00-$8BFF 命中 ===');
const seen = new Set();
for (const x of b8xx) {
  if (!seen.has(x.pc)) { seen.add(x.pc); console.log('$' + x.pc.toString(16).toUpperCase().padStart(4, '0') + ': ' + (pcHist.get(x.pc) || 0) + (x.hit ? '  <== hook target' : '')); }
}
