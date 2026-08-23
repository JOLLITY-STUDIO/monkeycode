// hook $2007 写入: 抓叙事阶段 (f378+) 写 NT 的指令 PC 分布 + 数据样例
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const nes = new tsnes.NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const origWrite = nes.cpu.write.bind(nes.cpu);
// PPU 内部 $2006 锁存地址 (追踪用)
let ppuAddr = 0;
let latch = 0;

const pcCount = {};        // instrPC → 次数
const pcSamples = {};      // instrPC → 前 8 个 (vramAddr, tile)
let ntTotal = 0;
let ntFrames = 0;

nes.cpu.write = (addr, val) => {
  if (addr === 0x2006) {
    if (latch === 0) { ppuAddr = (ppuAddr & 0xff) | ((val & 0x3f) << 8); latch = 1; }
    else { ppuAddr = (ppuAddr & 0xff00) | val; latch = 0; }
  } else if (addr === 0x2007) {
    if (ppuAddr >= 0x2000 && ppuAddr < 0x3000) {
      const pc = nes.cpu._instrPC;
      pcCount[pc] = (pcCount[pc] || 0) + 1;
      if (!pcSamples[pc]) pcSamples[pc] = [];
      if (pcSamples[pc].length < 6) pcSamples[pc].push([ppuAddr, val]);
      ntTotal++;
    }
    ppuAddr = (ppuAddr + 1) & 0x3fff;
  }
  return origWrite(addr, val);
};

const FRAME_START = 370;
const FRAME_END = 420;
for (let i = 0; i < FRAME_END; i++) {
  nes.frame();
  if (i >= FRAME_START && i < FRAME_END) {
    ntFrames++;
    if (ntFrames <= 1) { /* first frame of window */ }
  }
}

const sorted = Object.keys(pcCount).map((pc) => ({ pc: parseInt(pc), n: pcCount[pc] })).sort((a, b) => b.n - a.n);
console.log('NT writes total:', ntTotal, 'in frames', FRAME_START + '-' + FRAME_END);
sorted.slice(0, 20).forEach((e) => {
  console.log('PC $' + e.pc.toString(16).toUpperCase() + ' x' + e.n + ' samples: ' +
    (pcSamples[e.pc] || []).map(([a, t]) => '$' + a.toString(16).toUpperCase() + '=#' + t.toString(16).toUpperCase().padStart(2, '0')).join(' '));
});
